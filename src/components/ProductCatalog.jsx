import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCT_CATALOG, COMPANY_INFO } from '../data/companyData';
import { 
  Truck, 
  Layers, 
  ExternalLink, 
  PhoneCall, 
  SlidersHorizontal,
  X,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import TiltedCard from './reactbits/TiltedCard';

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    'Semua',
    'Logistik & Kargo',
    'Heavy Transport & Militer',
    'Pertambangan & Konstruksi',
    'Logistik Distribusi',
    'Pengelolaan Limbah & Lingkungan',
    'Penyelamatan & Jasa Derek',
    'Angkutan Cairan & Sanitasi',
    'Utilitas & Pemeliharaan',
  ];

  const filteredProducts = activeCategory === 'Semua'
    ? PRODUCT_CATALOG
    : PRODUCT_CATALOG.filter((p) => p.category === activeCategory || p.category.includes(activeCategory));

  return (
    <section id="katalog" className="py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold text-amber-700 mb-3 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              PORTFOLIO ARMADA AKTUAL
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Lini Produk Karoseri & Rekayasa Hidrolik
            </h2>
            <p className="mt-3 text-slate-600 text-base leading-relaxed font-sans">
              Dibuat dengan standar material bersertifikasi, sistem hidrolik teruji beban tinggi, dan kompatibel dengan berbagai merek sasis niaga (Isuzu, Hino, Fuso, Tata, Mercedes-Benz).
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Halo%20CV%20Abdi%20Hydroulic,%20saya%20ingin%20konsultasi%20pembuatan%20karoseri%20custom`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 border border-slate-200 text-xs font-mono font-bold transition-all shadow-sm self-start md:self-auto"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
            <span>KONSULTASI KAROSERI CUSTOM</span>
          </motion.a>
        </motion.div>

        {/* Category Filter Scroll/Bar with Framer Motion LayoutId */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors z-10 ${
                activeCategory === cat
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-950 bg-white border border-slate-200 shadow-sm'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategoryPill"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-slate-950 rounded-xl -z-10 shadow-md"
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Product Cards Grid with Framer Motion Stagger */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                key={product.id}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Tilted Card Image Frame */}
                <div className="p-3">
                  <TiltedCard
                    imageSrc={product.image}
                    altText={product.name}
                    captionText={product.name}
                    badge={product.badge}
                    specList={[product.specs[0].value, product.specs[3].value]}
                    containerHeight="240px"
                    rotateAmplitude={8}
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>

                {/* Card Meta & Details */}
                <div className="px-6 pb-6 pt-2 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-mono text-amber-700 uppercase tracking-wider font-bold">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950 tracking-tight mt-0.5 group-hover:text-amber-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                      {product.description}
                    </p>
                  </div>

                  {/* Technical Specs Snippet */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kompatibel:</span>
                      <span className="font-semibold text-slate-800 text-right truncate max-w-[180px]">
                        {product.specs[3]?.value}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Silinder/Sistem:</span>
                      <span className="font-semibold text-amber-700 text-right truncate max-w-[180px]">
                        {product.specs[0]?.value}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5 active:scale-[0.98]"
                    >
                      <span>SPESIFIKASI DETAIL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Halo%20CV%20Abdi%20Hydroulic,%20saya%20tertarik%20penawaran%20karoseri%20tipe%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 transition-colors shadow-sm"
                      title="Minta Penawaran Cepat via WhatsApp"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Product Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-6 border border-slate-200">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-white text-slate-950 font-bold shadow-md">
                    {selectedProduct.badge}
                  </span>
                </div>
              </div>

              {/* Modal Title & Info */}
              <span className="text-xs font-mono text-amber-700 font-bold uppercase tracking-wider">
                {selectedProduct.category}
              </span>
              <h3 className="text-2xl font-bold text-slate-950 mt-1">
                {selectedProduct.name}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed font-sans">
                {selectedProduct.description}
              </p>

              {/* Detailed Spec Sheet Table */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider mb-3">
                  [ SPESIFIKASI TEKNIS FABRIKASI ]
                </h4>
                <div className="space-y-2.5">
                  {selectedProduct.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:justify-between py-2 px-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-mono"
                    >
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="font-bold text-slate-900 mt-1 sm:mt-0">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct CTA */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Halo%20CV%20Abdi%20Hydroulic,%20mohon%20penawaran%20resmi%20untuk%20karoseri%20${encodeURIComponent(selectedProduct.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-slate-950 hover:bg-slate-850 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>MINTA PENAWARAN UNIT INI</span>
                </motion.a>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
                >
                  Tutup
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
