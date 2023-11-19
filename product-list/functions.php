<?php

    include_once('./variables.php');

    function ArrayKeyExist ($is_array, $is_key) { return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]); };

    function IsTrue ($is_var) { return isset($is_var) && !empty($is_var); };

    function HeaderDisplay ($is_input = '') {
        $is_title = '';
        $is_array = empty($is_input) ? explode('-', basename(__DIR__)) : explode(' ', trim($is_input));
        for ($i = 0; $i < sizeof($is_array); $i++) $is_title .= implode('', [ ucwords($is_array[$i]), ...$i < sizeof($is_array) - 1 ? [' '] : [], ]);
        return implode('', [
            '<!doctype html>',
            '<html lang=\'en\'>',
                '<head>',
                    ...$is_title ? [ '<title>' . $is_title . '</title>' ] : [],
                    '<meta charset=\'utf-8\'>',
                    '<meta name=\'viewport\' content=\'width=device-width, initial-scale=1, shrink-to-fit=no\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css\' rel=\'stylesheet\'>',
                    ...file_exists('./style.css') ? [ '<link href=\'./style.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>' ] : [],
                '</head>',
                '<body', ...IsTrue(BootstrapClasses()['body']) ? [ ' class=\'' . BootstrapClasses()['body'] . '\'' ] : [], '>',
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
                        $is_return .= implode('', [
                            '<th', ...!$i ? [ ' scope=\'col\'' ] : [], '>',
                                ucwords($is_input[$i]),
                            '</th>',
                        ]);
                    endfor;
                $is_return .= '</tr>';
            $is_return .= '</thead>';
        endif;
        return $is_return;
    };

    $is_array = [];

    $is_title = [
        // [ 'title' => 'Codigo' ],
        [ 'title' => 'Data_Inicio', 'type' => 'date' ],
        [ 'title' => 'Data_Fim', 'type' => 'date' ],
        [ 'title' => 'Descricao', 'type' => 'text' ],
        // [ 'title' => 'Tipo_Ato' ],
        // [ 'title' => 'Numero_Ato' ],
        // [ 'maxlength' => 4, 'minlength' => 4, 'title' => 'Ano_Ato', 'type' => 'number' ],
    ];

    $is_thead = [];

    for ($i = 0; $i < sizeof($is_title); $i++):
        if (ArrayKeyExist ($is_title[$i], 'title')):
            array_push($is_thead, str_replace('_', ' ', trim($is_title[$i]['title'])));
            array_push($is_array, [
                ...ArrayKeyExist ($is_title[$i], 'maxlength') ? [ 'maxlength' => $is_title[$i]['maxlength'] ] : [],
                ...ArrayKeyExist ($is_title[$i], 'minlength') ? [ 'minlength' => $is_title[$i]['minlength'] ] : [],
                'title' => str_replace('_', ' ', trim($is_title[$i]['title'])),
                ...ArrayKeyExist ($is_title[$i], 'type') ? [ 'type' => $is_title[$i]['type'] ] : [],
                'value' => isset($_POST[strtolower(str_replace('_', ' ', trim($is_title[$i]['title'])))]) ? $_POST[strtolower(str_replace('_', ' ', trim($is_title[$i]['title'])))] : '',
            ]);
        endif;
    endfor;

    function TbodyDisplay ($is_input = []) {
        $is_return = '';
        global $is_thead;
        if (IsTrue($is_input)):
            $is_proper = [
                'data-inicio' => ArrayKeyExist ($is_input, 'data-inicio') ? (IsTrue($is_input['data-inicio']) ? $is_input['data-inicio'] : '') : '',
                'data-fim' => ArrayKeyExist ($is_input, 'data-fim') ? (IsTrue($is_input['data-fim']) ? $is_input['data-fim'] : '') : '',
                'descricao' => ArrayKeyExist ($is_input, 'descricao') ? (IsTrue($is_input['descricao']) ? $is_input['descricao'] : '') : '',
            ];
            $is_return .= '<tbody>';
                for ($i = 0; $i < 10; $i++):
                    if (IsTrue($is_thead)):
                        $is_return .= '<tr>';
                        for ($j = 0; $j < sizeof($is_thead); $j++):
                            $is_return .= implode('', [
                                '<td', ...!$j ? [ ' scope=\'row\'' ] : [] ,'>',
                                    '<p class=\'' . BootstrapClasses()['p'] . '\'>',
                                        '<a class=\'', str_replace(' ', '-', strtolower(trim($is_thead[$j]))) ,' ', BootstrapClasses()['a'], '\' href=\'#\'>',
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
        endif;
        return $is_return;
    };

?>