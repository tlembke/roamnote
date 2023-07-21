<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: *');

$authToken = $_GET['auth'];

if ($authToken === null || $authToken === '' || !preg_match('/^[a-zA-Z0-9]+$/', $authToken)) {
    http_response_code(400);
    echo 'Invalid auth token provided';
    exit;
}

$noteFile = '/path/to/notes/'.$authToken . '.txt';
$archiveFile = '/path/to/notes/'.$authToken . '-archive.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    $note = $input['Note'];

    if (file_exists($noteFile)) {
        $existingNotes = json_decode(file_get_contents($noteFile), TRUE);
    } else {
        $existingNotes = array();
    }

    array_push($existingNotes, array('Note' => $note));
    file_put_contents($noteFile, json_encode($existingNotes));

    echo "Note stored successfully";
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($noteFile)) {
        $notes = file_get_contents($noteFile);
        file_put_contents($archiveFile, $notes, FILE_APPEND | LOCK_EX);
        file_put_contents($noteFile, json_encode(array()));

        header('Content-Type: application/json');
        echo $notes;
    } else {
        echo 'No notes to retrieve';
    }
}
?>



