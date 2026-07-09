import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Check In', to: '/' },
    { name: 'Reflection', to: '/reflect' },
    { name: 'Stories', to: '/stories' },
    { name: 'Community', to: '/community' },
    { name: 'Campaigns', to: '/campaigns' },
    { name: 'Resources', to: '/resources' },
    { name: 'Profile', to: '/profile' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-md bg-dark-bg/70 border-b border-white/5 py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <NavLink 
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold font-display tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-primary via-indigo-primary to-blue-primary flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white text-sm font-extrabold">M</span>
          </div>
          <span>Mind<span className="text-indigo-primary">Bridge</span></span>
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) => 
                `text-sm transition-colors duration-200 nav-link font-medium ${
                  isActive ? 'text-white border-b-2 border-indigo-primary pb-1' : 'text-gray-400 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Minimal User indicator */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavLink
            to="/profile"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-white transition-all"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> Active Session
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass-panel border-b border-white/10 px-6 py-6 flex flex-col space-y-4 animate-fade-in">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `text-base py-2 border-b border-white/5 text-left ${
                  isActive ? 'text-white font-bold' : 'text-gray-400'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
