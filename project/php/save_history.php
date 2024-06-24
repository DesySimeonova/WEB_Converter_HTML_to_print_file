<?php

require_once("db.php");

session_start();

function isFileDataValid($fileData) {
    if (!isset($fileData["filename"]) || empty($fileData["filename"])) {
        return ["isValid" => false, "message" => "Некоректни данни! Няма предоставен файл или името на файла е празно."];
    }
    return ["isValid" => true, "message" => "Данните са валидни!"];
}

if (!isset($_SESSION["user"])) {
    http_response_code(401);
    exit(json_encode(["status" => "ERROR", "message" => "Потребителят не е оторизиран"]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['file'])) {
        http_response_code(400);
        exit(json_encode(["status" => "ERROR", "message" => "Моля, прикачете HTML файл."]));
    }

    $userId = $_SESSION["user"]["id"];
    $filename = $_FILES['file']['name'];
    $tempFilePath = $_FILES['file']['tmp_name'];
    $uploadsDir = '../uploads/'.$filename;

    if (!move_uploaded_file($tempFilePath, $uploadsDir)) {
        http_response_code(500);
        exit(json_encode(["status" => "ERROR", "message" => "Грешка при качване на файла."]));
    }

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "INSERT INTO users_history (user_id, filename, converted_at) VALUES (:user_id, :filename, CURRENT_TIMESTAMP)";
        $stmt = $connection->prepare($sql);
        $stmt->execute([
            "user_id" => $userId,
            "filename" => $filename
        ]);

        echo json_encode(["status" => "SUCCESS", "message" => "Файлът е записан"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => "Грешка при запис на файл: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "ERROR", "message" => "Некоректни данни!"]);
}
?>


















