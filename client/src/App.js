import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AboutSection from './components/Main/AboutSection';
import LocationSection from './components/Main/LocationSection';
import ApartmentSelectorSection from './components/Main/HousesSection';
import ContactForm from './components/Main/ContactForm';
import { AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <AnimatePresence>
        <Header />
        <main>
          <AboutSection />
          <LocationSection />
          <ApartmentSelectorSection />
          <ContactForm />
        </main>
        <Footer />
      </AnimatePresence>
    </div>
  );
}

export default App;
