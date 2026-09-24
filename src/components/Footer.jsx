import React from 'react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../data/companyData';
import { 
  ShieldCheck, 
  ArrowUp,
  FileText,
  Download
} from 'lucide-react';

export default function Footer({ onOpenPdfModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 font-sans text-xs relative">
      
      {/* Top Hazard Warning Stripe Line in Industrial Safety Yellow & Black */}
      <div 
        className="h-2 w-full"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #FACC15, #FACC15 15px, #000000 15px, #000000 30px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white border border-slate-200/90 flex items-center justify-center p-1 shadow-md shadow-slate-900/10 overflow-hidden">
                <img
                  src="/assets/abdi_hydroulic_logo.png"
                  alt="CV Abdi Hydroulic Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl text-slate-950 tracking-tight block">
                  CV ABDI HYDROULIC
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider uppercase">
                  ENGINEERING & KAROSERI BEKASI
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-sans">
              Spesialis proses perakitan dan rekayasa hidrolik kendaraan niaga komersial (Wingbox, Dump Truck, Self Loader, Lowbed, Tangki, Derek, Arm Roll). Beroperasi mandiri sejak 30 Oktober 2018 di Bekasi.
            </p>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 text-amber-800 font-bold font-mono text-[11px]">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>TERDAFTAR DINAS PERHUBUNGAN RI</span>
              </div>
              <p className="font-mono text-xs text-slate-950 font-bold">
                No. SKT: {COMPANY_INFO.skKaroseri}
              </p>
              <p className="text-[11px] text-slate-500 font-sans">
                Klasifikasi Bidang Lalu Lintas & Angkutan Jalan
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenPdfModal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-mono font-bold transition-all shadow-sm group cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400 group-hover:text-white transition-colors" />
                <span>Buka Company Profile (PDF)</span>
              </button>
              <a
                href={COMPANY_INFO.pdfPath}
                download="Company_Profile_CV_Abdi_Hydroulic.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 text-xs font-mono font-bold border border-slate-200 transition-colors"
                title="Unduh File PDF (13 MB)"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Unduh PDF (13 MB)</span>
              </a>
            </div>
          </div>

          {/* Col 3: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider">
              NAVIGASI SISTEM
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a href="#hero" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600 font-mono">›</span>
                  <span>Ringkasan Utama</span>
                </a>
              </li>
              <li>
                <a href="#legalitas" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600 font-mono">›</span>
                  <span>Legalitas DISHUB</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPdfModal}
                  className="hover:text-amber-700 transition-colors flex items-center gap-1.5 text-left text-amber-700 font-bold cursor-pointer"
                >
                  <span className="text-amber-600 font-mono">›</span>
                  <FileText className="w-3 h-3 text-amber-600" />
                  <span>Company Profile (PDF)</span>
                </button>
              </li>
              <li>
                <a href="#katalog" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600 font-mono">›</span>
                  <span>Katalog 10 Lini Unit</span>
                </a>
              </li>
              <li>
                <a href="#konfigurator" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600 font-mono">›</span>
                  <span>Kalkulator Estimasi</span>
                </a>
              </li>
              <li>
                <a href="#mitra" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600 font-mono">›</span>
                  <span>21 Mitra Korporasi</span>
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600 font-mono">›</span>
                  <span>Galeri Dokumentasi</span>
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-amber-700 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600 font-mono">›</span>
                  <span>Lokasi Google Maps</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Lini Produk */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider">
              SPESIALISASI KAROSERI
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-sans">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Wingbox & Box Logistik</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Trailer & Lowbed Tank Marinir</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Self Loader Sepeda Motor</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Heavy Dump Truck (Tipper)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Mobil Derek & Towing Hidrolik</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Arm Roll Kontainer Limbah</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Truk Tangki BBM / CPO</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Sky Lift Mobil Tangga PJU</span>
              </li>
            </ul>
          </div>

        </motion.div>

        {/* Bottom Copyright & Back to Top */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono"
        >
          <div>
            © {new Date().getFullYear()} CV ABDI HYDROULIC. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#admin"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-600 transition font-semibold"
            >
              <span>Portal Admin</span>
            </a>

            <motion.button
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="p-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>KE ATAS</span>
              <ArrowUp className="w-3.5 h-3.5 text-amber-600" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
