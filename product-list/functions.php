<?php

    include_once('./variables.php');

    function ArrayKeyExist ($is_array, $is_key) { return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]); };

    function IsTrue ($is_var) { return isset($is_var) && !empty($is_var); };

    function JSONFetch ($is_settings) { return file_exists($is_settings) ? json_decode(file_get_contents($is_settings)) : []; };

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
                '<body', ...IsTrue(Bootstrap()['body']) ? [ ' class=\'' . Bootstrap()['body'] . '\'' ] : [], '>',
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
        global $is_database;
        if (IsTrue($is_database)):
            $is_return .= '<thead>';
                $is_return .= '<tr>';
                    $is_number = 0;
                    foreach ($is_database[0] as $is_key => $is_value):
                        $is_active = $is_key === 'Codigo' || $is_key === 'Descricao';
                        $is_return .= implode('', [
                            '<td class=\'p-2\'', ...!$is_number ? [ ' scope=\'col\'' ] : [], ' style=\'width : calc(100% / ', sizeof($is_database[0]), ');\'>',
                                '<p class=\'', ...$is_active ? [ 'text-start ' ] : [], Bootstrap()['p'], '\'>',
                                    preg_replace('/[_]/', ' ', trim($is_key)),
                                '</p>',
                            '</td>', 
                        ]);
                        $is_number++;
                    endforeach;
                $is_return .= '</tr>';
            $is_return .= '</thead>';
        endif;
        return $is_return;
    };

    function Replacement ($is_input = '') {
        return implode('', [
            '<span class=\'text-danger fw-bolder fst-italic\'>',
                $is_input,
            '</span>',
        ]);
    };

    function Pattern ($is_input = '') {
        return implode('', [
            '/', $is_input, '/',
        ]);
    };

    function TbodyDisplay ($is_input = []) {
        $is_return = '';
        global $is_filtered;
        if (IsTrue($is_filtered)):
            $is_return .= '<tbody>';
                foreach ($is_filtered as $is_index):
                    $is_return .= '<tr>';
                        $is_number = 0;
                        foreach ($is_index as $is_key => $is_value):
                            $is_pattern = [
                                Pattern ($_POST['descricao']),
                                Pattern (strtolower($_POST['descricao'])),
                                Pattern (strtoupper($_POST['descricao'])),
                                Pattern (ucfirst($_POST['descricao'])),
                                Pattern (ucwords($_POST['descricao'])),
                            ];
                            $is_replacement = [
                                Replacement ($_POST['descricao']),
                                Replacement (strtolower($_POST['descricao'])),
                                Replacement (strtoupper($_POST['descricao'])),
                                Replacement (ucfirst($_POST['descricao'])),
                                Replacement (ucwords($_POST['descricao'])),
                            ];
                            $is_return .= implode('', [
                                '<td class=\'p-2\'', ...!$is_number ? [ ' scope=\'row\'' ] : [], ' style=\'width : calc(100% / ', sizeof($is_index), ');\'>',
                                    '<p class=\'', ...($is_key === 'Codigo' || $is_key === 'Descricao') ? [ 'text-start ' ] : [], Bootstrap()['p'], '\'>',
                                        preg_replace($is_pattern, $is_replacement, $is_value),
                                    '</p>',
                                '</td>',
                            ]);
                            $is_number++;
                        endforeach;
                    $is_return .= '</tr>';
                endforeach;
            $is_return .= '</tbody>';
        endif;
        return $is_return;
    };

?>