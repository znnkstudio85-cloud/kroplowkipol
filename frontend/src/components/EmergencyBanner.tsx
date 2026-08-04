import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Zap, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const EmergencyBanner: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToBooking = () => {
    const elem = document.getElementById('booking');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Emergency Announcement Bar */}
      <div className="bg-[#EADBC8] text-[#1B3B2B] text-xs font-black uppercase italic relative z-10 border-b border-[#D8C4B6] overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          
          {/* Desktop & Tablet Layout (sm and up) */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <Zap className="w-4 h-4 text-[#1B3B2B] fill-[#1B3B2B] animate-bounce shrink-0" />
              <span className="truncate">{t.emergencyBanner.text}</span>
            </div>
            
            <a
              href="tel:+48535914149"
              className="shrink-0 hover:opacity-90 flex items-center gap-1.5 bg-[#1B3B2B] text-[#FAF8F5] px-3.5 py-1 rounded-full font-black uppercase text-[11px] tracking-wider transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#EADBC8] animate-pulse" />
              <span>{t.emergencyBanner.callBtn}</span>
            </a>
          </div>

          {/* Mobile Layout (< sm) */}
          <div className="sm:hidden relative h-6 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {activeSlide === 0 ? (
                <motion.div
                  key="msg1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex items-center justify-center gap-1.5 text-center text-[11px] px-2"
                >
                  <Zap className="w-3.5 h-3.5 text-[#1B3B2B] fill-[#1B3B2B] animate-bounce shrink-0" />
                  <span className="truncate">{t.emergencyBanner.text}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="msg2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex items-center justify-center gap-1.5 text-center text-[11px]"
                >
                  <a
                    href="tel:+48535914149"
                    className="flex items-center gap-1.5 bg-[#1B3B2B] text-white px-3 py-0.5 rounded-full font-black uppercase text-[10px] tracking-wider shadow-sm"
                  >
                    <Phone className="w-3 h-3 text-[#EADBC8] animate-pulse" />
                    <span>{t.emergencyBanner.callBtn}</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Mobile Floating Bottom Call Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#1B3B2B] border-t border-[#2D5A3F] p-3 backdrop-blur-lg flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="tel:+48535914149"
          className="flex-1 py-3 px-3 text-xs font-black text-[#1B3B2B] bg-[#EADBC8] uppercase rounded-xl flex items-center justify-center gap-2 shadow-md"
        >
          <Phone className="w-4 h-4 animate-pulse text-[#1B3B2B]" />
          <span>{language === 'pl' ? 'Zadzwoń teraz' : 'Call Now'}</span>
        </a>

        <button
          onClick={scrollToBooking}
          className="flex-1 py-3 px-3 text-xs font-black text-[#FAF8F5] bg-[#2D5A3F] border border-[#8FAF96]/30 rounded-xl flex items-center justify-center gap-2 uppercase"
        >
          <Calendar className="w-4 h-4 text-[#EADBC8]" />
          <span>{language === 'pl' ? 'Umów wizytę' : 'Book Visit'}</span>
        </button>
      </div>

    </>
  );
};

