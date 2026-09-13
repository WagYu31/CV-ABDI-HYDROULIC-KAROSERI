import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO, CHASSIS_BRANDS, BODY_TYPES } from '../data/companyData';
import { useSiteData } from '../context/SiteDataContext';
import { 
  Calculator, 
  Send, 
  Check, 
  Truck, 
  Layers, 
  Weight, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import SpotlightCard from './reactbits/SpotlightCard';

const BODY_IMAGE_MAP = {
  'Wingbox Full Hidrolik': {
    image: '/assets/truck_wingbox_afny.png',
    name: 'Wingbox Hidrolik AFNY / PERSADA',
    tag: 'Logistik & Kargo Cepat',
  },
  'Heavy Dump Truck (Tipper)': {
    image: '/assets/truck_dump_isuzu_elf_grey.jpg',
    name: 'Isuzu Elf Tipper Hidrolik Ganda',
    tag: 'Pertambangan & Konstruksi',
  },
  'Self Loader / Carrier Sepeda Motor': {
    image: '/assets/truck_carrier_motor_1.jpg',
    name: 'Carrier Motor 2 Tingkat Hidrolik',
    tag: 'Distribusi Otomotif Roda 2',
  },
  'Trailer & Lowbed Alat Berat': {
    image: '/assets/truck_trailer_heavy_concrete_load.jpg',
    name: 'Multi-Axle Heavy Concrete Trailer',
    tag: 'Mobilisasi Alat Berat',
  },
  'Arm Roll Pengangkut Kontainer': {
    image: '/assets/truck_armroll_dlh_malang_side.jpg',
    name: 'Arm Roll Hooklift - DLH Kab. Malang',
    tag: 'Sanitasi & Pengelolaan Sampah/B3',
  },
  'Derek & Flatbed Towing Hidrolik': {
    image: '/assets/truck_towing_dishub_samarinda.jpg',
    name: 'DISHUB Samarinda Rescue Towing',
    tag: 'Towing Gendong & Rescue Dishub',
  },
  'Truk Tangki (Air / BBM / CPO / Kimia)': {
    image: '/assets/truck_tangki_paljaya_dkijakarta.jpg',
    name: 'Perumda PALJAYA Vacuum Tank',
    tag: 'Tangki Vakum & Cairan Industri',
  },
  'Sky Lift Aerial Boom Platform': {
    image: '/assets/truck_skylift_scissor_platform.png',
    name: 'Scissor Lift Canopy Platform',
    tag: 'Platform Kerja Ketinggian',
  },
  'Platform / Flatbed Kargo Khusus': {
    image: '/assets/truck_utility_jict_container.jpg',
    name: 'JICT Port Container Service Truck',
    tag: 'Utilitas Pelabuhan & Terminal Kontainer',
  },
  'Custom Vehicle Karoseri Khusus': {
    image: '/assets/truck_jict_team_inspection.png',
    name: 'JICT Inspection & Service Unit 08',
    tag: 'Rancang Bangun Khusus Spesifik',
  },
};

const CHASSIS_SUBTITLES = {
  'Isuzu Giga / Elf': 'Light & Heavy Duty Sasis',
  'Hino Ranger / Dutro': 'Platform Niaga Ekspedisi',
  'Mitsubishi Fuso / Canter': 'Colt Diesel & Fighter',
  'Tata Motors Prima / Ultra': 'Heavy Haulage Commercial',
  'Mercedes-Benz Axor': 'Heavy Rigid & Tractor Head',
  'UD Trucks Quester / Kuzer': 'Heavy Duty Hauling',
};

const CAPACITY_OPTIONS = [
  {
    id: 'light',
    label: '5 - 8 Ton',
    detail: 'Light Duty / Engkel 4-6 Roda',
    subtext: 'Ideal untuk distribusi kargo perkotaan & armada ringan',
    category: 'LIGHT DUTY',
  },
  {
    id: 'medium',
    label: '10 - 16 Ton',
    detail: 'Medium Duty 6 Roda',
    subtext: 'Optimal untuk wingbox logistik & dump truck sedang',
    category: 'MEDIUM DUTY',
  },
  {
    id: 'heavy',
    label: '18 - 26 Ton',
    detail: 'Heavy Duty 6x2 / 6x4',
    subtext: 'Rekomendasi angkutan beban berat & dump truck tambang',
    category: 'HEAVY DUTY',
  },
  {
    id: 'extreme',
    label: '30 - 60 Ton',
    detail: 'Tronton / Tractor Head / Lowbed Multi-Axle',
    subtext: 'Spesifikasi angkutan trailer & mobilisasi alat berat kontainer',
    category: 'EXTREME DUTY',
  },
];

const OPTIONAL_FEATURES = [
  {
    name: 'PTO (Power Take-Off) Heavy Duty',
    desc: 'Penyalur tenaga mekanis langsung dari transmisi sasis',
    standard: 'Standar OEM',
  },
  {
    name: 'Cat Polyurethane Anti-Gores & Sandblasting',
    desc: 'Pelapisan primer epoxy & PU tahan korosi kimia/garam 5+ tahun',
    standard: 'Standar Marine/PU',
  },
  {
    name: 'Silinder Hidrolik Multi-Stage Import Grade',
    desc: 'Piston rod hard chrome plated dengan batas tekanan 250+ Bar',
    standard: 'Uji Tekanan 250 Bar',
  },
  {
    name: 'Wireless Remote Controller Sistem',
    desc: 'Operasional hidrolik tanpa kabel dengan respon instan',
    standard: 'Radio Frequency 433MHz',
  },
  {
    name: 'Safety Valve & Check Valve Anti-Turun Mendadak',
    desc: 'Pengunci aliran fluida otomatis saat terjadi penurunan tekanan jalur pipa',
    standard: 'Burst-Proof Safety',
  },
  {
    name: 'Baja Anti Abrasi (Hardox Plate)',
    desc: 'Plat dasar tahan benturan dan gesekan material batu/bijih tambang',
    standard: 'Hardox Abrasion-Resistant',
  },
];

export default function FleetConfigurator() {
  const { submitInquiry, companyInfo } = useSiteData();
  const [selectedChassis, setSelectedChassis] = useState(CHASSIS_BRANDS[0]);
  const [selectedBody, setSelectedBody] = useState(BODY_TYPES[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(CAPACITY_OPTIONS[1].label + ' (' + CAPACITY_OPTIONS[1].detail + ')');
  const [features, setFeatures] = useState([
    'PTO (Power Take-Off) Heavy Duty',
    'Cat Polyurethane Anti-Gores & Sandblasting',
  ]);
  const [notes, setNotes] = useState('');

  const toggleFeature = (featureName) => {
    if (features.includes(featureName)) {
      setFeatures(features.filter((f) => f !== featureName));
    } else {
      setFeatures([...features, featureName]);
    }
  };

  const handleSendToWhatsApp = () => {
    // Log inquiry to Admin backend / local cache
    submitInquiry({
      name: 'Calon Klien Konfigurator',
      company: '-',
      phone: '-',
      category: selectedBody,
      chassis: `${selectedChassis} • ${selectedCapacity}`,
      message: `Fitur Tambahan: ${features.join(', ') || 'Standar'}.${notes ? ` Catatan: ${notes}` : ''}`,
      source: 'Konfigurator Rekayasa Armada',
    });
  };

  const generateWhatsAppUrl = () => {
    const text = `*FORMULIR SPESIFIKASI TEKNIS REKAYASA KAROSERI & HIDROLIK*
*CV ABDI HYDROULIC - DOKUMEN QMS-SPEC-2026*
------------------------------------------------
1. BASIS SASIS KENDARAAN:
   ${selectedChassis}

2. MODEL KAROSERI & HIDROLIK:
   ${selectedBody}

3. KAPASITAS MUATAN (SWL):
   ${selectedCapacity}

4. SPESIFIKASI FITUR HIDROLIK & BAHAN:
${features.length > 0 ? features.map((f) => `   ✓ ${f}`).join('\n') : '   - Standar Spesifikasi Pabrik'}

${notes ? `5. CATATAN TEKNIS / DIMENSI KHUSUS:\n   "${notes}"\n` : ''}------------------------------------------------
*Kepatuhan Mutu:* ISO 9001:2015 & Terdaftar DISHUB RI No. 1813/HUB.02.15.05.
Mohon estimasi biaya fabrikasi, waktu pengerjaan, dan rancangan gambar teknik awal. Terima kasih.`;

    const targetPhone = (companyInfo && companyInfo.phone) ? companyInfo.phone.replace(/[^0-9]/g, '') : COMPANY_INFO.whatsappNumber;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
  };

  const currentVehicle = BODY_IMAGE_MAP[selectedBody] || BODY_IMAGE_MAP['Wingbox Full Hidrolik'];

  return (
    <section id="konfigurator" className="py-20 sm:py-28 bg-[#F8FAFC] border-t border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Clean ISO 9001 Specification Standard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-800 text-xs font-sans font-bold mb-3 border border-amber-500/30 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>STANDARISASI SPESIFIKASI & ESTIMASI TEKNIS ISO 9001:2015</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-950 tracking-tight">
            Konfigurator Rekayasa Armada
          </h2>
          <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            Sesuaikan sasis komersial, tipe karoseri, kapasitas angkut aman (SWL), serta fitur hidrolik presisi. Divalidasi langsung oleh tim insinyur bengkel sesuai regulasi SKRB Ditjen Hubdat Kemenhub RI.
          </p>
        </motion.div>

        {/* 2-Column Interface: Controls (Left) & Sticky Engineering Sheet (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Columns on Desktop) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* TAHAP 01: Basis Sasis Truk */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3.5 mb-4 sm:mb-5 pb-3.5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 font-mono font-bold text-xs shrink-0 mt-0.5">
                  01
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-slate-950 flex items-center gap-2">
                    Basis Sasis & Kelas Kendaraan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
                    Pilih platform sasis komersial yang akan dipasangi konstruksi karoseri
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {CHASSIS_BRANDS.map((chassis) => {
                  const isSelected = selectedChassis === chassis;
                  return (
                    <motion.button
                      key={chassis}
                      type="button"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedChassis(chassis)}
                      className={`p-3 sm:p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between min-h-[72px] ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-amber-500/30'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 w-full">
                        <span className={`font-sans font-bold text-xs sm:text-sm leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {chassis}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[11px] font-sans mt-1.5 block ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {CHASSIS_SUBTITLES[chassis] || 'Platform Komersial'}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* TAHAP 02: Model Karoseri & Rekayasa Hidrolik */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3.5 mb-4 sm:mb-5 pb-3.5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 font-mono font-bold text-xs shrink-0 mt-0.5">
                  02
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-slate-950 flex items-center gap-2">
                    Model Karoseri & Tipe Rekayasa
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
                    Konstruksi dirancang sesuai fungsi operasional dan standar keselamatan Ditjen Hubdat
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {BODY_TYPES.map((b) => {
                  const isSelected = selectedBody === b;
                  const itemTag = BODY_IMAGE_MAP[b]?.tag || 'Fabrikasi Rekayasa';
                  return (
                    <motion.button
                      key={b}
                      type="button"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedBody(b)}
                      className={`p-3 sm:p-3.5 rounded-xl text-left transition-all border flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-amber-500/30'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-xs'
                      }`}
                    >
                      <div className="min-w-0 pr-1">
                        <span className={`block font-sans font-bold text-xs sm:text-sm leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {b}
                        </span>
                        <span className={`text-[11px] font-sans mt-0.5 block truncate ${isSelected ? 'text-amber-400 font-medium' : 'text-slate-500'}`}>
                          {itemTag}
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected 
                          ? 'bg-amber-500 border-amber-500 text-slate-950' 
                          : 'border-slate-300 bg-slate-50 text-transparent'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* TAHAP 03: Kapasitas Beban (Safe Working Load / SWL) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3.5 mb-4 sm:mb-5 pb-3.5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 font-mono font-bold text-xs shrink-0 mt-0.5">
                  03
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-slate-950 flex items-center gap-2">
                    Kapasitas Angkut Aman (Safe Working Load / SWL)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
                    Kalkulasi daya dukung sumbu gandar sasis dan distribusi berat kendaraan
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {CAPACITY_OPTIONS.map((opt) => {
                  const optString = opt.label + ' (' + opt.detail + ')';
                  const isSelected = selectedCapacity === optString;
                  return (
                    <motion.button
                      key={opt.id}
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCapacity(optString)}
                      className={`w-full p-3 sm:p-4 rounded-xl text-left transition-all border flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-amber-500/30'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-sans font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {opt.label}
                            </span>
                            <span className={`text-xs font-sans font-semibold ${isSelected ? 'text-amber-400' : 'text-slate-700'}`}>
                              • {opt.detail}
                            </span>
                          </div>
                          <p className={`text-xs font-sans mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {opt.subtext}
                          </p>
                        </div>
                      </div>

                      <div className="self-end sm:self-center shrink-0">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {opt.category}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* TAHAP 04: Fitur Spesifikasi Sistem Hidrolik Standar ISO */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3.5 mb-4 sm:mb-5 pb-3.5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 font-mono font-bold text-xs shrink-0 mt-0.5">
                  04
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-slate-950 flex items-center gap-2">
                    Spesifikasi Sistem Hidrolik & Standar Mutu Bahan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
                    Opsi komponen bertekanan tinggi 250+ Bar dengan pengujian anti-bocor dan perlindungan abrasi
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {OPTIONAL_FEATURES.map((feat) => {
                  const checked = features.includes(feat.name);
                  return (
                    <motion.button
                      key={feat.name}
                      type="button"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleFeature(feat.name)}
                      className={`p-3.5 rounded-xl text-left transition-all border flex items-start gap-3 ${
                        checked
                          ? 'bg-amber-500/10 border-amber-500/80 text-slate-900 shadow-sm ring-1 ring-amber-500/30'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 shadow-xs'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                        checked 
                          ? 'bg-amber-500 text-slate-950 border-amber-500' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-sans font-bold text-xs sm:text-sm text-slate-950 leading-snug">
                            {feat.name}
                          </span>
                        </div>
                        <p className="text-[11px] font-sans text-slate-500 mt-1 leading-relaxed">
                          {feat.desc}
                        </p>
                        <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          checked ? 'bg-amber-500/20 text-amber-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {feat.standard}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Right Live Summary Column (5 Columns on Desktop, Sticky Top) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <SpotlightCard
                spotlightColor="rgba(217, 119, 6, 0.12)"
                className="p-5 sm:p-7 bg-white border border-slate-200 text-left shadow-xl rounded-2xl relative overflow-hidden"
              >
                {/* ISO Technical Document Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-wider">
                        DOKUMEN SPESIFIKASI MUTU
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        • QMS-SPEC-2026
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-extrabold text-slate-950 tracking-tight">
                      Ringkasan Rancang Bangun
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-sans font-bold shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SIAP DIVALIDASI</span>
                  </div>
                </div>

                {/* Real Production Vehicle Showcase - Full View without Cropping */}
                <div className="relative my-4 rounded-xl overflow-hidden h-64 sm:h-72 bg-slate-950 border border-slate-200/80 shadow-md z-10 group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedBody}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full relative flex items-center justify-center"
                    >
                      {/* Ambient Blurred Backdrop (Matches image colors seamlessly) */}
                      <img
                        src={currentVehicle.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-35 select-none pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-slate-950/60" />

                      {/* Foreground Real Vehicle Image - 100% Intact without Cropping */}
                      <img
                        src={currentVehicle.image}
                        alt={selectedBody}
                        className="relative z-10 w-full h-full object-contain p-2 pb-14 drop-shadow-xl select-none"
                      />
                      
                      {/* Bottom Info Bar Overlay */}
                      <div className="absolute bottom-0 inset-x-0 z-20 p-3 sm:p-3.5 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-white font-sans font-bold text-xs sm:text-sm block truncate drop-shadow-sm">
                            {currentVehicle.name}
                          </span>
                          <span className="text-amber-400 font-sans text-[11px] font-medium block drop-shadow-sm">
                            {currentVehicle.tag}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[10px] font-mono font-bold shrink-0 shadow-sm">
                          UNIT RIIL BENGKEL
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Technical Parameters Readout (Clean Form Table) */}
                <div className="py-2 space-y-3 relative z-10 font-sans text-xs">
                  
                  {/* Parameter 1 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                      01. BASIS SASIS KENDARAAN:
                    </span>
                    <motion.span 
                      key={selectedChassis}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-sans font-bold text-slate-950 mt-1 block"
                    >
                      {selectedChassis}
                    </motion.span>
                  </div>

                  {/* Parameter 2 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                      02. MODEL KAROSERI & HIDROLIK:
                    </span>
                    <motion.span 
                      key={selectedBody}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-sans font-bold text-amber-700 mt-1 block"
                    >
                      {selectedBody}
                    </motion.span>
                  </div>

                  {/* Parameter 3 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider block">
                      03. KAPASITAS ANGKUT (SWL):
                    </span>
                    <motion.span 
                      key={selectedCapacity}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-sans font-bold text-slate-900 mt-1 block"
                    >
                      {selectedCapacity}
                    </motion.span>
                  </div>

                  {/* Parameter 4: Hydraulic Features Checklist */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                      04. OPSI HIDROLIK & STANDAR MUTU:
                    </span>
                    {features.length > 0 ? (
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="font-sans font-medium text-slate-800">{f}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-400 italic text-xs font-sans">
                        Konfigurasi Standar Pabrikasi
                      </span>
                    )}
                  </div>

                </div>

                {/* ISO & DISHUB Quality Assurance Badges */}
                <div className="my-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1.5 relative z-10">
                  <div className="flex items-center gap-2 text-xs font-sans font-semibold text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Jaminan Mutu Fabrikasi & Regulasi:</span>
                  </div>
                  <ul className="text-[11px] font-sans text-slate-600 space-y-1 pl-6 list-disc">
                    <li>Kesesuaian Uji Tipe Rancang Bangun (SKRB) Kemenhub</li>
                    <li>Silinder Hidrolik Teruji Tekanan Bebas Bocor 250+ Bar</li>
                    <li>Sertifikat Garansi Resmi CV Abdi Hydroulic</li>
                  </ul>
                </div>

                {/* Notes Input Area */}
                <div className="pt-1 pb-4 relative z-10">
                  <label className="text-xs font-sans font-bold text-slate-700 block mb-1.5">
                    Catatan Kebutuhan Khusus / Dimensi Bak (Opsional):
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contoh: Panjang bak 8.5 meter, kebutuhan pengurusan KIR/SKRB, warna cat biru armada..."
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none shadow-2xs"
                  />
                </div>

                {/* High-Impact WhatsApp CTA Button */}
                <div className="relative z-10">
                  <motion.a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleSendToWhatsApp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-sans font-bold text-sm tracking-wide shadow-xl shadow-slate-950/20 border border-amber-500/40 flex items-center justify-center gap-2.5 transition-all text-center cursor-pointer group"
                  >
                    <Send className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    <span>KIRIM SPESIFIKASI KE WHATSAPP</span>
                  </motion.a>
                </div>

                <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[11px] font-sans text-slate-500 text-center relative z-10">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Ditinjau langsung oleh Kepala Bengkel & Tim Engineering CV Abdi Hydroulic</span>
                </div>

              </SpotlightCard>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
