import React from 'react';

function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Action handler placeholder
  };

  return (
    <section className="bg-background transition-colors duration-300">
      <div className="py-12 mx-2 lg:py-16 px-6 lg:mx-auto sm:mx-16 max-w-screen-md">
        <h2 id="contact_us" className="mb-4 text-4xl tracking-tight font-bold text-center text-gray-900 dark:text-gray-100 font-karla">
          Get in touch with us
        </h2>
        <p className="mb-8 lg:mb-12 font-light text-center text-gray-600 dark:text-gray-400 sm:text-md">
          Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-[#161616] p-8 rounded-[2rem] border border-gray-200/60 dark:border-white/5 shadow-sm">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200 uppercase">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-white dark:bg-[#1C1C1C] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl focus:border-[#fe583e] focus:ring-4 focus:ring-[#fe583e]/10 block w-full p-3.5 focus:outline-none font-semibold transition-all duration-200"
              placeholder="name@wavemeet.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200 uppercase">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3.5 w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-[#1C1C1C] border border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl shadow-sm focus:border-[#fe583e] focus:ring-4 focus:ring-[#fe583e]/10 focus:outline-none font-semibold transition-all duration-200"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200 uppercase">
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-3.5 w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-[#1C1C1C] border border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl shadow-sm focus:border-[#fe583e] focus:ring-4 focus:ring-[#fe583e]/10 focus:outline-none resize-none font-semibold transition-all duration-200"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full py-3.5 px-6 rounded-xl transition-all duration-300 ease-in-out font-bold tracking-wide bg-[#fe583e] hover:bg-[#e04a32] text-white hover:shadow-lg hover:shadow-[#fe583e]/15 active:scale-98"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
