<?php
require_once '../dompdf/autoload.inc.php';

use Dompdf\Dompdf;
use Dompdf\Options;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $htmlContent = $_POST['htmlContent'];
    $maxWords = isset($_POST['maxWords']) ? $_POST['maxWords'] : null;
    $showPageNumbers = isset($_POST['pageNumberOption']) && $_POST['pageNumberOption'] === 'show';
    $pageSize = isset($_POST['pageSize']) ? $_POST['pageSize'] : 'Letter';
    $pageOrientation = isset($_POST['pageOrientation']) ? $_POST['pageOrientation'] : 'Portrait';

    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', true);
    $options->set('isRemoteEnabled', true);

    $dompdf = new Dompdf($options);

    // To add logic here to split HTML content into pages based on maxWords


    $dompdf->loadHtml($htmlContent);
    $dompdf->setPaper($pageSize, $pageOrientation);
    $dompdf->render();
    $dompdf->stream('generated.pdf', array('Attachment' => 0));
}
?>






