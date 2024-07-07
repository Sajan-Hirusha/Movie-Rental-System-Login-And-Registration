<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']); // Retrieve and sanitize form data
    echo "<h1>Hello, " . $name . "!</h1>"; // Echo the response to the HTML page
}
?>
