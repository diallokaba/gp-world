<?php

function readJSON($filename) {
    $json_data = file_get_contents($filename);
    return json_decode($json_data, true);
}

function writeJSON($filename, $data) {
    $json_data = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json_data);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    if ($action === 'addCargaison') {
        $newCargaison = [
            "id" => $_POST['id'],
            "reference" => $_POST['reference'],
            "maxWeight" => $_POST['maxWeight'],
            "maxNbrProduct" => $_POST['maxNbrProduct'],
            "totalAmount" => $_POST['totalAmount'],
            "distance" => $_POST["distance"],
            "departurePoint" => $_POST['departurePoint'],
            "arrivalPoint" => $_POST["arrivalPoint"],
            "leavingDate" => $_POST['leavingDate'],
            "arrivedDate" => $_POST["arrivedDate"],
            "type" => $_POST['type'],
            "globalState" => $_POST['globalState'],
            "progressionState" => $_POST['progressionState'],
            "image" => $_POST['image']
        ];

        $data = readJSON('cargaisons.json');
        $data['cargaisons'][] = $newCargaison;
        writeJSON('cargaisons.json', $data);

        echo json_encode(["status" => "success", "message" => "Cargaison ajoutée avec succès"]);
        exit;
    }
}
