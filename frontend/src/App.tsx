import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SEO } from './components/SEO';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { BookingForm } from './components/BookingForm';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';

function MainLayout() {
  const [preFilledService, setPreFilledService] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/$/, '');
      return path === '' ? '/' : path;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      setCurrentPath(path === '' ? '/' : path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string, sectionId?: string) => {
    const targetPath = path.replace(/\/$/, '') || '/';
    
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
      setCurrentPath(targetPath);
    }

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 90;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceName: string) => {
    setPreFilledService(serviceName);
    handleNavigate('/', 'booking');
  };

  const isBlogPage = currentPath.startsWith('/blog');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#14261C] font-sans selection:bg-[#1B3B2B] selection:text-[#EADBC8] antialiased">
      <SEO />
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      
      <main>
        {isBlogPage ? (
          <Blog
            currentPath={currentPath}
            onNavigate={handleNavigate}
            onBookClick={() => handleNavigate('/', 'booking')}
          />
        ) : (
          <>
            <Hero />
            <About />
            <Services onSelectServiceForBooking={handleSelectServiceForBooking} />
            <BookingForm selectedServicePreFill={preFilledService} />
            <FAQ />
            <Contact />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}


export default function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}
