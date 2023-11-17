<?php

    include_once('functions.php');

    echo HeaderDisplay();

        $is_array = [];

        $is_title = [ 'Start', 'Amount' ];

        for ($i = 0; $i < sizeof($is_title); $i++):
            $is_value = $is_title[$i] . ' Number';
            array_push($is_array, [
                'maxlength' => 6,
                'minlength' => 1,
                'title' => $is_value,
                'type' => 'number',
                'value' => isset($_POST[strtolower(str_replace(' ', '-', $is_value))])
                ? $_POST[strtolower(str_replace(' ', '-', $is_value))] : '',
            ]);
        endfor;

        $is_title = 'Cnpj Number';

        array_push($is_array, [
            'maxlength' => strlen($is_cnpj),
            'minlength' => strlen($is_cnpj),
            'title' => $is_title,
            'type' => 'text',
            'value' => isset($_POST[strtolower(str_replace(' ', '-', $is_title))])
            ? $_POST[strtolower(str_replace(' ', '-', $is_title))]
            : $is_cnpj,
        ]);

        echo '<nav';
            echo !empty(SelectorClasses()['nav']) ? ' class=\'' . SelectorClasses()['nav'] . '\'' : '';
            echo !$is_period ? ' data-bs-theme=\'dark\'' : '';
        echo '>';
            echo '<form';
                echo ' action=\'index.php\'';
                echo ' class=\'row m-0 p-0 h-100 w-100\'';
                echo ' method=\'POST\'';
                echo ' role=\'search\'';
            echo '>';
                for ($i = 0; $i < sizeof($is_array); $i++):
                    echo '<div' . (IsTrue(SelectorClasses()['column']) ? ' class=\'' . SelectorClasses()['column'] . '\'' : '') . '>';
                        $is_placeholder = trim($is_array[$i]['title']);
                        $is_id = $is_name = strtolower(str_replace(' ', '-', $is_placeholder));
                        echo '<input';
                            echo ' aria-label=\'' . $is_placeholder . '\'';
                            echo IsTrue(SelectorClasses()['input']) ? ' class=\'' . SelectorClasses()['input'] . '\'' : '';
                            echo ' id=\'' . $is_id . '\'';
                            echo ' name=\'' . $is_name . '\'';
                            echo ArrayKeyExist ($is_array[$i], 'maxlength') ? ' maxlength=\'' . $is_array[$i]['maxlength'] . '\'' : '';
                            echo ArrayKeyExist ($is_array[$i], 'minlength') ? ' minlength=\'' . $is_array[$i]['minlength'] . '\'' : '';
                            echo ' placeholder=\'' . $is_placeholder . '\'';
                            echo ' type=\'' . (ArrayKeyExist ($is_array[$i], 'type') ? $is_array[$i]['type'] : 'text') . '\'';
                            echo ' value=\'' . (ArrayKeyExist ($is_array[$i], 'value') ? $is_array[$i]['value'] : $is_cnpj) . '\'';
                        echo '>';
                    echo '</div>';
                endfor;
                echo '<div' . (IsTrue(SelectorClasses()['column']) ? ' class=\'' . SelectorClasses()['column'] . '\'' : '') . '>';
                    echo '<button';
                        echo IsTrue(SelectorClasses()['button']) ? ' class=\'' . SelectorClasses()['button'] . '\'' : '';
                        echo ' type=\'submit\'';
                    echo '>';
                        echo 'Process';
                    echo '</button>';
                echo '</div>';
            echo '</form>';
        echo '</nav>';

        echo '<table' . (IsTrue(SelectorClasses()['table']) ? ' class=\'' . SelectorClasses()['table'] . '\'' : '') . '>';
            echo TheadDisplay ($is_thead);
            $is_merge = [];
            for ($i = 0; $i < sizeof($is_array); $i++):
                $is_title = strtolower(str_replace(' ', '-', trim($is_array[$i]['title'])));
                $is_merge = array_merge($is_merge, [ $is_title => $is_array[$i]['value'] ]);
            endfor;
            echo TbodyDisplay ($is_merge);
        echo '</table>';

        echo BootstrapModal ([
            'title' => 'container',
            'body' => file_exists('container.html') ? SetStyle(file_get_contents('container.html')) : '',
            'button' => [ 'Copy', 'Print', 'Send' ]
        ]);

        $is_array = [];
        $is_archives = array_filter(scandir('footer'), function ($is_file) {
            return pathinfo($is_file, PATHINFO_EXTENSION) === 'html';
        });
        $is_indexes = array_keys(array_diff($is_archives, []));
        foreach ($is_indexes as $is_index):
            $is_title = str_replace('-', ' ', str_replace('.html', '', $is_archives[$is_index]));
            array_push($is_array, $is_title);
            $is_archive = './footer/' . $is_archives[$is_index];
            echo BootstrapModal ([
                'title' => $is_title,
                'body' => file_exists($is_archive) ? SetStyle(file_get_contents($is_archive)) : '',
            ]);
        endforeach;
        echo BootstrapModalCall ([ 'selector' => 'a', 'array' => $is_array ]);

    echo FooterDisplay ();

?>