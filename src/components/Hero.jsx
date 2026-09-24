import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO, TELEMETRY_STATS } from '../data/companyData';
import { 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Compass, 
  Gauge, 
  PhoneCall,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  FileText
} from 'lucide-react';
import DecryptedText from './reactbits/DecryptedText';
import CountUp from './reactbits/CountUp';
import ShimmerButton from './21st/ShimmerButton';

export default function Hero({ onExploreCatalog, onOpenPdfModal }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const heroShowcaseList = [
    {
      key: 'paljaya',
      shortLabel: 'PALJAYA DKI',
      index: '01',
      title: 'Truk Tangki Vakum Limbah Perumda PALJAYA',
      badge: 'Armada BUMD Pemprov DKI Jakarta',
      chassis: 'Isuzu Elf NMR Heavy Duty',
      image: '/assets/truck_tangki_paljaya_dkijakarta.jpg',
      specs: 'High Vacuum Suction · Selang Spiral Baja · Katup Pengaman',
      highlight: 'Penyediaan armada sanitasi limbah resmi DKI Jakarta',
    },
    {
      key: 'jict',
      shortLabel: 'JICT PRIOK',
      index: '02',
      title: 'Armada Servis & Mobile Workshop JICT Unit 08',
      badge: 'Terminal Peti Kemas Priok',
      chassis: 'Isuzu Elf NMR 6-Speed Heavy Duty',
      image: '/assets/truck_jict_team_inspection.png',
      specs: 'Mobile Workshop · 4 Outrigger Hidrolik · Hose Reel & Kompresor',
      highlight: 'Inspeksi teknis pelabuhan peti kemas terbesar Indonesia',
    },
    {
      key: 'trailer',
      shortLabel: 'TRAILER BETON',
      index: '03',
      title: 'Trailer Lowbed Angkut Balok Beton Mega Tonase',
      badge: 'Heavy Haulage & Kontraktor',
      chassis: 'Tractor Head Multi-Axle',
      image: '/assets/truck_trailer_heavy_concrete_load.jpg',
      specs: 'Tonase Ekstra Berat · High Tensile Main Beam · Landasan Baja',
      highlight: 'Teruji mengangkut counterweight beton puluhan ton',
    },
    {
      key: 'tipper',
      shortLabel: 'ELF TIPPER',
      index: '04',
      title: 'Isuzu ELF Dump Truck Silinder Hidrolik Ganda',
      badge: 'Mining & Construction Tipper',
      chassis: 'Isuzu Elf 6-Speed Heavy Duty',
      image: '/assets/truck_dump_isuzu_elf_grey.jpg',
      specs: 'Twin Hydraulic Cylinder · Rangka Baja SPHC · Sudut Tumpah 50°',
      highlight: 'Daya angkat cepat & stabil di medan proyek berat',
    },
    {
      key: 'marinir',
      shortLabel: 'TNI MARINIR',
      index: '05',
      title: 'Transporter Tank Tempur Marinir (TNI AL)',
      badge: 'Heavy Trailer Standar Militer',
      chassis: 'Isuzu Giga GVR Tractor Head',
      image: '/assets/truck_trailer_marinir_tank.jpg',
      specs: 'Tonase Ekstra Berat · Winch Hidrolik 30T · Landasan Baja Struktural',
      highlight: 'Teruji membawa unit tempur lapis baja TNI Angkatan Laut',
    },
    {
      key: 'wingbox',
      shortLabel: 'WINGBOX AFNY',
      index: '06',
      title: 'Armada Wingbox AFNY Logistik Indonesia',
      badge: 'Logistik Wingbox Full Hidrolik',
      chassis: 'Isuzu Giga FVM 6x2 Multi-Axle',
      image: '/assets/truck_wingbox_afny.png',
      specs: 'Silinder Hidrolik Ganda · Buka Sayap 20 Detik · Kapasitas 60 m³',
      highlight: 'Dipercaya operator distribusi logistik skala nasional',
    },
  ];

  const currentUnit = heroShowcaseList[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? heroShowcaseList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === heroShowcaseList.length - 1 ? 0 : prev + 1));
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // Custom luxury cubic-bezier
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-[90dvh] pt-8 md:pt-12 pb-20 overflow-hidden bg-[#F8FAFC] flex items-center">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Focused Luxury Copy Stack with Framer Motion Stagger */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6"
          >
            
            {/* 1. Eyebrow */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-500/30 text-xs font-mono font-bold text-amber-700 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>
                  SKT DISHUB: <DecryptedText text={COMPANY_INFO.skKaroseri} speed={30} animateOn="view" className="text-amber-800 font-bold" />
                </span>
              </div>
            </motion.div>

            {/* 2. Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] text-slate-950 leading-[1.12] tracking-tight"
            >
              Spesialis Karoseri & Rekayasa Hidrolik Niaga Berat
            </motion.h1>

            {/* 3. Subtext */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-[54ch]"
            >
              Perakitan karoseri presisi dan sistem hidrolik terintegrasi untuk armada logistik, pertambangan, dan industri sejak 2018 di Bekasi.
            </motion.p>

            {/* 4. Action CTAs with 21st.dev ShimmerButton */}
            <motion.div 
              variants={itemVariants}
              className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
            >
              <ShimmerButton
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Halo%20CV%20Abdi%20Hydroulic,%20saya%20ingin%20konsultasi%20rancang%20bangun%20armada%20karoseri`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>KONSULTASI RANCANG BANGUN</span>
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </span>
              </ShimmerButton>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#katalog"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 border border-slate-200 text-sm font-bold shadow-sm transition-colors"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Eksplorasi 10 Lini Unit</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onOpenPdfModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-amber-50/70 text-slate-800 hover:text-amber-950 border border-slate-200 hover:border-amber-400 text-sm font-bold shadow-sm transition-all group cursor-pointer"
                title="Buka Company Profile Digital (PDF 6 Halaman)"
              >
                <FileText className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Company Profile</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">PDF</span>
              </motion.button>
            </motion.div>

            {/* Quick Micro Technical Indicators */}
            <motion.div 
              variants={itemVariants}
              className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Baja Struktural SNI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Tekanan Hidrolik 250+ Bar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Garansi Silinder Resmi</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Machined Double-Bezel Showcase with 21st.dev BorderBeam */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-slate-200/90 via-white to-slate-200/60 border border-slate-200 shadow-2xl shadow-slate-300/40 backdrop-blur-md overflow-hidden">
              {/* Unit Selector Header Bar */}
              <div className="px-4 py-3 bg-white rounded-t-2xl border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-mono font-bold text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    UNIT AKTUAL
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                    <span className="text-amber-600 font-extrabold">{String(activeIdx + 1).padStart(2, '0')}</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-500">{String(heroShowcaseList.length).padStart(2, '0')}</span>
                    <span className="text-slate-300 mx-0.5">•</span>
                    <span className="text-slate-900 truncate max-w-[180px] sm:max-w-[260px]">
                      {currentUnit.shortLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 hover:text-slate-950 border border-slate-200 flex items-center justify-center transition-all shadow-xs"
                    aria-label="Unit Sebelumnya"
                    title="Unit Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 hover:text-slate-950 border border-slate-200 flex items-center justify-center transition-all shadow-xs"
                    aria-label="Unit Berikutnya"
                    title="Unit Berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Vehicle Display Area with AnimatePresence Crossfade & Quick Chevrons */}
              <div className="relative mt-2 rounded-2xl overflow-hidden bg-slate-900 aspect-[4/3] border border-slate-200 group">
                {/* Floating Left/Right Arrows for Quick Switching on Photo */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all z-20 shadow-lg"
                  aria-label="Foto Sebelumnya"
                  title="Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all z-20 shadow-lg"
                  aria-label="Foto Berikutnya"
                  title="Berikutnya"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentUnit.key}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={currentUnit.image}
                      alt={currentUnit.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Top Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/95 text-amber-700 border border-amber-500/30 backdrop-blur-md shadow-md">
                        {currentUnit.badge}
                      </span>
                    </div>

                    {/* Bottom Technical Overlay */}
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.35 }}
                      className="absolute bottom-0 inset-x-0 p-5 z-10 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-slate-200">
                        <span className="text-amber-400 font-bold">{currentUnit.chassis}</span>
                        <span className="text-white/80">{currentUnit.highlight}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {currentUnit.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-300 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 inline-block backdrop-blur-sm">
                        {currentUnit.specs}
                      </p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 6-Segment Visual Slide Tracker Bar */}
              <div className="grid grid-cols-6 gap-1.5 px-2 mt-2.5">
                {heroShowcaseList.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: activeIdx === i ? '#d97706' : '#e2e8f0',
                    }}
                    title={`Pilih unit ${i + 1}`}
                    aria-label={`Pilih unit ${i + 1}`}
                  />
                ))}
              </div>

              {/* Bottom Telemetry Mini Bar */}
              <div className="px-4 py-2.5 mt-1 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>CV ABDI HYDROULIC · FABRIKASI BEKASI</span>
                <span className="text-amber-700 font-bold">100% HASIL PRODUKSI AKTUAL</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Operational Statistics Matrix with Staggered Scroll Entry */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {TELEMETRY_STATS.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 group"
            >
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold mb-1">
                {item.label}
              </p>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-950 group-hover:text-amber-600 transition-colors">
                <CountUp to={item.value} suffix={item.suffix} prefix={item.prefix || ''} useGrouping={false} />
              </div>
              <p className="text-[11px] font-mono text-slate-500 mt-1">
                {item.subtext}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
