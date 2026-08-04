export interface BlogPostData {
  id: string;
  slug: string;
  date: {
    pl: string;
    en: string;
  };
  author: {
    pl: string;
    en: string;
  };
  readTime: {
    pl: string;
    en: string;
  };
  category: {
    pl: string;
    en: string;
  };
  title: {
    pl: string;
    en: string;
  };
  excerpt: {
    pl: string;
    en: string;
  };
  content: {
    pl: string[];
    en: string[];
  };
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    id: '1',
    slug: 'zdrowy-styl-zycia-i-dobre-samopoczucie',
    date: {
      pl: '3 sierpnia 2026',
      en: 'August 3, 2026'
    },
    author: {
      pl: 'Ekspert Vita Detox',
      en: 'Vita Detox Expert'
    },
    readTime: {
      pl: '3 min czytania',
      en: '3 min read'
    },
    category: {
      pl: 'Zdrowie & Witalność',
      en: 'Health & Vitality'
    },
    title: {
      pl: 'Zdrowy styl życia i dobre samopoczucie!',
      en: 'Healthy Lifestyle and Well-being!'
    },
    excerpt: {
      pl: 'Witajcie, drodzy Czytelnicy, na moim blogu poświęconym zdrowemu stylowi życia i dbałości o dobre samopoczucie! Dziś chciałbym przywitać Was serdecznie i zaprosić do fascynującej podróży po świecie witaminowych wlewów dożylnych.',
      en: 'Welcome, dear Readers, to my blog dedicated to a healthy lifestyle and caring for well-being! Today, I would like to warmly welcome you and invite you on a fascinating journey through the world of intravenous vitamin infusions.'
    },
    content: {
      pl: [
        'Witajcie, drodzy Czytelnicy, na moim blogu poświęconym zdrowemu stylowi życia i dbałości o dobre samopoczucie! Dziś chciałbym przywitać Was serdecznie i zaprosić do fascynującej podróży po świecie witaminowych wlewów dożylnych.',
        'Tematyka witaminowych wlewów dożylnych może wydawać się nietypowa, ale w rzeczywistości jest to coraz popularniejsza metoda uzupełniania niedoborów składników odżywczych, poprawy kondycji zdrowotnej oraz zwiększenia energii i witalności. Przez wiele lat witaminowe infuzje były dostępne jedynie w gabinetach medycyny estetycznej, jednak teraz stają się coraz bardziej powszechne i dostępne dla szerszej publiczności.',
        'Witaminy i minerały odgrywają kluczową rolę w naszym zdrowiu, wpływając na funkcjonowanie organizmu, układu immunologicznego, poziom energii oraz ogólną kondycję. Witaminowe wlewy dożylnie pozwalają na szybsze i skuteczniejsze wchłanianie składników odżywczych bezpośrednio do krwiobiegu, co może być szczególnie korzystne dla osób z deficytami witaminowymi, w okresach zwiększonego zapotrzebowania czy po intensywnym wysiłku fizycznym.',
        'Podczas podróży po świecie witaminowych infuzji dożylnych, będziemy zgłębiać różne aspekty tej metody, takie jak korzyści zdrowotne, skuteczność, bezpieczeństwo, odpowiednie składniki do infuzji oraz doświadczenia osób, które skorzystały z tego rodzaju terapii. Będziemy również rozmawiać o najnowszych trendach, badaniach naukowych oraz praktycznych wskazówkach dotyczących tego fascynującego tematu.',
        'Zapraszam Was do udziału w dyskusji, zadawania pytań, wyrażania swoich opinii oraz dzielenia się własnymi doświadczeniami z witaminowymi wlewami dożylnymi. Mam nadzieję, że ta podróż po świecie zdrowia i dobrostanu będzie inspirująca, pouczająca i pełna pozytywnych odkryć.',
        'Dziękuję, że jesteście ze mną na tej przygodzie i zapraszam do regularnego odwiedzania bloga, gdzie będziemy razem eksplorować tajniki witaminowych infuzji dożylnych. Pozdrawiam serdecznie i do zobaczenia w kolejnych wpisach!'
      ],
      en: [
        'Welcome, dear Readers, to my blog dedicated to a healthy lifestyle and caring for well-being! Today, I would like to warmly welcome you and invite you on a fascinating journey through the world of intravenous vitamin infusions.',
        'The topic of intravenous vitamin infusions may seem unusual, but in reality, it is an increasingly popular method for supplementing nutrient deficiencies, improving health conditions, and boosting energy and vitality. For many years, vitamin infusions were only available in aesthetic medicine clinics, but now they are becoming more widespread and accessible to a broader audience.',
        'Vitamins and minerals play a crucial role in our health, influencing body function, immune system performance, energy levels, and overall condition. Intravenous vitamin drips allow for faster and more effective absorption of nutrients directly into the bloodstream, which can be particularly beneficial for individuals with vitamin deficiencies, during periods of increased demand, or after intense physical exertion.',
        'During our journey through the world of IV vitamin infusions, we will explore various aspects of this method, such as health benefits, efficacy, safety, suitable infusion ingredients, and the experiences of people who have used this type of therapy. We will also discuss the latest trends, scientific research, and practical tips regarding this fascinating topic.',
        'I invite you to take part in the discussion, ask questions, express your opinions, and share your own experiences with IV vitamin drips. I hope this journey through the world of health and wellness will be inspiring, informative, and full of positive discoveries.',
        'Thank you for being with me on this adventure, and I invite you to visit the blog regularly, where together we will explore the secrets of IV vitamin infusions. Warm regards, and see you in upcoming posts!'
      ]
    }
  }
];
