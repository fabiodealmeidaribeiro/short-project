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

    // function CheckKeyEquality ($is_array, $is_key) {
    //     foreach ($is_array as $object):
    //         if ($object[$is_key] !== $is_array[0][$is_key]):
    //             return false;
    //         endif;
    //     endforeach;
    //     return true;
    // };

    function CheckKeyValueEquality ($is_input = []) {
        $is_proper = [
            'array' => ArrayKeyExist ($is_input, 'array') ? $is_input['array'] : [],
            'key' => ArrayKeyExist ($is_input, 'key') ? $is_input['key'] : '',
            'value' => ArrayKeyExist ($is_input, 'value') ? $is_input['value'] : '',
        ];
        foreach ($is_proper['array'] as $is_object):
            if (get_object_vars($is_object)[$is_proper['key']] !== $is_proper['value']):
                return false;
            endif;
        endforeach;
        return true;
    };

    function Constructor ($is_input = '') {
        $is_return = '';
        $is_button = CheckKeyValueEquality ([ 'array' => $is_input, 'key' => 'selector', 'value' => 'button' ]);
        $is_feedback = CheckKeyValueEquality ([ 'array' => $is_input, 'key' => 'feedback', 'value' => '' ]);
        $is_classes = [ 'button' => [ 'justify-content-center', 'd-flex' ], 'content' => [ 'flex-column', 'd-flex' ] ];
        $is_return .= '<div class=\'' . ($is_button ? implode(' ', $is_classes['button']) : implode(' ', $is_classes['content'])) . '\'>';
            if ($is_button): else:
                $is_return .= '<div class=\'d-flex flex-row\' style=\'min-height: 24px;\'>';
                    for ($j = 0; $j < sizeof($is_input); $j++):
                        $is_index = get_object_vars($is_input[$j]);
                        $is_classes = [ 'form-label', 'label', 'label-' . strtolower($is_index['id']), 'm-0', 'p-0', 'w-100', 'text-secondary' ];
                        $is_return .= '<label' . (IsTrue($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . ' for=\'' . strtolower($is_index['id']) . '\'>';
                            $is_return .= ucfirst($is_index['label']) . ':';
                        $is_return .=  '</label>';
                    endfor;
                $is_return .= '</div>';
            endif;
            $is_classes = [ 'container' => [
                    'input-group',
                    ...!$is_button ? [ ...$is_feedback ? [ 'mb-3' ] : [] ] : [],
                ],
            ];
            $is_return .= '<div class=\'' . implode(' ', $is_classes['container']) . '\'>';
                for ($j = 0; $j < sizeof($is_input); $j++):
                    $is_index = get_object_vars($is_input[$j]);
                    $is_classes = [ 'button' => [ 'btn', 'btn-outline-secondary', 'cursor-pointer', 'm-0', 'p-2' ], 'content' => [ 'content', 'content-' . strtolower($is_index['id']), 'form-control', 'ps-2', 'pe-5', 'py-2' ], ];
                    $is_return .= '<';
                        if (ArrayKeyExist ($is_index, 'selector')):
                            if ($is_index['selector'] === 'button'): $is_return .= 'button'; endif;
                            if ($is_index['selector'] === 'input'): $is_return .= 'input'; endif;
                            if ($is_index['selector'] === 'select'): $is_return .= 'select'; endif;
                            if ($is_index['selector'] === 'textarea'): $is_return .= 'textarea'; endif;
                        else:
                            $is_return .= 'input';
                        endif;
                            if ($is_index['selector'] === 'button'):
                                $is_return .= ArrayKeyExist ($is_classes, 'button') ? ' class=\'' . implode(' ', $is_classes['button']) . '\'' : '';
                            endif;
                            if ($is_index['selector'] === 'button'): else:
                                $is_return .= ArrayKeyExist ($is_classes, 'content') ? ' class=\'' . implode(' ', $is_classes['content']) . '\'' : '';
                            endif;
                            $is_return .= ArrayKeyExist ($is_index, 'disabled') ? ' disabled' : '';
                            $is_return .= ' id=\'' . $is_index['id'] . '\'';
                            $is_return .= ArrayKeyExist ($is_index, 'maxlength') ? ' maxlength=\'' . strlen($is_index['maxlength']) . '\'' : '';
                            $is_return .= ArrayKeyExist ($is_index, 'minlength') ? ' minlength=\'' . strlen($is_index['minlength']) . '\'' : '';
                            $is_return .= ArrayKeyExist ($is_index, 'placeholder') ? ' placeholder=\'' . $is_index['placeholder'] . '\'' : '';
                            $is_return .= ArrayKeyExist ($is_index, 'required') ? ' required' : '';
                            $is_return .= ArrayKeyExist ($is_index, 'rows') ? ($is_index['rows'] > 1 ? ' rows=\'' . $is_index['rows'] . '\'' : '') : '';
                            $is_return .= ArrayKeyExist ($is_index, 'type') ? ' type=\'' . $is_index['type'] . '\'' : '';
                    $is_return .= '>';
                    if (ArrayKeyExist ($is_index, 'selector')):
                        if ($is_index['selector'] === 'button'):
                            $is_return .= ucfirst($is_index['label']);
                            $is_return .= '</button>';
                        endif;
                        if ($is_index['selector'] === 'input'):
                        endif;
                        if ($is_index['selector'] === 'select'):
                            $is_return .= '<option value=\'' . '' . '\' selected></option>';
                            for ($k = 0; $k < sizeof($is_index['option']); $k++):
                                $is_return .= '<option value=\'' . ucfirst($is_index['option'][$k]) . '\'>' . ucfirst($is_index['option'][$k]) . '</option>';
                            endfor;
                            $is_return .= '</select>';
                        endif;
                        if ($is_index['selector'] === 'textarea'):
                            $is_return .= '</textarea>';
                        endif;
                    endif;
                endfor;
            $is_return .= '</div>';
            if ($is_button): else:
                if ($is_feedback): else:
                    $is_return .= '<div class=\'d-flex flex-row mb-3\' style=\'min-height: 24px;\'>';
                        for ($j = 0; $j < sizeof($is_input); $j++):
                            $is_index = get_object_vars($is_input[$j]);
                            $is_classes = [ 'feedback', 'feedback-' . strtolower($is_index['id']), 'fst-italic', 'text-secondary', 'm-0', 'p-0', 'w-100' ];
                            $is_return .= '<p' . (IsTrue($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . '\'>';
                                $is_return .= ucfirst($is_index['feedback']);
                            $is_return .=  '</p>';
                        endfor;
                    $is_return .= '</div>';
                endif;
            endif;
        $is_return .= '</div>';
        return $is_return;
    };

    function FieldBuilder () {
        $is_return = '';
        $is_database = JSONFetch('database.json') ? JSONFetch('database.json') : [];
        if (IsTrue($is_database)):
            for ($i = 0; $i < sizeof($is_database); $i++):
                if (is_array($is_database[$i])):
                    $is_return .= Constructor ($is_database[$i]);
                endif;
                // if (is_object($is_database[$i])):
                //     $is_return .= Constructor ($is_database[$i]);
                // endif;
            endfor;
        endif;
        return $is_return;
    };

?>