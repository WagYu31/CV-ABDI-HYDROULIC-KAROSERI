import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowLeft, KeyRound, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onBackToHome }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Harap masukkan kata sandi');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.token) {
          sessionStorage.setItem('abdi_admin_token', data.token);
          onLoginSuccess(data.token);
          return;
        } else {
          setError(data.message || 'Kata sandi tidak valid');
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend auth unreachable, falling back to local verification:', err);
    }

    // Local fallback if running on Vite dev server without PHP runtime
    if (password === 'abdi2026' || password === localStorage.getItem('abdi_admin_pwd_override')) {
      const mockToken = 'DEV_SESSION_' + Date.now();
      sessionStorage.setItem('abdi_admin_token', mockToken);
      onLoginSuccess(mockToken);
    } else {
      setError('Kata sandi salah. Hubungi administrator jika lupa akses.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-amber-500 selection:text-black">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-2xl shadow-2xl p-8 z-10 relative">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-amber-400 transition mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Website Utama
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-widest uppercase bg-zinc-800 text-amber-400 border border-zinc-700 mb-2">
            PORTAL KHUSUS OWNER
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">
            CV Abdi Hydroulic
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Sistem Manajemen Katalog Armada, Galeri & Kotak Masuk Konsultasi
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-red-300">Akses Ditolak</div>
              <div className="mt-0.5 text-zinc-300">{error}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Kata Sandi Direksi / Owner
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                autoFocus
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 pl-11 pr-11 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
              />
              <KeyRound className="w-5 h-5 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Kata sandi awal: <span className="font-mono text-zinc-300 font-semibold">abdi2026</span> (Dapat diubah di dalam dashboard).
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
          <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sistem Otomatis Server Apache cPanel Aktif</span>
          </div>
        </div>
      </div>
    </div>
  );
}
