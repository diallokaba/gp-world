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

    if ($action === 'addProduct') {
        error_log("Received addProduct request");
        error_log("POST data: " . print_r($_POST, true));
        $cargoId = $_POST['cargoId'];
        $sender = json_decode($_POST['sender'], true);
        $receiver = json_decode($_POST['receiver'], true);

        error_log("Parsed sender: " . print_r($sender, true));
        error_log("Parsed receiver: " . print_r($receiver, true));
        $product = [
            "id" => $_POST['id'],
            "code" => $_POST['code'],
            "weight" => $_POST['weight'],
            "state" => $_POST['state'],
            "type" => $_POST['type'],
            "totalPrice" => $_POST['totalPrice'],
            "sender" => $sender,
            "receiver" => $receiver
        ];

        $data = readJSON('cargaisons.json');
        foreach ($data['cargaisons'] as &$cargaison) {
            if ($cargaison['id'] == $cargoId) {
                if (!isset($cargaison['products'])) {                    
                    $cargaison['products'] = [];
                }
                if($cargaison['maxWeight'] != 'null'){
                    $cargaison['maxWeight'] = $_POST['updatedQuantity'];
                }else if($cargaison['maxNbrProduct'] != 'null'){
                    $cargaison['maxNbrProduct'] = $_POST['updatedQuantity'];
                }
                $cargaison['totalAmount'] = $_POST['totalAmount'];
                $cargaison['products'][] = $product;
                break;
            }
        }
        writeJSON('cargaisons.json', $data);

        echo json_encode(["status" => "success", "message" => "Produit ajouté à la cargaison avec succès"]);
        exit;
    }

    if($action === 'addUserSender'){
        error_log("Received User Sender request");
        error_log("POST data: " . print_r($_POST, true));
        $sender = json_decode($_POST['sender'], true);
        error_log("Parsed sender: " . print_r($sender, true));
        $data = readJSON('users.json');
        $data['users'][] = $sender;
        writeJSON('users.json', $data);
        echo json_encode(["status" => "success", "message" => "Expéditeur ajouté avec succès"]);
        exit;
    }

    if($action === 'addUserReceiver'){
        error_log("Received User receiver request");
        error_log("POST data: " . print_r($_POST, true));
        $receiver = json_decode($_POST['receiver'], true);
        error_log("Parsed receiver: " . print_r($receiver, true));
        $data = readJSON('users.json');
        $data['users'][] = $receiver;
        writeJSON('users.json', $data);
        echo json_encode(["status" => "success", "message" => "Destinataire ajouté avec succès"]);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    $action = $_GET['action'];
    if ($action === 'getCargaison') {
        $data = readJSON('cargaisons.json');
        echo json_encode(["data" => $data]);
        exit;
        
    }
}