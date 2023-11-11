<?php

    function ArrayKeyExist ($is_array, $is_key) {
        return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]);
    };

    function IsTrue ($is_var) {
        return isset($is_var) && !empty($is_var);
    };

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
            $is_return .= '<body class=\'w-100\'>';
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

    function NumberGenerator ($is_input = '') {
        strlen($is_input) != 12 || !is_numeric($is_input) ? die('The EAN-13 number must contain exactly 12 numeric digits.') : null;
        $is_check = 0;
        for ($i = 0; $i < 12; $i += 2):
            $is_check += (int)$is_input[$i];
        endfor;
        for ($i = 1; $i < 12; $i += 2):
            $is_check += (int)$is_input[$i] * 3;
        endfor;
        $is_check = (10 - ($is_check % 10)) % 10;
        return $is_input .= $is_check;
    };

    function ImageGenerator ($is_input = '') {
        $is_image = imagecreatetruecolor(200, 100);
        $is_color = imagecolorallocate($is_image, 0, 0, 0);
        $is_background = imagecolorallocate($is_image, 255, 255, 255);
        imagefill($is_image, 0, 0, $is_background);
        $x = 10;
        for ($i = 0; $i < 13; $i++):
            if ($is_input[$i] == '1'):
                imagefilledrectangle($is_image, $x, 0, $x + 2, 100, $is_color);
            endif;
            $x += 3;
        endfor;
        header('Content-Type: image/png');
        imagepng($is_image);
        imagedestroy($is_image);
    };

    function TableClasses () {
        date_default_timezone_set('America/Sao_Paulo');
        return implode(' ', [
            'mx-auto',
            'table',
            ...!(date('H') > 6 && date('H') < 18) ? [ 'table-dark' ] : [],
            'table-striped',
            'text-center',
            'w-100',
        ]);
    };

    function NavClasses () {
        return implode(' ', [
            'navbar',
            ...!(date('H') > 6 && date('H') < 18) ? [ 'bg-dark', 'navbar-dark' ] : [],
            'p-2',
            'w-100',
        ]);
    };

    function ColumnClasses () {
        return implode(' ', [
            'col-12',
            'col-md-6',
            'col-lg-3',
        ]);
    };

    function TheadDisplay ($is_input = [ 'Number', 'Order', 'Ean code', 'Image code' ]) {
        $is_return = '';
        if (empty($is_input)): else:
            $is_return .= '<thead>';
                $is_return .= '<tr>';
                    for ($i = 0; $i < sizeof($is_input); $i++):
                        $is_return .= '<th' . (!$i ? ' scope=\'col\'' : '') . '>';
                            $is_return .= strtoupper($is_input[$i]);
                        $is_return .= '</th>';
                    endfor;
                $is_return .= '</tr>';
            $is_return .= '</thead>';
        endif;
        return $is_return;
    };

    function TbodyDisplay ($is_input = []) {
        $is_return = '';
        if (empty($is_input)): else:
            $is_return .= '<tbody>';
                for ($i = 0; $i <= $is_input['end-number'] - $is_input['start-number']; $i++):
                    $is_order = '';
                    $is_order .= 789;
                    $is_start = $is_input['start-number'] + $i;
                    $is_order .= substr(preg_replace('/[^0-9]/', '', $is_input['cnpj-number']), 0, 9 - strlen($is_start));
                    $is_order .= $is_start;
                    $is_return .= '<tr>';
                        $is_return .= '<td scope=\'row\'>' . $i . '</td>';
                        $is_return .= '<td>' . $is_order . '</td>';
                        $is_return .= '<td>' . NumberGenerator ($is_order) . '</td>';
                        $is_return .= '<td>' . NumberGenerator ($is_order) . '</td>';
                    $is_return .= '</tr>';
                endfor;
            $is_return .= '</tbody>';
        endif;
        return $is_return;
    };

?>