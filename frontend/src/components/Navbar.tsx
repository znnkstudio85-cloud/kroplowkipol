import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Calendar, Menu, X, Droplet, Cross } from 'lucide-react';
import { EmergencyBanner } from './EmergencyBanner';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string, sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(path, sectionId);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 bg-[#1B3B2B] border-b border-[#2D5A3F] shadow-xl"
    >
      {/* Top Announcement Bar */}
      <EmergencyBanner />

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">

          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNavClick('/', 'home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            {/* Logo Icon Box */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#EADBC8] border border-[#D8C4B6] rounded-xl flex items-center justify-center text-[#1B3B2B] shadow-sm group-hover:scale-105 transition-transform">
              <Droplet className="w-4 h-4 sm:w-5 sm:h-5 fill-[#1B3B2B] text-[#1B3B2B]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-white italic">
                Kroplówki<span className="text-[#8FAF96]">.pl</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-[#2D5A3F]/80 text-[#FAF8F5] border border-[#8FAF96]/40 rounded-md whitespace-nowrap">
                MOBILNE 24/7
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6 text-xs font-semibold text-gray-200">
            <button
              onClick={() => handleNavClick('/', 'home')}
              className={`hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] xl:text-xs whitespace-nowrap cursor-pointer ${
                currentPath === '/' ? 'text-white font-bold border-b-2 border-[#8FAF96] pb-0.5' : ''
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('/', 'about')}
              className="hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] xl:text-xs whitespace-nowrap cursor-pointer"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('/', 'services')}
              className="hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] xl:text-xs whitespace-nowrap cursor-pointer"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('/blog')}
              className={`hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] xl:text-xs whitespace-nowrap cursor-pointer ${
                currentPath.startsWith('/blog')
                  ? 'text-[#8FAF96] font-black border-b-2 border-[#8FAF96] pb-0.5'
                  : 'text-gray-200'
              }`}
            >
              {t.nav.blog}
            </button>
            <button
              onClick={() => handleNavClick('/', 'faq')}
              className="hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] xl:text-xs whitespace-nowrap cursor-pointer"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => handleNavClick('/', 'contact')}
              className="hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] xl:text-xs whitespace-nowrap cursor-pointer"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Action buttons + Language switcher for Desktop */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0 pl-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-black/20 rounded-full p-1 border border-white/10 shrink-0">
              <button
                onClick={() => setLanguage('pl')}
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                  language === 'pl'
                    ? 'bg-[#EADBC8] text-[#1B3B2B] shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                PL
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#EADBC8] text-[#1B3B2B] shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Direct Phone Call CTA */}
            <a
              href="tel:+48535914149"
              className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase text-[#1B3B2B] bg-[#EADBC8] hover:bg-[#F3E8D8] rounded-xl shadow-md transition-all shrink-0 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#1B3B2B] animate-pulse" />
              <span>+48 535 914 149</span>
            </a>
          </div>

          {/* Mobile & Tablet Burger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#EADBC8] hover:text-white bg-[#2D5A3F]/60 active:bg-[#2D5A3F] border border-[#8FAF96]/40 rounded-xl focus:outline-none transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Slide down) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1B3B2B] border-b border-[#2D5A3F] px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          
          {/* Navigation Links */}
          <div className="flex flex-col space-y-1 pt-1">
            <button
              onClick={() => handleNavClick('/', 'home')}
              className={`text-left px-4 py-2.5 text-sm font-bold uppercase rounded-xl transition-colors cursor-pointer ${
                currentPath === '/' ? 'bg-[#2D5A3F] text-white border border-[#8FAF96]/30' : 'text-gray-100 hover:bg-white/5'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('/', 'about')}
              className="text-left px-4 py-2.5 text-sm font-bold uppercase text-gray-100 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('/', 'services')}
              className="text-left px-4 py-2.5 text-sm font-bold uppercase text-gray-100 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('/blog')}
              className={`text-left px-4 py-2.5 text-sm font-bold uppercase rounded-xl transition-colors cursor-pointer ${
                currentPath.startsWith('/blog')
                  ? 'bg-[#2D5A3F] text-white border border-[#8FAF96]/30'
                  : 'text-gray-100 hover:bg-white/5'
              }`}
            >
              {t.nav.blog}
            </button>
            <button
              onClick={() => handleNavClick('/', 'faq')}
              className="text-left px-4 py-2.5 text-sm font-bold uppercase text-gray-100 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => handleNavClick('/', 'contact')}
              className="text-left px-4 py-2.5 text-sm font-bold uppercase text-gray-100 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            >
              {t.nav.contact}
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-[#8FAF96]/30 pt-3 space-y-3">
            
            {/* Language Selector */}
            <div className="flex items-center justify-between bg-black/20 p-2 rounded-2xl border border-white/10">
              <span className="text-xs font-bold uppercase text-gray-300 pl-2">
                {language === 'pl' ? 'Język / Language:' : 'Language / Język:'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLanguage('pl')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    language === 'pl'
                      ? 'bg-[#EADBC8] text-[#1B3B2B] shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  PL
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#EADBC8] text-[#1B3B2B] shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Direct Phone Call Button */}
            <a
              href="tel:+48535914149"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 text-sm font-black uppercase text-[#1B3B2B] bg-[#EADBC8] hover:bg-[#F3E8D8] rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#1B3B2B] animate-pulse" />
              <span>{language === 'pl' ? 'Zadzwoń: +48 535 914 149' : 'Call: +48 535 914 149'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

