export const translateText = async (text, targetLang) => {
  if (targetLang === 'en' || targetLang === 'original') {
    return text;
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  const langNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    ja: 'Japanese'
  };
  
  const targetLangName = langNames[targetLang] || 'English';
  
  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is not set. Falling back to local translation simulation.");
    // Simulate translations for standard text if the key is missing to keep UI working
    const mockTranslations = {
      es: {
        "Welcome to WaveMeet! We are building the future of real-time collaboration.": "¡Bienvenido a WaveMeet! Estamos construyendo el futuro de la colaboración en tiempo real.",
        "That is amazing, it will make our cross-border sessions much more productive.": "¡Esto es increíble! Hará que nuestras sesiones internacionales sean mucho más productivas.",
        "Finalize presentation deck": "Finalizar la presentación",
        "Review Q3 roadmap": "Revisar la hoja de ruta del tercer trimestre",
        "Test screen share latency": "Probar la latence del uso compartido de pantalla",
        "Hello": "Hola",
        "How are you?": "¿Cómo estás?",
        "Good morning": "Buenos días",
      },
      fr: {
        "Welcome to WaveMeet! We are building the future of real-time collaboration.": "Bienvenue sur WaveMeet ! Nous construisons l'avenir de la collaboration en temps réel.",
        "That is amazing, it will make our cross-border sessions much more productive.": "C'est incroyable ! Cela rendra nos sessions transfrontalières beaucoup plus productives.",
        "Finalize presentation deck": "Finaliser le support de présentation",
        "Review Q3 roadmap": "Revoir la feuille de route du troisième trimestre",
        "Test screen share latency": "Tester la latence du partage d'écran",
        "Hello": "Bonjour",
        "How are you?": "Comment ça va ?",
        "Good morning": "Bon matin",
      },
      ja: {
        "Welcome to WaveMeet! We are building the future of real-time collaboration.": "WaveMeetへようこそ！私たちはリアルタイムコラボレーションの未来を築いています。",
        "That is amazing, it will make our cross-border sessions much more productive.": "素晴らしいですね！これで国境を越えたセッションがさらに生産的になります。",
        "Finalize presentation deck": "プレゼンテーション資料の仕上げ",
        "Review Q3 roadmap": "第3四半期のロードマップ確認",
        "Test screen share latency": "画面共有の遅延テスト",
        "Hello": "こんにちは",
        "How are you?": "お元気ですか？",
        "Good morning": "おはようございます",
      }
    };
    
    // Check if we have a mock translation
    if (mockTranslations[targetLang] && mockTranslations[targetLang][text]) {
      return mockTranslations[targetLang][text];
    }
    // Return original text or a generic indicator if mock is missing
    return text;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Translate the following text into ${targetLangName}. Return ONLY the direct translation, nothing else. Do not add quotes, introductory text, explanations, or any other wrapper. Text to translate:\n\n"${text}"`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini translation request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (result) {
      return result.trim().replace(/^"|"$/g, ''); // Remove wrapping double quotes if Gemini returns them
    }
    return text;
  } catch (error) {
    console.error("Error in Gemini API translation:", error);
    return text;
  }
};
