import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Users, Clock, Sparkles } from 'lucide-react';
import ambulanceImg from '../assets/images/vita_ambulance_1785758202288.jpg';

export const About: React.FC = () => {
  const { t, language } = useLanguage();

  const aboutData = t.about;

  return (
    <section id="about" className="py-20 bg-[#FAF8F5] text-[#14261C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBC8] text-[#1B3B2B] text-xs font-black uppercase tracking-widest border border-[#D8C4B6]">
            <Sparkles className="w-3.5 h-3.5 text-[#1B3B2B]" />
            <span>{language === 'pl' ? 'O KROPLÓWKI.PL' : 'ABOUT KROPLOWKI.PL'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#14261C] tracking-tight italic">
            {aboutData.title}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            {aboutData.subtitle}
          </p>
        </div>

        {/* Main Section Content - Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Ambulance Vehicle Image + Main Description Box (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mobile Ambulance Image Card */}
            <div className="bg-[#1B3B2B] rounded-3xl border border-[#2D5A3F] overflow-hidden shadow-xl relative">
              <img
                src={ambulanceImg}
                alt="Pojazd medyczny Kroplówki.pl"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-72 object-cover object-center"
              />
            </div>

            {/* Main Description Box */}
            <div className="bg-white rounded-3xl border border-[#EADBC8] p-6 sm:p-10 space-y-6 shadow-sm relative overflow-hidden">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1B3B2B] text-[#EADBC8] flex items-center justify-center shrink-0 font-black">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#14261C] italic tracking-tight">
                  KROPLÓWKI.PL
                </h3>
              </div>

              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed font-normal">
                <p className="text-gray-700">
                  {aboutData.paragraph1}
                </p>
                <p className="text-gray-700">
                  {aboutData.paragraph2}
                </p>
                <p className="text-gray-800 font-medium">
                  {aboutData.paragraph3}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Staff & Opening Hours (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Subsection 1: Personel / Staff */}
            <div className="bg-white rounded-3xl border border-[#EADBC8] p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B3B2B] text-[#EADBC8] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#14261C] italic uppercase tracking-tight">
                    {aboutData.employeesTitle}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {aboutData.employeesSubtitle}
                  </p>
                </div>
              </div>

              {/* Medical Staff Description Text */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                {aboutData.medicalStaffQuote}
              </p>
            </div>

            {/* Subsection 2: Godziny otwarcia (Opening Hours) */}
            <div className="bg-[#1B3B2B] text-white rounded-3xl border border-[#2D5A3F] p-6 sm:p-8 space-y-5 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EADBC8] text-[#1B3B2B] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white italic uppercase tracking-tight">
                    {aboutData.hoursTitle}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {aboutData.hoursSubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {aboutData.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-[#2D5A3F]/50 border border-[#8FAF96]/20"
                  >
                    <span className="font-bold text-gray-200">{item.day}</span>
                    <span className="font-mono font-bold text-[#EADBC8]">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

