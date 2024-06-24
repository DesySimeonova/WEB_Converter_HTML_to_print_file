<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once("db.php");

session_start();

if (!isset($_SESSION["user"])) {
    http_response_code(401);
    exit(json_encode(["status" => "ERROR", "message" => "Потребителят не е оторизиран"]));
}

try {
    $db = new DB();
    $connection = $db->getConnection();

    $sql = "SELECT filename, converted_at FROM users_history";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "SUCCESS", "data" => $result]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "ERROR", "message" => "Грешка при извличане на данни: " . $e->getMessage()]);
}

?>