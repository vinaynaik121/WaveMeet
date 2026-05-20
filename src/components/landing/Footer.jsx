import React from 'react';
import Logo from '../ui/Logo';
import { FaTwitter, FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdArrowForward, MdKeyboardArrowUp } from 'react-icons/md';

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#fafafa] dark:bg-[#1C1C1C] border-t border-gray-200/60 dark:border-white/5 pt-16 pb-8 px-6 sm:px-12 md:px-20 lg:px-24 transition-colors duration-500 font-karla overflow-hidden relative">
      {/* Background Accent Gradients */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#fe583e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#fe583e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div 
              className="flex items-center cursor-pointer max-w-fit"
              onClick={handleScrollToTop}
            >
              <Logo className="h-10 sm:h-12" />
              <span className="text-2xl sm:text-3xl font-black ml-2 text-gray-900 dark:text-white tracking-tighter">
                WaveMeet
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-sm">
              WaveMeet brings sleek, high-fidelity collaboration tools directly to your browser. No installs required, just instant connections.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3.5 pt-2">
              {[
                { icon: FaTwitter, href: '#', label: 'Twitter' },
                { icon: FaGithub, href: '#', label: 'GitHub' },
                { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
                { icon: FaYoutube, href: '#', label: 'YouTube' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-[#262626] border border-gray-200/60 dark:border-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-[#fe583e] dark:hover:bg-[#fe583e] hover:border-[#fe583e] dark:hover:border-[#fe583e] shadow-sm transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links: Product (2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Product
            </h4>
            <ul className="space-y-3">
              {['Features', 'Solutions', 'Security', 'Enterprise'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#fe583e] dark:hover:text-[#fe583e] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Company (2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Company
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Privacy Policy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#fe583e] dark:hover:text-[#fe583e] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Stay Connected
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Subscribe to our newsletter for features, updates, and releases.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center group max-w-md mt-2">
              <div className="absolute left-4 text-gray-400 group-focus-within:text-[#fe583e] transition-colors">
                <MdEmail size={20} />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-14 py-3.5 rounded-2xl bg-white dark:bg-[#262626] border border-gray-200 dark:border-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-[#fe583e] focus:ring-4 focus:ring-[#fe583e]/10 shadow-sm transition-all duration-300"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-2 p-2.5 rounded-xl bg-[#fe583e] hover:bg-[#e04a32] text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#fe583e]/20"
              >
                <MdArrowForward size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200/60 dark:bg-white/5 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs font-bold text-gray-500 dark:text-gray-400">
          <p>
            &copy; {currentYear} WaveMeet. All Rights Reserved.
          </p>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#262626] border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-[#fe583e] dark:hover:bg-[#fe583e] hover:border-[#fe583e] shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            <span>Back to Top</span>
            <MdKeyboardArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
