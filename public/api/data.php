<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/siteData.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $data = json_decode($content, true);
        if ($data) {
            echo json_encode(['success' => true, 'data' => $data]);
            exit;
        }
    }
    // Return empty so client uses fallback
    echo json_encode(['success' => false, 'fallback' => true]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!$rawInput && php_sapi_name() === 'cli') {
        $rawInput = file_get_contents('php://stdin');
    }
    $input = json_decode($rawInput, true);
    if (!$input || !isset($input['data'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Data tidak valid']);
        exit;
    }
    
    $payload = $input['data'];
    $payload['last_updated'] = date('Y-m-d H:i:s');
    
    $result = file_put_contents($dataFile, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    
    if ($result !== false) {
        echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan', 'data' => $payload]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Gagal menulis ke file penyimpanan']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Metode tidak didukung']);
