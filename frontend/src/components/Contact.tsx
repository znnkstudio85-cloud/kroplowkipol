import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Phone,
  Mail,
  Clock,
  Car,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-[#FAF8F5] text-[#14261C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBC8] border border-[#D8C4B6] text-[#1B3B2B] text-xs font-black uppercase tracking-widest">
            <Phone className="w-3.5 h-3.5" />
            <span>{language === 'pl' ? 'Kontakt & Dojazd Mobilny' : 'Contact & Mobile Dispatch'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#14261C] tracking-tight italic">
            {t.contact.title}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Clean Minimalist Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Main Call Action Card (col-span-7) */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#1B3B2B] text-[#FAF8F5] shadow-xl space-y-6 border border-[#2D5A3F] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2D5A3F] text-[#EADBC8] text-[11px] font-black uppercase tracking-wider border border-[#8FAF96]/30">
                <Zap className="w-3.5 h-3.5 text-[#EADBC8] animate-pulse" />
                <span>{language === 'pl' ? 'Infolinia Dyspozytorska 24/7' : '24/7 Dispatch Line'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white italic tracking-tight">
                {language === 'pl' ? 'Potrzebujesz kroplówki z dojazdem?' : 'Need a mobile IV drip treatment?'}
              </h3>

              <p className="text-sm text-gray-200 leading-relaxed max-w-xl">
                {language === 'pl'
                  ? 'Nasi dyspozytorzy przyjmują zgłoszenia całodobowo. Zespół medyczny dociera pod wskazany adres na terenie Warszawy i okolic (do 40 km).'
                  : 'Our dispatchers accept requests 24/7. Mobile medical staff arrives directly at your home, office, or hotel.'}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="tel:+48535914149"
                  className="w-full sm:w-auto px-8 py-4 bg-[#EADBC8] hover:bg-[#F3E8D8] text-[#1B3B2B] font-black text-base rounded-2xl transition-all uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-[#1B3B2B] animate-pulse" />
                  <span>+48 535 914 149</span>
                </a>

                <a
                  href="mailto:kontakt@kroplowki.pl"
                  className="w-full sm:w-auto px-6 py-4 bg-[#FAF8F5]/10 border border-[#EADBC8]/30 hover:bg-[#FAF8F5]/20 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all"
                >
                  <Mail className="w-4 h-4 text-[#EADBC8]" />
                  <span>kontakt@kroplowki.pl</span>
                </a>
              </div>
            </div>

            {/* Guarantees Strip */}
            <div className="pt-6 border-t border-[#2D5A3F] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8FAF96]" />
                <span>{language === 'pl' ? 'Szybki czas dojazdu (30-45 min)' : 'Fast response (30-45 min)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8FAF96]" />
                <span>{language === 'pl' ? '100% dyskrecja i profesjonalizm' : '100% discreet & professional'}</span>
              </div>
            </div>
          </div>

          {/* Service Info Cards (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Mobile Coverage Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EADBC8] space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1B3B2B] text-[#EADBC8] flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    {language === 'pl' ? 'Zasięg Dojazdu' : 'Service Radius'}
                  </h4>
                  <p className="text-lg font-black text-[#14261C]">
                    {language === 'pl' ? 'Warszawa i okolice do 40 km' : 'Warsaw & surroundings up to 40 km'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-15">
                {language === 'pl'
                  ? 'Dojazd bezpośrednio do domu, mieszkania, biura lub pokoju hotelowego.'
                  : 'Direct delivery to your home, apartment, office, or hotel room.'}
              </p>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EADBC8] space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1B3B2B] text-[#EADBC8] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    {language === 'pl' ? 'Godziny Pracy' : 'Operating Hours'}
                  </h4>
                  <p className="text-lg font-black text-[#14261C]">
                    {language === 'pl' ? '24/7 — Całodobowo' : '24/7 Round the Clock'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-15">
                {language === 'pl'
                  ? 'Działamy 7 dni w tygodniu, również w niedziele i święta.'
                  : 'Operating 7 days a week, including weekends & holidays.'}
              </p>
            </div>

            {/* Certified Staff Notice */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#EADBC8] space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-[#1B3B2B] uppercase">
                <ShieldCheck className="w-4 h-4 text-[#2D5A3F]" />
                <span>{language === 'pl' ? 'Aseptyka i Bezpieczeństwo' : 'Safety & Aseptic Care'}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {language === 'pl'
                  ? 'Używamy wyłącznie jednorazowego, jałowego sprzętu medycznego oraz certyfikowanych preparatów aptecznych.'
                  : 'We strictly use single-use sterile medical supplies and certified pharmaceuticals.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

