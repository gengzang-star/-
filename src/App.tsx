import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import MainPage from './components/MainPage';
import BrandStory from './components/BrandStory';
import Products from './components/Products';
import HeerangStory from './components/HeerangStory';
import CustomerReviews from './components/CustomerReviews';
import CustomerCenter from './components/CustomerCenter';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Smooth scroll reset to top of window on view transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream select-none antialiased">
      {/* 1. Header Navigation Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Page Transit Container with modern fade transitions */}
      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {activeTab === 'home' && <MainPage setActiveTab={setActiveTab} />}
            {activeTab === 'story' && <BrandStory />}
            {activeTab === 'products' && <Products />}
            {activeTab === 'contents' && <HeerangStory />}
            {activeTab === 'reviews' && <CustomerReviews />}
            {activeTab === 'support' && <CustomerCenter />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Information Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
