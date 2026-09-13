import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CORPORATE_CLIENTS } from '../data/companyData';
import { 
  Building2, 
  Search, 
  CheckCircle2, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  MoveRight
} from 'lucide-react';
import CompanyLogoMarquee from './21st/CompanyLogoMarquee';

export default function ClientMatrix() {
  const [searchTerm, setSearchTerm] = useState('');
  const carouselRef = useRef(null);

  const filteredClients = CORPORATE_CLIENTS.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="mitra" className="bg-[#F8FAFC] border-t border-slate-200/90 relative">
      {/* 21st.dev Real Brand SVG Logo Marquee */}
      <CompanyLogoMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-800 text-xs font-sans font-bold mb-3 border border-amber-500/30">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>JARINGAN MITRA RESMI KORPORASI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              21+ Perusahaan Mitra & Klien Terpercaya
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              CV Abdi Hydroulic telah menjalin sinergi berkelanjutan dengan para distributor sasis resmi (ATPM), kontraktor konstruksi, dan operator logistik terkemuka di Indonesia.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama perusahaan atau industri..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-xs"
            />
          </div>
        </motion.div>

        {/* MOBILE VIEW (< sm): Horizontal Swipe Carousel (2-Row Compact Grid) */}
        <div className="block sm:hidden">
          {searchTerm.trim() ? (
            /* If searching on mobile, display in vertical list for quick scan */
            <div className="space-y-2.5">
              <div className="text-xs font-sans text-slate-500 mb-2 px-1">
                Ditemukan <span className="font-bold text-slate-900">{filteredClients.length}</span> mitra sesuai pencarian:
              </div>
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 shrink-0">
                    {client.logo ? (
                      <img src={client.logo} alt={client.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-mono font-bold text-xs text-amber-700">
                        {String(client.id).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-sans font-semibold text-amber-700 uppercase truncate">
                      {client.category}
                    </p>
                    <h4 className="text-xs font-bold text-slate-950 truncate font-sans">
                      {client.name}
                    </h4>
                  </div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            /* Default Mobile: 2-Row Horizontal Swipe Carousel (Compact ~180px height vs 2400px before) */
            <div>
              {/* Carousel Header Nav Controls */}
              <div className="flex items-center justify-between mb-3 px-0.5">
                <div className="flex items-center gap-1.5 text-xs font-sans text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  <span>Geser ke samping (21 Mitra):</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => scrollCarousel('left')}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-transform shadow-2xs"
                    aria-label="Geser ke kiri"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCarousel('right')}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-transform shadow-2xs"
                    aria-label="Geser ke kanan"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2-Row Horizontal Scrolling Track with Snap */}
              <div
                ref={carouselRef}
                className="grid grid-rows-2 grid-flow-col auto-cols-[270px] overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-2.5 pb-2 -mx-4 px-4"
              >
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="snap-start p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 w-[270px] shrink-0"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 shrink-0">
                      {client.logo ? (
                        <img 
                          src={client.logo} 
                          alt={client.name} 
                          className="w-full h-full object-contain" 
                          loading="lazy" 
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-[8px] font-mono text-slate-400 font-medium leading-none">NO</span>
                          <span className="font-mono font-bold text-xs text-amber-700 leading-tight">
                            {String(client.id).padStart(2, '0')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-sans font-semibold text-amber-700 uppercase truncate">
                        {client.category}
                      </p>
                      <h4 className="text-xs font-bold text-slate-950 truncate font-sans">
                        {client.name}
                      </h4>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] font-sans text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>Mitra Resmi</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-sans text-slate-400">
                <MoveRight className="w-3 h-3 text-amber-500 animate-pulse" />
                <span>Geser ke kanan untuk melihat mitra lainnya</span>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP VIEW (sm+): 3-Column Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredClients.map((client) => (
              <motion.div
                layout
                key={client.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                whileHover={{ 
                  y: -3, 
                  transition: { type: 'spring', stiffness: 400, damping: 25 } 
                }}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/50 hover:shadow-lg transition-all duration-200 group flex items-start gap-4 cursor-default shadow-xs"
              >
                {/* Official Registry Badge / Brand Logo */}
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shrink-0 group-hover:border-amber-500/40 transition-colors">
                  {client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[9px] font-mono text-slate-400 font-medium leading-none">NO</span>
                      <span className="font-mono font-black text-xs text-amber-700 leading-tight">
                        {String(client.id).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Company Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-sans font-bold text-amber-700 uppercase tracking-wider">
                    {client.category}
                  </p>
                  <h4 className="text-sm font-bold text-slate-950 tracking-tight mt-0.5 group-hover:text-amber-800 transition-colors truncate font-sans">
                    {client.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] font-sans text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Kemitraan Terverifikasi</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Note from PDF */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-600 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Daftar klien dikutip resmi dari halaman 6 Company Profile CV Abdi Hydroulic.</span>
          </div>
          <span className="text-amber-800 font-bold font-sans tracking-wide">KOMPETISI DALAM USAHA UNTUK MENJADI YANG TERDEPAN</span>
        </motion.div>

      </div>
    </section>
  );
}
