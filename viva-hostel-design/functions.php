<?php

    function JSONFetch ($is_settings) {
        return file_exists($is_settings) ? json_decode(file_get_contents($is_settings)) : false;
    };

    function ArrayKeyExist ($is_array, $is_key) {
        return isset($is_array) && array_key_exists($is_key, $is_array) && !empty($is_array[$is_key]);
    };

    function IsTrue ($is_var) {
        return isset($is_var) && !empty($is_var);
    };

    function RandomIndex ($is_array) {
        return $is_array[rand(0, sizeof($is_array) - 1)];
    };

    function Developed ($input = []) {
        $is_proper = [
            'url' => ArrayKeyExist($input, 'url') ? trim($input['url']) : 'https://linkedin.com/in/fabiodealmeidaribeiro',
            'title' => ArrayKeyExist($input, 'title') ? trim($input['title']) : 'Developed by Fábio de Almeida Ribeiro.',
        ];
        return filter_var($is_proper['url'], FILTER_VALIDATE_URL) ? implode('', [
            '<div class=\'developed\'>',
                '<p>',
                    '<a href=\'' . trim($is_proper['url']) . '/\' target=\'_blank\'>',
                        trim($is_proper['title']),
                    '</a>',
                '</p>',
            '</div>',
        ]) : [
        ];
    };

    function HeaderDisplay () {
        $is_title = '';
        $is_array = explode('-', basename(__DIR__));
        for ($i = 0; $i < sizeof($is_array); $i++):
            $is_title .= implode('', [
                ucwords($is_array[$i]),
                ...$i < sizeof($is_array) - 1 ? [' '] : [],
            ]);
        endfor;
        return implode('', [
            '<!doctype html>',
            '<html lang=\'en\'>',
                '<head>',
                    ...$is_title ? [ '<title>' . $is_title . '</title>' ] : [],
                    '<meta charset=\'utf-8\'>',
                    '<meta name=\'viewport\' content=\'width=device-width, initial-scale=1, shrink-to-fit=no\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>',
                    '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css\' rel=\'stylesheet\'>',
                    ...file_exists('style.css') ? [ '<link href=\'style.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>' ] : [],
                '</head>',
                '<body>',
                // '<body' . (IsTrue(SelectorClasses()['body']) ? ' class=\'' . SelectorClasses()['body'] . '\'' : '') . '>',
        ]);
    };

    function FooterDisplay () {
        return implode('', [
                '</body>',
                '<script src=\'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js\' crossorigin=\'anonymous\'></script>',
                '<script src=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js\' crossorigin=\'anonymous\'></script>',
                ...file_exists('script.js') ? [ '<script src=\'script.js\' type=\'module\' crossorigin=\'anonymous\'></script>' ] : [],
            '</html>',
        ]);
    };

    function ThumbnailBuilder ($input = []) {
        $is_proper = [
            'folder' => ArrayKeyExist($input, 'folder') ? trim($input['folder']) : './image',
            'title' => ArrayKeyExist($input, 'title') ? $input['title'] : true,
            'subtitle' => ArrayKeyExist($input, 'subtitle') ? $input['subtitle'] : true,
        ];
        $is_settings = JSONFetch('settings.json') ? JSONFetch('settings.json') : [];
        $is_active = 0;
        $is_active += $is_proper['title'] && IsTrue($is_settings->title) ? 1 : 0;
        $is_active += $is_proper['subtitle'] && IsTrue($is_settings->subtitle) ? 1 : 0;
        $is_array = array_filter(scandir($is_proper['folder']), function ($is_file) { return pathinfo($is_file, PATHINFO_EXTENSION) === 'jpg'; });
        $is_array = array_diff($is_array, []);
        $is_classes = [ ...sizeof($is_array) % 3 === 0 ? [ 'col-lg-4' ] : [ 'col-lg-3' ], 'col-sm-6' ];
        $is_return = '';
        $is_return .= '<div class=\'thumbnail-container container-fluid mx-auto p-0\'>';
            $is_return .= '<div class=\'row g-0\'>';
                foreach (array_keys($is_array) as $is_index):
                    $is_src = $is_proper['folder'] . '/' . $is_array[$is_index];
                    $is_return .= implode('', [
                        '<div class=\'thumbnail-content ' . implode(' ', $is_classes) . '\'>',
                            '<div class=\'thumbnail-background\'>',
                                '<div',
                                    ' class=\'thumbnail-picture\'',
                                    ' data-height=\'' . getimagesize($is_src)[1] . '\'',
                                    ' data-url=\'' . $is_src . '\'',
                                    ' data-width=\'' . getimagesize($is_src)[0] . '\'',
                                    ' style=\'background-image: url(' . $is_src . ')\'',
                                '></div>',
                            '</div>',
                            '<div class=\'thumbnail-filter\'></div>',
                            ...IsTrue($is_active) ? [
                                    '<div class=\'thumbnail-caption\'>',
                                        ...$is_proper['title'] ? [ ...IsTrue($is_settings->title) ? [ '<h1>' . trim($is_settings->title) . '</h1>' ] : [] ] : [],
                                        ...$is_proper['subtitle'] ? [ ...IsTrue($is_settings->subtitle) ? [ '<h2>' . trim($is_settings->subtitle) . '</h2>' ] : [] ] : [],
                                    '</div>',
                            ] : [
                            ],
                        '</div>',
                    ]);
                endforeach;
            $is_return .= '</div>';
        $is_return .= '</div>';
        return $is_return;
    };

    function FooterBuilder ($input = []) {
        $is_array = [];
        if (IsTrue($input)):
            for ($i = 0; $i < sizeof($input); $i++):
                IsTrue($input[$i]) ? array_push($is_array, $input[$i]) : [];
            endfor;
        endif;
        $is_return = '';
        if (IsTrue($is_array)):
            $is_return .= '<footer>';
                $is_return .= '<section>';
                    $is_return .= '<div class=\'align-items-start justify-content-center row g-0\'>';
                        $is_classes = [ ...sizeof($is_array) % 3 === 0 ? [ 'col-lg-4' ] : [ 'col-lg-6' ], 'col-sm-12', 'mb-3', 'gx-3' ];
                        for ($i = 0; $i < sizeof($is_array); $i++):
                            $is_iframe = substr(implode('', $is_array[$i]), 0, strlen('<iframe')) === '<iframe';
                            $is_return .= IsTrue($is_array[$i]) ? implode('', [
                                '<article class=\'' . implode(' ', $is_classes) . '\'>',
                                    '<div id=\'content-' . ($i + 1) . '\' class=\'' . (!$is_iframe ? 'content' : '') . '\'>',
                                        implode('', $is_array[$i]),
                                    '</div>',
                                '</article>',
                            ]) : [
                            ];
                        endfor;
                    $is_return .= '</div>';
                $is_return .= '</section>';
            $is_return .= '</footer>';
        endif;
        $is_return .= Developed ();
        return $is_return;
    };

?>