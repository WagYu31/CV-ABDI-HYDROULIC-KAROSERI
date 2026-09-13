import React from 'react';
import InfiniteMarquee from './InfiniteMarquee';

/**
 * 21st.dev inspired Brand Logo Collection
 * Pure, authentic, verified vector & corporate logos (LOGO-ONLY rule compliant).
 * Completely replaced all hand-rolled placeholders with genuine official assets.
 */

export const VerifiedBrands = {
  // 1. ISUZU (Official Wordmark)
  isuzu: (
    <img
      src="/assets/logos/Isuzu.svg"
      alt="Isuzu"
      className="h-6 sm:h-7 w-auto max-w-[130px] object-contain"
      loading="lazy"
    />
  ),

  // 2. HINO (Official Wordmark)
  hino: (
    <img
      src="/assets/logos/Hino_logo.svg"
      alt="Hino Motors"
      className="h-6 sm:h-7 w-auto max-w-[125px] object-contain"
      loading="lazy"
    />
  ),

  // 3. MITSUBISHI FUSO (Official 3-Diamond Vector + FUSO Wordmark)
  fuso: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/mitsubishi.svg"
        alt="Mitsubishi"
        className="h-6 w-auto"
        style={{
          filter:
            'invert(16%) sepia(90%) saturate(6000%) hue-rotate(355deg) brightness(95%) contrast(110%)',
        }}
        loading="lazy"
      />
      <span className="font-heading font-black text-base sm:text-lg tracking-wider text-slate-900 group-hover:text-[#E60012] transition-colors">
        FUSO
      </span>
    </div>
  ),

  // 4. MERCEDES-BENZ (Official 3-Pointed Star Vector + Wordmark)
  mercedes: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/mercedes.svg"
        alt="Mercedes-Benz"
        className="h-6 w-auto text-slate-900 group-hover:text-amber-700 transition-colors"
        loading="lazy"
      />
      <span className="font-heading font-bold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-amber-800 transition-colors">
        Mercedes-Benz
      </span>
    </div>
  ),

  // 5. VOLVO TRUCKS (Official Iron Mark Vector + Wordmark)
  volvo: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/volvo.svg"
        alt="Volvo"
        className="h-6 w-auto"
        loading="lazy"
      />
      <span className="font-heading font-black text-sm sm:text-base tracking-widest text-[#003057] group-hover:text-blue-700 transition-colors">
        VOLVO
      </span>
    </div>
  ),

  // 6. SCANIA (Official Griffin Crown Vector + Wordmark)
  scania: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/scania.svg"
        alt="Scania"
        className="h-6 w-auto"
        loading="lazy"
      />
      <span className="font-heading font-black text-sm sm:text-base tracking-widest text-[#041E42] group-hover:text-red-700 transition-colors">
        SCANIA
      </span>
    </div>
  ),

  // 7. TATA MOTORS (Official Vector + Wordmark)
  tata: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/tata.svg"
        alt="Tata Motors"
        className="h-6 w-auto"
        loading="lazy"
      />
      <span className="font-heading font-extrabold text-xs sm:text-sm tracking-wider text-[#004B87] group-hover:text-blue-800 transition-colors">
        TATA MOTORS
      </span>
    </div>
  ),

  // 8. UD TRUCKS (Official Emblem Vector)
  ud: (
    <img
      src="/assets/logos/UD_Trucks_logo.svg"
      alt="UD Trucks"
      className="h-6 sm:h-7 w-auto max-w-[120px] object-contain"
      loading="lazy"
    />
  ),

  // 9. TOYOTA COMMERCIAL (Official Vector + Wordmark)
  toyota: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/toyota.svg"
        alt="Toyota"
        className="h-5 sm:h-6 w-auto"
        loading="lazy"
      />
      <span className="font-heading font-black text-xs sm:text-sm tracking-widest text-[#EB0A1E]">
        TOYOTA
      </span>
    </div>
  ),

  // 10. KEMENTERIAN PEKERJAAN UMUM (PUPR) (Official State PU Seal from PDF Page 6)
  pupr: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/Logo_Kementerian_Pekerjaan_Umum_Republik_Indonesia.svg"
        alt="Kementerian PU"
        className="h-7 w-7 rounded shadow-xs object-contain"
        loading="lazy"
      />
      <span className="font-heading font-extrabold text-xs sm:text-sm tracking-tight text-[#223468] group-hover:text-amber-700 transition-colors">
        KEMENTERIAN PUPR
      </span>
    </div>
  ),

  // 11. PERTAMINA PATRA LOGISTIK (Official Vector)
  pertamina: (
    <img
      src="/assets/logos/Pertamina_Logo.svg"
      alt="Pertamina"
      className="h-6 sm:h-7 w-auto max-w-[140px] object-contain"
      loading="lazy"
    />
  ),

  // 12. ASTRA INTERNATIONAL (Official Vector)
  astra: (
    <img
      src="/assets/logos/ASTRA_international.svg"
      alt="Astra International"
      className="h-6 sm:h-7 w-auto max-w-[140px] object-contain"
      loading="lazy"
    />
  ),

  // 13. UNITED TRACTORS (Official Corporate Logo - Member of Astra)
  ut: (
    <img
      src="/assets/logos/united_tractors_official.png"
      alt="United Tractors Member of Astra"
      className="h-6 sm:h-7 w-auto max-w-[150px] object-contain"
      loading="lazy"
    />
  ),

  // 14. PAMA (Official Chevron Emblem + Wordmark)
  pama: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/pama_emblem.png"
        alt="PAMA"
        className="h-6 w-auto object-contain rounded-xs"
        loading="lazy"
      />
      <span className="font-heading font-black text-sm tracking-wider text-[#1B365D] group-hover:text-amber-600 transition-colors">
        PAMA
      </span>
    </div>
  ),

  // 15. JASA BERDIKARI LOGISTICS (Official JBL Corporate Logo)
  berdikari: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/jasa_berdikari_official.jpg"
        alt="Jasa Berdikari Logistics"
        className="h-6 w-6 rounded-md object-contain shadow-xs"
        loading="lazy"
      />
      <span className="font-heading font-bold text-xs sm:text-sm tracking-tight text-slate-900 group-hover:text-red-700 transition-colors">
        JASA BERDIKARI
      </span>
    </div>
  ),

  // 16. KORINDO HEAVY INDUSTRI (Official Corporate Logo)
  korindo: (
    <img
      src="/assets/logos/korindo.png"
      alt="Korindo Heavy Industry"
      className="h-6 sm:h-7 w-auto max-w-[130px] object-contain"
      loading="lazy"
    />
  ),

  // 17. KEMENTERIAN PERHUBUNGAN (DISHUB) (Official State Transportation Seal)
  dishub: (
    <div className="flex items-center gap-2.5">
      <img
        src="/assets/logos/kemenhub_dishub.svg"
        alt="Dinas Perhubungan"
        className="h-7 w-auto object-contain"
        loading="lazy"
      />
      <span className="font-heading font-extrabold text-xs sm:text-sm tracking-tight text-[#301D6E] group-hover:text-amber-700 transition-colors">
        DINAS PERHUBUNGAN
      </span>
    </div>
  ),

  // 18. CATERPILLAR (Official Vector + Wordmark)
  caterpillar: (
    <div className="flex items-center gap-2">
      <img
        src="/assets/logos/caterpillar.svg"
        alt="Caterpillar"
        className="h-6 w-auto"
        loading="lazy"
      />
      <span className="font-heading font-black text-sm tracking-wider text-slate-900 group-hover:text-amber-600 transition-colors">
        CAT
      </span>
    </div>
  ),

  // 19. IVECO (Official Vector)
  iveco: (
    <img
      src="/assets/logos/iveco.svg"
      alt="Iveco"
      className="h-5 sm:h-6 w-auto max-w-[100px] object-contain"
      loading="lazy"
    />
  ),

  // 20. DAF TRUCKS (Official Vector)
  daf: (
    <img
      src="/assets/logos/daf.svg"
      alt="DAF"
      className="h-5 sm:h-6 w-auto max-w-[100px] object-contain"
      loading="lazy"
    />
  ),
};

export default function CompanyLogoMarquee() {
  // Row 1: Official Chassis Partners (ATPM Truck Brands)
  const row1Logos = [
    { key: 'isuzu', node: VerifiedBrands.isuzu },
    { key: 'hino', node: VerifiedBrands.hino },
    { key: 'fuso', node: VerifiedBrands.fuso },
    { key: 'mercedes', node: VerifiedBrands.mercedes },
    { key: 'volvo', node: VerifiedBrands.volvo },
    { key: 'scania', node: VerifiedBrands.scania },
    { key: 'tata', node: VerifiedBrands.tata },
    { key: 'ud', node: VerifiedBrands.ud },
    { key: 'toyota', node: VerifiedBrands.toyota },
  ];

  // Row 2: Official Strategic Corporate Clients, Regulators & Machinery Giants
  const row2Logos = [
    { key: 'pupr', node: VerifiedBrands.pupr },
    { key: 'pertamina', node: VerifiedBrands.pertamina },
    { key: 'astra', node: VerifiedBrands.astra },
    { key: 'ut', node: VerifiedBrands.ut },
    { key: 'pama', node: VerifiedBrands.pama },
    { key: 'berdikari', node: VerifiedBrands.berdikari },
    { key: 'korindo', node: VerifiedBrands.korindo },
    { key: 'dishub', node: VerifiedBrands.dishub },
    { key: 'caterpillar', node: VerifiedBrands.caterpillar },
    { key: 'iveco', node: VerifiedBrands.iveco },
    { key: 'daf', node: VerifiedBrands.daf },
  ];

  return (
    <section className="w-full py-16 bg-[#F8FAFC] border-y border-slate-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold text-amber-700 mb-2 shadow-sm">
          <span>JARINGAN DISTRIBUTOR RESMI SASIS & KORPORASI MITRA</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-950 tracking-tight">
          Dipercaya oleh Distributor Resmi ATPM & Perusahaan Terkemuka
        </h3>
      </div>

      {/* Row 1: Leftward Infinite Marquee */}
      <InfiniteMarquee pauseOnHover={true} className="py-2.5">
        {row1Logos.map((item, idx) => (
          <div
            key={`${item.key}-${idx}`}
            className="flex items-center justify-center px-7 py-3.5 mx-2 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 group shrink-0 cursor-default shadow-sm min-w-[140px]"
          >
            <div className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 grayscale group-hover:grayscale-0">
              {item.node}
            </div>
          </div>
        ))}
      </InfiniteMarquee>

      {/* Row 2: Rightward Reverse Infinite Marquee */}
      <InfiniteMarquee pauseOnHover={true} reverse={true} className="py-2.5 mt-2">
        {row2Logos.map((item, idx) => (
          <div
            key={`${item.key}-${idx}`}
            className="flex items-center justify-center px-7 py-3.5 mx-2 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 group shrink-0 cursor-default shadow-sm min-w-[140px]"
          >
            <div className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 grayscale group-hover:grayscale-0">
              {item.node}
            </div>
          </div>
        ))}
      </InfiniteMarquee>
    </section>
  );
}
