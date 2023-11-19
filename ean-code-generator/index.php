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

        echo implode('', [
            '<nav', !empty(BootstrapClasses()['nav']) ? ' class=\'' . BootstrapClasses()['nav'] . '\'' : '', !$is_period ? ' data-bs-theme=\'dark\'' : '', '>',
                '<form', ' action=\'index.php\'', ' class=\'row m-0 p-0 h-100 w-100\'', ' method=\'POST\'', ' role=\'search\'', '>',
        ]);

        for ($i = 0; $i < sizeof($is_array); $i++):
            $is_placeholder = trim($is_array[$i]['title']);
            $is_id = $is_name = strtolower(str_replace(' ', '-', $is_placeholder));
            echo implode('', [
                '<div' . (IsTrue(BootstrapClasses()['column']) ? ' class=\'' . BootstrapClasses()['column'] . '\'' : '') . '>',
                    '<input',
                        ' aria-label=\'' . $is_placeholder . '\'',
                        IsTrue(BootstrapClasses()['input']) ? ' class=\'' . BootstrapClasses()['input'] . '\'' : '',
                        ' id=\'' . $is_id . '\'',
                        ' name=\'' . $is_name . '\'',
                        ArrayKeyExist ($is_array[$i], 'maxlength') ? ' maxlength=\'' . $is_array[$i]['maxlength'] . '\'' : '',
                        ArrayKeyExist ($is_array[$i], 'minlength') ? ' minlength=\'' . $is_array[$i]['minlength'] . '\'' : '',
                        ' placeholder=\'' . $is_placeholder . '\'',
                        ' type=\'' . (ArrayKeyExist ($is_array[$i], 'type') ? $is_array[$i]['type'] : 'text') . '\'',
                        ' value=\'' . (ArrayKeyExist ($is_array[$i], 'value') ? $is_array[$i]['value'] : $is_cnpj) . '\'',
                    '>',
                '</div>',
            ]);
        endfor;

        echo implode('', [
                        '<div', IsTrue(BootstrapClasses()['column']) ? ' class=\'' . BootstrapClasses()['column'] . '\'' : '', '>',
                        '<button', IsTrue(BootstrapClasses()['button']) ? ' class=\'' . BootstrapClasses()['button'] . '\'' : '', ' type=\'submit\'', '>',
                            'Process',
                        '</button>',
                    '</div>',
                '</form>',
            '</nav>',
        ]);

        echo '<table' . (IsTrue(BootstrapClasses()['table']) ? ' class=\'' . BootstrapClasses()['table'] . '\'' : '') . '>';
            echo TheadDisplay ($is_thead);
            $is_merge = [];
            for ($i = 0; $i < sizeof($is_array); $i++):
                $is_merge = array_merge($is_merge, [ strtolower(str_replace(' ', '-', trim($is_array[$i]['title']))) => $is_array[$i]['value'] ]);
            endfor;
            echo TbodyDisplay ($is_merge);
        echo '</table>';

        echo BootstrapModal ([
            'title' => 'container',
            'body' => file_exists('container.html') ? SetStyle(file_get_contents('container.html')) : '',
            'button' => [ 'Copy', 'Print', 'Send' ]
        ]);

        $is_modal = [];

        $is_array = array_filter(scandir('footer'), function ($is_file) { return pathinfo($is_file, PATHINFO_EXTENSION) === 'html'; });

        foreach (array_keys(array_diff($is_array, [])) as $is_index):
            $is_title = str_replace('-', ' ', str_replace('.html', '', $is_array[$is_index]));
            $is_archive = './footer/' . $is_array[$is_index];
            echo BootstrapModal ([
                'title' => $is_title,
                'body' => file_exists($is_archive) ? SetStyle(file_get_contents($is_archive)) : '',
            ]);
            array_push($is_modal, $is_title);
        endforeach;

        echo BootstrapModalCall ([ 'selector' => 'a', 'array' => $is_modal ]);

    echo FooterDisplay ();

?>