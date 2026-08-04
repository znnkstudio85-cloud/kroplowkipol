import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Clock,
  Navigation,
  ExternalLink,
  Car
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-[#FAF8F5] text-[#14261C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBC8] border border-[#D8C4B6] text-[#1B3B2B] text-xs font-black uppercase tracking-widest">
            <Phone className="w-3.5 h-3.5" />
            <span>{language === 'pl' ? 'Kontakt & Dojazd' : 'Contact & Mobile Dispatch'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#14261C] tracking-tight italic">
            {t.contact.title}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Bento Grid Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Phone Card */}
            <div className="p-6 rounded-3xl bg-[#1B3B2B] text-[#FAF8F5] shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EADBC8] text-[#1B3B2B] flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-6 h-6 animate-pulse text-[#1B3B2B]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#EADBC8]">
                    {t.contact.phoneTitle}
                  </h4>
                  <a
                    href="tel:+48535914149"
                    className="text-2xl font-black text-white hover:text-[#EADBC8] transition-colors italic"
                  >
                    {t.contact.phoneNumber}
                  </a>
                </div>
              </div>
              <p className="text-xs font-medium text-gray-200 pl-15">
                {language === 'pl'
                  ? 'Infolinia czynna 24/7. Przyjmujemy zgłoszenia na dojazd do domu, biura lub hotelu.'
                  : '24/7 dispatch hotline. Accepting mobile requests for home, office, or hotel.'}
              </p>
            </div>

            {/* Mobile Coverage Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EADBC8] space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B3B2B] text-[#EADBC8] flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider">
                    {language === 'pl' ? 'Obszar Dojazdu' : 'Service Radius'}
                  </h4>
                  <p className="text-base font-bold text-[#14261C]">
                    {language === 'pl' ? 'Warszawa i okolice do 40 km' : 'Warsaw & surroundings up to 40 km'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 pl-13">
                <Clock className="w-3.5 h-3.5 text-[#1B3B2B]" />
                <span>{language === 'pl' ? 'Dostępność: 24 godziny na dobę, 7 dni w tygodniu' : 'Available 24 hours a day, 7 days a week'}</span>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EADBC8] space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B3B2B] text-[#EADBC8] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider">
                    {t.contact.emailTitle}
                  </h4>
                  <a
                    href="mailto:kontakt@kroplowki.pl"
                    className="text-base font-bold text-[#14261C] hover:text-[#2D5A3F] transition-colors"
                  >
                    kontakt@kroplowki.pl
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EADBC8] space-y-3 shadow-sm">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider">
                {t.contact.socialTitle}
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/vita_detox?igsh=aGRnZWdyOG9iMTgw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EADBC8]/30 border border-[#EADBC8] text-[#14261C] transition-colors text-xs font-black uppercase"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>

                <a
                  href="https://www.tiktok.com/@vitadetox?_t=8q2Qzg65ZHW&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EADBC8]/30 border border-[#EADBC8] text-[#14261C] transition-colors text-xs font-black uppercase"
                >
                  <span className="text-teal-600 font-extrabold text-sm">♪</span>
                  <span>TikTok</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>

                <a
                  href="https://booksy.com/pl-pl/248700_vita-detox_zdrowie_3_warszawa?do=invite#ba_s=dl_1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EADBC8]/30 border border-[#EADBC8] text-[#14261C] transition-colors text-xs font-black uppercase"
                >
                  <span className="text-[#00A3AD] font-extrabold text-sm">b.</span>
                  <span>Booksy</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </div>
            </div>

          </div>

          {/* Right: Warsaw Mobile Coverage Map Container */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl overflow-hidden border border-[#EADBC8] bg-white shadow-sm relative min-h-[420px]">
            <div className="p-4 bg-[#1B3B2B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#EADBC8]" />
                <span className="text-xs font-black uppercase">{language === 'pl' ? 'Mapa Zasięgu Dojazdu' : 'Dispatch Coverage Area'}</span>
              </div>
              <span className="px-3 py-1 text-[10px] font-black uppercase bg-[#2D5A3F] text-[#FAF8F5] border border-[#8FAF96]/30 rounded-full">
                ● {language === 'pl' ? 'Warszawa + do 40 km' : 'Warsaw + 40 km'}
              </span>
            </div>

            {/* Embedded Warsaw Map */}
            <div className="relative h-80 sm:h-[420px] w-full">
              <iframe
                title="Kroplówki.pl Warsaw Mobile Service Radius"
                src="https://maps.google.com/maps?q=Warszawa&t=&z=11&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Coverage Badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#1B3B2B]/95 border border-[#2D5A3F] backdrop-blur-md text-xs text-gray-200 shadow-lg">
                <p className="font-black text-white italic uppercase flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#EADBC8]" />
                  <span>{language === 'pl' ? 'Usługi Wyłącznie Mobilne z dojazdem:' : '100% Mobile Service Delivered:'}</span>
                </p>
                <p className="text-[11px] text-gray-300 mt-1">
                  {language === 'pl'
                    ? 'Dojeżdżamy do domów, mieszkań, biur oraz hoteli na terenie całej Warszawy oraz w promieniu do 40 km od stolicy.'
                    : 'We deliver to homes, offices, and hotels across Warsaw and within a 40 km radius.'}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

