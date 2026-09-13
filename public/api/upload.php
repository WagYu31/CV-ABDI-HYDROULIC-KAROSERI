<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Hanya menerima request POST']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    $errorCode = $_FILES['image']['error'] ?? 'no_file';
    echo json_encode(['success' => false, 'message' => 'File gambar tidak ditemukan atau gagal diunggah: ' . $errorCode]);
    exit;
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
$fileType = mime_content_type($file['tmp_name']);

if (!in_array($fileType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Format file tidak didukung. Harap gunakan JPG, PNG, atau WEBP.']);
    exit;
}

// Max 15MB
if ($file['size'] > 15 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Ukuran file terlalu besar. Maksimum 15 MB.']);
    exit;
}

// Target folder: ../uploads
$targetDir = dirname(__DIR__) . '/uploads';
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0755, true);
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
if (!$ext) {
    $ext = ($fileType === 'image/png') ? 'png' : (($fileType === 'image/webp') ? 'webp' : 'jpg');
}

$fileName = 'armada_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . strtolower($ext);
$targetPath = $targetDir . '/' . $fileName;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    echo json_encode([
        'success' => true,
        'message' => 'Gambar berhasil diunggah',
        'url' => '/uploads/' . $fileName,
        'fileName' => $fileName
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Gagal menyimpan file ke server']);
}
