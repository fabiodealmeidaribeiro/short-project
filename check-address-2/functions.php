<?php

    include_once('./variables.php');

    function ArrayKeyExist ($is_array, $is_key) { return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]); };

    function IsTrue ($is_var) { return isset($is_var) && !empty($is_var); };

    function IsArrayTrue ($is_var) { return isset($is_var) && is_array($is_var) && !empty($is_var); };

    function JSONFetch ($is_settings) { return file_exists($is_settings) ? json_decode(file_get_contents($is_settings)) : []; };

    function ConvertToID ($is_input = '') { return strtolower(str_replace(' ', '-', trim($is_input))); };

    function CheckKeyValueEquality ($is_input = []) {
        $is_proper = [ 'array' => ArrayKeyExist ($is_input, 'array') ? $is_input['array'] : [], 'key' => ArrayKeyExist ($is_input, 'key') ? $is_input['key'] : '', 'value' => ArrayKeyExist ($is_input, 'value') ? $is_input['value'] : '' ];
        foreach ($is_proper['array'] as $is_object): if (get_object_vars($is_object)[$is_proper['key']] !== $is_proper['value']): return false; endif; endforeach; return true;
    };

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
                '<body', ...IsTrue(AllClasses()['body']) ? [ ' class=\'' . AllClasses()['body'] . '\'' ] : [], '>',
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

    function LinkedinDisplay ($is_input = 'fabiodealmeidaribeiro') {
        global $is_period;
        return implode('', [
            '<div',
                ' class=\'badge-base LI-profile-badge mx-auto\'',
                ' data-locale=\'pt_BR\'',
                ' data-size=\'medium\'',
                ' data-theme=\'', ...$is_period ? [ 'light' ] : [ 'dark' ], '\'',
                ' data-type=\'VERTICAL\'',
                ' data-vanity=\'', $is_input, '\'',
                ' data-version=\'v1\'',
                ' style=\'background: #e9ecef; height: 240.98px; width: 250px;\'',
            '></div>',
        ]);
    };

    function Constructor ($is_input = '') {
        $is_return = '';
        $is_button = CheckKeyValueEquality ([ 'array' => $is_input, 'key' => 'selector', 'value' => 'button' ]);
        $is_feedback = CheckKeyValueEquality ([ 'array' => $is_input, 'key' => 'feedback', 'value' => '' ]);
        return implode('', [
            '<div class=\'', implode(' ', [ 'd-flex', $is_button ? 'justify-content-center' : 'flex-column' ]), '\'>',
                ...!$is_button ? [
                    '<div class=\'d-flex flex-row\' style=\'min-height: 24px;\'>',
                        ...array_map(function($is_index) {
                            global $is_period;
                            $is_index = get_object_vars($is_index);
                            $is_classes = [ 'form-label', 'label', 'label-' . ConvertToID ($is_index['id']), 'm-0', 'p-0', ...$is_period ? [ 'text-secondary' ] : [ 'text-dark' ], 'w-100' ];
                            return implode('', [ '<label', ...IsTrue($is_classes) ? [ ' class=\'' . implode(' ', $is_classes) . '\'' ] : [], ' for=\'' . ConvertToID ($is_index['id']) . '\'', '>', ucfirst($is_index['label']), ':', '</label>' ]);
                        }, $is_input),
                    '</div>',
                ] : [],
                '<div class=\'' . implode(' ', [ ...$is_button ? [ 'btn-group' ] : [ 'input-group', ...$is_feedback ? [ 'mb-3' ] : [] ] ]) . '\'>',
                    ...array_map(function($is_index) {
                        $is_index = get_object_vars($is_index);
                        $is_classes = [ 'button' => [ 'btn', 'btn-outline-secondary', 'cursor-pointer', 'm-0', 'p-2' ], 'content' => [ 'content', 'content-' . ConvertToID ($is_index['id']), 'form-control', 'ps-2', 'pe-5', 'py-2' ] ];
                        return implode('', [ '<', ...ArrayKeyExist ($is_index, 'selector') ? [ ...$is_index['selector'] === 'button' ? [ 'button' ] : [], ...$is_index['selector'] === 'input' ? [ 'input' ] : [], ...$is_index['selector'] === 'select' ? [ 'select' ] : [], ...$is_index['selector'] === 'textarea' ? [ 'textarea' ] : [] ] : [ [ 'input' ] ], ...ArrayKeyExist ($is_index, 'selector') ? [ ...$is_index['selector'] === 'button' ? [ ...ArrayKeyExist ($is_classes, 'button') ? [ ' class=\'' . implode(' ', $is_classes['button']) . '\'' ] : [] ] : [ ...ArrayKeyExist ($is_classes, 'content') ? [ ' class=\'' . implode(' ', $is_classes['content']) . '\'' ] : [] ] ] : [], ...ArrayKeyExist ($is_index, 'disabled') ? [ ' disabled' ] : [], ' id=\'' . ConvertToID ($is_index['id']) . '\'', ...ArrayKeyExist ($is_index, 'maxlength') ? [ ' maxlength=\'' . strlen($is_index['maxlength']) . '\'' ] : [], ...ArrayKeyExist ($is_index, 'minlength') ? [ ' minlength=\'' . strlen($is_index['minlength']) . '\'' ] : [], ...ArrayKeyExist ($is_index, 'placeholder') ? [ ' placeholder=\'' . $is_index['placeholder'] . '\'' ] : [], ...ArrayKeyExist ($is_index, 'required') ? [ ' required' ] : [], ...ArrayKeyExist ($is_index, 'rows') ? [ ...$is_index['rows'] > 1 ? [ ' rows=\'' . $is_index['rows'] . '\'' ] : [] ] : [], ...ArrayKeyExist ($is_index, 'type') ? [ ' type=\'' . $is_index['type'] . '\'' ] : [], '>', ...ArrayKeyExist ($is_index, 'selector') ? [ ...$is_index['selector'] === 'button' ? [ ucfirst($is_index['label']), '</button>' ] : [], ...$is_index['selector'] === 'select' ? [ '<option value=\'\' selected></option>', ...array_map(function($is_index) { return implode('', [ '<option value=\'' . ucfirst($is_index) . '\'>', ucfirst($is_index), '</option>' ]); }, $is_index['option']), '</select>' ] : [], ...$is_index['selector'] === 'textarea' ? [ '</textarea>' ] : [] ] : [] ]);
                    }, $is_input),
                '</div>',
                ...!$is_button && !$is_feedback ? [
                    '<div class=\'d-flex flex-row mb-3\' style=\'min-height: 24px;\'>',
                        ...array_map(function($is_index) {
                            global $is_period;
                            $is_index = get_object_vars($is_index);
                            $is_classes = [ 'feedback', 'feedback-' . ConvertToID($is_index['id']), 'fst-italic', ...$is_period ? [ 'text-secondary' ] : [ 'text-dark' ], 'm-0', 'p-0', 'w-100' ];
                            return implode('', [ '<p', ...IsTrue($is_classes) ? [ ' class=\'' . implode(' ', $is_classes) . '\'' ] : [], '>', ucfirst($is_index['feedback']), '</p>' ]);
                        }, $is_input),
                    '</div>',
                ]: [],
            '</div>',
        ]);
    };

    function FieldBuilder () {
        $is_return = '';
        $is_database = JSONFetch('database.json') ? JSONFetch('database.json') : [];
        if (IsArrayTrue($is_database)):
            for ($i = 0; $i < sizeof($is_database); $i++):
                if (IsArrayTrue($is_database[$i])):
                    $is_return .= Constructor ($is_database[$i]);
                endif;
            endfor;
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
        $is_proper = [ 'array' => ArrayKeyExist ($is_input, 'array') ? $is_input['array'] : [], 'button' => ArrayKeyExist ($is_input, 'button'), ];
        $is_object = [ 'align-content' => 'center', 'align-items' => 'center', 'display' => 'flex', 'flex-wrap' => 'wrap', 'gap' => '.5rem', 'justify-content' => 'center', 'padding' => '0 0 3rem 0', 'width' => '100%' ];
        $is_style = '';
        foreach ($is_object as $is_key => $is_value): $is_style .= implode('', [ $is_key . ' : ' . $is_value . ';', ' ', ]); endforeach;
        $is_array = [];
        if (IsTrue($is_proper['array'])):
            $is_array = array_merge($is_array, [ ...$is_proper['button'] ? [ '<div class=\'d-flex justify-content-center pb-5\'>' ] : [], '<div', ...$is_proper['button'] ? [ ' class=\'btn-group\'' ] : [], ...!$is_proper['button'] ? [ ' style=\'' . trim($is_style) . '\'' ] : [], '>' ]);
                for ($i = 0; $i < sizeof($is_proper['array']); $i++):
                    $is_index = $is_proper['array'][$i];
                    $is_id = ValueConverter([ 'type' => 'id', 'value' => $is_index ]);
                    $is_target = ValueConverter([ 'type' => 'target', 'value' => $is_index ]);
                    $is_array = array_merge($is_array, [
                        ...$is_proper['button'] ? [ '<button', ...IsTrue(AllClasses()['button']) ? [ ' class=\'' . AllClasses()['button'] . '\''] : [], ' data-bs-toggle=\'modal\' data-bs-target=\'#' . $is_target . '\' type=\'button\'>' ] : [],
                        ...!$is_proper['button'] ? [ '<p', ...IsTrue(AllClasses()['p']) ? [ ' class=\'' . AllClasses()['p'] . '\'' ] : [], ' id=\'' . $is_id . '\'>', '<a', ...IsTrue(AllClasses()['a']) ? [ ' class=\'' . AllClasses()['a'] . '\'' ] : [], ' data-bs-toggle=\'modal\' data-bs-target=\'#' . $is_target . '\' href=\'#\'>' ] : [],
                        ucwords(trim($is_index)),
                        ...!$is_proper['button'] ? [ ...$i < sizeof($is_proper['array']) - 1 ? [ '<p', ...IsTrue(AllClasses()['p']) ? [ ' class=\'' . AllClasses()['p'] . '\'' ] : [] ,'>', '.', '</p>', ] : [], ] : [],
                        ...$is_proper['button'] ? [ '</button>' ] : [],
                    ]);
                endfor;
            $is_array = array_merge($is_array, [ '</div>', ...$is_proper['button'] ? [ '</div>' ] : [], ]);
        endif;
        return implode('', $is_array);
    };

    function BSContainer ($is_input = [ 'title' => '', 'body' => [], 'button' => [], ]) {
        $is_button = '';
        global $is_period;
        if (ArrayKeyExist($is_input, 'button')):
            for ($i = 0; $i < sizeof($is_input['button']); $i++):
                $is_button .= implode('', [ '<button', ...IsTrue(ModalClasses()['button']) ? [ ' class=\'' . ModalClasses()['button'] . '\'' ] : [], ...IsTrue($is_input['button'][$i]) ? [ ' id=\'' . strtolower(str_replace(' ', '-', trim($is_input['button'][$i]))) . '\'' ] : [], ' type=\'button\'>', ucwords(trim($is_input['button'][$i])), '</button>' ]);
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
                    '<div', ...IsTrue(ModalClasses()['dialog']) ? [ ' class=\'' . ModalClasses()['dialog'] . '\'' ] : [], ' id=\'dialog\'>',
                        '<div', ...IsTrue(ModalClasses()['content']) ? [ ' class=\'' . ModalClasses()['content'] . '\'' ] : [], ' id=\'content\'>',
                            ...IsTrue($is_input['title']) ? [ '<div', ...IsTrue(ModalClasses()['header']) ? [ ' class=\'' . ModalClasses()['header'] . '\'' ] : [], ...!$is_period ? [ ' data-bs-theme=\'dark\'' ] : [], ' id=\'header\'>', '<h1', ...IsTrue(ModalClasses()['title']) ? [ ' class=\'' . ModalClasses()['title'] . '\'' ] : [], ' id=\'' . $is_label . '\'>', ucwords(trim($is_input['title'])), '</h1>', '<button type=\'button\' class=\'btn-close\' data-bs-dismiss=\'modal\' aria-label=\'Close\'></button>', '</div>' ] : [],
                            '<div', ...IsTrue(ModalClasses()['body']) ? [ ' class=\'' . ModalClasses()['body'] . '\'' ] : [], ' id=\'body\'>', ...ArrayKeyExist ($is_input, 'body') ? [ $is_input['body'] ] : [], '</div>',
                            '<div', ...IsTrue(ModalClasses()['footer']) ? [ ' class=\'' . ModalClasses()['footer'] . '\'' ] : [], 'id=\'footer\'>', ...IsTrue($is_button) ? [ $is_button ] : [], '<button', ...IsTrue(ModalClasses()['button']) ? [ ' class=\'' . ModalClasses()['button'] . '\'' ] : [], ' data-bs-dismiss=\'modal\' id=\'close\' type=\'button\'>', 'Close', '</button>', '</div>',
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
        return BSCall ([ 'array' => $is_modal ]);
    };

?>