import React from 'react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../data/companyData';
import { ShieldCheck, Scale, Award, Check } from 'lucide-react';
import SpotlightCard from './reactbits/SpotlightCard';
import DecryptedText from './reactbits/DecryptedText';

export default function LegalitasBadge() {
  const compliancePoints = [
    {
      title: 'Terdaftar Resmi Dinas Perhubungan',
      desc: 'Memiliki legalitas hukum dan izin operasional resmi perakitan karoseri kendaraan komersial.',
      id: 'DISHUB-REG',
    },
    {
      title: 'Kesesuaian Rancang Bangun (SKRB)',
      desc: 'Setiap model dan dimensi mengacu pada batasan JBB/JBKB serta standar dimensi laik jalan Kemenhub RI.',
      id: 'SKRB-STD',
    },
    {
      title: 'Standar Fabrikasi & Material Uji',
      desc: 'Material baja struktural profil SNI, pengelasan bersertifikat, dan pengetesan silinder hidrolik bertekanan.',
      id: 'FAB-QC',
    },
    {
      title: 'Kemudahan Pengurusan SRUT',
      desc: 'Dukungan dokumen teknis lengkap untuk proses sertifikasi uji tipe dan penerbitan SRUT armada kendaraan niaga Anda.',
      id: 'SRUT-READY',
    },
  ];

  return (
    <section id="legalitas" className="py-20 bg-[#F8FAFC] border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 text-xs font-mono font-bold mb-3 border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            KEPATUHAN REGULASI & KESELAMATAN JALAN
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
            Legalitas Karoseri Terdaftar Resmi Dinas Perhubungan
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed font-sans">
            Menjamin setiap armada yang dirakit di bengkel CV Abdi Hydroulic memenuhi regulasi keselamatan jalan raya dan mempermudah proses uji berkala (KIR/SRUT).
          </p>
        </motion.div>

        {/* Certificate Feature Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Luxury Certificate Plaque with 21st.dev BorderBeam */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <SpotlightCard
              spotlightColor="rgba(217, 119, 6, 0.15)"
              className="p-8 bg-gradient-to-b from-amber-50/40 via-white to-slate-50/50 border border-amber-500/30 text-left shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-amber-500/30 flex items-center justify-center p-1.5 shadow-sm">
                    <img 
                      src="/assets/logos/kemenhub_dishub.svg" 
                      alt="Dinas Perhubungan Republik Indonesia" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-500 font-semibold">DINAS PERHUBUNGAN</p>
                    <p className="text-sm font-bold text-slate-950">REPUBLIK INDONESIA</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-mono font-bold">
                  TERDAFTAR
                </span>
              </div>

              <div className="py-6 space-y-4">
                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase font-semibold">Perusahaan Karoseri</p>
                  <p className="text-2xl font-heading font-black text-slate-950 tracking-tight mt-0.5">
                    CV ABDI HYDROULIC
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-amber-500/30 shadow-inner">
                  <p className="text-[11px] font-mono text-amber-700 uppercase tracking-wider font-bold">
                    Nomor Surat Keterangan Terdaftar (SKT)
                  </p>
                  <p className="text-base sm:text-lg font-mono font-extrabold text-amber-800 mt-1">
                    <DecryptedText text={COMPANY_INFO.skKaroseri} speed={25} animateOn="view" className="text-amber-900 font-bold" />
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 mt-1">
                    Klasifikasi: Bidang Lalu Lintas & Angkutan Jalan
                  </p>
                </div>

                <div className="text-xs font-mono text-slate-600 space-y-1.5 font-medium">
                  <p>• Berdiri Mandiri: 30 Oktober 2018</p>
                  <p>• Workshop: Setu, Kab. Bekasi, Jawa Barat</p>
                  <p>• Bidang: Perakitan Armada Niaga & Rekayasa Hidrolik</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Right: 4 Assurance Points with Staggered Entrance */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {compliancePoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-amber-500/40 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-bold">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold">
                    [{point.id}]
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-950 tracking-tight mb-2">
                  {point.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
