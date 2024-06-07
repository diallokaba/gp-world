<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Twilio\Rest\Client;
require '/var/www/html/New-projetTS/vendor/autoload.php';
require '/var/www/html/New-projetTS/vendor/setasign/fpdf/fpdf.php';
// Fonction pour envoyer un SMS
function envoyerSMS($destinataire, $message) {
    // Vos identifiants Twilio
    $sid = 'VOTRE_SID_TWILIO';
    $token = 'VOTRE_TOKEN_TWILIO';
    $twilioNumber = 'VOTRE_NUMERO_TWILIO';

    // Initialisation du client Twilio
    $twilio = new Client($sid, $token);

    try {
        // Envoi du message SMS
        $twilio->messages->create(
            $destinataire,
            [
                "from" => $twilioNumber,
                "body" => $message
            ]
        );
        return true;
    } catch (Exception $e) {
        error_log("Erreur lors de l'envoi du SMS: " . $e->getMessage());
        return false;
    }
}


function envoyerEmail($destinataire, $sujet, $message, $pdfContent) {
    $mail = new PHPMailer(true);
    try {
        // Configurer le serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Remplacez par votre serveur SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'sodadiop065@gmail.com'; // Remplacez par votre email
        $mail->Password = 'nflr yemm rlva ibhd'; // Remplacez par votre mot de passe
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataires
        $mail->setFrom('sodadiop065@gmail.com', 'Cargo');
        $mail->addAddress($destinataire);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = $sujet;
        $mail->Body    = $message;

        // Pièce jointe PDF
        $mail->addStringAttachment($pdfContent, 'details_produit.pdf');

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}

function generatePDF($product) {
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, 'Details du Produit', 0, 1, 'C');

    $pdf->SetFont('Arial', '', 12);
    foreach ($product as $key => $value) {
        if (is_array($value)) {
            $value = json_encode($value);
        }
        $pdf->Cell(50, 10, ucfirst($key) . ':', 1);
        $pdf->Cell(0, 10, $value, 1, 1);
    }

    return $pdf->Output('S');
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
            "sender" => $sender['firstname'],
            "receiver" => $receiver['firstname']
         
        ];

        $data = readJSON('cargaisons.json');
        foreach ($data['cargaisons'] as &$cargaison) {
            if ($cargaison['id'] == $cargoId) {
                if (!isset($cargaison['products'])) {                    
                    $cargaison['products'] = [];
                }
                if($cargaison['maxWeight'] != 'null'){
                    $cargaison['maxWeight'] = $_POST['updatedQuantity'];
                } else if($cargaison['maxNbrProduct'] != 'null'){
                    $cargaison['maxNbrProduct'] = $_POST['updatedQuantity'];
                }
                $cargaison['totalAmount'] = $_POST['totalAmount'];
                $cargaison['products'][] = $product;
                break;
            }
        }
        writeJSON('cargaisons.json', $data);
     
        echo json_encode(["status" => "success", "message" => "Produit ajouté à la cargaison avec succès"]);

        // Générer le PDF
        $pdfContent = generatePDF($product);

        // Envoie mail
        if (!empty($sender['email'])) {
            envoyerEmail($sender['email'], 'Enregistrement colis', 'Votre colis ' . $product['code'] . ' vient d\'être mis dans la cargaison', $pdfContent);
            envoyerEmail($receiver['email'], 'Enregistrement colis', 'Votre colis ' . $product['code'] . ' vient d\'être mis dans la cargaison', $pdfContent);
            
        }
   
        exit;
    }

    if ($action === 'addUserSender') {
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

    if ($action === 'addUserReceiver') {
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
?>
