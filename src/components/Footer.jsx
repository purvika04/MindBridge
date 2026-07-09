import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative border-t border-white/5 bg-dark-bg/60 pt-20 pb-10 px-6 overflow-hidden">
      
      {/* Decorative subtle background light */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top: 4 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Logo & description */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <a 
              href="#home" 
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center space-x-2 text-2xl font-bold font-display tracking-tight text-white hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-primary via-indigo-primary to-blue-primary flex items-center justify-center">
                <span className="text-white text-sm font-extrabold">M</span>
              </div>
              <span>Mind<span className="text-indigo-primary">Bridge</span></span>
            </a>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              MindBridge is a unified mental health experiential learning engine. We synchronize AI reflections, peer collaborations, and Android field logs into a single developmental loop.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" rx="1" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h5>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Reflect Stage', href: '#reflect' },
                { name: 'Connect Stage', href: '#connect' },
                { name: 'Act Stage', href: '#act' },
                { name: 'journey timeline', href: '#journey' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h5>
            <ul className="space-y-2 text-xs">
              {[
                'Pedagogical Whitepaper',
                'Curriculum Sandbox',
                'Case Studies',
                'Integration Guides',
                'Help & Support'
              ].map((res, idx) => (
                <li key={idx}>
                  <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                    {res}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter subscription form */}
          <div className="lg:col-span-4 text-left space-y-4">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Newsletter Subscription</h5>
            <p className="text-xs text-gray-400 leading-relaxed">
              Sign up to receive case reports, wellness curricular guides, and details on new features.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="wellness@school.edu"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-primary transition-all placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-indigo-primary text-white font-bold text-xs hover:bg-indigo-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Join <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom: Legal copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-[10px] text-gray-500 font-medium">
          <span>&copy; {new Date().getFullYear()} MindBridge Experiential Ecosystem. All rights reserved.</span>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#faq" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#faq" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#faq" className="hover:text-white transition-colors">Security Architecture</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
