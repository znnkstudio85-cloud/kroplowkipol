import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_POSTS, BlogPostData } from '../data/blogData';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Phone,
  Gift
} from 'lucide-react';

interface BlogProps {
  currentPath: string;
  onNavigate: (path: string, sectionId?: string) => void;
  onBookClick: () => void;
}

export const Blog: React.FC<BlogProps> = ({ currentPath, onNavigate, onBookClick }) => {
  const { t, language } = useLanguage();
  const pageT = t.blogPage;

  // Determine if viewing a specific article
  const activeSlug = currentPath.startsWith('/blog/')
    ? currentPath.replace('/blog/', '')
    : null;

  const selectedPost: BlogPostData | undefined = activeSlug
    ? BLOG_POSTS.find((post) => post.slug === activeSlug) || BLOG_POSTS[0]
    : undefined;

  return (
    <div className="pt-28 pb-20 bg-[#FAF8F5] text-[#14261C] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Article Detail View */}
        {selectedPost ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Back to Blog Button */}
            <button
              onClick={() => onNavigate('/blog')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#EADBC8] rounded-xl text-xs sm:text-sm font-bold text-[#14261C] hover:text-[#1B3B2B] hover:bg-[#EADBC8]/30 transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-[#1B3B2B]" />
              <span>{pageT.backToBlog}</span>
            </button>

            {/* Article Header Card */}
            <div className="bg-white rounded-3xl border border-[#EADBC8] p-6 sm:p-10 space-y-6 relative overflow-hidden shadow-sm">

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-[#EADBC8]/50 border border-[#D8C4B6] text-[#1B3B2B] text-xs font-black uppercase tracking-wider rounded-lg">
                  {selectedPost.category[language]}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-[#1B3B2B]" />
                  <span>{selectedPost.readTime[language]}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#14261C] italic tracking-tight leading-tight">
                {selectedPost.title[language]}
              </h1>

              {/* Date & Read Time Bar */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-600 pt-4 border-t border-[#EADBC8]/50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1B3B2B]" />
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
                      {pageT.publishedOn}
                    </span>
                    <span className="font-medium text-gray-700">
                      {selectedPost.date[language]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Article Content */}
            <div className="bg-white rounded-3xl border border-[#EADBC8] p-6 sm:p-10 space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base font-normal shadow-sm">
              {selectedPost.content[language].map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA Box at Bottom of Article */}
            <div className="bg-[#1B3B2B] rounded-3xl border border-[#2D5A3F] p-6 sm:p-10 space-y-6 text-center relative overflow-hidden shadow-md text-[#FAF8F5]">
              <div className="max-w-2xl mx-auto space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EADBC8] text-[#1B3B2B] flex items-center justify-center mx-auto font-black shadow-sm">
                  <Gift className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#FAF8F5] italic uppercase">
                  {pageT.ctaTitle}
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {pageT.ctaSubtitle}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onBookClick}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#EADBC8] text-[#1B3B2B] font-black uppercase text-xs sm:text-sm rounded-xl hover:bg-[#F3E8D8] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Calendar className="w-4 h-4 text-[#1B3B2B]" />
                    <span>{pageT.ctaButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:+48535914149"
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#2D5A3F] border border-[#8FAF96]/30 text-[#FAF8F5] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#234731] transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#EADBC8]" />
                    <span>+48 535 914 149</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Blog Posts Listing View */
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Header */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBC8] border border-[#D8C4B6] text-[#1B3B2B] text-xs font-black uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5 text-[#1B3B2B]" />
                <span>{language === 'pl' ? 'Artykuły i Aktualności' : 'Articles & News'}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#14261C] italic uppercase tracking-tight">
                {pageT.mainTitle}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-medium italic border-b border-[#EADBC8] pb-6">
                {pageT.subtitle}
              </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl border border-[#EADBC8] p-6 space-y-4 flex flex-col justify-between hover:border-[#1B3B2B] transition-all duration-300 group shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 bg-[#EADBC8]/50 border border-[#D8C4B6] text-[#1B3B2B] text-[10px] font-black uppercase tracking-wider rounded-md">
                        {post.category[language]}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Clock className="w-3 h-3 text-[#1B3B2B]" />
                        <span>{post.readTime[language]}</span>
                      </span>
                    </div>

                    <h2
                      onClick={() => onNavigate(`/blog/${post.slug}`)}
                      className="text-lg sm:text-xl font-black text-[#14261C] italic group-hover:text-[#1B3B2B] transition-colors cursor-pointer leading-snug"
                    >
                      {post.title[language]}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {post.excerpt[language]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EADBC8]/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-[#1B3B2B]" />
                      <span>{post.date[language]}</span>
                    </div>

                    <button
                      onClick={() => onNavigate(`/blog/${post.slug}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#1B3B2B] hover:text-[#2D5A3F] transition-colors"
                    >
                      <span>{pageT.readMore}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>

  );
};
