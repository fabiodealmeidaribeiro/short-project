<?php

    function HeaderDisplay () {
        $is_return = '';
        $is_return .= '<!doctype html>';
        $is_return .= '<html lang=\'en\'>';
            $is_return .= '<head>';
                $is_return .= '<title></title>';
                $is_return .= '<meta charset=\'utf-8\'>';
                $is_return .= '<meta name=\'viewport\' content=\'width=device-width, initial-scale=1, shrink-to-fit=no\'>';
                $is_return .= '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>';
                $is_return .= '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css\' rel=\'stylesheet\'>';
                $is_return .= file_exists('style.css') ? '<link href=\'style.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>' : '';
            $is_return .= '</head>';
            $is_return .= '<body>';
        return $is_return;
    };

    function FooterDisplay () {
            $is_return = '';
            $is_return .= '</body>';
            $is_return .= '<script src=\'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js\' crossorigin=\'anonymous\'></script>';
            $is_return .= '<script src=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js\' crossorigin=\'anonymous\'></script>';
            $is_return .= file_exists('script.js') ? '<script src=\'script.js\' type=\'module\' crossorigin=\'anonymous\'></script>' : '';
        $is_return .= '</html>';
        return $is_return;
    };

    function NumberGenerator ($output = '') {
        strlen($output) != 12 || !is_numeric($output) ? die('The EAN-13 number must contain exactly 12 numeric digits.') : null;
        $is_check = 0;
        for ($i = 0; $i < 12; $i += 2):
            $is_check += (int)$output[$i];
        endfor;
        for ($i = 1; $i < 12; $i += 2):
            $is_check += (int)$output[$i] * 3;
        endfor;
        $is_check = (10 - ($is_check % 10)) % 10;
        return $output .= $is_check;
    };

    function CodeImageGenerator ($output = '') {
        $is_image = imagecreatetruecolor(200, 100);
        $is_color = imagecolorallocate($is_image, 0, 0, 0);
        $is_background = imagecolorallocate($is_image, 255, 255, 255);
        imagefill($is_image, 0, 0, $is_background);
        $x = 10;
        for ($i = 0; $i < 13; $i++):
            if ($output[$i] == '1'):
                imagefilledrectangle($is_image, $x, 0, $x + 2, 100, $is_color);
            endif;
            $x += 3;
        endfor;
        header('Content-Type: image/png');
        imagepng($is_image);
        imagedestroy($is_image);
    };

    function ClassDisplay () {
        $is_return = '';
        $is_return .= ' mx-auto';
        $is_return .= ' table';
        date_default_timezone_set('America/Sao_Paulo');
        $is_return .= date('H') > 6 && date('H') < 18 ? '' : ' table-dark';
        $is_return .= ' table-striped';
        $is_return .= ' text-center';
        $is_return .= ' w-100';
        return $is_return;
    };

    function TheadDisplay ($output = []) {
        $is_return = '';
        if (empty($output)): else:
            $is_return .= '<thead>';
                $is_return .= '<tr>';
                    for ($i = 0; $i < sizeof($output); $i++):
                        $is_return .= '<th' . (!$i ? ' scope=\'col\'' : '') . '>';
                            $is_return .= strtoupper($output[$i]);
                        $is_return .= '</th>';
                    endfor;
                $is_return .= '</tr>';
            $is_return .= '</thead>';
        endif;
        return $is_return;
    };
    
?>