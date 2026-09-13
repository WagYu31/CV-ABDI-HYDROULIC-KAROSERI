import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/companyData';
import { PhoneCall, Menu, X, ChevronRight } from 'lucide-react';
import DecryptedText from './reactbits/DecryptedText';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ringkasan', href: '#hero' },
    { label: 'Legalitas DISHUB', href: '#legalitas' },
    { label: 'Katalog Unit', href: '#katalog' },
    { label: 'Konfigurator', href: '#konfigurator' },
    { label: 'Mitra Korporasi', href: '#mitra' },
    { label: 'Workshop & Maps', href: '#kontak' },
  ];

  return (
    <>
      {/* 1. Architectural Telemetry Top Banner (Luxury Obsidian & Gold Bar) */}
      <div className="w-full bg-[#0B0F17] border-b border-white/10 py-2 px-4 text-[11px] font-mono text-slate-300 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              STATUS OPERASIONAL: BENGKEL AKTIF
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-300">
              NO. SKT KAROSERI: <span className="text-amber-400 font-bold">{COMPANY_INFO.skKaroseri}</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">
              LOKASI FABRIKASI: SETU, KAB. BEKASI
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="hover:text-amber-400 transition-colors text-slate-300"
            >
              {COMPANY_INFO.email}
            </a>
            <span className="text-white/20">|</span>
            <a 
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline inline-flex items-center gap-1.5 font-bold"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              {COMPANY_INFO.phoneFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Floating Island Header in Luxury Light Mode */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 py-3 shadow-xl shadow-slate-900/5' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Mark */}
          <motion.a 
            href="#hero" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center p-0.5 shadow-md shadow-slate-900/10 group-hover:scale-105 group-hover:border-amber-500/50 transition-all duration-300 overflow-hidden">
              <img
                src="/assets/abdi_hydroulic_logo.png"
                alt="CV Abdi Hydroulic Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg md:text-xl tracking-tight text-slate-950 group-hover:text-amber-600 transition-colors">
                  CV ABDI HYDROULIC
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider uppercase">
                ENGINEERING & KAROSERI BEKASI
              </p>
            </div>
          </motion.a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/90 p-1.5 rounded-full border border-slate-200 shadow-sm backdrop-blur-md">
            {navLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-all duration-200"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>


          {/* Mobile Hamburger Toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 shadow-sm transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Drawer Overlay with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-3">
              <div className="text-xs font-mono text-amber-600 font-bold mb-4 pb-2 border-b border-slate-200">
                MENU OPERASIONAL
              </div>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-base font-bold text-slate-800 hover:text-amber-600 border-b border-slate-100"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="pt-6 space-y-3 border-t border-slate-200"
            >

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Halo%20CV%20Abdi%20Hydroulic`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-center text-sm font-bold bg-slate-950 text-white flex items-center justify-center gap-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                Hubungi WhatsApp Teknisi
              </a>

              <p className="text-center text-[11px] font-mono text-slate-500 pt-2">
                SKT DISHUB: {COMPANY_INFO.skKaroseri}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
