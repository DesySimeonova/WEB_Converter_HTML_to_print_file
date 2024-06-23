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
    $fontSelection = isset($_POST['fontSelection']) ? $_POST['fontSelection'] : 'Helvetica';

    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', true);
    $options->set('isRemoteEnabled', true);

    $dompdf = new Dompdf($options);

    //$htmlContent = "<style>body { font-family: '{$fontSelection}'; }</style>" . $htmlContent;
    $css = "<style>
    body {
        font-family: '{$fontSelection}';
    }
    </style>";

    // Combine the CSS and the content
    $htmlContent = $css . "<div>{$htmlContent}</div>";
    // To add logic here to split HTML content into pages based on maxWords


    $dompdf->loadHtml($htmlContent);
    $dompdf->setPaper($pageSize, $pageOrientation);
    $dompdf->render();
    $dompdf->stream('generated.pdf', array('Attachment' => 0));
}
?>






