<?php

    function ArrayKeyExist ($is_array, $is_key) {
        return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]);
    };

    function IsTrue ($is_var) {
        return isset($is_var) && !empty($is_var);
    };

    function HeaderDisplay ($is_input = [ 'title' => 'Ean Code Generator' ]) {
        date_default_timezone_set('America/Sao_Paulo');
        $is_class = implode(' ', [
            ...(date('H') > 6 && date('H') < 18) ? [ 'bg-light' ] : [ 'bg-dark' ],
            'w-100',
        ]);
        return implode(' ', [
            '<!doctype html>',
            '<html lang=\'en\'>',
                '<head>',
                    ArrayKeyExist ($is_input, 'title') ? '<title>' . ucwords(trim($is_input['id'])) . '</title>' : '',
                    '<meta charset=\'utf-8\'>',
                    '<meta name=\'viewport\' content=\'width=device-width, initial-scale=1, shrink-to-fit=no\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css\' rel=\'stylesheet\'>',
                    file_exists('style.css') ? '<link href=\'style.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>' : '',
                '</head>',
                '<body' . (!empty($is_class) ? ' class=\'' . $is_class . '\'' : '') . '>',
        ]);
    };

    function FooterDisplay () {
        return implode(' ', [
                '</body>',
                '<script src=\'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js\' crossorigin=\'anonymous\'></script>',
                '<script src=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js\' crossorigin=\'anonymous\'></script>',
                file_exists('script.js') ? '<script src=\'script.js\' type=\'module\' crossorigin=\'anonymous\'></script>' : '',
            '</html>',
        ]);
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
            'table',
            ...(date('H') > 6 && date('H') < 18) ? [ 'table-light' ] : [ 'table-dark' ],
            'table-hover',
            'table-striped',
            'text-center',
            'w-100',
        ]);
    };

    function NavClasses ($is_input = 3) {
        date_default_timezone_set('America/Sao_Paulo');
        return implode(' ', [
            'navbar',
            'navbar-expand-lg',
            ...(date('H') > 6 && date('H') < 18) ? [ 'bg-light' ] : [ 'bg-dark' ],
            'ps-' . $is_input,
            'pe-' . $is_input,
            'pe-md-0',
            'pe-lg-' . $is_input,
            'pt-' . $is_input,
            'pb-0',
            'pb-md-0',
            'pb-lg-' . $is_input,
            'w-100',
        ]);
    };

    function ColumnClasses ($is_input = 3) {
        return implode(' ', [
            'col-12',
            'col-md-6',
            'col-lg-3',
            'ps-0',
            'pe-0',
            'pe-md-' . $is_input,
            'pe-lg-' . $is_input,
            'mb-' . $is_input,
            'mb-md-' . $is_input,
            'mb-lg-0',
        ]);
    };

    function TheadDisplay ($is_input = [ 'Order', 'Ean code' ]) {
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
                        $is_return .= '<td scope=\'row\'>' . '<p class=\'m-0 p-0\'>' . $is_order . '</p>' . '</td>';
                        $is_return .= '<td>' . '<p class=\'m-0 p-0\'>' . NumberGenerator ($is_order) . '</p>' . '</td>';
                    $is_return .= '</tr>';
                endfor;
            $is_return .= '</tbody>';
        endif;
        return $is_return;
    };

    function BootstrapModal ($is_input = [
        'id' => 'Container',
        'title' => '',
        'body' => [],
    ]) {
        $is_body = '';
        if (empty($is_input['body'])): else:
            for ($i = 0; $i < sizeof($is_input['body']); $i++):
                $is_body .= '<p class=\'' . ($i < sizeof($is_input['body']) - 1 ? 'mb-3' : 'm-0') . '\'>';
                    $is_body .= $is_input['body'][$i];
                $is_body .= '</p>';
            endfor;
        endif;
        return implode(' ', [
            '<button',
                ' id=\'modal-' . strtolower(trim($is_input['id'])) . '-button\'',
                ' class=\'d-none\'',
                ' data-bs-target=\'#Model' . ucwords(trim($is_input['id'])) . '\'',
                ' data-bs-toggle=\'modal\'',
                ' type=\'button\'',
            '>',
            '</button>',
            '<div class=\'modal fade\' id=\'Model' . ucwords(trim($is_input['id'])) . '\' tabindex=\'-1\' aria-labelledby=\'Model' . ucwords(trim($is_input['id'])) . 'Label\' aria-hidden=\'true\'>',
                '<div class=\'modal-dialog modal-dialog-centered modal-dialog-scrollable\'>',
                    '<div class=\'modal-content\'>',
                        ...!empty($is_input['title']) ? [
                            '<div class=\'modal-header\'>',
                                '<h1 class=\'modal-title fs-5 p-0\' id=\'Model' . ucwords(trim($is_input['id'])) . 'Label\'>',
                                    ucwords(trim($is_input['title'])),
                                '</h1>',
                                '<button type=\'button\' class=\'btn-close\' data-bs-dismiss=\'modal\' aria-label=\'Close\'></button>',
                            '</div>',
                        ] : [],
                        ...!empty($is_body) ? [ '<div class=\'modal-body p-3 \'>' . $is_body . '</div>' ] : [],
                        '<div class=\'modal-footer\'>',
                            '<button type=\'button\' class=\'btn btn-secondary\' data-bs-dismiss=\'modal\'>',
                                'Close',
                            '</button>',
                            '<button type=\'button\' class=\'btn btn-primary\'>',
                                'Save Image',
                            '</button>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
        ]);
    };
?>