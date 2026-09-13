import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { 
  Inbox, 
  Truck, 
  Image as ImageIcon, 
  Phone, 
  KeyRound, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  RefreshCw, 
  Upload, 
  MessageSquare, 
  AlertCircle, 
  Save, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck, 
  Search, 
  Filter,
  ArrowUpRight,
  Eye
} from 'lucide-react';

export default function AdminDashboard({ onLogout, onNavigateHome }) {
  const { 
    products, 
    companyInfo, 
    gallery, 
    inquiries, 
    loading, 
    fetchInquiries, 
    updateInquiryStatus, 
    deleteInquiry, 
    saveProducts, 
    saveCompanyInfo, 
    saveGallery 
  } = useSiteData();

  const [activeTab, setActiveTab] = useState('inbox'); // inbox | products | gallery | contact | security
  const [inquiryFilter, setInquiryFilter] = useState('all'); // all | baru | diproses | selesai
  const [inquirySearch, setInquirySearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Password change state
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Edit Gallery Modal State
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [isNewGalleryItem, setIsNewGalleryItem] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState(companyInfo);

  useEffect(() => {
    setContactForm(companyInfo);
  }, [companyInfo]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Upload file helper
  const uploadImageFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          return data.url;
        } else {
          throw new Error(data.message || 'Gagal mengupload gambar');
        }
      }
    } catch (err) {
      console.warn('Backend upload offline, reading as local DataURL:', err);
    }

    // Local fallback for dev server without PHP runtime
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  // ----------------------------------------------------
  // INQUIRIES TAB LOGIC
  // ----------------------------------------------------
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter !== 'all' && inq.status !== inquiryFilter) return false;
    if (!inquirySearch.trim()) return true;
    const q = inquirySearch.toLowerCase();
    return (
      (inq.name && inq.name.toLowerCase().includes(q)) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      (inq.category && inq.category.toLowerCase().includes(q)) ||
      (inq.message && inq.message.toLowerCase().includes(q))
    );
  });

  const unreadCount = inquiries.filter((i) => i.status === 'baru').length;

  const handleReplyWhatsApp = (inq) => {
    const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
    let targetPhone = cleanPhone;
    if (targetPhone.startsWith('08')) {
      targetPhone = '628' + targetPhone.substring(2);
    }
    const greeting = `Halo Bpk/Ibu *${inq.name || 'Klien'}* (${inq.company || '-'}), terima kasih telah menghubungi *CV Abdi Hydroulic* terkait permintaan *${inq.category || 'Karoseri'}*. Kami siap membantu estimasi spesifikasi & penawaran resmi. Ada detail tambahan yang ingin dibahas?`;
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(greeting)}`, '_blank');
    
    // Auto-mark as diproses if it was baru
    if (inq.status === 'baru') {
      updateInquiryStatus(inq.id, 'diproses');
    }
  };

  // ----------------------------------------------------
  // PRODUCTS TAB LOGIC
  // ----------------------------------------------------
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct.name) {
      showToast('Nama armada wajib diisi', 'error');
      return;
    }

    let updatedProducts;
    if (isNewProduct) {
      const newId = editingProduct.id || 'custom-' + Date.now();
      updatedProducts = [...products, { ...editingProduct, id: newId }];
    } else {
      updatedProducts = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    }

    await saveProducts(updatedProducts);
    setEditingProduct(null);
    showToast('Katalog armada berhasil disimpan!');
  };

  const handleDeleteProduct = async (id, name) => {
    if (confirm(`Yakin ingin menghapus produk "${name}"?`)) {
      const updated = products.filter((p) => p.id !== id);
      await saveProducts(updated);
      showToast(`Produk "${name}" telah dihapus.`);
    }
  };

  // ----------------------------------------------------
  // GALLERY TAB LOGIC
  // ----------------------------------------------------
  const handleSaveGalleryItem = async (e) => {
    e.preventDefault();
    if (!editingGalleryItem.title || !editingGalleryItem.src) {
      showToast('Judul dan foto wajib diisi', 'error');
      return;
    }

    let updatedGallery;
    if (isNewGalleryItem) {
      const newId = editingGalleryItem.id || Date.now();
      updatedGallery = [{ ...editingGalleryItem, id: newId }, ...gallery];
    } else {
      updatedGallery = gallery.map((g) => (g.id === editingGalleryItem.id ? editingGalleryItem : g));
    }

    await saveGallery(updatedGallery);
    setEditingGalleryItem(null);
    showToast('Galeri foto berhasil diperbarui!');
  };

  const handleDeleteGalleryItem = async (id, title) => {
    if (confirm(`Hapus foto galeri "${title}"?`)) {
      const updated = gallery.filter((g) => g.id !== id);
      await saveGallery(updated);
      showToast('Foto telah dihapus dari galeri.');
    }
  };

  // ----------------------------------------------------
  // CONTACT FORM LOGIC
  // ----------------------------------------------------
  const handleSaveContact = async (e) => {
    e.preventDefault();
    await saveCompanyInfo(contactForm);
    showToast('Informasi kontak perusahaan berhasil disimpan!');
  };

  // ----------------------------------------------------
  // PASSWORD CHANGE LOGIC
  // ----------------------------------------------------
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPwd.length < 6) {
      showToast('Kata sandi baru minimal 6 karakter', 'error');
      return;
    }
    if (newPwd !== confirmPwd) {
      showToast('Konfirmasi kata sandi baru tidak cocok', 'error');
      return;
    }

    setPwdLoading(true);
    try {
      const res = await fetch('/api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_password',
          current_password: currentPwd,
          new_password: newPwd,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          showToast('Kata sandi berhasil diperbarui!');
          setCurrentPwd('');
          setNewPwd('');
          setConfirmPwd('');
          setPwdLoading(false);
          return;
        } else {
          showToast(data.message || 'Gagal mengubah kata sandi', 'error');
          setPwdLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API error, using local storage password override:', err);
    }

    // Local fallback
    localStorage.setItem('abdi_admin_pwd_override', newPwd);
    showToast('Kata sandi berhasil diubah!');
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    setPwdLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border text-sm font-semibold transition-all animate-bounce ${
          toastMessage.type === 'error' 
            ? 'bg-red-950 border-red-700 text-red-200' 
            : 'bg-zinc-900 border-amber-500/50 text-amber-300'
        }`}>
          {toastMessage.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-400" /> : <CheckCircle2 className="w-5 h-5 text-amber-400" />}
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-zinc-900/90 border-b border-zinc-800 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-lg shadow-inner">
              AH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-white text-base tracking-tight uppercase">
                  CV Abdi Hydroulic
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Panel Owner
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Pusat Kendali Katalog, Galeri & Kotak Masuk Konsultasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateHome}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition border border-zinc-700"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition border border-red-800/60"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'inbox'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Kotak Masuk Konsultasi</span>
            {unreadCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black ${
                activeTab === 'inbox' ? 'bg-black text-amber-400' : 'bg-red-500 text-white'
              }`}>
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'products'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Katalog Unit Armada ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'gallery'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Galeri Foto Bengkel ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'contact'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Kontak & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'security'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Ganti Kata Sandi</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        
        {/* ======================================================= */}
        {/* TAB 1: KOTAK MASUK KONSULTASI & CHAT LEADS */}
        {/* ======================================================= */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            {/* Header & Filter Toolbar */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <span>Kotak Masuk Konsultasi Klien</span>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-amber-400 border border-zinc-700 font-mono">
                    Total {inquiries.length} Pesan
                  </span>
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Semua klien yang mengisi formulir konsultasi teknik atau mengklik spesifikasi WhatsApp tercatat otomatis di sini.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={fetchInquiries}
                  className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-zinc-700"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Segarkan Data</span>
                </button>
              </div>
            </div>

            {/* Filter Buttons & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'baru', label: 'Belum Dihubungi (Baru)' },
                  { id: 'diproses', label: 'Sedang Diproses' },
                  { id: 'selesai', label: 'Selesai / Deal' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setInquiryFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider transition ${
                      inquiryFilter === f.id
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Cari nama, PT, atau no HP..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Inquiries Cards Grid */}
            {filteredInquiries.length === 0 ? (
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-12 text-center">
                <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-zinc-300">Belum Ada Pesan Masuk</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
                  {inquiryFilter !== 'all' 
                    ? `Tidak ada pesan dengan status "${inquiryFilter}".` 
                    : 'Pesan akan otomatis masuk saat pengunjung mengisi formulir konsultasi atau mengirim pesanan armada dari website.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`bg-zinc-900 border rounded-2xl p-5 transition flex flex-col justify-between relative overflow-hidden ${
                      inq.status === 'baru' 
                        ? 'border-amber-500/50 shadow-lg shadow-amber-500/5' 
                        : 'border-zinc-800'
                    }`}
                  >
                    {/* Status accent strip */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${
                      inq.status === 'baru' ? 'bg-amber-500' : inq.status === 'diproses' ? 'bg-blue-500' : 'bg-emerald-500'
                    }`} />

                    <div>
                      {/* Top Row: Meta info & Status */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase">
                            {inq.timestamp || 'Baru Saja'} • Sumber: {inq.source || 'Website'}
                          </div>
                          <h3 className="text-lg font-bold text-white mt-0.5">
                            {inq.name}
                          </h3>
                          {inq.company && inq.company !== '-' && (
                            <div className="text-xs font-medium text-amber-400">
                              {inq.company}
                            </div>
                          )}
                        </div>

                        {/* Status selector */}
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none border ${
                            inq.status === 'baru'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : inq.status === 'diproses'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}
                        >
                          <option value="baru" className="bg-zinc-900 text-white">Baru</option>
                          <option value="diproses" className="bg-zinc-900 text-white">Sedang Diproses</option>
                          <option value="selesai" className="bg-zinc-900 text-white">Selesai / Deal</option>
                        </select>
                      </div>

                      {/* Detail Payload */}
                      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3.5 space-y-2 mb-4 text-xs">
                        <div className="flex justify-between items-center text-zinc-400">
                          <span>Nomor Telepon:</span>
                          <span className="font-mono font-bold text-white">{inq.phone}</span>
                        </div>
                        <div className="flex justify-between items-center text-zinc-400">
                          <span>Kebutuhan Unit:</span>
                          <span className="font-semibold text-amber-300">{inq.category}</span>
                        </div>
                        {inq.chassis && inq.chassis !== '-' && (
                          <div className="flex justify-between items-center text-zinc-400">
                            <span>Sasis Truk:</span>
                            <span className="font-semibold text-zinc-200">{inq.chassis}</span>
                          </div>
                        )}
                        {inq.message && inq.message !== '-' && (
                          <div className="pt-2 border-t border-zinc-800/60">
                            <span className="text-zinc-500 block mb-1">Pesan / Spesifikasi Khusus:</span>
                            <p className="text-zinc-300 bg-zinc-900/80 p-2 rounded-lg text-xs leading-relaxed italic">
                              "{inq.message}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800">
                      <button
                        onClick={() => handleReplyWhatsApp(inq)}
                        className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-600/10 active:scale-[0.98]"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Balas di WhatsApp Klien</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Hapus pesan dari ${inq.name}?`)) {
                            deleteInquiry(inq.id);
                            showToast('Pesan berhasil dihapus.');
                          }
                        }}
                        className="p-2.5 bg-zinc-800 hover:bg-red-950/60 text-zinc-400 hover:text-red-400 rounded-xl transition border border-zinc-700"
                        title="Hapus pesan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 2: KATALOG PRODUK & ARMADA */}
        {/* ======================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Manajemen Katalog Armada Karoseri
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Ubah gambar asli unit, tambahkan foto pendukung, perbarui spesifikasi teknis, atau tambahkan model armada baru.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    id: 'custom-' + Date.now(),
                    name: '',
                    tagline: '',
                    category: 'Dump Truck',
                    description: '',
                    image: '',
                    gallery: [],
                    specs: {
                      'Kapasitas': '8 - 12 m³',
                      'Sasis Cocok': 'Isuzu Elf NMR / Hino Dutro / Canter',
                      'Material Bak': 'Baja Plat SS400 / Q345B',
                      'Sistem Hidrolik': 'Telescopic Cylinder Heavy-Duty',
                      'Finishing': 'Epoxy Primer + Polyurethane Topcoat',
                    },
                    highlights: ['Desain Kokoh', 'Legalitas SKRB Resmi', 'Garansi Servis 1 Tahun'],
                  });
                  setIsNewProduct(true);
                }}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Armada Baru</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                      <img
                        src={prod.image || '/assets/truck_dump_isuzu_elf_grey.jpg'}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          e.target.src = '/assets/truck_dump_isuzu_elf_grey.jpg';
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-black/80 text-amber-400 backdrop-blur-sm border border-zinc-700">
                        {prod.category}
                      </div>
                      {prod.gallery && prod.gallery.length > 0 && (
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-zinc-300 backdrop-blur-sm">
                          +{prod.gallery.length} Foto
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-amber-500/90 font-medium mt-0.5">
                        {prod.tagline}
                      </p>
                      <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>

                      {/* Key Specs Preview */}
                      {prod.specs && (
                        <div className="mt-3 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-[11px]">
                          {Object.entries(prod.specs).slice(0, 2).map(([k, v]) => (
                            <div key={k} className="bg-zinc-950/60 p-2 rounded-lg">
                              <span className="text-zinc-500 block truncate">{k}</span>
                              <span className="text-zinc-200 font-semibold truncate block">{v}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct({ ...prod, gallery: prod.gallery || [] });
                        setIsNewProduct(false);
                      }}
                      className="flex-1 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition border border-zinc-700"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Edit & Ganti Foto</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(prod.id, prod.name)}
                      className="p-2 bg-zinc-800 hover:bg-red-950/60 text-zinc-400 hover:text-red-400 rounded-xl transition border border-zinc-700"
                      title="Hapus unit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* EDIT PRODUCT MODAL */}
            {editingProduct && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                    <div>
                      <h3 className="text-lg font-black text-white uppercase">
                        {isNewProduct ? 'Tambah Armada Baru' : `Edit: ${editingProduct.name}`}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Isi form dan upload foto asli karoseri langsung dari galeri HP atau komputer.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="text-zinc-400 hover:text-white p-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                          Nama Produk Karoseri *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          placeholder="Contoh: Truk Arm Roll Hooklift DLH"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                          Kategori Armada *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          placeholder="Dump Truck / Tangki / Wingbox / Towing / Trailer"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                        Tagline / Sub-judul Produk
                      </label>
                      <input
                        type="text"
                        value={editingProduct.tagline || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                        placeholder="Contoh: Sistem Hidrolik Hooklift Penarik Kontainer Sampah Otomatis"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                        Deskripsi Lengkap
                      </label>
                      <textarea
                        rows={3}
                        value={editingProduct.description || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        placeholder="Jelaskan fungsi, keunggulan konstruksi, peruntukan operasional..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* FOTO UTAMA */}
                    <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-amber-400 uppercase">
                          Foto Utama Unit Armada *
                        </label>
                        <span className="text-[11px] text-zinc-500">Maks 15MB (JPG, PNG, WEBP)</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-32 h-20 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                          {editingProduct.image ? (
                            <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-zinc-600" />
                          )}
                        </div>

                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="text"
                            value={editingProduct.image || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                            placeholder="URL foto atau klik tombol upload di bawah"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white"
                          />

                          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 cursor-pointer font-semibold transition">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Foto Asli dari HP/PC</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  showToast('Mengupload foto armada...', 'info');
                                  const url = await uploadImageFile(file);
                                  setEditingProduct({ ...editingProduct, image: url });
                                  showToast('Foto utama berhasil diupload!');
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* FOTO TAMBAHAN / GALERI UNIT */}
                    <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-zinc-300 uppercase">
                          Foto Tambahan / Multi-Angle Galeri
                        </label>
                        <label className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer">
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah Foto Angle Lain</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                showToast('Mengupload foto tambahan...', 'info');
                                const url = await uploadImageFile(file);
                                const currentGallery = editingProduct.gallery || [];
                                setEditingProduct({
                                  ...editingProduct,
                                  gallery: [...currentGallery, url],
                                });
                                showToast('Foto tambahan berhasil ditambahkan!');
                              }
                            }}
                          />
                        </label>
                      </div>

                      {editingProduct.gallery && editingProduct.gallery.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {editingProduct.gallery.map((imgUrl, idx) => (
                            <div key={idx} className="relative group aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                              <img src={imgUrl} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = editingProduct.gallery.filter((_, i) => i !== idx);
                                  setEditingProduct({ ...editingProduct, gallery: updated });
                                }}
                                className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded-md opacity-90 group-hover:opacity-100 transition"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-zinc-500 italic">
                          Belum ada foto tambahan. Klik tombol di atas untuk menambah foto dari sudut belakang, samping, atau kabin hidrolik.
                        </p>
                      )}
                    </div>

                    {/* SPESIFIKASI TEKNIS */}
                    <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-zinc-300 uppercase">
                          Spesifikasi Teknis (Tabel Klien)
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newKey = prompt('Nama Spesifikasi (misal: "Kapasitas Pompa"):');
                            if (newKey) {
                              setEditingProduct({
                                ...editingProduct,
                                specs: { ...(editingProduct.specs || {}), [newKey]: '-' },
                              });
                            }
                          }}
                          className="text-[11px] text-amber-400 hover:underline font-bold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah Baris Spek</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {editingProduct.specs &&
                          Object.entries(editingProduct.specs).map(([key, val]) => (
                            <div key={key} className="flex items-center gap-2">
                              <span className="w-1/3 text-zinc-400 font-semibold truncate bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                                {key}
                              </span>
                              <input
                                type="text"
                                value={val}
                                onChange={(e) => {
                                  setEditingProduct({
                                    ...editingProduct,
                                    specs: { ...editingProduct.specs, [key]: e.target.value },
                                  });
                                }}
                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = { ...editingProduct.specs };
                                  delete updated[key];
                                  setEditingProduct({ ...editingProduct, specs: updated });
                                }}
                                className="text-zinc-500 hover:text-red-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold uppercase"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Perubahan</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 3: GALERI FOTO BENGKEL & PROYEK */}
        {/* ======================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Galeri Foto Dokumentasi & Proyek
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Upload foto pengerjaan di workshop, serah terima unit, dan armada instansi pemerintah untuk ditampilkan di galeri website.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingGalleryItem({
                    id: Date.now(),
                    title: '',
                    category: 'Dokumentasi Workshop',
                    group: 'gov',
                    src: '',
                    desc: '',
                  });
                  setIsNewGalleryItem(true);
                }}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Foto Galeri Baru</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition"
                >
                  <div>
                    <div className="aspect-video bg-zinc-950 relative overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          e.target.src = '/assets/truck_armroll_dlh_malang_side.jpg';
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/80 text-amber-400 border border-zinc-700">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-3.5">
                      <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-400 transition">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 pt-0 flex items-center justify-between gap-2 border-t border-zinc-800/60 mt-2">
                    <button
                      onClick={() => {
                        setEditingGalleryItem({ ...item });
                        setIsNewGalleryItem(false);
                      }}
                      className="flex-1 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-bold uppercase transition flex items-center justify-center gap-1 border border-zinc-700"
                    >
                      <Edit3 className="w-3 h-3 text-amber-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteGalleryItem(item.id, item.title)}
                      className="p-1.5 bg-zinc-800 hover:bg-red-950/60 text-zinc-400 hover:text-red-400 rounded-lg transition border border-zinc-700"
                      title="Hapus foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* EDIT GALLERY ITEM MODAL */}
            {editingGalleryItem && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
                    <h3 className="text-base font-black text-white uppercase">
                      {isNewGalleryItem ? 'Upload Foto Galeri Baru' : 'Edit Foto Galeri'}
                    </h3>
                    <button
                      onClick={() => setEditingGalleryItem(null)}
                      className="text-zinc-400 hover:text-white p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-zinc-300 uppercase mb-1">
                        Judul Dokumentasi Proyek *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingGalleryItem.title}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                        placeholder="Contoh: Serah Terima Arm Roll DLH Kab. Malang"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-zinc-300 uppercase mb-1">
                          Label Kategori *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingGalleryItem.category}
                          onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value })}
                          placeholder="Sanitasi / Mining / Port / Wingbox"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-zinc-300 uppercase mb-1">
                          Grup Filter
                        </label>
                        <select
                          value={editingGalleryItem.group || 'gov'}
                          onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, group: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                        >
                          <option value="gov">Instansi Pemerintah (gov)</option>
                          <option value="mining">Pertambangan & Dump (mining)</option>
                          <option value="port">Pelabuhan & JICT (port)</option>
                          <option value="wingbox">Wingbox & Logistik (wingbox)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 uppercase mb-1">
                        Keterangan Foto
                      </label>
                      <textarea
                        rows={3}
                        value={editingGalleryItem.desc || ''}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, desc: e.target.value })}
                        placeholder="Jelaskan jenis pekerjaan, nama klien/instansi, atau fitur..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white"
                      />
                    </div>

                    {/* UPLOAD FOTO */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                      <label className="block font-bold text-amber-400 uppercase">
                        File Foto Proyek *
                      </label>

                      <div className="flex items-center gap-3">
                        <div className="w-24 h-16 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                          {editingGalleryItem.src ? (
                            <img src={editingGalleryItem.src} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-zinc-600" />
                          )}
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <input
                            type="text"
                            value={editingGalleryItem.src || ''}
                            onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, src: e.target.value })}
                            placeholder="URL foto atau klik tombol upload"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />

                          <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 cursor-pointer font-bold transition">
                            <Upload className="w-3 h-3" />
                            <span>Pilih Foto dari HP/Laptop</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  showToast('Mengupload foto ke server...', 'info');
                                  const url = await uploadImageFile(file);
                                  setEditingGalleryItem({ ...editingGalleryItem, src: url });
                                  showToast('Foto galeri berhasil diupload!');
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setEditingGalleryItem(null)}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold uppercase"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl uppercase flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Foto</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 4: KONTAK & WHATSAPP */}
        {/* ======================================================= */}
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>Informasi Kontak & Saluran WhatsApp</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Perubahan nomor WhatsApp dan kontak di sini akan otomatis memperbarui seluruh tombol chat & konsultasi di website.
                </p>
              </div>

              <form onSubmit={handleSaveContact} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                    Nomor WhatsApp Resmi Utama (Direct Chat Klien) *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.phone || ''}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="Contoh: 082261513399"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Format: 082261513399. Seluruh tombol di beranda akan mengarah ke nomor ini.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                    Email Resmi Perusahaan
                  </label>
                  <input
                    type="email"
                    value={contactForm.email || ''}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="sales@abdihydroulickaroseri.my.id"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                    Alamat Fisik Workshop & Pabrik Karoseri
                  </label>
                  <textarea
                    rows={2}
                    value={contactForm.address || ''}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    placeholder="Jl. Raya Setu Cikarang..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                    Jam Operasional Workshop
                  </label>
                  <input
                    type="text"
                    value={contactForm.hours || ''}
                    onChange={(e) => setContactForm({ ...contactForm, hours: e.target.value })}
                    placeholder="Senin - Sabtu: 08.00 - 17.00 WIB"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition active:scale-[0.98]"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Kontak</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 5: KEAMANAN & SANDI */}
        {/* ======================================================= */}
        {activeTab === 'security' && (
          <div className="max-w-md mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 mb-3">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-black text-white uppercase tracking-tight">
                  Perbarui Kata Sandi Owner
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Amankan akses panel admin dengan mengganti kata sandi bawaan.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                    Kata Sandi Saat Ini *
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    placeholder="Masukkan kata sandi lama..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                    Kata Sandi Baru * (Min. 6 Karakter)
                  </label>
                  <input
                    type="password"
                    required
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="Masukkan kata sandi baru..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 uppercase mb-1.5">
                    Konfirmasi Kata Sandi Baru *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    placeholder="Ulangi kata sandi baru..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={pwdLoading}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-50"
                  >
                    {pwdLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Simpan Kata Sandi Baru</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Admin Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-4 text-center text-[11px] text-zinc-500">
        CV Abdi Hydroulic • Panel Administrasi Terpusat v2.0 • Server Apache cPanel
      </footer>
    </div>
  );
}
