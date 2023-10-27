<?php

    function ReadJSONFile ($is_json) {
        if (file_exists($is_json)):
            return json_decode(file_get_contents($is_json));
        endif;
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

    function PoweredBy ($output = []) {
        $is_proper = [
            'url' => ArrayKeyExist($output, 'url') ? trim($output['url']) : 'https://linkedin.com/in/fabiodealmeidaribeiro',
            'title' => ArrayKeyExist($output, 'title') ? trim($output['title']) : 'Desenvolvido por Fábio de Almeida Ribeiro',
        ];
        $is_return = '';
        if (IsTrue($is_proper['title']) && IsTrue($is_proper['url'])):
            if (filter_var($is_proper['url'], FILTER_VALIDATE_URL)):
                $is_return .= '<footer class=\'bg-black text-center p-3\'>';
                    $is_return .= '<p class=\'m-0 p-0\'>';
                        $is_return .= '<a class=\'text-decoration-none text-white\' href=\'' . trim($is_proper['url']) . '/\' target=\'_blank\'>';
                            $is_return .= trim($is_proper['title']);
                        $is_return .= '</a>';
                    $is_return .= '</p>';
                $is_return .= '</footer>';
            endif;
        endif;
        return $is_return;
    };

    function HeaderDisplay () {
        $is_return = '';
        $is_return .= '<!doctype html>';
        $is_return .= '<html lang=\'en\'>';
            $is_return .= '<head>';
                $is_return .= '<title></title>';
                $is_return .= '<meta charset=\'utf-8\'>';
                $is_return .= '<meta name=\'viewport\' content=\'width=device-width, initial-scale=1, shrink-to-fit=no\'>';
                $is_return .= '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>';
                $is_return .= '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css\' rel=\'stylesheet\'>';
                $is_return .= file_exists('style.css') ? '<link href=\'style.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>' : '';
            $is_return .= '</head>';
            $is_return .= '<body>';
        return $is_return;
    };

    function FooterDisplay () {
            $is_return = '';
            $is_return .= '</body>';
            $is_return .= '<script src=\'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js\' crossorigin=\'anonymous\'></script>';
            $is_return .= '<script src=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js\' crossorigin=\'anonymous\'></script>';
            // $is_return .= '<script async src=\'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3915625735347184\' crossorigin=\'anonymous\'></script>';
            // $is_return .= '<script src=\'https://platform.linkedin.com/badges/js/profile.js\' async defer type=\'text/javascript\'></script>';
            $is_return .= file_exists('script.js') ? '<script src=\'script.js\' type=\'module\' crossorigin=\'anonymous\'></script>' : '';
        $is_return .= '</html>';
        return $is_return;
    };

    function ThumbnailBuilder ($output = []) {
        $is_return = '';
        $is_proper = [
            'folder' => ArrayKeyExist($output, 'folder') ? trim($output['folder']) : './image',
            'title' => ArrayKeyExist($output, 'title') ? $output['title'] : false,
            'subtitle' => ArrayKeyExist($output, 'subtitle') ? $output['subtitle'] : false,
            'concept' => ArrayKeyExist($output, 'concept') ? $output['concept'] : false,
        ];
        $is_about = ReadJSONFile('settings.json') ? ReadJSONFile('settings.json')->about : [];
        $is_concept = ReadJSONFile('settings.json') ? ReadJSONFile ('settings.json')->concept : [];
        if (is_dir($is_proper['folder'])):
            $is_return .= '<div class=\'thumbnail-container container-fluid mx-auto p-0\'>';
                $is_return .= '<div class=\'row g-0\'>';
                    $is_archives = array_filter(scandir($is_proper['folder']), function ($is_file) {
                        return pathinfo($is_file, PATHINFO_EXTENSION) === 'jpg';
                    });
                    $is_archives = array_diff($is_archives, []);
                    $is_indexes = array_keys($is_archives);
                    foreach ($is_indexes as $is_index):
                        $is_src = $is_proper['folder'] . '/' . $is_archives[$is_index];
                        if (is_file($is_src)):
                            $is_classes = [ ...sizeof($is_archives) % 3 === 0 ? [ 'col-lg-4' ] : [ 'col-lg-3' ], 'col-sm-6' ];
                            $is_return .= '<div class=\'thumbnail-content ' . implode(' ', $is_classes) . '\'>';
                                $is_return .= '<div class=\'thumbnail-background\'>';
                                    $is_return .= '<div';
                                        $is_return .= ' class=\'thumbnail-picture\'';
                                        $is_return .= ' data-height=\'' . getimagesize($is_src)[1] . '\'';
                                        $is_return .= ' data-url=\'' . $is_src . '\'';
                                        $is_return .= ' data-width=\'' . getimagesize($is_src)[0] . '\'';
                                        $is_return .= ' style=\'background-image: url(' . $is_src . ')\'';
                                    $is_return .= '></div>';
                                $is_return .= '</div>';
                                $is_return .= '<div class=\'thumbnail-filter\'></div>';
                                $is_active = 0;
                                $is_active += $is_proper['title'] ? (IsTrue($is_about->title) ? 1 : 0) : 0;
                                $is_active += $is_proper['subtitle'] ? (IsTrue($is_about->subtitle) ? 1 : 0) : 0;
                                $is_active += $is_proper['concept'] ? (IsTrue($is_concept) ? 1 : 0) : 0;
                                if (IsTrue($is_active)):
                                    $is_return .= '<div class=\'thumbnail-caption\'>';
                                        $is_return .= $is_proper['title'] ? (IsTrue($is_about->title) ? '<h1>' . trim($is_about->title) . '</h1>' : '') : '';
                                        $is_return .= $is_proper['subtitle'] ? (IsTrue($is_about->subtitle) ? '<h2>' . trim($is_about->subtitle) . '</h2>' : '') : '';
                                        $is_return .= $is_proper['concept'] ? (IsTrue($is_concept) ? '<p>' . RandomIndex($is_concept) . '</p>' : '') : '';
                                    $is_return .= '</div>';
                                endif;
                            $is_return .= '</div>';
                        endif;
                    endforeach;
                $is_return .= '</div>';
            $is_return .= '</div>';
        endif;
        return $is_return;
    };

    function FooterBuilder ($output = []) {
        $is_proper = [
            'content' => ArrayKeyExist($output, 'content') ? $output['content'] : [],
        ];
        $is_array = [];
        for ($i = 0; $i < sizeof($is_proper['content']); $i++):
            if (IsTrue($is_proper['content'][$i])):
                array_push($is_array, $is_proper['content'][$i]);
            endif;
        endfor;
        $is_return = '';
        if (IsTrue($is_array)):
            $is_return .= '<footer class=\'bg-dark m-0 p-0\'>';
                $is_return .= '<section class=\'mx-auto pt-3\' style=\'width : calc(100% - 10rem);\'>';
                    $is_return .= '<div class=\'align-items-start justify-content-center row gx-3\'>';
                        $is_classes = [ ...sizeof($is_array) % 3 === 0 ? [ 'col-lg-4' ] : [ 'col-lg-6' ], 'col-sm-12', 'mb-3' ];
                        for ($i = 0; $i < sizeof($is_array); $i++):
                            if (IsTrue($is_array[$i])):
                                $is_return .= '<article class=\'' . implode(' ', $is_classes) . '\'>';
                                    $is_return .= implode('', $is_array[$i]);
                                $is_return .= '</article>';
                            endif;
                        endfor;
                    $is_return .= '</div>';
                $is_return .= '</section>';
            $is_return .= '</footer>';
        endif;
        $is_return .= PoweredBy ();
        return $is_return;
    };

?>