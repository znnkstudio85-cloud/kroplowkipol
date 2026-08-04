import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const SEO: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const isPl = language === 'pl';
    const title = isPl
      ? 'Kroplówki.pl - Kroplówki Witaminowe z Dojazdem do Klienta 24/7 (Warszawa)'
      : 'Kroplówki.pl - Mobile Vitamin IV Drips Delivered 24/7 (Warsaw)';
    const description = isPl
      ? 'Zadbaj o swoje zdrowie i energię. Profesjonalne kroplówki witaminowe z dojazdem do domu, biura lub hotelu (Warszawa i okolice do 40 km). Odtrucie, regeneracja, odporność, NAD+. Zadzwoń: +48 535 914 149.'
      : 'Take care of your health and energy. Professional vitamin IV therapy delivered to your home, office, or hotel across Warsaw and surroundings (40 km radius). Immunity, detox, NAD+. Call: +48 535 914 149.';


    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }, [language]);

  return null;
};
