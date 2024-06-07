<?php

require_once("db.php");

function isUserDataValid($userData) {

    if (!isset($userData["username"]) && !isset($userData["password"])) {
        return ["isValid" => false, "message" => "Некоректни данни!"];
    }

    return ["isValid" => true, "message" => "Данните са валидни!"];

}

if ($_POST) {

    $valid = isUserDataValid($_POST);

    if (!$valid["isValid"]) {
        http_response_code(400);
        exit($valid["message"]);
    }

    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    try {

        $db = new DB();
        $connection = $db->getConnection();

        $sql = "SELECT * FROM users WHERE username = :username";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["username" => $username]);

        if ($stmt->rowCount() > 0) {
            // Username already exists
            echo json_encode(["status" => "ERROR", "message" => "Username already taken."]);
        }

        $sql = "INSERT INTO users (username, password) VALUES (:username, :password)";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["username" => $username, "password" => $password]);

        echo json_encode(["status" => "SUCCESS", "message" => "Регистрацията е успешна"]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => "Грешка при регистрация!"]);
    }


} else {
    http_response_code(400);
    echo json_encode(["status" => "ERROR", "message" => "Некоректни данни!"]); 
}


?>