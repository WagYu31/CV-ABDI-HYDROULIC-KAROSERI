<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/inquiries.json';

function getInquiries($dataFile) {
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $data = json_decode($content, true);
        if (is_array($data)) {
            return $data;
        }
    }
    return [];
}

function saveInquiries($dataFile, $data) {
    return file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

$method = $_SERVER['REQUEST_METHOD'];

// GET: Retrieve all inquiries (for Admin Dashboard)
if ($method === 'GET') {
    $inquiries = getInquiries($dataFile);
    // Sort newest first
    usort($inquiries, function($a, $b) {
        return strtotime($b['timestamp'] ?? 0) - strtotime($a['timestamp'] ?? 0);
    });
    
    echo json_encode([
        'success' => true,
        'count' => count($inquiries),
        'data' => $inquiries
    ]);
    exit;
}

// POST: Handle new inquiry submission or actions
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!$rawInput && php_sapi_name() === 'cli') {
        $rawInput = file_get_contents('php://stdin');
    }
    $input = json_decode($rawInput, true);
    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Format data tidak valid']);
        exit;
    }

    $action = $input['action'] ?? 'submit';

    // Action: Update status (Baru -> Diproses -> Selesai)
    if ($action === 'update_status') {
        $id = $input['id'] ?? null;
        $newStatus = $input['status'] ?? 'diproses';
        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID tidak ditemukan']);
            exit;
        }
        
        $inquiries = getInquiries($dataFile);
        $updated = false;
        foreach ($inquiries as &$item) {
            if ($item['id'] === $id) {
                $item['status'] = $newStatus;
                $item['status_updated_at'] = date('Y-m-d H:i:s');
                $updated = true;
                break;
            }
        }
        
        if ($updated) {
            saveInquiries($dataFile, $inquiries);
            echo json_encode(['success' => true, 'message' => 'Status berhasil diperbarui']);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Pesan tidak ditemukan']);
        }
        exit;
    }

    // Action: Delete inquiry
    if ($action === 'delete') {
        $id = $input['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID tidak ditemukan']);
            exit;
        }
        
        $inquiries = getInquiries($dataFile);
        $filtered = array_values(array_filter($inquiries, function($item) use ($id) {
            return $item['id'] !== $id;
        }));
        
        saveInquiries($dataFile, $filtered);
        echo json_encode(['success' => true, 'message' => 'Pesan berhasil dihapus']);
        exit;
    }

    // Default Action: Submit new inquiry from public website
    $newInquiry = [
        'id' => 'INQ-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3))),
        'name' => htmlspecialchars($input['name'] ?? 'Calon Klien'),
        'company' => htmlspecialchars($input['company'] ?? '-'),
        'phone' => htmlspecialchars($input['phone'] ?? '-'),
        'category' => htmlspecialchars($input['category'] ?? 'Konsultasi Karoseri'),
        'chassis' => htmlspecialchars($input['chassis'] ?? '-'),
        'message' => htmlspecialchars($input['message'] ?? '-'),
        'source' => htmlspecialchars($input['source'] ?? 'Formulir Website'),
        'timestamp' => date('Y-m-d H:i:s'),
        'status' => 'baru', // baru, diproses, selesai
    ];

    $inquiries = getInquiries($dataFile);
    array_unshift($inquiries, $newInquiry); // Place at beginning
    saveInquiries($dataFile, $inquiries);

    echo json_encode([
        'success' => true,
        'message' => 'Permintaan konsultasi berhasil disimpan',
        'inquiry' => $newInquiry
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak didukung']);
