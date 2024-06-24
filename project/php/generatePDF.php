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
    $fontSize = isset($_POST['fontSize']) ? $_POST['fontSize'] : 14;

    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', true);
    $options->set('isRemoteEnabled', true);

    $dompdf = new Dompdf($options);

    //$htmlContent = "<style>body { font-family: '{$fontSelection}'; }</style>" . $htmlContent;
    $css = "<style>
    body {
        font-family: '{$fontSelection}';
        font-size: {$fontSize}pt; 
    }
    </style>";

    if ($showPageNumbers) {
        // Add page numbering script
        $htmlContent .= '<script type="text/php">
            if (isset($pdf)) { 
                $pdf->page_script(\'if ($PAGE_COUNT > 1) {
                    $pdf->text(270, 800, "Page: $PAGE_NUM of $PAGE_COUNT", "Helvetica", 10);
                }\');
            }
        </script>';
    }
   
    $htmlContent = $css . "<div>{$htmlContent}</div>";

    $dompdf->loadHtml($htmlContent);
    $dompdf->setPaper($pageSize, $pageOrientation);
    $dompdf->render();
    $dompdf->stream('generated.pdf', array('Attachment' => 0));
}
?>






