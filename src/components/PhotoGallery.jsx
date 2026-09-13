import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Building2,
  Anchor,
  Box,
  Truck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryItems = [
    {
      id: 1,
      title: 'Truk Tangki Vakum Limbah - Perumda PALJAYA (Pemprov DKI Jakarta)',
      category: 'Sanitasi & BUMD DKI',
      group: 'gov',
      src: '/assets/truck_tangki_paljaya_dkijakarta.jpg',
      desc: 'Unit tangki sedot vakum terpadu yang diproduksi untuk Perumda PALJAYA (Pemprov DKI Jakarta), dilengkapi kompartemen selang, sistem pompa vakum tekanan tinggi, dan pintu inspeksi hidrolik.',
    },
    {
      id: 2,
      title: 'Trailer Lowbed Multi-Axle Angkutan Balok Beton Mega Tonase',
      category: 'Heavy Haulage Kontraktor',
      group: 'port',
      src: '/assets/truck_trailer_heavy_concrete_load.jpg',
      desc: 'Trailer platform lowbed multi-axle berkapasitas ekstra berat mengangkut balok beton pemberat (counterweight) puluhan ton di medan proyek infrastruktur.',
    },
    {
      id: 3,
      title: 'Serah Terima & Tim Inspeksi Teknis Lapangan JICT Unit 08',
      category: 'Komisioning Pelabuhan Priok',
      group: 'port',
      src: '/assets/truck_jict_team_inspection.png',
      desc: 'Dokumentasi penyerahan unit servis karoseri 08 bersama tim insinyur dan operator Jakarta International Container Terminal (JICT Tanjung Priok).',
    },
    {
      id: 4,
      title: 'Isuzu ELF Dump Truck Silinder Hidrolik Ganda',
      category: 'Mining & Light Tipper',
      group: 'mining',
      src: '/assets/truck_dump_isuzu_elf_grey.jpg',
      desc: 'Unit dump truck kompak sasis Isuzu Elf 6-Speed dengan bak abu-abu kokoh dan silinder hidrolik ganda terpasang siap operasional proyek.',
    },
    {
      id: 5,
      title: 'Armada Utilitas & Servis Jakarta International Container Terminal (JICT)',
      category: 'Port Utility & Maintenance',
      group: 'port',
      src: '/assets/truck_utility_jict_container.jpg',
      desc: 'Unit Isuzu ELF NMR perakitan khusus operasional pelabuhan peti kemas terbesar Indonesia (JICT Tanjung Priok), dilengkapi instalasi kompresor, hose reel, dan kabin servis keliling.',
    },
    {
      id: 6,
      title: 'Sky Lift / Scissor Lift Platform Hidrolik Berkanopi',
      category: 'Aerial Scissor Lift',
      group: 'mining',
      src: '/assets/truck_skylift_scissor_platform.png',
      desc: 'Platform kerja ketinggian multi-stage scissor hidrolik lengkap dengan deck berkanopi pelindung dan 4 titik kaki outrigger hidrolik penopang sasis Isuzu Elf.',
    },
    {
      id: 7,
      title: 'Heavy Dump Trailer 3-Axle Orange (Vessel Hopper)',
      category: 'Mining & Heavy Dump',
      group: 'mining',
      src: '/assets/truck_dump_trailer_orange.jpg',
      desc: 'Vessel dump trailer 3-axle kapasitas tonase ekstra besar dengan finishing cat industri oranye cerah dan mekanisme hidrolik penumpah bertekanan tinggi.',
    },
    {
      id: 8,
      title: 'Armada Wingbox PERSADA Livery Full Hidrolik',
      category: 'Wingbox Kargo Logistik',
      group: 'wingbox',
      src: '/assets/truck_wingbox_persada.png',
      desc: 'Unit wingbox multi-axle siap serah terima dengan custom livery PERSADA, pintu sayap hidrolik sinkron, dan sistem engsel heavy-duty.',
    },
    {
      id: 9,
      title: 'Isuzu GIGA FVM Wingbox Sayap Buka Otomatis',
      category: 'Fabrikasi Karoseri Wingbox',
      group: 'wingbox',
      src: '/assets/truck_wingbox_isuzu_giga.jpg',
      desc: 'Perakitan dinding sayap aluminium corrugated ringan dengan struktur rangka baja berkekuatan tinggi di workshop CV Abdi Hydroulic Setu.',
    },
    {
      id: 10,
      title: 'Armada Wingbox AFNY Logistik Indonesia',
      category: 'Logistik Wingbox Nasional',
      group: 'wingbox',
      src: '/assets/truck_wingbox_afny.png',
      desc: 'Unit wingbox operasional ekspedisi AFNY dengan sistem hidrolik sayap buka cepat 20 detik untuk efisiensi bongkar muat kargo antar-kota.',
    },
    {
      id: 11,
      title: 'Transporter Alat Berat & Tank Lapis Baja TNI Marinir',
      category: 'Heavy Trailer Militer (TNI)',
      group: 'gov',
      src: '/assets/truck_trailer_marinir_tank.jpg',
      desc: 'Tractor head Isuzu Giga GVR modifikasi khusus untuk mengangkut tank tempur Marinir dengan winch hidrolik kapasitas ekstra berat.',
    },
    {
      id: 12,
      title: 'Mobil Derek Towing Resmi DISHUB Samarinda',
      category: 'Penyelamatan & Derek Jalan',
      group: 'gov',
      src: '/assets/truck_towing_dishub_samarinda.jpg',
      desc: 'Armada derek hidrolik resmi Dinas Perhubungan (DISHUB Samarinda) dengan mekanisme under-lift penarik roda dan boom pengangkat darurat.',
    },
    {
      id: 13,
      title: 'Carrier Sepeda Motor 2 Tingkat (Double Decker)',
      category: 'Car & Bike Carrier',
      group: 'wingbox',
      src: '/assets/truck_carrier_motor_1.jpg',
      desc: 'Konstruksi carrier bertingkat dengan lantai hidrolik lowering-deck untuk pengiriman unit motor baru antar-dealer tanpa risiko gores.',
    },
  ];

  const filterTabs = [
    { key: 'all', label: 'Semua Armada', count: galleryItems.length },
    { key: 'gov', label: 'Pemerintahan & BUMD', count: galleryItems.filter(i => i.group === 'gov').length },
    { key: 'port', label: 'Pelabuhan & Trailer', count: galleryItems.filter(i => i.group === 'port').length },
    { key: 'wingbox', label: 'Wingbox & Logistik', count: galleryItems.filter(i => i.group === 'wingbox').length },
    { key: 'mining', label: 'Tipper & Scissor Lift', count: galleryItems.filter(i => i.group === 'mining').length },
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.group === activeFilter);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((e) => {
    if (!activePhoto) return;
    if (e.key === 'Escape') setActivePhoto(null);
    if (e.key === 'ArrowRight') {
      const currentIdx = filteredItems.findIndex(i => i.id === activePhoto.id);
      const nextIdx = (currentIdx + 1) % filteredItems.length;
      setActivePhoto(filteredItems[nextIdx]);
    }
    if (e.key === 'ArrowLeft') {
      const currentIdx = filteredItems.findIndex(i => i.id === activePhoto.id);
      const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
      setActivePhoto(filteredItems[prevIdx]);
    }
  }, [activePhoto, filteredItems]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    const currentIdx = filteredItems.findIndex(i => i.id === activePhoto.id);
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setActivePhoto(filteredItems[nextIdx]);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    const currentIdx = filteredItems.findIndex(i => i.id === activePhoto.id);
    const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
    setActivePhoto(filteredItems[prevIdx]);
  };

  return (
    <section id="galeri" className="py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold text-amber-700 mb-3 shadow-sm">
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              100% DOKUMENTASI UNIT AKTUAL LAPANGAN
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Galeri Portofolio Unit Karoseri Selesai
            </h2>
            <p className="mt-3 text-slate-600 text-base leading-relaxed font-sans">
              Seluruh dokumentasi visual merupakan hasil fabrikasi riil CV Abdi Hydroulic yang beroperasi aktif di BUMD DKI Jakarta, Pelabuhan Tanjung Priok, Marinir TNI, hingga ekspedisi logistik nasional.
            </p>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors z-10 ${
                activeFilter === tab.key
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-950 bg-white border border-slate-200 shadow-sm'
              }`}
            >
              {activeFilter === tab.key && (
                <motion.div
                  layoutId="activeGalleryTab"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-slate-950 rounded-xl -z-10 shadow-md"
                />
              )}
              <span>{tab.label}</span>
              <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] ${
                activeFilter === tab.key
                  ? 'bg-amber-500/30 text-amber-300'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.015,
                  transition: { type: 'spring', stiffness: 350, damping: 25 } 
                }}
                onClick={() => setActivePhoto(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 hover:border-amber-500/40 hover:shadow-2xl transition-colors duration-200 cursor-pointer aspect-[4/3] shadow-md"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/95 text-amber-800 border border-amber-500/30 shadow-md backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-2.5 rounded-full bg-slate-950 text-amber-400 shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                  <h4 className="text-base font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 font-sans">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal with Full Details & Next/Prev Controls */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActivePhoto(null)}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 sm:left-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md hidden sm:flex items-center justify-center"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 sm:right-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md hidden sm:flex items-center justify-center"
              aria-label="Foto Berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-700 font-bold uppercase">
                      {activePhoto.category}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-mono text-emerald-700 font-bold">
                      DOKUMENTASI RIIL
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 font-sans">
                    {activePhoto.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed font-sans">
                    {activePhoto.desc}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <div className="text-xs font-mono text-slate-500">
                    {filteredItems.findIndex(i => i.id === activePhoto.id) + 1} / {filteredItems.length}
                  </div>
                  <div className="flex items-center gap-2 sm:mt-2">
                    <button
                      onClick={handlePrevPhoto}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 sm:hidden"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 sm:hidden"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
