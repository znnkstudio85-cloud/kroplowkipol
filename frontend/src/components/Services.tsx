import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';
import {
  Zap,
  Sparkles,
  Brain,
  Droplet,
  ShieldCheck,
  Sun,
  Activity,
  Flame,
  AlertCircle,
  HeartHandshake,
  Shield,
  Award,
  Heart,
  Crown,
  ShieldAlert,
  Search,
  CheckCircle,
  Phone
} from 'lucide-react';

interface ServicesProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForBooking }) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6' };
    switch (iconName) {
      case 'Zap': return <Zap {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Brain': return <Brain {...props} />;
      case 'Droplet': return <Droplet {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'AlertCircle': return <AlertCircle {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Crown': return <Crown {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      default: return <Droplet {...props} />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory =
      activeCategory === 'all' || service.category === activeCategory;
    
    const name = language === 'pl' ? service.namePl : service.nameEn;
    const desc = language === 'pl' ? service.descriptionPl : service.descriptionEn;
    
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleBook = (_service: ServiceItem) => {
    window.location.href = 'tel:+48535914149';
  };

  return (
    <section id="services" className="py-20 bg-[#FAF8F5] text-[#14261C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADBC8] border border-[#D8C4B6] text-[#1B3B2B] text-xs font-black uppercase tracking-widest">
            <Droplet className="w-3.5 h-3.5 fill-[#1B3B2B]" />
            <span>{language === 'pl' ? 'Katalog Zabiegów' : 'Treatment Catalog'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#14261C] tracking-tight italic uppercase">
            {t.services.title}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-6 mb-12">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'pl' ? 'Szukaj kroplówki (np. detoks, odporność, NAD+)...' : 'Search drip (e.g., detox, immunity, NAD+)...'}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#EADBC8] rounded-2xl text-sm text-[#14261C] placeholder-gray-400 focus:outline-none focus:border-[#1B3B2B] transition-colors shadow-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: `${t.services.filterAll} (${SERVICES_DATA.length})` },
              { id: 'regeneracja', label: t.services.filterRegeneration },
              { id: 'odpornosc', label: t.services.filterImmunity },
              { id: 'detoks', label: t.services.filterDetox },
              { id: 'sport', label: t.services.filterSport },
              { id: 'premium', label: t.services.filterPremium },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1B3B2B] text-[#FAF8F5] shadow-md'
                    : 'bg-white text-gray-600 hover:text-[#14261C] border border-[#EADBC8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const name = language === 'pl' ? service.namePl : service.nameEn;
            const desc = language === 'pl' ? service.descriptionPl : service.descriptionEn;
            const badge = language === 'pl' ? service.badgePl : service.badgeEn;

            return (
              <div
                key={service.id}
                id={`card-${service.id}`}
                className="bg-white rounded-3xl border border-[#EADBC8] p-6 flex flex-col justify-between hover:border-[#1B3B2B] transition-all duration-300 shadow-sm hover:shadow-md group relative"
              >
                <div>
                  {/* Top Header: Icon & Price Tag */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1B3B2B] text-[#EADBC8] flex items-center justify-center group-hover:bg-[#2D5A3F] transition-all shadow-sm">
                      {renderIcon(service.iconName)}
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-[#1B3B2B] tracking-tight">
                        {service.pricePLN} <span className="text-xs font-bold text-gray-500 uppercase">{t.services.currency}</span>
                      </div>
                      {badge && (
                        <span className="inline-block mt-1 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#EADBC8]/50 text-[#1B3B2B] border border-[#D8C4B6] rounded-md">
                          {badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-[#14261C] uppercase italic mb-2 group-hover:text-[#2D5A3F] transition-colors">
                    {name}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6 font-normal">
                    {desc}
                  </p>

                  {/* Availability Tag */}
                  <div className="flex items-center gap-4 py-2.5 border-t border-gray-100 text-[11px] text-gray-500 font-bold mb-6">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D5A3F]" />
                      <span>{language === 'pl' ? 'Dojazd do domu / biura / hotelu' : 'Home / Office / Hotel delivery'}</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA Button */}
                <a
                  href="tel:+48535914149"
                  className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase text-[#1B3B2B] bg-[#EADBC8] hover:bg-[#F3E8D8] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#1B3B2B] animate-pulse" />
                  <span>{language === 'pl' ? 'Zamów telefonicznie' : 'Order by Phone'}</span>
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>

  );
};
