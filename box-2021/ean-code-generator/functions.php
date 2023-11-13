<?php

    function ArrayKeyExist ($is_array, $is_key) {
        return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]);
    };

    function IsTrue ($is_var) {
        return isset($is_var) && !empty($is_var);
    };

    date_default_timezone_set('America/Sao_Paulo');

    $is_time = 6;

    $is_period = (date('H') > $is_time && date('H') < ($is_time + 24 / 2));

    function SelectorClasses ($is_input = 3) {
        global $is_period;
        return [
            'body' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                'w-100',
            ]),
            'nav' => implode(' ', [
                'navbar',
                'navbar-expand-lg',
                ...$is_period ? [ 'bg-white' ] : [ 'bg-dark' ],
                'ps-' . $is_input,
                'pe-' . $is_input,
                'pe-md-0',
                'pe-lg-' . $is_input,
                'pt-' . $is_input,
                'pb-0',
                'pb-md-0',
                'pb-lg-' . $is_input,
                'w-100',
            ]),
            'input' => implode(' ', [
                'border',
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                ...$is_period ? [ 'border-light-subtle' ] : [ 'border-secondary' ],
                'form-control',
                ...$is_period ? [ 'text-dark' ] : [ 'text-light' ],
                'm-0',
                'p-2',
                'h-100',
                'w-100' ,
            ]),
            'table' => implode(' ', [
                'table',
                ...$is_period ? [ 'table-light' ] : [ 'table-dark' ],
                'table-hover',
                'table-striped',
                'text-center',
                'w-100',
            ]),
            'column' => implode(' ', [
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
            ]),
            'button' => implode(' ', [
                'border',
                ...$is_period ? [ 'border-light-subtle' ] : [ 'border-secondary' ],
                'btn',
                ...$is_period ? [ 'btn-light' ] : [ 'btn-dark' ],
                'm-0',
                'p-2',
            ]),
        ];
    };

    function ModalClasses ($is_input = 3) {
        global $is_period;
        return [
            'dialog' => implode(' ', [
                'modal-dialog',
                'modal-lg',
                'modal-dialog-centered',
                'modal-dialog-scrollable',
                'modal-fullscreen-md-down'
            ]),
            'content' => implode(' ', [
                'modal-content',
            ]),
            'header' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                ...$is_period ? [ 'text-dark' ] : [ 'text-light' ],
                'modal-header'
            ]),
            'body' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                ...$is_period ? [ 'text-dark' ] : [ 'text-light' ],
                'modal-body',
                'p-' . $is_input,
            ]),
            'title' => implode(' ', [
                'modal-title',
                'fs-5',
                'p-0',
            ]),
            'footer' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                'modal-footer'
            ]),
            'button' => implode(' ', [
                SelectorClasses()['button'],
                'ms-' . $is_input,
            ]),
        ];
    };

    function HeaderDisplay ($is_input = [ 'title' => 'Ean Code Generator' ]) {
        return implode(' ', [
            '<!doctype html>',
            '<html lang=\'en\'>',
                '<head>',
                    ArrayKeyExist ($is_input, 'title') ? '<title>' . ucwords(trim($is_input['title'])) . '</title>' : '',
                    '<meta charset=\'utf-8\'>',
                    '<meta name=\'viewport\' content=\'width=device-width, initial-scale=1, shrink-to-fit=no\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css\' rel=\'stylesheet\'>',
                    file_exists('style.css') ? '<link href=\'style.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>' : '',
                '</head>',
                '<body' . (IsTrue(SelectorClasses()['body']) ? ' class=\'' . SelectorClasses()['body'] . '\'' : '') . '>',
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

    function TheadDisplay ($is_input = [ 'Order', 'Ean code' ]) {
        $is_return = '';
        if (IsTrue($is_input)):
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
        if (IsTrue($is_input)):
            $is_proper = [
                'start' => ArrayKeyExist ($is_input, 'start-number') ? (IsTrue($is_input['start-number']) ? $is_input['start-number'] : 0) : 0,
                'end' => ArrayKeyExist ($is_input, 'end-number') ? (IsTrue($is_input['end-number']) ? $is_input['end-number'] : 0) : 0,
                'cnpj' => ArrayKeyExist ($is_input, 'cnpj-number') ? (IsTrue($is_input['cnpj-number']) ? $is_input['cnpj-number'] : '') : '',
            ];
            $is_condition = !$is_proper['end'] || !$is_proper['start'] || !$is_proper['cnpj'] || $is_proper['end'] - $is_proper['start'] <= 0;
            if ($is_condition): else:
                $is_return .= '<tbody>';
                    for ($i = 0; $i <= $is_proper['end'] - $is_proper['start']; $i++):
                        $is_order = '';
                        $is_order .= 789;
                        $is_number = $is_proper['start'] + $i;
                        $is_order .= substr(preg_replace('/[^0-9]/', '', $is_proper['cnpj']), 0, 9 - strlen($is_number));
                        $is_order .= $is_number;
                        $is_return .= '<tr>';
                            $is_return .= '<td scope=\'row\'>' . '<p class=\'m-0 p-0\'>' . $is_order . '</p>' . '</td>';
                            $is_return .= '<td>' . '<p class=\'m-0 p-0\'>' . NumberGenerator ($is_order) . '</p>' . '</td>';
                        $is_return .= '</tr>';
                    endfor;
                $is_return .= '</tbody>';
            endif;
        endif;
        return $is_return;
    };

    function ValueConverter ($is_input = []) {
        $is_proper = [
            'type' => ArrayKeyExist ($is_input, 'type') ? (IsTrue($is_input['type']) ? $is_input['type'] : 'id') : 'id',
            'value' => ArrayKeyExist ($is_input, 'value') ? (IsTrue($is_input['value']) ? $is_input['value'] : '') : '',
        ];
        $is_value = $is_proper['value'];
        $is_value = preg_replace('/[ÁÀÂÃ]/', 'A', $is_value);
        $is_value = preg_replace('/[áàâã]/', 'a', $is_value);
        $is_value = preg_replace('/[ÉÈÊ]/', 'E', $is_value);
        $is_value = preg_replace('/[éèê]/', 'e', $is_value);
        $is_value = preg_replace('/[ÍÌ]/', 'I', $is_value);
        $is_value = preg_replace('/[íì]/', 'i', $is_value);
        $is_value = preg_replace('/[ÓÒÔÕ]/', 'O', $is_value);
        $is_value = preg_replace('/[óòôõ]/', 'o', $is_value);
        $is_value = preg_replace('/[ÚÙÛ]/', 'U', $is_value);
        $is_value = preg_replace('/[úùû]/', 'u', $is_value);
        $is_value = preg_replace('/[Ç]/', 'C', $is_value);
        $is_value = preg_replace('/[ç]/', 'c', $is_value);
        $is_type = $is_proper['type'] === 'id';
        $is_value = $is_type ? str_replace(' ', '-', strtolower(trim($is_value))) : '#' . str_replace(' ', '', ucwords(trim($is_value)));
        return $is_value;
    };

    function ModalCall ($is_input = []) {
        $is_proper = [
            'title' => ArrayKeyExist ($is_input, 'title') ? (IsTrue($is_input['title']) ? $is_input['title'] : 'About Me') : 'About Me',
            'selector' => ArrayKeyExist ($is_input, 'selector') ? (IsTrue($is_input['selector']) ? $is_input['selector'] : 'a') : 'a',
        ];
        $is_id = ValueConverter([ 'type' => 'id', 'value' => $is_proper['title'] ]);
        $is_selector = strtolower(trim($is_proper['selector'])) === 'a';
        $is_title = ucwords(trim($is_proper['title']));
        $is_target = ValueConverter([ 'type' => 'target', 'value' => $is_proper['title'] ]);
        $is_style = '';
        $is_object = [
            'bottom' => !$is_selector ? '1rem' : 0,
            'left' => '50%',
            'margin' => 0,
            'padding' => 0,
            'position' => 'fixed',
            'transform' => 'translateX(-50%)',
            'z-index' => 9999,
        ];
        foreach ($is_object as $is_key => $is_value):
            $is_style .= $is_key . ' : ' . $is_value . ';';
            $is_style .= ' ';
        endforeach;
        return implode(' ', [
            ...!$is_selector ? [
                '<button',
                    IsTrue(SelectorClasses()['button']) ? ' class=\'' . SelectorClasses()['button'] . '\'' : '',
                    ' data-bs-toggle=\'modal\'',
                    ' data-bs-target=\'' . $is_target . '\'',
                    ' style=\'' . trim($is_style) . '\'',
                    ' type=\'button\'',
                '>',
            ] : [],
                ...$is_selector ? [
                    '<p id=\'' . $is_id . '\' style=\'' . trim($is_style) . '\'>',
                        '<a data-bs-toggle=\'modal\' data-bs-target=\'' . $is_target . '\'>'
                ] : [],
                    $is_title,
                ...$is_selector ? [ '</a>', '</p>' ] : [],
            ...!$is_selector ? [ '</button>' ] : [],
        ]);
    };

    function BootstrapModal ($is_input = [ 'id' => 'Container', 'title' => '', 'body' => [], 'button' => [], ]) {
        $is_body = '';
        if (IsTrue($is_input['body'])):
            for ($i = 0; $i < sizeof($is_input['body']); $i++):
                $is_body .= '<p class=\'' . ($i < sizeof($is_input['body']) - 1 ? 'mb-3' : 'm-0') . '\'>';
                    $is_body .= $is_input['body'][$i];
                $is_body .= '</p>';
            endfor;
        endif;
        $is_button = '';
        if (IsTrue($is_input['button'])):
            for ($i = 0; $i < sizeof($is_input['button']); $i++):
                $is_id = '';
                $is_id .= 'modal';
                $is_id .= '-';
                $is_id .= str_replace(' ', '-', trim($is_input['button'][$i]));
                $is_id .= '-';
                $is_id .= 'button';
                $is_button .= '<button';
                    $is_button .= ' class=\'' . ModalClasses()['button'] . '\'';
                    $is_button .= IsTrue($is_id) ? ' id=\'' . strtolower($is_id) . '\'' : '';
                    $is_button .= ' type=\'button\'';
                $is_button .= '>';
                    $is_button .= ucwords(trim($is_input['button'][$i]));
                $is_button .= '</button>';
            endfor;
        endif;
        $is_id = strtolower(str_replace(' ', '-', trim($is_input['id'])));
        $is_title = [
            'button' => 'modal-' . $is_id . '-button',
            'target' => 'model-' . $is_id . '-container',
            'label' => 'model-' . $is_id . '-label',
        ];
        global $is_period;
        return implode(' ', [
            '<button class=\'d-none\' data-bs-target=\'#' . $is_title['target'] . '\' data-bs-toggle=\'modal\' id=\'' . $is_title['button'] . '\' type=\'button\' ></button>',
            '<div aria-labelledby=\'' . $is_title['label'] . '\' aria-hidden=\'true\' class=\'modal fade\' id=\'' . $is_title['target'] . '\' tabindex=\'-1\'>',
                '<div', IsTrue(ModalClasses()['dialog']) ? ' class=\'' . ModalClasses()['dialog'] . '\'' : '', ' id=\'modal-dialog\'>',
                    '<div', IsTrue(ModalClasses()['content']) ? ' class=\'' . ModalClasses()['content'] . '\'' : '', ' id=\'modal-content\'>',
                        ...IsTrue($is_input['title']) ? [
                            '<div', IsTrue(ModalClasses()['header']) ? ' class=\'' . ModalClasses()['header'] . '\'' : '', !$is_period ? ' data-bs-theme=\'dark\'' : '', ' id=\'modal-header\'', '>',
                                '<h1', IsTrue(ModalClasses()['title']) ? ' class=\'' . ModalClasses()['title'] . '\'' : '', ' id=\'' . $is_title['label'] . '\'', '>',
                                    ucwords(trim($is_input['title'])),
                                '</h1>',
                                '<button type=\'button\' class=\'btn-close\' data-bs-dismiss=\'modal\' aria-label=\'Close\'></button>',
                            '</div>',
                        ] : [],
                        ...IsTrue($is_body) ? [ '<div', ModalClasses()['body'] ? ' class=\'' . ModalClasses()['body'] . '\'' : '', ' id=\'modal-body\'>' . $is_body . '</div>' ] : [],
                        '<div class=\'' . ModalClasses()['footer'] . '\' id=\'modal-footer\'>',
                            ...IsTrue($is_button) ? [ $is_button ] : [],
                            '<button', IsTrue(ModalClasses()['button']) ? ' class=\'' . ModalClasses()['button'] . '\'' : '', ' data-bs-dismiss=\'modal\' id=\'modal-close-button\' type=\'button\'>',
                                'Close',
                            '</button>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
        ]);
    };
    
?>