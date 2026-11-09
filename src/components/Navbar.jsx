import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activePage = 'home', onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  const leftNavItems = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
  ];

  const rightNavItems = [
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const allNavItems = [...leftNavItems, ...rightNavItems];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    onNavigate?.(id);
    setMobileMenuOpen(false);
  };

  // Passive Window Scroll Listener for Nav Scrolled Chrome
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Accessibility: Close on Escape key & manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 py-4 sm:py-5 lg:py-6">
      {/* 90% Viewport Width Container */}
      <div className="w-[90%] mx-auto max-w-7xl">
        <div
          className={`flex items-center justify-between rounded-2xl sm:rounded-full px-5 sm:px-8 lg:px-10 py-3.5 sm:py-4 transition-all duration-300 ${
            scrolled
              ? 'bg-[#0d111a]/90 backdrop-blur-md border border-white/[0.1] shadow-2xl shadow-black/60'
              : 'bg-[#0d111a]/60 backdrop-blur-sm border border-white/[0.08]'
          }`}
        >
          {/* Desktop Left Navigation: HOME, ABOUT, EXPERIENCE */}
          <nav
            aria-label="Left Primary Navigation"
            className="hidden lg:flex items-center gap-4 lg:gap-5"
          >
            {leftNavItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`uiverse-nav-btn ${isActive ? 'is-active' : ''}`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Centered Brand Mark [[DAKSH.L]] */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center group focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full py-2 px-5 bg-[#07090e]/90 border border-white/[0.08] hover:border-cyan-500/50 transition-all duration-200 shadow-xl shadow-black/50"
            aria-label="Daksh Lalwani Home"
          >
            <span className="text-cyan-400 font-mono font-black text-sm sm:text-base lg:text-lg group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.9)] transition-all">
              [[
            </span>
            <span 
              className="text-xs sm:text-sm lg:text-base font-bold tracking-widest text-white group-hover:text-cyan-300 transition-colors px-2"
              style={{ fontFamily: "'Michroma', sans-serif" }}
            >
              DAKSH.L
            </span>
            <span className="text-cyan-400 font-mono font-black text-sm sm:text-base lg:text-lg group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.9)] transition-all">
              ]]
            </span>
          </a>

          {/* Desktop Right Navigation: SKILLS, PROJECTS, CONTACT */}
          <nav
            aria-label="Right Primary Navigation"
            className="hidden lg:flex items-center gap-4 lg:gap-5"
          >
            {rightNavItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`uiverse-nav-btn ${isActive ? 'is-active' : ''}`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Hamburger Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              ref={triggerRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-300 hover:text-white rounded-xl border border-white/[0.08] bg-[#111622] hover:bg-[#161c2c] transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-dialog"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer & Backdrop */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
              aria-hidden="true"
            />

            {/* Menu Drawer */}
            <div
              id="mobile-nav-dialog"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site Navigation"
              className="relative z-50 lg:hidden mt-3 bg-[#0d111a]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-4 shadow-2xl shadow-black/80 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200"
            >
              {allNavItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`uiverse-nav-btn w-full !justify-between !py-3 ${isActive ? 'is-active' : ''}`}
                  >
                    <span>{item.name}</span>
                    <span className="text-[11px] font-mono opacity-60">{item.href}</span>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
