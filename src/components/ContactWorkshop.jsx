import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/companyData';
import { useSiteData } from '../context/SiteDataContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ExternalLink, 
  Building, 
  Wrench,
  Navigation,
  Copy,
  Check,
  Compass,
  ShieldCheck,
  Truck,
  Star,
  MessageSquare,
  Bookmark,
  Share2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import SpotlightCard from './reactbits/SpotlightCard';

export default function ContactWorkshop() {
  const [activeMapTab, setActiveMapTab] = useState('workshop'); // 'workshop' or 'office'
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    vehicleType: 'Wingbox Full Hidrolik',
    message: '',
  });

  const locationsData = {
    workshop: {
      id: 'workshop',
      title: 'Workshop & Pabrik Perakitan Karoseri',
      businessName: COMPANY_INFO.googleBusiness.name,
      badge: 'LOKASI FABRIKASI & PRODUKSI',
      address: COMPANY_INFO.googleBusiness.address,
      hours: COMPANY_INFO.locations.workshop.operationalHours,
      coordinates: '6°20\'53.5"S 107°03\'13.7"E',
      gmapsQuery: 'Cv.abdi+hidrolik+karoseri',
      gmapsNavUrl: COMPANY_INFO.googleBusiness.mapsUrl,
      reviewsUrl: COMPANY_INFO.googleBusiness.reviewsUrl,
      embedUrl: COMPANY_INFO.googleBusiness.embedUrl,
      rating: COMPANY_INFO.googleBusiness.rating,
      reviewCount: COMPANY_INFO.googleBusiness.reviewCount,
      category: COMPANY_INFO.googleBusiness.category,
      phone: COMPANY_INFO.phoneFormatted,
      statusJam: 'Buka 24 Jam',
      specs: [
        'Akses Jalan Kontainer & Trailer 40 Feet',
        'Area Perakitan Luas & Crane Overhead 10T',
        'Hydrostatic Pressure Test Bench 250+ Bar',
        'Fasilitas Sandblasting & Spray Painting Oven',
      ],
      picContact: `${COMPANY_INFO.phoneFormatted} (Bpk. Darul Pramarta)`,
    },
    office: {
      id: 'office',
      title: 'Kantor Administrasi, Legalitas & Sales',
      businessName: 'CV ABDI HYDROULIC (Office)',
      badge: 'KANTOR PUSAT & DOKUMEN',
      address: COMPANY_INFO.locations.office.address,
      hours: COMPANY_INFO.locations.office.operationalHours,
      coordinates: '6°19\'17.0"S 106°59\'39.1"E',
      gmapsQuery: 'Jl.+Distribusi+No.+5+Komp.+PDK+Ciketing+Udik+Bantar+Gebang+Bekasi',
      gmapsNavUrl: COMPANY_INFO.locations.office.gmapsUrl,
      embedUrl: 'https://maps.google.com/maps?q=Jl.+Distribusi+No.+5+Komp.+PDK+Bantar+Gebang+Bekasi&t=&z=15&ie=UTF8&iwloc=&output=embed',
      specs: [
        'Pengurusan Sertifikasi Rancang Bangun (SKRB)',
        'Penerbitan Invoice & Faktur Resmi Perusahaan',
        'Konsultasi Kontrak Pengadaan Armada Skala Besar',
        'Meeting Room untuk Klien Korporasi & Dealer',
      ],
      picContact: `${COMPANY_INFO.phoneFormatted} (Administrasi Fleet)`,
    },
  };

  const activeLoc = locationsData[activeMapTab];

  const { submitInquiry, companyInfo } = useSiteData();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activeLoc.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log inquiry to Admin backend / local cache
    submitInquiry({
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      category: formData.vehicleType,
      message: formData.message,
      source: 'Formulir Konsultasi Website',
    });

    const text = `*PESAN INQUIRY DARI WEBSITE CV ABDI HYDROULIC*
------------------------------------------------
*Nama:* ${formData.name}
*Perusahaan:* ${formData.company || '-'}
*No. WhatsApp/Tel:* ${formData.phone}
*Kebutuhan Karoseri:* ${formData.vehicleType}
*Detail Pesan:*
${formData.message}
------------------------------------------------`;

    const targetPhone = (companyInfo && companyInfo.phone) ? companyInfo.phone.replace(/[^0-9]/g, '') : COMPANY_INFO.whatsappNumber;
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="kontak" className="py-24 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 text-xs font-mono font-bold mb-3 border border-amber-500/30">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              LOKASI FASILITAS & KOMUNIKASI RESMI
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Kunjungi Workshop Kami atau Hubungi Tim Teknis
            </h2>
            <p className="mt-3 text-slate-600 text-base leading-relaxed font-sans">
              Kami mengundang survei langsung calon klien ke workshop perakitan di Setu, Bekasi untuk meninjau kapasitas bengkel, kualitas pengelasan, dan sistem hidrolik.
            </p>
          </div>

          {/* Google Official Rating Badge */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={COMPANY_INFO.googleBusiness.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-amber-500/40 shadow-sm flex items-center gap-3 self-start md:self-auto group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-slate-950 text-sm">4,8</span>
                <div className="flex text-amber-500 text-xs">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  (17 Ulasan)
                </span>
              </div>
              <p className="text-[11px] text-blue-600 font-mono font-semibold group-hover:underline flex items-center gap-1 mt-0.5">
                <span>Google Business Profile</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </p>
            </div>
          </motion.a>
        </motion.div>

        {/* 1. INTERACTIVE GOOGLE MAPS PLATFORM WITH EXACT PIN & REVIEWS INTEGRATION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 rounded-3xl p-2 bg-gradient-to-b from-slate-200/90 via-white to-slate-200/50 border border-slate-200 shadow-2xl shadow-slate-300/40 backdrop-blur-xl"
        >
          
          {/* Map Controls Header */}
          <div className="p-4 sm:p-6 bg-white rounded-t-2xl border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Tab Buttons with LayoutId Indicator */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 relative">
              <button
                onClick={() => setActiveMapTab('workshop')}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors z-10 flex items-center gap-2 shrink-0 ${
                  activeMapTab === 'workshop'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-950 bg-slate-100'
                }`}
              >
                {activeMapTab === 'workshop' && (
                  <motion.div
                    layoutId="activeMapTabPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-slate-950 rounded-xl -z-10 shadow-md"
                  />
                )}
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>1. WORKSHOP SETU (PABRIK)</span>
              </button>

              <button
                onClick={() => setActiveMapTab('office')}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors z-10 flex items-center gap-2 shrink-0 ${
                  activeMapTab === 'office'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-950 bg-slate-100'
                }`}
              >
                {activeMapTab === 'office' && (
                  <motion.div
                    layoutId="activeMapTabPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-slate-950 rounded-xl -z-10 shadow-md"
                  />
                )}
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>2. KANTOR BANTAR GEBANG</span>
              </button>
            </div>

            {/* Live GPS Telemetry Badge & Quick Directions */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="hidden lg:flex items-center gap-2 text-slate-500 font-semibold">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                <span>PINPOINT: <span className="text-slate-900 font-bold">{activeLoc.coordinates}</span></span>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={activeLoc.gmapsNavUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold border border-slate-200 transition-colors shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-600" />
                <span>BUKA DI GOOGLE MAPS</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </motion.a>
            </div>
          </div>

          {/* Map Layout: Split with Iframe (7 Cols) and Facility Telemetry (5 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-b-2xl overflow-hidden">
            
            {/* Left: Responsive Interactive Google Maps Iframe with Exact Registered Business Pin */}
            <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[500px] bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={activeLoc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  title={`Google Maps ${activeLoc.title}`}
                  src={activeLoc.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </AnimatePresence>

              {/* Exact Google Maps Business Card Overlay (Matching Official Google Profile) */}
              {activeMapTab === 'workshop' && (
                <div className="absolute top-4 left-4 z-20 max-w-[310px] sm:max-w-[330px] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-2xl text-left hidden sm:block">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 font-bold">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>PROFIL GOOGLE MAPS RESMI</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-950 font-heading tracking-tight mt-1">
                        {COMPANY_INFO.googleBusiness.name}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold shrink-0">
                      Buka 24 jam
                    </span>
                  </div>

                  {/* Rating & Review Link */}
                  <div className="flex items-center gap-2 mt-2 pb-2.5 border-b border-slate-100">
                    <span className="font-bold text-slate-950 text-sm">4,8</span>
                    <div className="flex text-amber-500 text-xs">
                      {'★★★★★'.split('').map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div>
                    <a
                      href={COMPANY_INFO.googleBusiness.reviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 font-sans underline font-medium"
                    >
                      17 ulasan Google
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 font-sans">
                    {COMPANY_INFO.googleBusiness.address}
                  </p>

                  {/* Action Quick Buttons Matching Google Maps */}
                  <div className="grid grid-cols-3 gap-1.5 mt-3 pt-2 border-t border-slate-100">
                    <a
                      href={COMPANY_INFO.googleBusiness.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-mono font-bold text-center flex items-center justify-center gap-1 transition-colors"
                    >
                      <Navigation className="w-3 h-3 text-blue-600" />
                      <span>RUTE</span>
                    </a>
                    <a
                      href={COMPANY_INFO.googleBusiness.reviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] font-mono font-bold text-center flex items-center justify-center gap-1 transition-colors"
                    >
                      <Star className="w-3 h-3 text-amber-600" />
                      <span>ULASAN</span>
                    </a>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-mono font-bold text-center flex items-center justify-center gap-1 transition-colors"
                    >
                      <Phone className="w-3 h-3 text-slate-600" />
                      <span>TELEPON</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Map Floating Indicator Overlay */}
              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/95 text-slate-900 border border-slate-200 shadow-md text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-amber-700">{activeLoc.badge}</span>
                </div>
              </div>

              {/* Map Tag */}
              <div className="absolute bottom-3 right-3 z-10 pointer-events-none text-[10px] font-mono text-slate-600 bg-white/90 border border-slate-200 px-2 py-0.5 rounded shadow-sm">
                GOOGLE MAPS PINPOINT AKTIF
              </div>
            </div>

            {/* Right: Facility Specification & Quick Action */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-slate-200 bg-[#F8FAFC]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLoc.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[10px] font-mono text-amber-700 uppercase tracking-wider font-bold block mb-1">
                    [{activeLoc.badge}]
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-heading tracking-tight">
                    {activeLoc.title}
                  </h3>

                  {/* Complete Address Box */}
                  <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 relative group shadow-sm">
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {activeLoc.address}
                    </p>
                    
                    <button
                      onClick={handleCopyAddress}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono font-bold transition-colors border border-slate-200"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">ALAMAT TERSALIN!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-600" />
                          <span>SALIN ALAMAT LENGKAP</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Google Reviews Connected Banner for Workshop */}
              {activeLoc.id === 'workshop' && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/60 via-white to-amber-50/50 border border-blue-200/80 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800">
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>TERHUBUNG KE ULASAN GOOGLE</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                      4,8 / 5,0
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-sans">
                    Dipercaya lebih dari 17 rekanan armada dengan ulasan kepuasan teknis terverifikasi di Google Maps.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={COMPANY_INFO.googleBusiness.reviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                      <span>Baca 17 Ulasan</span>
                    </a>
                    <a
                      href={COMPANY_INFO.googleBusiness.reviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-mono font-bold flex items-center justify-center gap-1 shadow-sm transition-colors"
                    >
                      <Star className="w-3 h-3 text-slate-950" />
                      <span>Tulis Ulasan</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Operational Hours & Specs */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700 pb-3 border-b border-slate-200">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-semibold">{activeLoc.hours}</span>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold mb-2">
                    FASILITAS & DUKUNGAN ARMADA:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                    {activeLoc.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-mono font-bold mt-0.5">✓</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={activeLoc.gmapsNavUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-850 text-white font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>BUKA RUTE GOOGLE MAPS</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Halo%20CV%20Abdi%20Hydroulic,%20saya%20ingin%20jadwalkan%20kunjungan%20ke%20${encodeURIComponent(activeLoc.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>HUBUNGI VIA WA</span>
                </motion.a>
              </div>

            </div>

          </div>
        </motion.div>

        {/* 2. GOOGLE VERIFIED REVIEWS SHOWCASE (TERKONEKSI LANGSUNG KE GOOGLE MAPS) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border border-slate-200 shadow-xl relative overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-950">
                    {COMPANY_INFO.googleBusiness.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    TERVERIFIKASI GOOGLE
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xl font-heading font-extrabold text-slate-950">4,8</span>
                  <div className="flex text-amber-500 text-sm">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-600 font-semibold">
                    · Berdasarkan 17 Ulasan Google Maps
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={COMPANY_INFO.googleBusiness.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-mono font-bold shadow-sm transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>LIHAT 17 ULASAN DI GOOGLE</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={COMPANY_INFO.googleBusiness.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-mono font-bold shadow-md transition-all"
              >
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>TULIS ULASAN DI GOOGLE</span>
              </motion.a>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {COMPANY_INFO.googleBusiness.reviews.map((rev, i) => (
              <div 
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-3 hover:border-amber-500/40 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 text-xs font-mono font-bold flex items-center justify-center">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-950 leading-tight">
                          {rev.author}
                        </p>
                        <p className="text-[10px] text-slate-500 font-sans">
                          {rev.role}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {rev.time}
                    </span>
                  </div>

                  <div className="flex text-amber-500 text-xs mt-3">
                    {'★★★★★'.split('').map((s, idx) => (
                      <span key={idx}>{s}</span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Ulasan Google Terverifikasi
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. DIRECT CONSULTATION FORM & CONTACT CHANNELS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm">
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Pusat Bantuan & Konsultasi Teknikal
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Untuk pertanyaan mengenai rancang bangun, spesifikasi hidrolik, dan estimasi waktu pengerjaan:
              </p>

              <div className="mt-5 space-y-3">
                <motion.a
                  whileHover={{ x: 4 }}
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500/50 flex items-center gap-3 transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block font-semibold">WHATSAPP OFFICIAL:</span>
                    <span className="text-xs font-mono font-bold text-slate-950 group-hover:text-emerald-600 transition-colors">
                      {COMPANY_INFO.phoneFormatted}
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 4 }}
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-amber-500/50 flex items-center gap-3 transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block font-semibold">EMAIL RESMI:</span>
                    <span className="text-xs font-mono font-bold text-slate-950 group-hover:text-amber-600 transition-colors">
                      {COMPANY_INFO.email}
                    </span>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Direct Visit Assurance */}
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>KEPASTIAN SURVEI BENGKEL</span>
              </div>
              <p className="text-xs font-sans text-amber-800 leading-relaxed">
                Anda dapat datang langsung saat jam kerja untuk melihat proses perakitan sasis, bending plat, dan instalasi silinder hidrolik kami secara transparan.
              </p>
            </div>

          </div>

          {/* Right: Quick Quote Request Form */}
          <div className="lg:col-span-7">
            <SpotlightCard 
              spotlightColor="rgba(217, 119, 6, 0.12)"
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl"
            >
              <div className="mb-6">
                <span className="text-[10px] font-mono text-amber-700 uppercase tracking-wider font-bold">
                  [ FORMULIR KONSULTASI ONLINE ]
                </span>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight mt-0.5">
                  Kirim Pesan Rancang Bangun & Penawaran
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-1">
                  Pesan Anda akan langsung diteruskan ke WhatsApp Bpk. Darul Pramarta untuk ditindaklanjuti.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-600 block mb-1 font-bold">
                      NAMA LENGKAP *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Bpk. Budi Santoso"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-600 block mb-1 font-bold">
                      NAMA PERUSAHAAN / PT / CV
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Contoh: PT. Logistik Nusantara"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-600 block mb-1 font-bold">
                      NO. TELEPON / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Contoh: 0812-3456-7890"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-600 block mb-1 font-bold">
                      JENIS KAROSERI DIBUTUHKAN
                    </label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="Wingbox Full Hidrolik">Wingbox Full Hidrolik</option>
                      <option value="Dump Truck Tipper">Dump Truck (Tipper)</option>
                      <option value="Trailer & Lowbed">Trailer & Lowbed Alat Berat</option>
                      <option value="Truk Tangki Vakum">Truk Tangki Vakum / Limbah</option>
                      <option value="Carrier Motor">Self Loader / Carrier Motor</option>
                      <option value="Mobil Derek Towing">Mobil Derek Towing Hidrolik</option>
                      <option value="Sky Lift Scissor">Sky Lift Aerial Platform</option>
                      <option value="Arm Roll">Arm Roll Truck</option>
                      <option value="Custom Lainnya">Custom Karoseri Khusus Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-600 block mb-1 font-bold">
                    RINCIAN KEBUTUHAN / DIMENSI ARMADA *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Jelaskan kebutuhan armada Anda (panjang, muatan tonase, jenis sasis truk yang digunakan, target serah terima unit)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-slate-950/20 transition-all"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>KIRIM PESAN KONSULTASI VIA WHATSAPP</span>
                </motion.button>
              </form>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
}
