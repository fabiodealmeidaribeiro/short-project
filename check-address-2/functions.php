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

    function FieldBuilder () {
        $is_return = '';
        $is_fieldlist = JSONFetch('database.json') ? JSONFetch('database.json') : [];
        for ($i = 0; $i < sizeof($is_fieldlist); $i++):
            if (is_array($is_fieldlist[$i])):
                $is_return .= '<div class=\'flex-column d-flex\'>';
                    for ($j = 0; $j < sizeof($is_fieldlist[$i]); $j++):


                        $is_index = get_object_vars($is_fieldlist[$i][$j]);

                        $is_ID = $is_index['id'];

                        $is_classes = [
                            'form-label',
                            'label',
                            'label-' . $is_ID,
                            'm-0',
                            'p-0',
                            'w-100',
                            'text-secondary',
                        ];

                        $is_return .= '<div class=\'d-flex flex-row\' style=\'min-height: 24px;\'>';
                            $is_return .= '<label' . (IsTrue($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . ' for=\'' . $is_ID . '\'>';
                                $is_return .= $is_index['label'];
                            $is_return .=  '</label>';
                        $is_return .= '</div>';

                        $is_classes = [
                            'content',
                            'content-' . $is_ID,
                            'form-control',
                            'ps-2',
                            'pe-5',
                            'py-2',
                        ];

                        $is_return .= '<div class=\'input-group\'>';

                            $is_return .= '<';

                            if (ArrayKeyExist ($is_index, 'selector')):
                                if ($is_index['selector'] === 'button'): $is_return .= 'button'; endif;
                                if ($is_index['selector'] === 'input'): $is_return .= 'input'; endif;
                                if ($is_index['selector'] === 'textarea'): $is_return .= 'textarea'; endif;
                            else:
                                $is_return .= 'input';
                            endif;

                                $is_return .= IsTrue ($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '';
                                $is_return .= ArrayKeyExist ($is_index, 'disabled') ? ' disabled' : '';
                                $is_return .= ' id=\'' . $is_index['id'] . '\'';
                                $is_return .= ArrayKeyExist ($is_index, 'maxlength') ? ' maxlength=\'' . $is_index['maxlength'] . '\'' : '';
                                $is_return .= ArrayKeyExist ($is_index, 'minlength') ? ' minlength=\'' . $is_index['minlength'] . '\'' : '';
                                $is_return .= ArrayKeyExist ($is_index, 'placeholder') ? ' placeholder=\'' . $is_index['placeholder'] . '\'' : '';
                                $is_return .= ' required';
                                $is_return .= ArrayKeyExist ($is_index, 'rows') ? ' rows=\'' . $is_index['rows'] . '\'' : '';
                                $is_return .= ArrayKeyExist ($is_index, 'type') ? ($is_index['type'] > 1 ? ' type=\'' . $is_index['type'] . '\'' : '') : '';

                            $is_return .= '>';

                            if (ArrayKeyExist ($is_index, 'selector')):
                                if ($is_index['selector'] === 'button'): $is_return .= '</button>'; endif;
                                if ($is_index['selector'] === 'input'): endif;
                                if ($is_index['selector'] === 'textarea'): $is_return .= '</textarea>'; endif;
                            endif;

                        $is_return .= '</div>';

                        if (ArrayKeyExist ($is_index, 'feedback')):

                            $is_classes = [
                                'feedback',
                                'feedback-' . $is_ID,
                                'fst-italic',
                                'text-secondary',
                                'm-0',
                                'p-0',
                                'w-100',
                            ];

                            $is_return .= '<div class=\'d-flex flex-row\' style=\'min-height: 24px;\'>';
                                $is_return .= '<p' . (IsTrue($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . '>';
                                    $is_return .= $is_index['feedback'];
                                $is_return .= '</p>';
                            $is_return .= '</div>';

                        endif;
                    endfor;
                $is_return .= '</div>';
            endif;
            if (is_object($is_fieldlist[$i])):
                $is_return .= '<div class=\'flex-column d-flex\'>';

                    $is_index = get_object_vars($is_fieldlist[$i]);

                    $is_ID = $is_index['id'];

                    $is_classes = [
                        'form-label',
                        'label',
                        'label-' . $is_ID,
                        'm-0',
                        'p-0',
                        'w-100',
                        'text-secondary',
                    ];

                    $is_return .= '<div class=\'d-flex flex-row\' style=\'min-height: 24px;\'>';
                        $is_return .= '<label' . (IsTrue($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . ' for=\'' . $is_ID . '\'>';
                            $is_return .= $is_index->label;
                        $is_return .=  '</label>';
                    $is_return .= '</div>';

                    $is_classes = [
                        'content',
                        'content-' . $is_ID,
                        'form-control',
                        'ps-2',
                        'pe-5',
                        'py-2',
                    ];

                    $is_return .= '<div class=\'input-group\'>';

                        $is_return .= '<';

                        if (ArrayKeyExist ($is_index, 'selector')):
                            if ($is_index['selector'] === 'button'): $is_return .= 'button'; endif;
                            if ($is_index['selector'] === 'input'): $is_return .= 'input'; endif;
                            if ($is_index['selector'] === 'textarea'): $is_return .= 'textarea'; endif;
                        else:
                            $is_return .= 'input';
                        endif;

                            $is_return .= IsTrue ($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '';
                            $is_return .= ArrayKeyExist ($is_index, 'disabled') ? ' disabled' : '';
                            $is_return .= ' id=\'' . $is_index['id'] . '\'';
                            $is_return .= ArrayKeyExist ($is_index, 'maxlength') ? ' maxlength=\'' . $is_index['maxlength'] . '\'' : '';
                            $is_return .= ArrayKeyExist ($is_index, 'minlength') ? ' minlength=\'' . $is_index['minlength'] . '\'' : '';
                            $is_return .= ArrayKeyExist ($is_index, 'placeholder') ? ' placeholder=\'' . $is_index['placeholder'] . '\'' : '';
                            $is_return .= ' required';
                            $is_return .= ArrayKeyExist ($is_index, 'rows') ? ' rows=\'' . $is_index['rows'] . '\'' : '';
                            $is_return .= ArrayKeyExist ($is_index, 'type') ? ($is_index['type'] > 1 ? ' type=\'' . $is_index['type'] . '\'' : '') : '';

                        $is_return .= '>';

                        if (ArrayKeyExist ($is_index, 'selector')):
                            if ($is_index['selector'] === 'button'): $is_return .= '</button>'; endif;
                            if ($is_index['selector'] === 'input'): endif;
                            if ($is_index['selector'] === 'textarea'): $is_return .= '</textarea>'; endif;
                        endif;

                    $is_return .= '</div>';

                    if (ArrayKeyExist ($is_index, 'feedback')):

                        $is_classes = [
                            'feedback',
                            'feedback-' . $is_ID,
                            'fst-italic',
                            'text-secondary',
                            'm-0',
                            'p-0',
                            'w-100',
                        ];

                        $is_return .= '<div class=\'d-flex flex-row\' style=\'min-height: 24px;\'>';
                            $is_return .= '<p' . (IsTrue($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . '>';
                                $is_return .= $is_index['feedback'];
                            $is_return .= '</p>';
                        $is_return .= '</div>';

                    endif;

                $is_return .= '</div>';
            endif;
        endfor;
        return $is_return;
    };

?>