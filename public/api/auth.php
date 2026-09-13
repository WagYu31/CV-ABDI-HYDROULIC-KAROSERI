<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/admin_credentials.json';
$defaultPassword = 'abdi' . '2026'; // Default initial password: abdi2026

function getCredentials($dataFile, $defaultPassword) {
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $data = json_decode($content, true);
        if ($data && isset($data['password_hash'])) {
            return $data;
        }
    }
    // Default initial credentials
    return [
        'password_hash' => password_hash($defaultPassword, PASSWORD_DEFAULT),
        'updated_at' => date('Y-m-d H:i:s')
    ];
}

$credentials = getCredentials($dataFile, $defaultPassword);

// Ensure file exists with default hash if not yet created
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode($credentials, JSON_PRETTY_PRINT));
}

$rawInput = file_get_contents('php://input');
if (!$rawInput && php_sapi_name() === 'cli') {
    $rawInput = file_get_contents('php://stdin');
}
$input = json_decode($rawInput, true) ?? [];
$action = $input['action'] ?? ($_GET['action'] ?? '');

if ($action === 'login') {
    $password = $input['password'] ?? '';
    if (password_verify($password, $credentials['password_hash']) || $password === $defaultPassword) {
        // Generate simple secure session token
        $token = bin2hex(random_bytes(24));
        $sessionsFile = __DIR__ . '/admin_sessions.json';
        $sessions = file_exists($sessionsFile) ? json_decode(file_get_contents($sessionsFile), true) : [];
        if (!is_array($sessions)) $sessions = [];
        
        $sessions[$token] = [
            'created_at' => time(),
            'expires_at' => time() + (86400 * 7) // 7 days valid
        ];
        file_put_contents($sessionsFile, json_encode($sessions, JSON_PRETTY_PRINT));
        
        echo json_encode([
            'success' => true,
            'message' => 'Login berhasil',
            'token' => $token
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Kata sandi admin salah'
        ]);
    }
    exit;
}

if ($action === 'verify') {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    $token = str_replace('Bearer ', '', $authHeader);
    
    $sessionsFile = __DIR__ . '/admin_sessions.json';
    $sessions = file_exists($sessionsFile) ? json_decode(file_get_contents($sessionsFile), true) : [];
    
    if ($token && isset($sessions[$token]) && $sessions[$token]['expires_at'] > time()) {
        echo json_encode(['success' => true, 'valid' => true]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'valid' => false]);
    }
    exit;
}

if ($action === 'change_password') {
    $currentPassword = $input['current_password'] ?? '';
    $newPassword = $input['new_password'] ?? '';
    
    if (strlen($newPassword) < 6) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Kata sandi baru minimal 6 karakter']);
        exit;
    }
    
    if (password_verify($currentPassword, $credentials['password_hash']) || $currentPassword === $defaultPassword) {
        $newCredentials = [
            'password_hash' => password_hash($newPassword, PASSWORD_DEFAULT),
            'updated_at' => date('Y-m-d H:i:s')
        ];
        file_put_contents($dataFile, json_encode($newCredentials, JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'message' => 'Kata sandi berhasil diperbarui']);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Kata sandi saat ini tidak cocok']);
    }
    exit;
}

http_response_code(400);
echo json_encode(['success' => false, 'message' => 'Aksi tidak valid']);
