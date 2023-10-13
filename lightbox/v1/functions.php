<?php

    function HeaderDisplay ($output = []) {
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

    function ThumbnailBuilder ($output = '') {
        $is_return = '';
        $is_folder = $output;
        if (is_dir($is_folder)):
            $is_return .= '<div class=\'photo-container container-fluid mx-auto p-0\'>';
                $is_return .= '<div class=\'row g-0\'>';
                    $is_archives = array_filter(scandir($is_folder), function ($is_file) {
                        return pathinfo($is_file, PATHINFO_EXTENSION) === 'jpg';
                    });
                    $is_archives = array_diff($is_archives, []);
                    $is_indexes = array_keys($is_archives);
                    foreach ($is_indexes as $is_index):
                        $is_src = $is_folder . '/' . $is_archives[$is_index];
                        if (is_file($is_src)):
                            $is_classes = [ ...sizeof($is_archives) % 3 === 0 ? [ 'col-lg-4' ] : [ 'col-lg-3' ], 'col-sm-6' ];
                            $is_return .= '<div class=\'photo-content ' . implode(' ', $is_classes) . '\'>';
                                $is_return .= '<div class=\'photo-background\'>';
                                    $is_return .= '<div';
                                        $is_return .= ' class=\'photo-picture\'';
                                        $is_return .= ' data-height=\'' . getimagesize($is_src)[1] . '\'';
                                        $is_return .= ' data-index=\'' . $is_index . '\'';
                                        $is_return .= ' data-url=\'' . $is_src . '\'';
                                        $is_return .= ' data-width=\'' . getimagesize($is_src)[0] . '\'';
                                        $is_return .= ' style=\'background-image: url(' . $is_src . ')\'';
                                    $is_return .= '></div>';
                                $is_return .= '</div>';
                                $is_return .= '<div class=\'photo-filter\'></div>';
                                $is_return .= '<div class=\'photo-caption\'>';
                                    $is_return .= '<h1>' . 'Viva Hostel Design.' . '</h1>';
                                    $is_return .= '<h2>' . 'O melhor da Vila Madalena em elegância e conforto.' . '</h2>';
                                    $is_return .= '<p>' . 'Consequat deserunt dolor quis ad nisi consectetur ipsum qui exercitation occaecat officia laborum.' . '</p>';
                                $is_return .= '</div>';
                            $is_return .= '</div>';
                        endif;
                    endforeach;
                $is_return .= '</div>';
            $is_return .= '</div>';
        endif;
        return $is_return;
    };
?>