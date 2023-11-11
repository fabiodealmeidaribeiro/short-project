<?php

    date_default_timezone_set('America/Sao_Paulo');
    $is_period = date('H') > 6 && date('H') < 18;

    function ArrayKeyExist ($is_array, $is_key) {
        return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]);
    };

    function IsTrue ($is_var) {
        return isset($is_var) && !empty($is_var);
    };

    function HeaderDisplay ($is_input = [ 'title' => 'Ean Code Generator' ]) {
        global $is_period;
        $is_class = implode(' ', [
            ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
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
        global $is_period;
        return implode(' ', [
            'table',
            ...$is_period ? [ 'table-light' ] : [ 'table-dark' ],
            'table-hover',
            'table-striped',
            'text-center',
            'w-100',
        ]);
    };

    function NavClasses ($is_input = 3) {
        global $is_period;
        return implode(' ', [
            'navbar',
            'navbar-expand-lg',
            ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
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

    function BootstrapModal ($is_input = [ 'id' => 'Container', 'title' => '', 'body' => [], 'button' => [], ]) {
        global $is_period;
        $is_class = [
            'dialog' => implode(' ', [ 'modal-dialog', 'modal-lg', 'modal-dialog-centered', 'modal-dialog-scrollable', 'modal-fullscreen-md-down' ]),
            'content' => implode(' ', [ 'modal-content' ]),
            'header' => implode(' ', [ ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ], ...$is_period ? [ 'text-dark' ] : [ 'text-light' ], 'modal-header' ]),
            'body' => implode(' ', [ ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ], ...$is_period ? [ 'text-dark' ] : [ 'text-light' ], 'modal-body', 'p-3' ]),
            'title' => implode(' ', [ 'modal-title', 'fs-5', 'p-0' ]),
            'footer' => implode(' ', [ ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ], 'modal-footer' ]),
            'button' => implode(' ', [ 'btn', ...$is_period ? [ 'btn-light' ] : [ 'btn-dark' ] ]),
        ];
        $is_body = '';
        if (empty($is_input['body'])): else:
            for ($i = 0; $i < sizeof($is_input['body']); $i++):
                $is_body .= '<p class=\'' . ($i < sizeof($is_input['body']) - 1 ? 'mb-3' : 'm-0') . '\'>';
                    $is_body .= $is_input['body'][$i];
                $is_body .= '</p>';
            endfor;
        endif;
        $is_button = '';
        if (empty($is_input['button'])): else:
            for ($i = 0; $i < sizeof($is_input['button']); $i++):
                $is_button .= '<button class=\'' . $is_class['button'] . '\' id=\'button-' . strtolower(str_replace(' ', '-', trim($is_input['button'][$i]))) . '\' type=\'button\'>';
                    $is_button .= ucwords(trim($is_input['button'][$i]));
                $is_button .= '</button>';
            endfor;
        endif;
        return implode(' ', [
            '<button class=\'d-none\' data-bs-target=\'#Model' . ucwords(trim($is_input['id'])) . '\' data-bs-toggle=\'modal\' id=\'modal-' . strtolower(trim($is_input['id'])) . '-button\' type=\'button\' ></button>',
            '<div class=\'modal fade\' id=\'Model' . ucwords(trim($is_input['id'])) . '\' tabindex=\'-1\' aria-labelledby=\'Model' . ucwords(trim($is_input['id'])) . 'Label\' aria-hidden=\'true\'>',
                '<div class=\'' . $is_class['dialog'] . '\'>',
                    '<div class=\'' . $is_class['content'] . '\'>',
                        ...!empty($is_input['title']) ? [
                            '<div class=\'' . $is_class['header'] . '\'' . (!$is_period ? ' data-bs-theme=\'dark\'' : '') . '>',
                                '<h1 class=\'' . $is_class['title'] . '\' id=\'Model' . ucwords(trim($is_input['id'])) . 'Label\'>' . ucwords(trim($is_input['title'])) . '</h1>',
                                '<button type=\'button\' class=\'btn-close\' data-bs-dismiss=\'modal\' aria-label=\'Close\'></button>',
                            '</div>',
                        ] : [],
                        ...!empty($is_body) ? [ '<div class=\'' . $is_class['body'] . '\'>' . $is_body . '</div>' ] : [],
                        '<div class=\'' . $is_class['footer'] . '\'>',
                            ...!empty($is_button) ? [ $is_button ] : [],
                            '<button class=\'' . $is_class['button'] . '\' data-bs-dismiss=\'modal\' id=\'button-close\' type=\'button\'>' . 'Close' . '</button>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
        ]);
    };
?>