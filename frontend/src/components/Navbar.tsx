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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1B3B2B]/95 backdrop-blur-md border-b border-[#2D5A3F]/30 shadow-xl'
          : 'bg-[#1B3B2B]/90 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      {/* Top Announcement Bar */}
      <EmergencyBanner />

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">

          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNavClick('/', 'home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Logo Icon Box Placeholder */}
            <div className="w-9 h-9 bg-[#EADBC8] border border-[#D8C4B6] rounded-xl flex items-center justify-center text-[#1B3B2B] shadow-sm group-hover:scale-105 transition-transform">
              <Droplet className="w-5 h-5 fill-[#1B3B2B] text-[#1B3B2B]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white italic">
                Kroplówki<span className="text-[#8FAF96]">.pl</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#2D5A3F]/50 text-[#FAF8F5] border border-[#8FAF96]/30 rounded-md">
                MOBILNE 24/7
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-xs font-semibold text-gray-200">
            <button
              onClick={() => handleNavClick('/', 'home')}
              className={`hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] 2xl:text-xs whitespace-nowrap ${
                currentPath === '/' ? 'text-white font-bold border-b-2 border-[#8FAF96] pb-0.5' : ''
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('/', 'about')}
              className="hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] 2xl:text-xs whitespace-nowrap"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('/', 'services')}
              className="hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] 2xl:text-xs whitespace-nowrap"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('/blog')}
              className={`hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] 2xl:text-xs whitespace-nowrap ${
                currentPath.startsWith('/blog')
                  ? 'text-[#8FAF96] font-black border-b-2 border-[#8FAF96] pb-0.5'
                  : 'text-gray-200'
              }`}
            >
              {t.nav.blog}
            </button>
            <button
              onClick={() => handleNavClick('/', 'faq')}
              className="hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] 2xl:text-xs whitespace-nowrap"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => handleNavClick('/', 'contact')}
              className="hover:text-[#8FAF96] transition-colors uppercase tracking-wider text-[11px] 2xl:text-xs whitespace-nowrap"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Action buttons + Language switcher */}
          <div className="hidden xl:flex items-center gap-3 2xl:gap-4 shrink-0 pl-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-black/20 rounded-full p-1 border border-white/10 shrink-0">
              <button
                onClick={() => setLanguage('pl')}
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all ${
                  language === 'pl'
                    ? 'bg-[#EADBC8] text-[#1B3B2B] shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                PL
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-[#EADBC8] text-[#1B3B2B] shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Direct Phone Call */}
            <a
              href="tel:+48535914149"
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] 2xl:text-xs font-bold text-[#EADBC8] bg-[#FAF8F5]/10 border border-[#EADBC8]/30 rounded-xl hover:bg-[#FAF8F5]/20 transition-all shrink-0 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#EADBC8] animate-pulse" />
              <span>+48 535 914 149</span>
            </a>

            {/* Book Visit CTA */}
            <button
              onClick={() => handleNavClick('/', 'booking')}
              className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] 2xl:text-xs font-black uppercase text-[#1B3B2B] bg-[#EADBC8] hover:bg-[#F3E8D8] rounded-xl shadow-md transition-all shrink-0 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.bookAppointment}</span>
            </button>
          </div>

          {/* Mobile & Tablet Toggle */}
          <div className="flex xl:hidden items-center gap-3">
            <div className="flex items-center bg-black/20 rounded-full p-1 border border-white/10">
              <button
                onClick={() => setLanguage('pl')}
                className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                  language === 'pl' ? 'bg-[#EADBC8] text-[#1B3B2B]' : 'text-gray-300'
                }`}
              >
                PL
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                  language === 'en' ? 'bg-[#EADBC8] text-[#1B3B2B]' : 'text-gray-300'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-200 hover:text-white bg-black/20 border border-white/10 rounded-xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1B3B2B] border-b border-[#2D5A3F] px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-2 pt-2 pb-4">
            <button
              onClick={() => handleNavClick('/', 'home')}
              className="text-left px-3 py-2 text-sm font-bold uppercase text-gray-100 hover:bg-black/20 rounded-xl"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('/', 'about')}
              className="text-left px-3 py-2 text-sm font-bold uppercase text-gray-100 hover:bg-black/20 rounded-xl"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('/', 'services')}
              className="text-left px-3 py-2 text-sm font-bold uppercase text-gray-100 hover:bg-black/20 rounded-xl"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('/blog')}
              className={`text-left px-3 py-2 text-sm font-bold uppercase rounded-xl ${
                currentPath.startsWith('/blog')
                  ? 'bg-[#2D5A3F] text-white border border-[#8FAF96]/40'
                  : 'text-gray-100 hover:bg-black/20'
              }`}
            >
              {t.nav.blog}
            </button>
            <button
              onClick={() => handleNavClick('/', 'faq')}
              className="text-left px-3 py-2 text-sm font-bold uppercase text-gray-100 hover:bg-black/20 rounded-xl"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => handleNavClick('/', 'contact')}
              className="text-left px-3 py-2 text-sm font-bold uppercase text-gray-100 hover:bg-black/20 rounded-xl"
            >
              {t.nav.contact}
            </button>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href="tel:+48535914149"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-[#EADBC8] bg-[#FAF8F5]/10 border border-[#EADBC8]/30 rounded-xl"
            >
              <Phone className="w-4 h-4 text-[#EADBC8] animate-pulse" />
              <span>{t.nav.callNow}: +48 535 914 149</span>
            </a>

            <button
              onClick={() => handleNavClick('/', 'booking')}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-black uppercase text-[#1B3B2B] bg-[#EADBC8] rounded-xl shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookAppointment}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

