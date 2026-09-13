import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PRODUCT_CATALOG as DEFAULT_PRODUCTS, 
  COMPANY_INFO as DEFAULT_COMPANY_INFO 
} from '../data/companyData';

const DEFAULT_GALLERY = [
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
    title: 'Arm Roll Hooklift Kontainer - Dinas Lingkungan Hidup (DLH) Kab. Malang',
    category: 'Sanitasi & Pengelolaan Sampah',
    group: 'gov',
    src: '/assets/truck_armroll_dlh_malang_side.jpg',
    desc: 'Unit karoseri Arm Roll Hooklift sampah pada sasis Isuzu Elf 6-Speed untuk Pemerintah Kabupaten Malang. Dilengkapi kontainer sampah TP CONT 001 dan sistem hidrolik penarik/penurun otomatis.',
  },
  {
    id: 14,
    title: 'Carrier Sepeda Motor 2 Tingkat (Double Decker)',
    category: 'Car & Bike Carrier',
    group: 'wingbox',
    src: '/assets/truck_carrier_motor_1.jpg',
    desc: 'Konstruksi carrier bertingkat dengan lantai hidrolik lowering-deck untuk pengiriman unit motor baru antar-dealer tanpa risiko gores.',
  },
];

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [companyInfo, setCompanyInfo] = useState(DEFAULT_COMPANY_INFO);
  const [gallery, setGallery] = useState(DEFAULT_GALLERY);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load site data from API or localStorage
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/data.php');
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            if (result.data.products) setProducts(result.data.products);
            if (result.data.companyInfo) setCompanyInfo(result.data.companyInfo);
            if (result.data.gallery) setGallery(result.data.gallery);
          }
        }
      } catch (err) {
        console.warn('API data fetch failed, using defaults:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    fetchInquiries();
  }, []);

  // Fetch inquiries
  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries.php');
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setInquiries(result.data);
          localStorage.setItem('abdi_inquiries_cache', JSON.stringify(result.data));
          return;
        }
      }
    } catch (e) {
      console.warn('Fetch inquiries API error:', e);
    }
    
    // LocalStorage fallback
    const cached = localStorage.getItem('abdi_inquiries_cache');
    if (cached) {
      try {
        setInquiries(JSON.parse(cached));
      } catch (_) {}
    }
  };

  // Submit new inquiry (from public forms or configurator)
  const submitInquiry = async (inquiryData) => {
    const payload = {
      action: 'submit',
      name: inquiryData.name || 'Calon Klien',
      company: inquiryData.company || '-',
      phone: inquiryData.phone || '-',
      category: inquiryData.category || 'Konsultasi Karoseri',
      chassis: inquiryData.chassis || '-',
      message: inquiryData.message || '-',
      source: inquiryData.source || 'Formulir Website',
    };

    try {
      const res = await fetch('/api/inquiries.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.inquiry) {
          setInquiries(prev => [result.inquiry, ...prev]);
          return { success: true, inquiry: result.inquiry };
        }
      }
    } catch (e) {
      console.warn('Submit inquiry API offline, saving to local cache:', e);
    }

    // Local fallback
    const localInquiry = {
      id: 'LOCAL-' + Date.now(),
      ...payload,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'baru',
    };
    setInquiries(prev => {
      const updated = [localInquiry, ...prev];
      localStorage.setItem('abdi_inquiries_cache', JSON.stringify(updated));
      return updated;
    });

    return { success: true, inquiry: localInquiry };
  };

  // Update inquiry status
  const updateInquiryStatus = async (id, newStatus) => {
    setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    try {
      await fetch('/api/inquiries.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', id, status: newStatus }),
      });
    } catch (e) {
      console.warn('Update status API failed:', e);
    }
  };

  // Delete inquiry
  const deleteInquiry = async (id) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
    try {
      await fetch('/api/inquiries.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
    } catch (e) {
      console.warn('Delete inquiry API failed:', e);
    }
  };

  // Save all site data to backend
  const persistSiteData = async (updatedData) => {
    try {
      const res = await fetch('/api/data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedData }),
      });
      return res.ok;
    } catch (e) {
      console.error('Failed to persist site data:', e);
      return false;
    }
  };

  const saveProducts = async (newProducts) => {
    setProducts(newProducts);
    await persistSiteData({ products: newProducts, companyInfo, gallery });
  };

  const saveCompanyInfo = async (newInfo) => {
    setCompanyInfo(newInfo);
    await persistSiteData({ products, companyInfo: newInfo, gallery });
  };

  const saveGallery = async (newGallery) => {
    setGallery(newGallery);
    await persistSiteData({ products, companyInfo, gallery: newGallery });
  };

  return (
    <SiteDataContext.Provider value={{
      products,
      companyInfo,
      gallery,
      inquiries,
      loading,
      fetchInquiries,
      submitInquiry,
      updateInquiryStatus,
      deleteInquiry,
      saveProducts,
      saveCompanyInfo,
      saveGallery,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
