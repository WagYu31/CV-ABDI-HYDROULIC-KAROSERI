#!/bin/bash
set -e

echo "========================================================"
echo "  MEMPERBARUI CV ABDI HYDROULIC KE VERSI TERBARU"
echo "========================================================"

echo ""
echo "[1/4] Mengambil kode terbaru dari GitHub..."
git fetch origin main
git reset --hard origin/main

echo ""
echo "[2/4] Membersihkan cache build lama..."
rm -rf dist node_modules/.vite

echo ""
echo "[3/4] Mengompilasi ulang website & halaman admin..."
npm run build

echo ""
echo "[4/4] Mempublikasikan file ke web root..."
cp -r dist/* .
cp dist/.htaccess .

echo ""
echo "========================================================"
echo "  HASIL BUILD TERAKHIR:"
ls -lh dist/assets/index-*.js
echo "========================================================"
echo "  SUKSES! Website dan Halaman Admin telah aktif!"
echo "========================================================"
