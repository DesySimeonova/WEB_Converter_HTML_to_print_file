<?php

    class DB {

        private $connection;

        function __construct() {
            
            $host = "localhost";
            $dbname = "web_app_db";
            $username = "root";
            $password = "";

            $dsn = "mysql:host=$host;dbname=$dbname";

            $this->connection = new PDO($dsn, $username, $password);
        }


        function getConnection() {
            return $this->connection;
        }

    }



?>