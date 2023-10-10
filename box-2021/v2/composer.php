<?php
// Inclua a biblioteca TCPDF
require_once('vendor/autoload.php');

// Crie uma instância da classe TCPDF
$pdf = new TCPDF();

// Defina o tamanho da página e a orientação (opcional)
$pdf->SetPageSize('A4');
$pdf->SetPageOrientation('P');

// Adicione uma página em branco
$pdf->AddPage();

// Dados para o código de barras
$barcodeValue = '123456789';

// Crie um objeto de código de barras Code 128
$barcode = new TCPDFBarcode($barcodeValue, 'C128');

// Desenhe o código de barras na página
$pdf->write1DBarcode($barcode, 'C128', '', '', '', 18, 0.4, $style = '', 'N');

// Saída do PDF
$pdf->Output('barcode.pdf', 'I');
?>
