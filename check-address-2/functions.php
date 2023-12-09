<?php

    include_once('./variables.php');

    function ArrayKeyExist ($is_array = [], $is_key = '') { return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]); };

    function IsTrue ($is_input) { return isset($is_input) && !empty($is_input); };

    function IsArrayTrue ($is_input = []) { return isset($is_input) && is_array($is_input) && !empty($is_input); };

    function ReadJSONFile ($is_input = '') { return file_exists($is_input) ? json_decode(file_get_contents($is_input)) : []; };

    function ConvertToID ($is_input = '') { return strtolower(str_replace(' ', '-', trim($is_input))); };

    function CamelCase ($is_input = '', $is_explode = ' ') { return implode(' ', array_map(function($is_index) { return strlen($is_index) <= 2 ? strtolower($is_index) : ucwords($is_index); }, explode($is_explode, $is_input))); };

    function CheckValueEquality ($is_input = []) {
        $is_proper = [ 'array' => ArrayKeyExist ($is_input, 'array') ? $is_input['array'] : [], 'key' => ArrayKeyExist ($is_input, 'key') ? $is_input['key'] : '', 'value' => ArrayKeyExist ($is_input, 'value') ? $is_input['value'] : '' ];
        foreach ($is_proper['array'] as $is_object): if (get_object_vars($is_object)[$is_proper['key']] !== $is_proper['value']): return false; endif; endforeach; return true;
    };

    function HeaderDisplay ($is_input = '') {
        $is_title = IsTrue($is_input) ? CamelCase (trim($is_input)) : CamelCase (basename(__DIR__), '-');
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

    function FooterDisplay ($is_input = 'script.js') {
        return implode('', [
                '</body>',
                '<script src=\'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js\' crossorigin=\'anonymous\'></script>',
                '<script src=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js\' crossorigin=\'anonymous\'></script>',
                '<script src=\'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js\' crossorigin=\'anonymous\'></script>',
                ...file_exists('./' . $is_input) ? [ '<script src=\'./' . $is_input . '\' type=\'module\' crossorigin=\'anonymous\'></script>' ] : [],
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

    function FormBuilder ($is_input = []) {
        $is_proper = [
            'action' => ArrayKeyExist ($is_input, 'action') ? (file_exists($is_input['action']) ? (pathinfo($is_input['action'], PATHINFO_EXTENSION) === 'php' ? $is_input['action'] : '') : '') : '',
            'database' => ArrayKeyExist ($is_input, 'database') ? (file_exists($is_input['database']) ? (pathinfo($is_input['database'], PATHINFO_EXTENSION) === 'json' ? $is_input['database'] : '') : '') : '',
        ];
        $is_database = ReadJSONFile($is_proper['database']) ? ReadJSONFile($is_proper['database']) : [];
        if (IsTrue($is_database)):
            return implode('', [
                '<form', ...IsTrue($is_proper['action']) ? [ ' action=\'' . $is_proper['action'] . '\'' ] : [], ...IsTrue(AllClasses()['form']) ? [ ' class=\'' . AllClasses()['form'] . '\'' ] : [], ' enctype=\'multipart/form-data\' method=\'POST\'', '>',
                    implode('', array_map(function($is_index) {
                        $is_button = CheckValueEquality ([ 'array' => $is_index, 'key' => 'selector', 'value' => 'button' ]);
                        $is_feedback = CheckValueEquality ([ 'array' => $is_index, 'key' => 'feedback', 'value' => '' ]);
                        return implode('', [
                            '<div class=\'', implode(' ', [ 'd-flex', $is_button ? 'justify-content-center' : 'flex-column' ]), '\'>',
                                ...!$is_button ? [
                                    '<div class=\'d-flex flex-row\' style=\'min-height: 24px;\'>',
                                        ...array_map(function($is_index) {
                                            global $is_period;
                                            $is_index = get_object_vars($is_index);
                                            return implode('', [ '<label class=\'' . implode(' ', [ 'label', 'label-' . ConvertToID ($is_index['id']), ...explode(' ', AllClasses()['label']) ]) . '\' for=\'' . ConvertToID ($is_index['id']) . '\'>', ucfirst($is_index['label']), ':', '</label>' ]);
                                        }, $is_index),
                                    '</div>',
                                ] : [],
                                '<div class=\'' . implode(' ', [ ...$is_button ? [ 'btn-group' ] : [ 'input-group', ...$is_feedback ? [ 'mb-3' ] : [] ] ]) . '\'>',
                                    ...array_map(function($is_index) {
                                        $is_index = get_object_vars($is_index);
                                        return implode('', [ '<', ...ArrayKeyExist ($is_index, 'selector') ? [ ...$is_index['selector'] === 'button' ? [ 'button' ] : [], ...$is_index['selector'] === 'input' ? [ 'input' ] : [], ...$is_index['selector'] === 'select' ? [ 'select' ] : [], ...$is_index['selector'] === 'textarea' ? [ 'textarea' ] : [] ] : [ [ 'input' ] ], ...ArrayKeyExist ($is_index, 'selector') ? [ ...$is_index['selector'] === 'button' ? [ ' class=\'' . AllClasses()['button'] . '\'' ] : [ ' class=\'' . implode(' ', [ 'content', 'content-' . ConvertToID ($is_index['id']), ...explode(' ', AllClasses()['input']) ]) . '\'' ], ] : [], ...ArrayKeyExist ($is_index, 'disabled') ? [ ' disabled' ] : [], ' id=\'' . ConvertToID ($is_index['id']) . '\'', ...ArrayKeyExist ($is_index, 'maxlength') ? [ ' maxlength=\'' . strlen($is_index['maxlength']) . '\'' ] : [], ...ArrayKeyExist ($is_index, 'minlength') ? [ ' minlength=\'' . strlen($is_index['minlength']) . '\'' ] : [], ...ArrayKeyExist ($is_index, 'placeholder') ? [ ' placeholder=\'' . $is_index['placeholder'] . '\'' ] : [], ...ArrayKeyExist ($is_index, 'required') ? [ ' required' ] : [], ...ArrayKeyExist ($is_index, 'rows') ? [ ...$is_index['rows'] > 1 ? [ ' rows=\'' . $is_index['rows'] . '\'' ] : [] ] : [], ...ArrayKeyExist ($is_index, 'type') ? [ ' type=\'' . $is_index['type'] . '\'' ] : [], '>', ...ArrayKeyExist ($is_index, 'selector') ? [ ...$is_index['selector'] === 'button' ? [ ucfirst($is_index['label']), '</button>' ] : [], ...$is_index['selector'] === 'select' ? [ '<option value=\'\' selected></option>', ...array_map(function($is_index) { return implode('', [ '<option value=\'' . ucfirst($is_index) . '\'>', ucfirst($is_index), '</option>' ]); }, $is_index['option']), '</select>' ] : [], ...$is_index['selector'] === 'textarea' ? [ '</textarea>' ] : [] ] : [] ]);
                                    }, $is_index),
                                '</div>',
                                ...!$is_button && !$is_feedback ? [
                                    '<div class=\'d-flex flex-row mb-3\' style=\'min-height: 24px;\'>',
                                        ...array_map(function($is_index) {
                                            global $is_period;
                                            $is_index = get_object_vars($is_index);
                                            return implode('', [ '<p class=\'' . implode(' ', [ 'feedback', 'feedback-' . ConvertToID($is_index['id']), ...explode(' ', AllClasses()['feedback']) ]) . '\'>', ucfirst($is_index['feedback']), '</p>' ]);
                                        }, $is_index),
                                    '</div>',
                                ] : [],
                            '</div>',
                        ]);
                    }, $is_database)),
                '</form>',
            ]);
        endif;
    };

    function ClearAccents ($is_input = '') {
        $is_input = $is_input;
        $is_input = preg_replace('/[ÁÀÂÃ]/', 'A', $is_input);
        $is_input = preg_replace('/[áàâã]/', 'a', $is_input);
        $is_input = preg_replace('/[ÉÈÊ]/', 'E', $is_input);
        $is_input = preg_replace('/[éèê]/', 'e', $is_input);
        $is_input = preg_replace('/[ÍÌ]/', 'I', $is_input);
        $is_input = preg_replace('/[íì]/', 'i', $is_input);
        $is_input = preg_replace('/[ÓÒÔÕ]/', 'O', $is_input);
        $is_input = preg_replace('/[óòôõ]/', 'o', $is_input);
        $is_input = preg_replace('/[ÚÙÛ]/', 'U', $is_input);
        $is_input = preg_replace('/[úùû]/', 'u', $is_input);
        $is_input = preg_replace('/[Ç]/', 'C', $is_input);
        $is_input = preg_replace('/[ç]/', 'c', $is_input);
        return $is_input;
    };

    function Identifier ($is_input = []) {
        $is_proper = [ 'type' => ArrayKeyExist ($is_input, 'type') ? $is_input['type'] : 'id', 'value' => ArrayKeyExist ($is_input, 'value') ? ClearAccents ($is_input['value']) : '' ];
        if (!($is_proper['type'] === 'id')): return implode('', array_map(function($is_index) { return ucwords($is_index); }, explode(' ', implode(' ', [ trim($is_proper['value']), trim($is_proper['type']) ])))); endif;
        if ($is_proper['type'] === 'id'): return strtolower(str_replace(' ', '-', trim($is_proper['value']))); endif;
    };

    function SetStyle ($is_input = '') {
        global $is_period;
        for ($i = 1; $i <= 6; $i++) $is_input = str_replace('<h' . $i, '<h' . $i . ' class=\'p-0 m-0\'', $is_input);
        $is_input = str_replace('<p', '<p class=\'p-0 m-0\'', $is_input);
        $is_input = str_replace('<li', '<li class=\'p-0 m-0\'', $is_input);
        $is_input = str_replace('<ul', '<ul class=\'p-0 my-3 list-unstyled\'', $is_input);
        $is_input = str_replace('<a', '<a class=\'' . AllClasses()['a'] . '\'', $is_input);
        $is_input = str_replace('<blockquote', '<blockquote class=\'m-0 p-0\' ', $is_input);
        return $is_input;
    };

    function CallerBuilder ($is_input = []) {
        $is_proper = [ 'array' => ArrayKeyExist ($is_input, 'array') ? $is_input['array'] : [], 'button' => ArrayKeyExist ($is_input, 'button') ];
        $is_object = [ 'align-content' => 'center', 'align-items' => 'center', 'display' => 'flex', 'flex-wrap' => 'wrap', 'gap' => '.5rem', 'justify-content' => 'center', 'padding' => '0 0 3rem 0', 'width' => '100%' ];
        $is_style = '';
        foreach ($is_object as $is_key => $is_value): $is_style .= $is_key . ' : ' . $is_value . '; '; endforeach;
        $is_array = [];
        if (IsTrue($is_proper['array'])):
            $is_array = array_merge($is_array, [ ...$is_proper['button'] ? [ '<div class=\'d-flex justify-content-center pb-5\'>' ] : [], '<div', ...$is_proper['button'] ? [ ' class=\'btn-group\'' ] : [], ...!$is_proper['button'] ? [ ' style=\'' . trim($is_style) . '\'' ] : [], '>' ]);
                for ($i = 0; $i < sizeof($is_proper['array']); $i++):
                    $is_index = $is_proper['array'][$i];
                    $is_id = Identifier([ 'type' => 'id', 'value' => $is_index ]);
                    $is_target = Identifier([ 'type' => 'target', 'value' => $is_index ]);
                    $is_array = array_merge($is_array, [
                        ...$is_proper['button'] ? [ '<button', ...IsTrue(AllClasses()['button']) ? [ ' class=\'' . AllClasses()['button'] . '\'' ] : [], ' data-bs-toggle=\'modal\' data-bs-target=\'#' . $is_target . '\' type=\'button\'>' ] : [],
                        ...!$is_proper['button'] ? [ '<p', ...IsTrue(AllClasses()['p']) ? [ ' class=\'' . AllClasses()['p'] . '\'' ] : [], ' id=\'' . $is_id . '\'>', '<a', ...IsTrue(AllClasses()['a']) ? [ ' class=\'' . AllClasses()['a'] . '\'' ] : [], ' data-bs-toggle=\'modal\' data-bs-target=\'#' . $is_target . '\' href=\'#\'>' ] : [],
                            CamelCase($is_index),
                        ...!$is_proper['button'] ? [ '</a>', '</p>' ] : [],
                        ...!$is_proper['button'] ? [ ...$i < sizeof($is_proper['array']) - 1 ? [ '<p', ...IsTrue(AllClasses()['p']) ? [ ' class=\'' . AllClasses()['p'] . '\'' ] : [] ,'>', '.', '</p>', ] : [], ] : [],
                        ...$is_proper['button'] ? [ '</button>' ] : [],
                    ]);
                endfor;
            $is_array = array_merge($is_array, [ '</div>', ...$is_proper['button'] ? [ '</div>' ] : [], ]);
        endif;
        return implode('', $is_array);
    };

    function ContainerBuilder ($is_input = [ 'body' => [], 'button' => [], 'id' => '', 'title' => '', ]) {
        global $is_period;
        $is_proper = [
            'body' => ArrayKeyExist ($is_input, 'body') ? $is_input['body'] : '',
            'id' => ArrayKeyExist ($is_input, 'id') ? Identifier([ 'type' => 'id', 'value' => $is_input['id'] ]) : '',
            'label' => ArrayKeyExist ($is_input, 'title') ? Identifier([ 'type' => 'label', 'value' => $is_input['title'] ]) : '',
            'target' => ArrayKeyExist ($is_input, 'title') ? Identifier([ 'type' => 'target', 'value' => $is_input['title'] ]) : '',
            'title' => ArrayKeyExist ($is_input, 'title') ? $is_input['title'] : '',
        ];
        return implode('', [
            '<button class=\'d-none\' data-bs-target=\'#' . $is_proper['target'] . '\' data-bs-toggle=\'modal\' id=\'' . $is_proper['id'] . '\' type=\'button\' ></button>',
            '<div aria-labelledby=\'' . $is_proper['label'] . '\' aria-hidden=\'true\' class=\'modal fade\' id=\'' . $is_proper['target'] . '\' tabindex=\'-1\'>',
                '<div', ...IsTrue(ModalClasses()['dialog']) ? [ ' class=\'' . ModalClasses()['dialog'] . '\'' ] : [], ' id=\'dialog\'>',
                    '<div', ...IsTrue(ModalClasses()['content']) ? [ ' class=\'' . ModalClasses()['content'] . '\'' ] : [], ' id=\'content\'>',                        
                        ...IsTrue($is_proper['title']) ? [ '<div', ...IsTrue(ModalClasses()['header']) ? [ ' class=\'' . ModalClasses()['header'] . '\'' ] : [], ...!$is_period ? [ ' data-bs-theme=\'dark\'' ] : [], ' id=\'header\'>', '<h1', ...IsTrue(ModalClasses()['title']) ? [ ' class=\'' . ModalClasses()['title'] . '\'' ] : [], ' id=\'' . $is_proper['label'] . '\'>', CamelCase ($is_proper['title']), '</h1>', '<button type=\'button\' class=\'btn-close\' data-bs-dismiss=\'modal\' aria-label=\'Close\'></button>', '</div>' ] : [],
                        '<div', ...IsTrue(ModalClasses()['body']) ? [ ' class=\'' . ModalClasses()['body'] . '\'' ] : [], ' id=\'body\'>',
                            $is_proper['body'],
                        '</div>',
                        '<div', ...IsTrue(ModalClasses()['footer']) ? [ ' class=\'' . ModalClasses()['footer'] . '\'' ] : [], 'id=\'footer\'>', '<button', ...IsTrue(ModalClasses()['button']) ? [ ' class=\'' . ModalClasses()['button'] . '\'' ] : [], ' data-bs-dismiss=\'modal\' id=\'close\' type=\'button\'>', 'Close', '</button>', '</div>',
                    '</div>',
                '</div>',
            '</div>',
        ]);
    };

    function HTMLCallerBuilder ($is_input = [ 'footer' ]) {
        $is_modal = [];
        $is_array = array_filter(scandir(implode('/', $is_input)), function ($is_file) { return pathinfo($is_file, PATHINFO_EXTENSION) === 'html'; });
        foreach (array_keys(array_diff($is_array, [])) as $is_index):
            $is_replace = [ 'search' => [ '.html', '-' ], 'replace' => [ '', ' ' ], 'subject' => $is_array[$is_index] ];
            array_push($is_modal, str_replace($is_replace['search'], $is_replace['replace'], $is_replace['subject']));
        endforeach;
        return CallerBuilder ([ 'array' => $is_modal, 'button' => false ]);
    };

    function HTMLContainerBuilder ($is_input = [ 'footer' ]) {
        $is_return = '';
        $is_array = array_filter(scandir(implode('/', $is_input)), function ($is_file) { return pathinfo($is_file, PATHINFO_EXTENSION) === 'html'; });
        foreach (array_keys(array_diff($is_array, [])) as $is_index):
            $is_archive = implode('', [ './', implode('/', $is_input), '/', $is_array[$is_index] ]);
            $is_replace = [ 'search' => [ '.html', '-' ], 'replace' => [ '', ' ' ], 'subject' => $is_array[$is_index] ];
            $is_return .= ContainerBuilder ([
                'body' => file_exists($is_archive) ? SetStyle(file_get_contents($is_archive)) : '',
                'id' => str_replace($is_replace['search'], $is_replace['replace'], $is_replace['subject']),
                'title' => str_replace($is_replace['search'], $is_replace['replace'], $is_replace['subject']),
            ]);
        endforeach;
        return $is_return;
    };

?>