<?php

    include_once('./variables.php');

    function ArrayKeyExist ($is_array, $is_key) { return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]); };

    function IsTrue ($is_var) { return isset($is_var) && !empty($is_var); };

    function JSONFetch ($is_settings) { return file_exists($is_settings) ? json_decode(file_get_contents($is_settings)) : []; };

    function HeaderDisplay ($is_input = '') {
        $is_title = '';
        $is_array = empty($is_input) ? explode('-', basename(__DIR__)) : explode(' ', trim($is_input));
        for ($i = 0; $i < sizeof($is_array); $i++) $is_title .= implode('', [ ucwords($is_array[$i]), ...$i < sizeof($is_array) - 1 ? [ ' ' ] : [], ]);
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
                '<body', ...IsTrue(BSClass()['body']) ? [ ' class=\'' . BSClass()['body'] . '\'' ] : [], '>',
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
                        $is_return .= implode('', [ '<td class=\'p-2\'', ...!$is_number ? [ ' scope=\'col\'' ] : [], ' style=\'width : calc(100% / ', sizeof($is_database[0]), ');\'>', '<p class=\'', ...$is_active ? [ 'text-start ' ] : [], BSClass()['p'], '\'>', preg_replace('/[_]/', ' ', trim($is_key)), '</p>', '</td>', ]);
                        $is_number++;
                    endforeach;
                $is_return .= '</tr>';
            $is_return .= '</thead>';
        endif;
        return $is_return;
    };

    function Replacement ($is_input = '') {
        return implode('', [ '<span class=\'text-danger fw-bolder fst-italic\'>', $is_input, '</span>', ]);
    };

    function Pattern ($is_input = '') {
        return implode('', [ '/', $is_input, '/', ]);
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
                            $is_pattern = [ Pattern ($_POST['descricao']), Pattern (strtolower($_POST['descricao'])), Pattern (strtoupper($_POST['descricao'])), Pattern (ucfirst($_POST['descricao'])), Pattern (ucwords($_POST['descricao'])), ];
                            $is_replacement = [ Replacement ($_POST['descricao']), Replacement (strtolower($_POST['descricao'])), Replacement (strtoupper($_POST['descricao'])), Replacement (ucfirst($_POST['descricao'])), Replacement (ucwords($_POST['descricao'])), ];
                            $is_return .= implode('', [ '<td class=\'p-2\'', ...!$is_number ? [ ' scope=\'row\'' ] : [], ' style=\'width : calc(100% / ', sizeof($is_index), ');\'>', '<p class=\'', ...($is_key === 'Codigo' || $is_key === 'Descricao') ? [ 'text-start ' ] : [], BSClass()['p'], '\'>', preg_replace($is_pattern, $is_replacement, $is_value), '</p>', '</td>', ]);
                            $is_number++;
                        endforeach;
                    $is_return .= '</tr>';
                endforeach;
            $is_return .= '</tbody>';
        endif;
        return $is_return;
    };

    function ValueConverter ($is_input = []) {
        $is_proper = [
            'type' => ArrayKeyExist ($is_input, 'type') ? (IsTrue($is_input['type']) ? strtolower(trim($is_input['type'])) : 'id') : 'id',
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
        if ($is_proper['type'] === 'id') return str_replace(' ', '-', strtolower(trim($is_value)));
        if ($is_proper['type'] === 'label' || $is_proper['type'] === 'target') return str_replace(' ', '', ucwords(trim($is_value . ' ' . $is_proper['type'])));
    };

    function SetStyle ($is_input = '') {
        global $is_period;
        for ($i = 1; $i <= 6; $i++) $is_input = str_replace('<h' . $i, '<h' . $i . ' class=\'p-0 m-0\'', $is_input);
        $is_input = str_replace('<p', '<p class=\'p-0 m-0\'', $is_input);
        $is_input = str_replace('<li', '<li class=\'p-0 m-0\'', $is_input);
        $is_input = str_replace('<ul', '<ul class=\'p-0 my-3 list-unstyled\'', $is_input);
        $is_input = str_replace('<a', '<a class=\'' . implode(' ', [ 'fst-italic', 'fw-semibold', 'm-0', 'p-0', 'text-decoration-none', ...$is_period ? [ 'text-dark' ] : [ 'text-light' ], ]) . '\'', $is_input);
        $is_input = str_replace('<blockquote', '<blockquote class=\'m-0 p-0\' ', $is_input);
        return $is_input;
    };

    function BSCall ($is_input = []) {
        $is_proper = [
            'array' => ArrayKeyExist ($is_input, 'array') ? (IsTrue($is_input['array']) ? $is_input['array'] : []) : [],
            'selector' => ArrayKeyExist ($is_input, 'selector') ? (IsTrue($is_input['selector']) ? strtolower(trim($is_input['selector'])) : 'a') : 'a',
        ];
        $is_object = [
            'align-content' => 'center',
            'align-items' => 'center',
            'display' => 'flex',
            'flex-wrap' => 'wrap',
            'gap' => '.5rem',
            'justify-content' => 'center',
            'padding' => '1rem',
            'width' => '100%',
        ];
        $is_style = '';
        foreach ($is_object as $is_key => $is_value):
            $is_style .= implode('', [
                $is_key . ' : ' . $is_value . ';',
                ' ',
            ]);
        endforeach;
        $is_array = [];
        $is_selector = strtolower(trim($is_proper['selector'])) === 'a';
        if (IsTrue($is_proper['array'])):
            $is_array = array_merge($is_array, [ '<div class=\'footer-container w-100\'>', '<footer class=\'footer\' style=\'' . trim($is_style) . '\'>' ]);
                for ($i = 0; $i < sizeof($is_proper['array']); $i++):
                    $is_index = $is_proper['array'][$i];
                    $is_id = ValueConverter([ 'type' => 'id', 'value' => $is_index ]);
                    $is_target = ValueConverter([ 'type' => 'target', 'value' => $is_index ]);
                    $is_array = array_merge($is_array, [
                        ...!$is_selector ? [ '<button', ...IsTrue(BSClass()['button']) ? [ ' class=\'' . BSClass()['button'] . '\''] : [], ' data-bs-toggle=\'modal\' data-bs-target=\'#' . $is_target . '\' type=\'button\'>' ] : [],
                        ...$is_selector ? [ '<p', ...IsTrue(BSClass()['p']) ? [ ' class=\'' . BSClass()['p'] . '\'' ] : [], ' id=\'' . $is_id . '\'>', '<a', ...IsTrue(BSClass()['a']) ? [ ' class=\'' . BSClass()['a'] . '\'' ] : [], ' data-bs-toggle=\'modal\' data-bs-target=\'#' . $is_target . '\' href=\'#\'>' ] : [],
                        ucwords(trim($is_index)),
                        ...$is_selector ? [ '</a>', '</p>' ] : [],
                        ...$is_selector ? [ ...$i < sizeof($is_proper['array']) - 1 ? [ '<p', ...IsTrue(BSClass()['p']) ? ' class=\'' . BSClass()['p'] . '\'>' : [], '.', '</p>' ] : [] ] : [],
                        ...!$is_selector ? [ '</button>' ] : [],
                    ]);
                endfor;
            $is_array = array_merge($is_array, [ '</footer>', '</div>' ]);
        endif;
        return implode('', $is_array);
    };

    function BSContainer ($is_input = [ 'title' => '', 'body' => [], 'button' => [], ]) {
        $is_button = '';
        global $is_period;
        if (ArrayKeyExist($is_input, 'button')):
            for ($i = 0; $i < sizeof($is_input['button']); $i++):
                $is_button .= implode('', [ '<button', ...IsTrue(BSMClass()['button']) ? [ ' class=\'' . BSMClass()['button'] . '\'' ] : [], ...IsTrue($is_input['button'][$i]) ? [ ' id=\'' . strtolower(str_replace(' ', '-', trim($is_input['button'][$i]))) . '\'' ] : [], ' type=\'button\'>', ucwords(trim($is_input['button'][$i])), '</button>', ]);
            endfor;
        endif;
        $is_return = '';
        $is_index = ArrayKeyExist($is_input, 'title') ? $is_input['title'] : '';
        if (IsTrue($is_index)):
            $is_id = ValueConverter([ 'type' => 'id', 'value' => $is_index ]);
            $is_label = ValueConverter([ 'type' => 'label', 'value' => $is_index ]);
            $is_target = ValueConverter([ 'type' => 'target', 'value' => $is_index ]);
            $is_return .= implode('', [
                '<button class=\'d-none\' data-bs-target=\'#' . $is_target . '\' data-bs-toggle=\'modal\' id=\'' . $is_id . '\' type=\'button\' ></button>',
                '<div aria-labelledby=\'' . $is_label . '\' aria-hidden=\'true\' class=\'modal fade\' id=\'' . $is_target . '\' tabindex=\'-1\'>',
                    '<div', ...IsTrue(BSMClass()['dialog']) ? [ ' class=\'' . BSMClass()['dialog'] . '\'' ] : [], ' id=\'dialog\'>',
                        '<div', ...IsTrue(BSMClass()['content']) ? [ ' class=\'' . BSMClass()['content'] . '\'' ] : [], ' id=\'content\'>',
                            ...IsTrue($is_input['title']) ? [ '<div', ...IsTrue(BSMClass()['header']) ? [ ' class=\'' . BSMClass()['header'] . '\'' ] : [], ...!$is_period ? [ ' data-bs-theme=\'dark\'' ] : [], ' id=\'header\'>', '<h1', ...IsTrue(BSMClass()['title']) ? [ ' class=\'' . BSMClass()['title'] . '\'' ] : [], ' id=\'' . $is_label . '\'>', ucwords(trim($is_input['title'])), '</h1>', '<button type=\'button\' class=\'btn-close\' data-bs-dismiss=\'modal\' aria-label=\'Close\'></button>', '</div>', ] : [],
                            '<div', ...IsTrue(BSMClass()['body']) ? [ ' class=\'' . BSMClass()['body'] . '\'' ] : [], ' id=\'body\'>', ...ArrayKeyExist ($is_input, 'body') ? [ $is_input['body'] ] : [], '</div>',
                            '<div', ...IsTrue(BSMClass()['footer']) ? [ ' class=\'' . BSMClass()['footer'] . '\'' ] : [], 'id=\'footer\'>', ...IsTrue($is_button) ? [ $is_button ] : [], '<button', ...IsTrue(BSMClass()['button']) ? [ ' class=\'' . BSMClass()['button'] . '\'' ] : [], ' data-bs-dismiss=\'modal\' id=\'close\' type=\'button\'>', 'Close', '</button>', '</div>',
                        '</div>',
                    '</div>',
                '</div>',
            ]);
        endif;
        return $is_return;
    };

    function ContainerBuilder ($is_input = [ 'footer' ]) {
        $is_return = '';
        $is_array = array_filter(scandir(implode('/', $is_input)), function ($is_file) { return pathinfo($is_file, PATHINFO_EXTENSION) === 'html'; });
        foreach (array_keys(array_diff($is_array, [])) as $is_index):
            $is_archive = implode('', [ '.', '/', implode('/', $is_input), '/', $is_array[$is_index] ]);
            $is_return .= BSContainer ([
                'title' => str_replace('-', ' ', str_replace('.html', '', $is_array[$is_index])),
                'body' => file_exists($is_archive) ? SetStyle(file_get_contents($is_archive)) : '',
            ]);
        endforeach;
        return $is_return;
    };

    function CallerBuilder ($is_input = [ 'footer' ]) {
        $is_modal = [];
        $is_array = array_filter(scandir(implode('/', $is_input)), function ($is_file) { return pathinfo($is_file, PATHINFO_EXTENSION) === 'html'; });
        foreach (array_keys(array_diff($is_array, [])) as $is_index):
            $is_archive = implode('', [ '.', '/', implode('/', $is_input), '/', $is_array[$is_index] ]);
            array_push($is_modal, str_replace('-', ' ', str_replace('.html', '', $is_array[$is_index])));
        endforeach;
        return BSCall ([ 'selector' => 'a', 'array' => $is_modal ]);
    };

?>