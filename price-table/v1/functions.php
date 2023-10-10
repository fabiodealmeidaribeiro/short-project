<?php

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
            $is_return .= file_exists('script.js') ? '<script src=\'script.js\' type=\'module\' crossorigin=\'anonymous\'></script>' : '';
        $is_return .= '</html>';
        return $is_return;
    };
    
?>