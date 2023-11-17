<?php

    // "Codigo" : "1101.00.10",
    // "Descricao" : "De trigo",
    // "Data_Inicio" : "01/04/2022",
    // "Data_Fim" : "31/12/9999",
    // "Tipo_Ato" : "Res Camex",
    // "Numero_Ato" : "272",
    // "Ano_Ato" : "2021"

    $is_array = [];

    $is_title = [
        [
            'title' => 'Data_Inicio',
            'type' => 'date',
        ],
        [
            'title' => 'Data_Fim',
            'type' => 'date',
        ],
        [
            'title' => 'Descricao',
            'type' => 'text',
        ],
    ];

    $is_thead = [];

    for ($i = 0; $i < sizeof($is_title); $i++):
        array_push($is_thead, str_replace('_', ' ', $is_title[$i]['title']));
        array_push($is_array, [
            'title' => str_replace('_', ' ', $is_title[$i]['title']),
            'type' => strtolower($is_title[$i]['type']),
            'value' => isset($_POST[strtolower(str_replace('_', '-', $is_title[$i]['title']))])
            ? $_POST[strtolower(str_replace('_', '-', $is_title[$i]['title']))]
            : '',
        ]);
    endfor;

    function ArrayKeyExist ($is_array, $is_key) {
        return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]);
    };

    function IsTrue ($is_var) {
        return isset($is_var) && !empty($is_var);
    };

    date_default_timezone_set('America/Sao_Paulo');

    $is_period = !(date('H') > 6 && date('H') < (6 + 24 / 2));

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
                // 'table-hover',
                'table-striped',
                'text-center',
                'm-0',
                'p-0',
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
            'p' => implode(' ', [
                'd-inline',
                'm-0',
                'p-0',
                
            ]),
            'a' => implode(' ', [
                'fst-italic',
                'fw-semibold',
                'm-0',
                'p-0',
                'text-decoration-none',
                ...$is_period ? [ 'text-dark' ] : [ 'text-light' ],
            ]),
        ];
    };

    function HeaderDisplay () {
        $is_title = '';
        $is_array = explode('-', basename(__DIR__));
        for ($i = 0; $i < sizeof($is_array); $i++):
            $is_title .= ucwords($is_array[$i]);
            $is_title .= $i < sizeof($is_array) - 1 ? ' ' : '';
        endfor;
        return implode('', [
            '<!doctype html>',
            '<html lang=\'en\'>',
                '<head>',
                    '<title>' . $is_title . '</title>',
                    '<meta charset=\'utf-8\'>',
                    '<meta name=\'viewport\' content=\'width=device-width, initial-scale=1, shrink-to-fit=no\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css\' rel=\'stylesheet\'>',
                    ...file_exists('style.css') ? [ '<link href=\'style.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>' ] : [],
                '</head>',
                '<body' . (IsTrue(SelectorClasses()['body']) ? ' class=\'' . SelectorClasses()['body'] . '\'' : '') . '>',
        ]);
    };

    function FooterDisplay () {
        return implode('', [
                '</body>',
                '<script src=\'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js\' crossorigin=\'anonymous\'></script>',
                '<script src=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js\' crossorigin=\'anonymous\'></script>',
                '<script src=\'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js\' crossorigin=\'anonymous\'></script>',
                ...file_exists('./script.js') ? [ '<script src=\'./script.js\' type=\'module\' crossorigin=\'anonymous\'></script>' ] : [],
            '</html>',
        ]);
    };

    function TheadDisplay ($is_input = []) {
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
        global $is_thead;
        if (IsTrue($is_input)):
            $is_proper = [
                'data-inicio' => ArrayKeyExist ($is_input, 'data-inicio') ? (IsTrue($is_input['data-inicio']) ? $is_input['data-inicio'] : '') : '',
                'data-fim' => ArrayKeyExist ($is_input, 'data-fim') ? (IsTrue($is_input['data-fim']) ? $is_input['data-fim'] : '') : '',
                'descricao' => ArrayKeyExist ($is_input, 'descricao') ? (IsTrue($is_input['descricao']) ? $is_input['descricao'] : '') : '',
            ];
            // if (!$is_proper['data-inicio'] && !$is_proper['data-fim'] && !$is_proper['descricao']): else:
                $is_return .= '<tbody>';
                    for ($i = 0; $i < 10; $i++):
                        if (IsTrue($is_thead)):
                            $is_return .= '<tr>';
                            for ($j = 0; $j < sizeof($is_thead); $j++):
                                $is_return .= implode('', [
                                    '<td' . (!$j ? ' scope=\'row\'' : '') . '>',
                                        '<p class=\'' . SelectorClasses()['p'] . '\'>',
                                            '<a class=\'' . str_replace(' ', '-', strtolower(trim($is_thead[$j]))) . ' ' . SelectorClasses()['a'] . '\' href=\'#\'>',
                                                'Fábio',
                                            '</a>',
                                        '</p>',
                                    '</td>',
                                ]);
                            endfor;
                            $is_return .= '</tr>';
                        endif;
                    endfor;
                $is_return .= '</tbody>';
            // endif;
        endif;
        return $is_return;
    };

?>