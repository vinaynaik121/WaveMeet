import React, { useState, useEffect } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Tv, PhoneOff, Check, Lock, Globe 
} from 'lucide-react';
import { translateText } from '../../utils/geminiTranslator';
import Person1 from '/src/assets/landing-page/person1.webp';
import Person2 from '/src/assets/landing-page/person2.webp';
import Person3 from '/src/assets/landing-page/person3.webp';
import Person4 from '/src/assets/landing-page/person4.webp';

function Solutions() {
  // Call Controls State
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [screenShareActive, setScreenShareActive] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(1); // 1 to 4

  // Interactive Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finalize presentation deck', completed: true },
    { id: 2, text: 'Review Q3 roadmap', completed: false },
    { id: 3, text: 'Test screen share latency', completed: false }
  ]);

  // Subtitle Language translation state
  const [selectedLang, setSelectedLang] = useState('es');
  const [translatedText, setTranslatedText] = useState("¡Bienvenido a WaveMeet! Estamos construyendo el futuro de la colaboración en tiempo real.");
  const [translatedText2, setTranslatedText2] = useState("¡Esto es increíble! Hará que nuestras sesiones internacionales sean mucho más productivas.");
  const [translating, setTranslating] = useState(false);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  useEffect(() => {
    const baseText1 = "Welcome to WaveMeet! We are building the future of real-time collaboration.";
    const baseText2 = "That is amazing, it will make our cross-border sessions much more productive.";
    
    if (selectedLang === 'en') {
      setTranslatedText(baseText1);
      setTranslatedText2(baseText2);
      return;
    }
    
    setTranslating(true);
    Promise.all([
      translateText(baseText1, selectedLang),
      translateText(baseText2, selectedLang)
    ]).then(([trans1, trans2]) => {
      setTranslatedText(trans1);
      setTranslatedText2(trans2);
      setTranslating(false);
    }).catch(() => {
      setTranslating(false);
    });
  }, [selectedLang]);

  return (
    <section id="solutions" className="py-24 bg-background transition-colors duration-300 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#fe583e]/10 text-[#fe583e] border border-[#fe583e]/20 mb-4">
            Features & Solutions
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Meetings with <span className="bg-gradient-to-r from-[#fe583e] to-[#ef4444] bg-clip-text text-transparent">Superpowers</span>
          </h2>
          <p className="font-light text-lg mt-4 sm:mt-6 text-black dark:text-gray-300 max-w-xl mx-auto">
            WaveMeet brings sleek, high-fidelity collaboration tools directly to your browser. No installs required, just instant connections.
          </p>
        </div>

        {/* Bento Grid Layout - Material 3 Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Interactive Live Call (Hero Card - Double width on large screens) */}
          <div className="lg:col-span-2 flex flex-col justify-between p-8 rounded-[2rem] bg-white dark:bg-[#1C1C1C] border border-gray-200/70 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#fe583e]/30 group">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="bg-[#fe583e]/10 text-[#fe583e] dark:bg-[#fe583e]/20 font-semibold text-[11px] py-1 px-3.5 rounded-full uppercase tracking-wider">
                  Host Controls
                </span>
                <div className="text-[11px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-gray-200/40 dark:border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fe583e] animate-ping" />
                  Live Interactive Mockup
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 font-karla">
                Seamless Host Control & Call UI
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base leading-relaxed">
                Appoint co-hosts, set custom presentation views, and manage permissions on the fly. Experience ultra-low latency audio/video that keeps you in sync.
              </p>
            </div>

            {/* Interactive Call Mockup Grid */}
            <div className="relative rounded-2xl bg-gray-50 dark:bg-[#161616] border border-gray-200/60 dark:border-white/5 p-4 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 gap-3 aspect-[16/10] sm:aspect-[16/9]">
                
                {/* Participant 1 (Current User) */}
                <div 
                  onClick={() => setActiveSpeaker(1)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeSpeaker === 1 ? 'border-[#fe583e]' : 'border-transparent'}`}
                >
                  {videoActive ? (
                    <img src={Person1} alt="User" className="w-full h-full object-cover aspect-video" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-neutral-800 text-center p-2">
                      <span className="text-xs font-bold text-gray-400">Camera Off</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] sm:text-xs text-white flex items-center gap-1.5">
                    {micActive ? <Mic className="w-3 h-3 text-green-400" /> : <MicOff className="w-3 h-3 text-red-500" />}
                    You (Host)
                  </div>
                </div>

                {/* Participant 2 */}
                <div 
                  onClick={() => setActiveSpeaker(2)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeSpeaker === 2 ? 'border-[#fe583e]' : 'border-transparent'}`}
                >
                  <img src={Person2} alt="Sarah" className="w-full h-full object-cover aspect-video" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] sm:text-xs text-white flex items-center gap-1.5">
                    <Mic className="w-3 h-3 text-green-400" />
                    Sarah Jenkins
                  </div>
                </div>

                {/* Participant 3 */}
                <div 
                  onClick={() => setActiveSpeaker(3)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeSpeaker === 3 ? 'border-[#fe583e]' : 'border-transparent'}`}
                >
                  <img src={Person3} alt="David" className="w-full h-full object-cover aspect-video" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] sm:text-xs text-white flex items-center gap-1.5">
                    <Mic className="w-3 h-3 text-green-400" />
                    David Chen
                  </div>
                </div>

                {/* Participant 4 */}
                <div 
                  onClick={() => setActiveSpeaker(4)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeSpeaker === 4 ? 'border-[#fe583e]' : 'border-transparent'}`}
                >
                  <img src={Person4} alt="Elena" className="w-full h-full object-cover aspect-video" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] sm:text-xs text-white flex items-center gap-1.5">
                    <Mic className="w-3 h-3 text-red-500" />
                    Elena Rostova (Co-Host)
                  </div>
                </div>
              </div>

              {/* Call Controls Overlay Toolbar */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <button 
                  onClick={() => setMicActive(!micActive)}
                  className={`p-2 rounded-full transition-colors ${micActive ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white hover:bg-red-600'}`}
                  title={micActive ? "Mute Microphone" : "Unmute Microphone"}
                >
                  {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setVideoActive(!videoActive)}
                  className={`p-2 rounded-full transition-colors ${videoActive ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white hover:bg-red-600'}`}
                  title={videoActive ? "Turn Video Off" : "Turn Video On"}
                >
                  {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setScreenShareActive(!screenShareActive)}
                  className={`p-2 rounded-full transition-colors ${screenShareActive ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  title="Share Screen"
                >
                  <Tv className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/20" />
                <button 
                  className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 cursor-not-allowed"
                  title="Leave Call"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Subtitles Card (Single width) */}
          <div className="flex flex-col justify-between p-8 rounded-[2rem] bg-white dark:bg-[#1C1C1C] border border-gray-200/70 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#fe583e]/30 group">
            <div>
              <div className="flex items-center justify-between">
                <span className="bg-[#0ea5e9]/10 text-[#0ea5e9] dark:bg-[#0ea5e9]/20 font-semibold text-[11px] py-1 px-3.5 rounded-full uppercase tracking-wider">
                  AI Translation
                </span>
                <span className="text-[10px] font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 px-2 py-0.5 rounded-full border border-[#0ea5e9]/20">Live</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 font-karla">
                Translate in Real Time
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Connect teams worldwide. Get accurate live captions and translate speeches in over 10+ languages automatically.
              </p>
            </div>

            {/* Subtitle Interaction Area - BALANCED */}
            <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-[#161616] border border-gray-200/60 dark:border-white/5 shadow-sm flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Target Language:
                  </span>
                  <select 
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="text-xs bg-white dark:bg-neutral-850 text-gray-900 dark:text-white border border-gray-250 dark:border-neutral-700 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#fe583e]"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>

                {/* Speech bubbles UI */}
                <div className="space-y-4">
                  {/* Participant 1: Sarah Jenkins */}
                  <div className="flex items-start gap-2">
                    <img src={Person2} alt="Sarah" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 bg-white dark:bg-neutral-800/80 p-3 rounded-2xl rounded-tl-none border border-gray-200/60 dark:border-neutral-700/65 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[9.5px] font-black text-[#0ea5e9]">Sarah Jenkins</p>
                        <span className="text-[8px] text-gray-400 font-mono">Original: Spanish</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        {translating ? (
                          <span className="text-gray-400 animate-pulse">Translating via Gemini...</span>
                        ) : (
                          `"${translatedText}"`
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Participant 2: You (Host) */}
                  <div className="flex items-start gap-2 justify-end">
                    <div className="flex-1 bg-white dark:bg-neutral-800/80 p-3 rounded-2xl rounded-tr-none border border-gray-200/60 dark:border-neutral-700/65 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] text-gray-400 font-mono">Original: English</span>
                        <p className="text-[9.5px] font-black text-[#fe583e]">You (Host)</p>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        "Absolutely! Live translation parsing is fully integrated with Gemini AI capabilities."
                      </p>
                    </div>
                    <img src={Person1} alt="You" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                  </div>

                  {/* Participant 3: Sarah Jenkins (Reply) */}
                  <div className="flex items-start gap-2">
                    <img src={Person2} alt="Sarah" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 bg-white dark:bg-neutral-800/80 p-3 rounded-2xl rounded-tl-none border border-gray-200/60 dark:border-neutral-700/65 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[9.5px] font-black text-[#0ea5e9]">Sarah Jenkins</p>
                        <span className="text-[8px] text-gray-400 font-mono">Original: Spanish</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        {translating ? (
                          <span className="text-gray-400 animate-pulse">Translating via Gemini...</span>
                        ) : (
                          `"${translatedText2}"`
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Advanced Screen Sharing (Single width) */}
          <div className="flex flex-col justify-between p-8 rounded-[2rem] bg-white dark:bg-[#1C1C1C] border border-gray-200/70 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#fe583e]/30 group">
            <div>
              <span className="bg-[#a855f7]/10 text-[#a855f7] dark:bg-[#a855f7]/20 font-semibold text-[11px] py-1 px-3.5 rounded-full uppercase tracking-wider">
                Presentation
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 font-karla">
                Dual Stream Presenting
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Break the single-screen restriction. Share your desktop view, specific apps, or allow multiple members to present side-by-side.
              </p>
            </div>

            {/* Screen share mockup */}
            <div className="mt-6 relative aspect-[16/10] bg-gray-50 dark:bg-[#161616] border border-gray-200/60 dark:border-white/5 rounded-2xl p-3 flex gap-2 overflow-hidden shadow-sm">
              <div className="w-1/2 h-full rounded-lg bg-white dark:bg-neutral-800 border border-gray-200/60 dark:border-neutral-700/60 flex flex-col justify-between p-2 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] bg-[#a855f7] text-white px-1.5 py-0.5 rounded font-medium">Presenter 1</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-[5.5px] text-gray-400 space-y-0.5 my-auto">
                  <p className="text-blue-400">const meet = new WaveMeet();</p>
                  <p className="text-purple-400">await meet.connect("sales-q3");</p>
                  <p className="text-green-400">console.log("Connected! 🚀");</p>
                </div>
                <span className="text-[7px] text-gray-400 font-semibold truncate">VS Code IDE</span>
              </div>
              <div className="w-1/2 h-full rounded-lg bg-white dark:bg-neutral-800 border border-gray-200/60 dark:border-neutral-700/60 flex flex-col justify-between p-2 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] bg-[#a855f7] text-white px-1.5 py-0.5 rounded font-medium">Presenter 2</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
                <div className="flex items-end gap-1.5 justify-center h-8 my-auto">
                  <div className="w-2 h-4 bg-[#a855f7]/40 rounded-sm" />
                  <div className="w-2 h-8 bg-[#a855f7]/70 rounded-sm" />
                  <div className="w-2 h-10 bg-[#a855f7] rounded-sm" />
                </div>
                <span className="text-[7px] text-gray-400 font-semibold truncate">Analytics Tab</span>
              </div>
            </div>
          </div>

          {/* Card 4: Interactive Tasks & Notes (Single width) */}
          <div className="flex flex-col justify-between p-8 rounded-[2rem] bg-white dark:bg-[#1C1C1C] border border-gray-200/70 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#fe583e]/30 group">
            <div>
              <span className="bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20 font-semibold text-[11px] py-1 px-3.5 rounded-full uppercase tracking-wider">
                Workspace
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 font-karla">
                Live Shared Notes & Tasks
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Take structured notes and assign tasks during meetings. Keep alignment intact without leaving the conversation tab.
              </p>
            </div>

            {/* Tasks interactive checklist */}
            <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-[#161616] border border-gray-200/60 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Interactive Tasks Checklist</span>
              </div>
              <ul className="space-y-2">
                {tasks.map(task => (
                  <li 
                    key={task.id} 
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-2.5 cursor-pointer group/item select-none"
                  >
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                      task.completed 
                        ? 'bg-[#10b981] border-[#10b981] text-white' 
                        : 'border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-transparent group-hover/item:border-[#10b981]'
                    }`}>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className={`text-xs transition-colors duration-200 ${
                      task.completed 
                        ? 'line-through text-gray-400 dark:text-gray-500' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 5: Safe Uptime & Secure Custom Domain (Single width) */}
          <div className="flex flex-col justify-between p-8 rounded-[2rem] bg-white dark:bg-[#1C1C1C] border border-gray-200/70 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#fe583e]/30 group">
            <div>
              <span className="bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300 font-semibold text-[11px] py-1 px-3.5 rounded-full uppercase tracking-wider">
                Enterprise
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 font-karla">
                Uptime & Dedicated Domain
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Experience crystal clear uptime guarantees, secure custom domains, and end-to-end TLS encryption designed for enterprise needs.
              </p>
            </div>

            {/* Custom domain mockup */}
            <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-[#161616] border border-gray-200/60 dark:border-white/5 shadow-sm flex flex-col justify-center items-center h-[120px] text-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm max-w-full">
                <Lock className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-[11px] text-gray-600 dark:text-gray-300 truncate select-all font-mono">
                  yourbrand.wavemeet.com
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">
                <div className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
                99.99% SLA Uptime
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Solutions;
