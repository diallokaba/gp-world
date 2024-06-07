<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require('/var/www/html/gp-world/vendor/setasign/fpdf/fpdf.php');
require '/var/www/html/gp-world/vendor/autoload.php';

function generateInvoicePDF($sender, $receiver, $product, $cargo) {
    $pdf = new FPDF();
    $pdf->AddPage();

    // Utilisez un chemin absolu pour l'image
    $imagePath = '/var/www/html/gp-world/dist/images/gp-world.jpeg';
    if (file_exists($imagePath)) {
        $pdf->Image($imagePath, 10, 10, 30);
    } else {
        throw new Exception("L'image $imagePath est introuvable.");
    }

    // Informations de la compagnie
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->SetXY(10, 40);
    $pdf->Cell(0, 10, 'GP-WORLD', 0, 1);
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(0, 5, 'Ouest-foire, Lot-1, tally wally', 0, 1);
    $pdf->Cell(0, 5, '+221 78-522-27-94', 0, 1);

    // Informations de la facture
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->SetXY(140, 10);
    $pdf->Cell(0, 10, 'Facture', 0, 1);
    $pdf->SetFont('Arial', '', 10);
    $pdf->SetXY(140, 20);
    $pdf->Cell(0, 10, 'Numero de facture: 000001', 0, 1);
    $pdf->SetXY(140, 25);
    $pdf->Cell(0, 10, 'Date de facturation: ' . date("Y-m-d"), 0, 1);

    // Informations du client
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->SetXY(10, 60);
    $pdf->Cell(0, 10, 'Client', 0, 1);
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(0, 5, $sender['firstname'] . ' ' . $sender['lastname'], 0, 1);
    $pdf->Cell(0, 5, $sender['address'], 0, 1);
    $pdf->Cell(0, 5, $sender['telephone'], 0, 1);
    $pdf->Cell(0, 5, $sender['email'], 0, 1);

    // Informations du destinataire
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->SetXY(140, 60);
    $pdf->Cell(0, 10, 'Destinataire', 0, 1);
    $pdf->SetFont('Arial', '', 10);
    $pdf->SetXY(140, 70);
    $pdf->Cell(0, 5, $receiver['lastname'] . ' ' . $receiver['firstname'], 0, 1);
    $pdf->SetXY(140, 75);
    $pdf->Cell(0, 5, $receiver['address'], 0, 1);
    $pdf->SetXY(140, 80);
    $pdf->Cell(0, 5, $receiver['telephone'], 0, 1);
    $pdf->SetXY(140, 85);
    $pdf->Cell(0, 5, $receiver['email'], 0, 1);

    // Informations du produit sous forme de tableau
    $pdf->SetXY(10, 100);
    $pdf->SetFont('Arial', 'B', 9);
    $pdf->SetFillColor(235, 245, 246);
    $pdf->Cell(40, 10, 'Code Produit', 1, 0, 'C', true);
    $pdf->Cell(30, 10, 'Quantite', 1, 0, 'C', true);
    $pdf->Cell(50, 10, 'Type Produit', 1, 0, 'C', true);
    $pdf->Cell(40, 10, 'Prix Total', 1, 1, 'C', true);

    $pdf->SetFont('Arial', '', 8);
    $pdf->Cell(40, 10, $product['code'], 1);
    $pdf->Cell(30, 10, $product['weight'], 1);
    $pdf->Cell(50, 10, $product['type'], 1);
    $pdf->Cell(40, 10, $product['totalPrice'], 1, 1);

    // Informations de la cargaison sous forme de tableau
    $pdf->SetXY(10, 130);
    $pdf->SetFont('Arial', 'B', 9);
    $pdf->SetFillColor(235, 245, 246);
    $pdf->Cell(28, 8, 'Ref Cargaison', 1, 0, 'C', true);
    $pdf->Cell(28, 8, 'Type Cargaison', 1, 0, 'C', true);
    $pdf->Cell(38, 8, 'Lieu de depart', 1, 0, 'C', true);
    $pdf->Cell(38, 8, 'Lieu d\'arrivee', 1, 0, 'C', true);
    $pdf->Cell(28, 8, 'Date de depart', 1, 0, 'C', true);
    $pdf->Cell(28, 8, 'Date d\'arrivee', 1, 1, 'C', true);

    $pdf->SetFont('Arial', '', 8);
    $pdf->Cell(28, 8, $cargo['reference'], 1);
    $pdf->Cell(28, 8, $cargo['type'], 1);
    $pdf->Cell(38, 8, $cargo['departurePoint'], 1);
    $pdf->Cell(38, 8, $cargo['arrivalPoint'], 1);
    $pdf->Cell(28, 8, $cargo['leavingDate'], 1);
    $pdf->Cell(28, 8, $cargo['arrivedDate'], 1, 1);

    // Utilisation de la date actuelle pour nommer le fichier
    $todayDate = date("Y-m-d_H-i-s");
    $outputDir = '/var/www/html/gp-world/invoices/'; // Répertoire de sortie
    $filename = $outputDir . 'facture-' . $todayDate . '.pdf';
    
    // Vérifiez si le répertoire de sortie existe et est accessible en écriture
    if (!is_dir($outputDir) || !is_writable($outputDir)) {
        throw new Exception("Le répertoire $outputDir n'existe pas ou n'est pas accessible en écriture.");
    }
    
    $pdf->Output('F', $filename);
    
    return $filename;
}


function sendMailWithAttachement($senderEmail, $subject, $message, $attachment) {

    $mail = new PHPMailer(true);
    try {
        // Configurer le serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Remplacez par votre serveur SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'dialloibhazard@gmail.com'; // Remplacez par votre email
        $mail->Password = 'hefq dyrz grvp xsdb'; // Remplacez par votre mot de passe
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataires
        $mail->setFrom('dialloibhazard@gmail.com', 'CargoConsulting');
        $mail->addAddress($senderEmail);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        // Attachement
        $mail->addAttachment($attachment);

        $mail->send();
        
        //return true;
    } catch (Exception $e) {
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }
}

function sendMail($receiverEmail, $subject, $message) {
    $mail = new PHPMailer(true);
    try {
        // Configurer le serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Remplacez par votre serveur SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'dialloibhazard@gmail.com'; // Remplacez par votre email
        $mail->Password = 'hefq dyrz grvp xsdb'; // Remplacez par votre mot de passe
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataires
        $mail->setFrom('dialloibhazard@gmail.com', 'CargoConsulting');
        $mail->addAddress($receiverEmail);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        
        //return true;
    } catch (Exception $e) {
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }
}

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

                    // Generate the PDF
                    $attachment = generateInvoicePDF($sender, $receiver, $product, $cargaison);
                    // Send the email
                    sendMailWithAttachement($sender['email'], 'Facture PDF', 'Votre colis a été enregistré avec succès', $attachment);
                    break;
                }
            }
            writeJSON('cargaisons.json', $data);
            echo json_encode(["status" => "success", "message" => "Produit ajouté à la cargaison avec succès"]);
            //sendMail($_POST['emailReceiver'], 'Facture PDF', 'Votre colis a été enregistré avec succès');
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