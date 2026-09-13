import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LegalitasBadge from './components/LegalitasBadge';
import ProductCatalog from './components/ProductCatalog';
import FleetConfigurator from './components/FleetConfigurator';
import CompanyVision from './components/CompanyVision';
import ClientMatrix from './components/ClientMatrix';
import PhotoGallery from './components/PhotoGallery';
import ContactWorkshop from './components/ContactWorkshop';
import Footer from './components/Footer';

export default function App() {
  // Framer Motion luxury scroll progress spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const handleScrollToCatalog = () => {
    const el = document.getElementById('katalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-amber-500 selection:text-slate-950 relative">
      {/* Framer Motion Top Reading/Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-400 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(217,119,6,0.6)]"
      />

      {/* 1. Industrial Navbar */}
      <Navbar />

      {/* 2. Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onExploreCatalog={handleScrollToCatalog} />

        {/* Legalitas & DISHUB Verification */}
        <LegalitasBadge />

        {/* 10 Lini Karoseri Catalog */}
        <ProductCatalog />

        {/* Interactive Fleet Configurator */}
        <FleetConfigurator />

        {/* Visi, Misi & 4 Pilar Standar Mutu */}
        <CompanyVision />

        {/* 21 Mitra & Klien Korporasi Nasional */}
        <ClientMatrix />

        {/* Real Field Photo Gallery & Workshop Snaps */}
        <PhotoGallery />

        {/* Workshop, Office & Direct Consultation */}
        <ContactWorkshop />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Framer Motion Floating Instant WhatsApp Action Button */}
      <motion.aside
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }}
        aria-label="Kontak Cepat WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
      >
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="hidden sm:block px-3 py-1.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-[11px] font-mono text-emerald-400 backdrop-blur-md shadow-xl pointer-events-none group-hover:opacity-100 transition-opacity duration-200"
        >
          Konsultasi Karoseri Online
        </motion.div>
        
        <motion.a
          whileHover={{ scale: 1.1, rotate: [0, -6, 6, 0], transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.92 }}
          href="https://wa.me/6281318562423?text=Halo%20CV%20Abdi%20Hydroulic,%20saya%20ingin%20konsultasi%20rancang%20bangun%20karoseri"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 border-2 border-white ring-4 ring-emerald-500/20 transition-all duration-200"
          title="Chat WhatsApp dengan Tim CV Abdi Hydroulic"
        >
          <svg className="w-7 h-7 fill-slate-950" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-1.111-.07-.265-.084-.606-.195-1.042-.387-1.848-.813-3.047-2.684-3.14-2.809-.093-.125-.751-1.002-.751-1.911 0-.909.477-1.356.646-1.54.17-.184.37-.23.493-.23.125 0 .25.002.359.006.115.004.269-.044.42.321.157.38.536 1.309.584 1.406.048.098.08.213.016.339-.064.127-.096.206-.19.317-.095.111-.2.247-.286.332-.096.095-.196.199-.084.391.112.192.499.823 1.072 1.334.739.659 1.362.863 1.555.959.193.096.306.084.42-.047.114-.131.488-.567.618-.761.13-.194.261-.162.438-.096.177.065 1.124.53 1.317.627.193.096.322.144.37.226.048.082.048.476-.096.881z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.178L2.05 22l4.982-1.308A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.696 0-3.272-.516-4.588-1.399l-.329-.22-2.96.777.79-2.884-.24-.381A8.125 8.125 0 0 1 3.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z"/>
          </svg>
        </motion.a>
      </motion.aside>
    </div>
  );
}
