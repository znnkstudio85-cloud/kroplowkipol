import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  const handleLinkClick = (path: string, sectionId?: string) => {
    if (onNavigate) {
      onNavigate(path, sectionId);
    } else if (sectionId) {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#1B3B2B] text-gray-300 text-xs border-t border-[#2D5A3F] pt-16 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EADBC8] text-[#1B3B2B] flex items-center justify-center font-black text-[#1B3B2B] shadow-sm">
                <svg className="w-6 h-6 fill-current text-[#1B3B2B]" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="text-xl font-black text-white italic tracking-tight">
                KROPLÓWKI<span className="text-[#EADBC8]">.PL</span>
              </span>
            </div>

            <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#EADBC8] italic">
              {language === 'pl' ? 'Nawigacja' : 'Navigation'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('/', 'home')}
                  className="hover:text-[#EADBC8] transition-colors cursor-pointer text-left"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/', 'about')}
                  className="hover:text-[#EADBC8] transition-colors cursor-pointer text-left"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/', 'services')}
                  className="hover:text-[#EADBC8] transition-colors cursor-pointer text-left"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/blog')}
                  className="hover:text-[#EADBC8] transition-colors cursor-pointer text-left"
                >
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/', 'faq')}
                  className="hover:text-[#EADBC8] transition-colors cursor-pointer text-left"
                >
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/', 'contact')}
                  className="hover:text-[#EADBC8] transition-colors cursor-pointer text-left"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#EADBC8] italic">
              {language === 'pl' ? 'Infolinia & Kontakt' : 'Direct Line & Contact'}
            </h4>
            <div className="space-y-3 text-xs">
              <p className="flex items-center gap-2 font-black text-white">
                <Phone className="w-4 h-4 text-[#EADBC8]" />
                <a href="tel:+48535914149" className="hover:text-[#EADBC8] transition-colors text-sm">+48 535 914 149</a>
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <Mail className="w-3.5 h-3.5 text-[#EADBC8]" />
                <a href="mailto:kontakt@kroplowki.pl" className="hover:text-white transition-colors">kontakt@kroplowki.pl</a>
              </p>
              <p className="flex items-center gap-2 text-gray-300 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-[#EADBC8] shrink-0" />
                <span>{language === 'pl' ? 'Usługi mobilne — Warszawa i okolice (do 40 km)' : 'Mobile services — Warsaw & surroundings (40 km)'}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Emergency Medical Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#2D5A3F]/50 border border-[#8FAF96]/20 text-[11px] text-gray-200 leading-relaxed flex items-start gap-3">
          <Shield className="w-4 h-4 text-[#EADBC8] shrink-0 mt-0.5" />
          <p>{t.footer.emergencyNotice}</p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#2D5A3F] text-center sm:text-left text-[11px] text-gray-400">
          <p>© {new Date().getFullYear()} Kroplówki.pl. {t.footer.rights}</p>
        </div>

      </div>
    </footer>
  );
};

