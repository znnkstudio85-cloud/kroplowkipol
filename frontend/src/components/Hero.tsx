import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, ShieldCheck, Clock, Zap, MapPin, ChevronRight } from 'lucide-react';
import medicalTeamImg from '../assets/images/medical_team_group_1785843633524.jpg';

export const Hero: React.FC = () => {
  const { language } = useLanguage();

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 bg-[#FAF8F5] text-[#14261C] overflow-hidden">
      
      {/* Background Subtle Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#2D5A3F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#EADBC8]/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Main Hero Bento Grid (8 + 4 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Main Hero Bento Card (col-span-8) */}
          <div className="lg:col-span-8 bg-[#1B3B2B] text-[#FAF8F5] rounded-3xl border border-[#2D5A3F] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[480px]">
            
            {/* Background Medical Cross SVG watermark */}
            <div className="absolute -top-10 -right-10 p-8 opacity-5 pointer-events-none">
              <svg width="280" height="280" viewBox="0 0 24 24" fill="none" stroke="#EADBC8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>

            <div className="relative z-10 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF8F5]/10 border border-[#EADBC8]/20 text-[#EADBC8] text-xs font-black rounded-lg uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 text-[#EADBC8] animate-pulse" />
                <span>{language === 'pl' ? 'KROPLÓWKI WITAMINOWE 24/7' : 'MOBILE IV THERAPY 24/7'}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight italic">
                {language === 'pl' ? (
                  <>
                    Zadbaj o swoje zdrowie i energię. <br />
                    <span className="text-[#EADBC8] not-italic font-extrabold">Profesjonalne kroplówki witaminowe z dojazdem do klienta.</span>
                  </>
                ) : (
                  <>
                    Take care of your health & energy. <br />
                    <span className="text-[#EADBC8] not-italic font-extrabold">Professional vitamin IV drip therapy delivered to your door.</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-gray-200 max-w-xl text-base sm:text-lg leading-relaxed font-normal">
                {language === 'pl'
                  ? 'Kroplówki witaminowe z dojazdem w Warszawie i okolicach. Ratownicy medyczni i pielęgniarki dojeżdżają do domu, biura lub hotelu.'
                  : 'Vitamin IV therapy delivered to your home, office, or hotel in Warsaw and surrounding area.'}
              </p>

              {/* CTA Action Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="tel:+48535914149"
                  className="px-8 py-4 bg-[#EADBC8] text-[#1B3B2B] font-black text-base rounded-xl hover:bg-[#F3E8D8] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-[#1B3B2B] animate-pulse" />
                  <span>{language === 'pl' ? 'Zadzwoń: +48 535 914 149' : 'Call: +48 535 914 149'}</span>
                </a>

                <button
                  onClick={scrollToServices}
                  className="px-6 py-4 bg-[#FAF8F5]/10 border border-[#EADBC8]/30 hover:bg-[#FAF8F5]/20 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{language === 'pl' ? 'Zobacz ofertę' : 'View Services'}</span>
                  <ChevronRight className="w-4 h-4 text-[#EADBC8]" />
                </button>
              </div>
            </div>

            {/* Bottom Info Strip inside Hero Card */}
            <div className="relative z-10 pt-8 mt-6 border-t border-[#2D5A3F] flex flex-wrap items-center justify-between gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2 font-bold text-white">
                <Clock className="w-4 h-4 text-[#EADBC8]" />
                <span>{language === 'pl' ? 'Wyłącznie z dojazdem do klienta 24/7' : '100% Mobile Service 24/7'}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-[#8FAF96]" />
                <span>{language === 'pl' ? 'Wykwalifikowani Ratownicy i Pielęgniarki' : 'Certified Paramedics & Nurses'}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-white">
                <MapPin className="w-4 h-4 text-[#EADBC8]" />
                <span>{language === 'pl' ? 'Warszawa + do 40 km' : 'Warsaw + 40 km'}</span>
              </div>
            </div>

          </div>

          {/* Right Bento Side Card (col-span-4) */}
          <div className="lg:col-span-4 bg-[#2D5A3F] text-[#FAF8F5] rounded-3xl border border-[#4E7A5A] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative">
            
            {/* Header / Dispatch Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase italic tracking-widest text-[#EADBC8]">
                  {language === 'pl' ? 'KROPLÓWKI MOBILNE 24/7' : 'KROPLOWKI.PL MOBILE'}
                </span>
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase bg-[#FAF8F5]/20 text-white border border-white/20 rounded-md">
                  ● {language === 'pl' ? 'Dojazd do domu' : 'Home Delivery'}
                </span>
              </div>

              {/* Medical Team Image Card */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-[#8FAF96]/30 group">
                <img
                  src={medicalTeamImg}
                  alt="Zespół personelu medycznego Kroplówki.pl"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B2B]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-bold text-white bg-[#1B3B2B]/80 px-2.5 py-1 rounded-lg border border-[#8FAF96]/30">
                  {language === 'pl' ? 'Zespół personelu medycznego' : 'Certified Medical Team'}
                </div>
              </div>
            </div>

            {/* Stat Counters Bento Grid inside Card */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-[#1B3B2B]/60 rounded-2xl border border-[#8FAF96]/20">
                <div className="text-xl font-black text-[#EADBC8]">24/7</div>
                <div className="text-[10px] text-gray-300 uppercase font-bold tracking-wider mt-0.5">{language === 'pl' ? 'Dostępność' : 'Availability'}</div>
              </div>
              <div className="p-3 bg-[#1B3B2B]/60 rounded-2xl border border-[#8FAF96]/20">
                <div className="text-xl font-black text-[#EADBC8]">30 min</div>
                <div className="text-[10px] text-gray-300 uppercase font-bold tracking-wider mt-0.5">{language === 'pl' ? 'Śr. Dojazd' : 'Avg Arrival'}</div>
              </div>
              <div className="p-3 bg-[#1B3B2B]/60 rounded-2xl border border-[#8FAF96]/20">
                <div className="text-xl font-black text-[#8FAF96]">100%</div>
                <div className="text-[10px] text-gray-300 uppercase font-bold tracking-wider mt-0.5">{language === 'pl' ? 'Bezpiecznie' : 'Safe Care'}</div>
              </div>
            </div>

            {/* Immediate Call Notice */}
            <div className="p-4 rounded-2xl bg-[#1B3B2B] border border-[#8FAF96]/30 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold text-[#EADBC8] uppercase tracking-wider">
                  {language === 'pl' ? 'Zadzwoń do nas' : 'Call us directly'}
                </p>
                <p className="text-[11px] text-gray-200">
                  {language === 'pl' ? 'Szybkie zgłoszenie telefoniczne' : 'Quick phone dispatch'}
                </p>
              </div>
              <a
                href="tel:+48535914149"
                className="px-3.5 py-2 text-xs font-black uppercase text-[#1B3B2B] bg-[#EADBC8] hover:bg-[#F3E8D8] rounded-xl transition-all shrink-0"
              >
                {language === 'pl' ? 'Zadzwoń' : 'Call'}
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Horizontal Bento Strip (Highlights) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
          
          {/* Bento Item 1 */}
          <div
            onClick={scrollToServices}
            className="md:col-span-4 bg-white rounded-3xl border border-[#EADBC8] p-6 flex flex-col justify-between group hover:border-[#1B3B2B] transition-all cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1B3B2B] flex items-center justify-center text-[#EADBC8]">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-[#1B3B2B] uppercase tracking-widest bg-[#EADBC8]/50 px-2.5 py-1 rounded-md">
                350 zł
              </span>
            </div>
            <div>
              <h3 className="font-black text-lg text-[#14261C] uppercase italic mb-1 group-hover:text-[#2D5A3F] transition-colors">
                {language === 'pl' ? 'Odtrucie Alkoholowe' : 'Alcohol Detox'}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {language === 'pl'
                  ? 'Elektrolity, glukoza i leki przeciwwymiotne z dojazdem do domu. Natychmiastowa ulga.'
                  : 'Electrolytes, glucose & antiemetics delivered home. Instant relief.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-bold">
              <span>{language === 'pl' ? 'Szybka ulga i nawodnienie' : 'Fast relief & hydration'}</span>
              <div className="w-7 h-7 rounded-full border border-[#1B3B2B]/20 flex items-center justify-center group-hover:bg-[#1B3B2B] group-hover:text-[#FAF8F5] transition-all">
                →
              </div>
            </div>
          </div>

          {/* Bento Item 2 */}
          <div
            onClick={scrollToServices}
            className="md:col-span-4 bg-white rounded-3xl border border-[#EADBC8] p-6 flex flex-col justify-between group hover:border-[#1B3B2B] transition-all cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1B3B2B] flex items-center justify-center text-[#EADBC8]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-[#1B3B2B] uppercase tracking-widest bg-[#EADBC8]/50 px-2.5 py-1 rounded-md">
                400 zł
              </span>
            </div>
            <div>
              <h3 className="font-black text-lg text-[#14261C] uppercase italic mb-1 group-hover:text-[#2D5A3F] transition-colors">
                {language === 'pl' ? 'Bomba Witaminowa & Odporność' : 'Vitamin Immunity Boost'}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {language === 'pl'
                  ? 'Uderzeniowa dawka Witaminy C, Cynku, Solcoserylu i Soluvitu z podaniem w Twoim domu.'
                  : 'High dose Vitamin C, Zinc, Solcoseryl & Soluvit at your home.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-bold">
              <span>{language === 'pl' ? 'Dla aktywnych i pracujących' : 'For active professionals'}</span>
              <div className="w-7 h-7 rounded-full border border-[#1B3B2B]/20 flex items-center justify-center group-hover:bg-[#1B3B2B] group-hover:text-[#FAF8F5] transition-all">
                →
              </div>
            </div>
          </div>

          {/* Bento Item 3 (Support / Phone block) */}
          <div className="md:col-span-4 bg-[#1B3B2B] text-white rounded-3xl border border-[#2D5A3F] p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div>
              <span className="px-2.5 py-1 bg-[#EADBC8]/20 text-[#EADBC8] text-[10px] font-black uppercase rounded tracking-widest">
                {language === 'pl' ? 'KONSULTACJA MEDYCZNA' : 'MEDICAL CONSULTATION'}
              </span>
              <h3 className="text-xl font-black text-white uppercase italic mt-3 mb-1">
                {language === 'pl' ? 'Masz pytania?' : 'Have Questions?'}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {language === 'pl'
                  ? 'Nasz wykwalifikowany personel dobierze odpowiednią kroplówkę telefonicznie.'
                  : 'Our qualified staff will assist and select the optimal IV drip.'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2D5A3F] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-extrabold block">
                  {language === 'pl' ? 'Infolinia 24/7' : '24/7 Hotline'}
                </span>
                <a
                  href="tel:+48535914149"
                  className="text-base font-black text-[#EADBC8] hover:underline"
                >
                  +48 535 914 149
                </a>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#EADBC8] text-[#1B3B2B] font-black flex items-center justify-center text-lg shadow-sm">
                📞
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


