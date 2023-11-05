<?php

    function HeaderDisplay () {
        $is_classes = [
            'bg-light',
            'h-100',
            'w-100',
        ];
        $is_return = '';
        $is_return .= '<!doctype html>';
        $is_return .= '<html lang=\'en\' translate=\'no\'>';
            $is_return .= '<head>';
                $is_return .= '<title></title>';
                $is_return .= '<meta charset=\'utf-8\'>';
                $is_return .= '<meta name=\'viewport\' content=\'width=device-width, initial-scale=1, shrink-to-fit=no\'>';
                $is_return .= '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>';
                $is_return .= '<link href=\'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css\' rel=\'stylesheet\'>';
                $is_return .= file_exists('style.css') ? '<link href=\'style.css\' rel=\'stylesheet\' crossorigin=\'anonymous\'>' : '';
            $is_return .= '</head>';
            $is_return .= '<body' . (!empty($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . '>';
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

    function Directory () {
        $is_array = [];
        foreach (new DirectoryIterator(dirname(__FILE__)) as $is_index):
            $_active = $is_index->isDir() && $is_index->getFilename() !== '.' && $is_index->getFilename() !== '..' && $is_index->getFilename() !== '.git';
            if ($_active): $is_array[] = $is_index->getFilename(); endif;
        endforeach;
        return [
            'folder' => $is_array,
            'url' => substr($_SERVER['PHP_SELF'], 0, strpos($_SERVER['PHP_SELF'], 'index.php')),
        ];
    };

    echo HeaderDisplay ();

    $is_URL = Directory()['url'];

    $is_folder = Directory()['folder'];

    if (empty($is_folder)): else:
        $is_classes = [
            'align-items-center',
            'd-flex',
            'flex-column',
            'h-100',
            'justify-content-center',
            'w-100',
        ];
        echo '<main' . (!empty($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . '>';
            $is_classes = [
                'content',
                'col-12',
                'col-lg-8',
                'm-auto',
                'bg-white',
                'border',
                'border-1',
                'rounded-3',
                'shadow-sm',
                'p-3',
            ];
            $is_current = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . dirname(dirname($_SERVER['PHP_SELF']));
            echo '<div' . (!empty($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . '>';
                echo '<a href=\'' . $is_current . '\'>' . '<h1 class=\'fs-1 m-0 p-0\'>' . 'Previous Page.' . '</h1>' . '</a>';
                for ($i = 0; $i < sizeof($is_folder); $i++):
                    echo '<a href=\'' . $is_URL . $is_folder[$i] . '\'>';
                        echo '<h1 class=\'d-inline-block fs-1 m-0 p-0\'>';
                            echo ucwords(str_replace('-', ' ', $is_folder[$i]));
                            echo $i < sizeof($is_folder) - 1 ? ', ' : '.';
                        echo '</h1>';
                    echo '</a>';
                endfor;
            echo '</div>';
        echo '</main>';
    endif;

    echo FooterDisplay ();
    
?>