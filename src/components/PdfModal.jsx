import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronLeft, ChevronRight, FileText, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function PdfModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const pageTitles = [
    'Halaman 1: Cover Resmi, SKT DISHUB & Alamat Workshop/Office',
    'Halaman 2: Tentang Perusahaan, 10 Lini Karoseri, Visi & Misi',
    'Halaman 3: Portofolio Unit & Dokumentasi Fabrikasi 1',
    'Halaman 4: Portofolio Unit & Dokumentasi Fabrikasi 2',
    'Halaman 5: Portofolio Unit & Dokumentasi Fabrikasi 3',
    'Halaman 6: Daftar 21 Perusahaan Mitra & Klien Korporasi',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-950">
                    Company Profile Resmi CV Abdi Hydroulic
                  </h3>
                  <p className="text-[11px] font-mono text-amber-700 font-semibold">
                    {pageTitles[currentPage - 1]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={COMPANY_INFO.pdfPath}
                  download="COMPANY_PROFILE_CV_ABDI_HYDROULIC.pdf"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-white text-xs font-mono font-bold transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>UNDUH PDF ASLI (13 MB)</span>
                </motion.a>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Page Display Frame with AnimatePresence page transition */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/70 flex items-center justify-center min-h-[400px]">
              <div className="relative max-w-2xl w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    src={`/assets/pdf_page_${currentPage}.png`}
                    alt={`Halaman ${currentPage}`}
                    className="w-full h-auto object-contain"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Modal Pagination Footer */}
            <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 disabled:opacity-40 hover:bg-slate-200 text-xs font-mono text-slate-800 font-bold flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>SEBELUMNYA</span>
                </button>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 disabled:opacity-40 hover:bg-slate-200 text-xs font-mono text-slate-800 font-bold flex items-center gap-1 transition-colors"
                >
                  <span>SELANJUTNYA</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs font-mono text-slate-600 font-bold">
                HALAMAN <span className="text-amber-700 font-extrabold">{currentPage}</span> DARI {totalPages}
              </div>

              <a
                href={COMPANY_INFO.pdfPath}
                download="COMPANY_PROFILE_CV_ABDI_HYDROULIC.pdf"
                className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 text-white text-xs font-mono font-bold"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>UNDUH</span>
              </a>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
