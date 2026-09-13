import React from 'react';
import InfiniteMarquee from './InfiniteMarquee';
import { CORPORATE_CLIENTS } from '../../data/companyData';
import { ShieldCheck, Building2 } from 'lucide-react';

export default function PartnerMarqueeStrip() {
  const row1 = CORPORATE_CLIENTS.slice(0, 11);
  const row2 = CORPORATE_CLIENTS.slice(11, 21);

  return (
    <div className="w-full py-8 bg-slate-950 text-white overflow-hidden relative border-y border-amber-500/30">
      {/* Background Subtle Halos */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          <span>JARINGAN REKANAN & DISTRIBUTOR NASIONAL TERVERIFIKASI</span>
        </div>
        <div className="text-[11px] text-slate-400">
          *ARAHKAN KURSOR UNTUK MENJEDA MARQUEE
        </div>
      </div>

      {/* Row 1: Leftward Marquee */}
      <InfiniteMarquee pauseOnHover={true} className="py-2">
        {row1.map((client) => (
          <div
            key={client.id}
            className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/60 hover:bg-white/10 transition-all cursor-default whitespace-nowrap shadow-sm group"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono text-[10px] font-bold text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              {String(client.id).padStart(2, '0')}
            </div>
            <div>
              <p className="text-[10px] font-mono text-amber-400/90 font-bold uppercase tracking-wider">
                {client.category}
              </p>
              <p className="text-xs font-bold text-white font-sans group-hover:text-amber-300 transition-colors">
                {client.name}
              </p>
            </div>
          </div>
        ))}
      </InfiniteMarquee>

      {/* Row 2: Rightward Reverse Marquee */}
      <InfiniteMarquee pauseOnHover={true} reverse={true} className="py-2">
        {row2.map((client) => (
          <div
            key={client.id}
            className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/60 hover:bg-white/10 transition-all cursor-default whitespace-nowrap shadow-sm group"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono text-[10px] font-bold text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              {String(client.id).padStart(2, '0')}
            </div>
            <div>
              <p className="text-[10px] font-mono text-amber-400/90 font-bold uppercase tracking-wider">
                {client.category}
              </p>
              <p className="text-xs font-bold text-white font-sans group-hover:text-amber-300 transition-colors">
                {client.name}
              </p>
            </div>
          </div>
        ))}
      </InfiniteMarquee>
    </div>
  );
}
