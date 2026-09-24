import React from 'react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../data/companyData';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Layers, 
  Wrench, 
  Compass,
  FileText
} from 'lucide-react';

export default function CompanyVision({ onOpenPdfModal }) {
  const isoPillars = [
    {
      code: 'ISO 9001:2015',
      title: 'Sistem Manajemen Mutu (QMS)',
      subtitle: 'Standarisasi Fabrikasi & Rekayasa Hidrolik',
      description: 'Seluruh tahapan dari pemodelan CAD/CAM, pemilihan bahan baku, pembubutan silinder, hingga perakitan akhir mengacu pada kontrol mutu presisi tinggi.',
      points: [
        'Kontrol toleransi dimensi mikro pada silinder & sasis',
        'Traceability nomor batch plat baja & sertifikat pabrik',
        'Kalibrasi alat ukur dan pressure gauge secara berkala',
      ],
      badge: 'MUTU MANUFAKTUR',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      code: 'SKRB & SRUT DISHUB',
      title: 'Kepatuhan Regulasi Kemenhub RI',
      subtitle: 'Legalitas Rancang Bangun & Laik Jalan',
      description: 'Kepatuhan mutlak terhadap dimensi, berat total (JBB/JBKB), serta distribusi muatan sesuai Surat Keputusan Terdaftar No. 1813/HUB.02.15.05/Bid Lalulintas.',
      points: [
        'Kalkulasi teknis daya dukung gandar sasis komersial',
        'Penerbitan dokumen legal SKRB & SRUT resmi',
        'Pemasangan perangkat keselamatan & reflektor standar',
      ],
      badge: 'REGULASI PEMERINTAH',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      code: 'ISO 45001 & AWS D1.1',
      title: 'K3 & Standar Pengelasan Struktural',
      subtitle: 'Keselamatan Kerja & Integritas Sambungan Las',
      description: 'Penerapan Sistem Manajemen K3 workshop berat dengan prosedur pengelasan bersertifikasi AWS D1.1 untuk mencegah kelelahan logam (metal fatigue).',
      points: [
        'Juru las bersertifikasi dengan teknik penetrasi penuh MIG/MAG',
        'Inspeksi visual sambungan las & uji penetran tanpa retak',
        'SOP K3 workshop, spray booth berventilasi & limbah ramah lingkungan',
      ],
      badge: 'KEAMANAN STRUKTURAL',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  const qcSteps = [
    {
      step: '01',
      phase: 'Incoming Material',
      title: 'Verifikasi Bahan Baku & Mill Sheet',
      desc: 'Inspeksi plat baja struktural SNI / JIS SS400, SPHC, serta plat Hardox anti-abrasi dengan ultrasonic thickness meter dan verifikasi sertifikat pabrik baja.',
      standard: 'SNI / JIS G3101 / Hardox 450',
    },
    {
      step: '02',
      phase: 'Cutting & Welding',
      title: 'Pemotongan CNC & Pengelasan Presisi',
      desc: 'Pemotongan plat menggunakan plasma CNC & bending terukur. Pengelasan sub-frame dan cross-member dengan mesin las MIG/MAG CO2 penetrasi penuh.',
      standard: 'AWS D1.1 Structural Welding',
    },
    {
      step: '03',
      phase: 'Hydraulic Testing',
      title: 'Hydrostatic Test Bench 250+ Bar',
      desc: 'Pengujian tekanan silinder hidrolik hingga 250 - 320 Bar pada test bench statis selama 30 menit untuk menjamin zero-leakage pada seal NOK/Hallite.',
      standard: 'Pressure Rating 250+ Bar (Zero Leakage)',
    },
    {
      step: '04',
      phase: 'Surface Treatment',
      title: 'Sandblasting Sa 2.5 & Oven Painting',
      desc: 'Pembersihan kerak karat dengan sandblasting Sa 2.5, aplikasi primer Epoxy anti-karat dua komponen, serta pengecatan akhir Polyurethane oven tahan cuaca ekstrem.',
      standard: 'ISO 8501-1 Sa 2.5 / 2K Epoxy Polyurethane',
    },
    {
      step: '05',
      phase: 'Final Commissioning',
      title: 'PDI & Uji Laik Jalan Komisioning',
      desc: 'Pre-Delivery Inspection (PDI) mencakup pengujian 10 siklus buka-tutup / dumping muatan penuh, kalibrasi katup relief valve, dan pengecekan kelistrikan keselamatan.',
      standard: '10x Dynamic Cycle Test + SKRB Ready',
    },
  ];

  return (
    <section id="visi" className="py-24 bg-[#F8FAFC] relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Clean, Authoritative, Corporate B2B */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800 mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            STANDARISASI MUTU & SISTEM MANAJEMEN ISO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-950 tracking-tight leading-tight">
            Komitmen Standarisasi Mutu & Integritas Rekayasa Manufaktur
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            CV ABDI HYDROULIC menerapkan prinsip Quality Management System berstandar internasional dan kepatuhan regulasi Kementerian Perhubungan RI untuk menjamin kekuatan struktural, efisiensi operasional, dan umur pakai armada jangka panjang.
          </p>
        </motion.div>

        {/* 3 Core ISO & Compliance Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {isoPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-extrabold tracking-wide text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                    {pillar.code}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${pillar.badgeColor}`}>
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 mb-1 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  {pillar.subtitle}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed font-sans mb-5">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                  Protokol Verifikasi:
                </span>
                <ul className="space-y-2">
                  {pillar.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5-Tahap Quality Control (QC) Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                QC INSPECTION WORKFLOW
              </div>
              <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                5 Tahap Pengawasan Mutu & Kalibrasi Fabrikasi
              </h3>
              <p className="text-sm text-slate-600 font-sans mt-1">
                Setiap unit yang diproduksi melewati 5 gerbang inspeksi ketat sebelum diserahterimakan kepada operator armada.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold shadow-sm">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                100% LOLOS UJI TEKANAN
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
            {qcSteps.map((step) => (
              <div 
                key={step.step}
                className="relative bg-slate-50/70 rounded-2xl p-5 border border-slate-200/70 hover:border-amber-500/40 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 text-xs font-mono font-extrabold flex items-center justify-center">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      {step.phase}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-950 mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <div className="text-[10px] font-mono text-slate-500 font-medium">Standar Acuan:</div>
                  <div className="text-[11px] font-mono font-bold text-amber-700 truncate" title={step.standard}>
                    {step.standard}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Executive Corporate Charter: Visi, Misi & Motto */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Visi Perusahaan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-mono font-bold text-amber-700 tracking-wider uppercase">
                  VISI PERUSAHAAN
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-950 mb-3">Kemitraan Berkesinambungan</h4>
              <p className="text-sm text-slate-700 leading-relaxed font-sans italic bg-amber-50/50 p-4 rounded-xl border border-amber-200/50 mb-4">
                "{COMPANY_INFO.vision}"
              </p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-4">
              Menjadi mitra manufaktur strategis yang diandalkan untuk menopang kelancaran distribusi logistik, konstruksi, dan mobilitas armada niaga nasional.
            </p>
          </motion.div>

          {/* Misi Perusahaan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-mono font-bold text-amber-700 tracking-wider uppercase">
                  MISI PERUSAHAAN
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-950 mb-3">Sinergi Saling Menguntungkan</h4>
              <p className="text-sm text-slate-700 leading-relaxed font-sans italic bg-slate-50 p-4 rounded-xl border border-slate-200/60 mb-4">
                "{COMPANY_INFO.mission}"
              </p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-4">
              Menyediakan hasil rancang bangun karoseri berstandar tinggi dengan penawaran investasi kompetitif dan pendampingan purna jual yang berkelanjutan.
            </p>
          </motion.div>

          {/* Motto & Legalitas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-2xl bg-slate-950 text-white shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
                  MOTTO & INTEGRITAS
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                  EST. 2018
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-3">Inovasi Terdepan</h4>
              <p className="text-base text-amber-400 leading-snug font-bold font-sans mb-4">
                "{COMPANY_INFO.motto}"
              </p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                Berdiri mandiri sejak 30 Oktober 2018 di Setu, Kabupaten Bekasi, CV ABDI HYDROULIC terus berkembang menjadi salah satu manufaktur karoseri & rekayasa hidrolik paling tangguh di Jawa Barat.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>SKT DISHUB RI:</span>
              <span className="text-amber-400 font-bold">{COMPANY_INFO.skKaroseri}</span>
            </div>

            {onOpenPdfModal && (
              <button
                type="button"
                onClick={onOpenPdfModal}
                className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <FileText className="w-3.5 h-3.5 text-slate-950" />
                <span>BACA COMPANY PROFILE LENGKAP</span>
              </button>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
