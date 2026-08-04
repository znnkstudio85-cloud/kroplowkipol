import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FAQ_ITEMS } from '../data/translations';
import { HelpCircle, ChevronDown, ChevronUp, Search, ShieldCheck } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredItems = FAQ_ITEMS.filter((item) => {
    const question = language === 'pl' ? item.questionPl : item.questionEn;
    const answer = language === 'pl' ? item.answerPl : item.answerEn;
    const q = searchQuery.toLowerCase();

    return question.toLowerCase().includes(q) || answer.toLowerCase().includes(q);
  });

  return (
    <section id="faq" className="py-20 bg-[#FAF8F5] text-[#14261C] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBC8] border border-[#D8C4B6] text-[#1B3B2B] text-xs font-black uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-[#1B3B2B]" />
            <span>{language === 'pl' ? 'Pytania i Odpowiedzi' : 'Questions & Answers'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#14261C] italic uppercase tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Search */}
        <div className="mb-8 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#1B3B2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.faq.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#EADBC8] rounded-2xl text-sm text-[#14261C] placeholder-gray-400 focus:outline-none focus:border-[#1B3B2B] transition-colors shadow-sm"
          />
        </div>

        {/* Accordion Items List */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;
            const question = language === 'pl' ? item.questionPl : item.questionEn;
            const answer = language === 'pl' ? item.answerPl : item.answerEn;
            const category = language === 'pl' ? item.categoryPl : item.categoryEn;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#EADBC8] overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  <div className="space-y-1.5">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#1B3B2B] bg-[#EADBC8]/50 border border-[#D8C4B6] rounded-md">
                      {category}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#14261C] italic uppercase">
                      {question}
                    </h3>
                  </div>

                  <div className={`p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EADBC8] text-gray-500 transition-all duration-200 ${isOpen ? 'rotate-180 text-[#1B3B2B] border-[#1B3B2B] bg-[#EADBC8]/40' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-gray-700 leading-relaxed border-t border-[#EADBC8]/40 mt-1 animate-in fade-in duration-200">
                    <p className="pt-4">{answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              {language === 'pl'
                ? 'Brak wyników wyszukiwania. Zadzwoń do nas, a odpowiemy na każde pytanie!'
                : 'No matching questions found. Call us directly for any assistance!'}
            </div>
          )}
        </div>

      </div>
    </section>

  );
};
