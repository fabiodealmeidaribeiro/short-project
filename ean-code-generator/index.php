<?php

    include_once('./functions.php');

    echo HeaderDisplay();

        $is_array = [];

        $is_title = [ 'Start', 'Amount' ];

        if (IsTrue($is_title)):
            for ($i = 0; $i < sizeof($is_title); $i++):
                $is_value = $is_title[$i] . ' Number';
                array_push($is_array, [
                    'maxlength' => 6,
                    'minlength' => 1,
                    'title' => $is_value,
                    'type' => 'number',
                    'value' => isset($_POST[strtolower(str_replace(' ', '-', $is_value))]) ? $_POST[strtolower(str_replace(' ', '-', $is_value))] : '',
                ]);
            endfor;
        endif;

        $is_title = 'Cnpj Number';

        array_push($is_array, [
            'maxlength' => strlen($is_cnpj),
            'minlength' => strlen($is_cnpj),
            'title' => $is_title,
            'type' => 'text',
            'value' => isset($_POST[strtolower(str_replace(' ', '-', $is_title))]) ? $_POST[strtolower(str_replace(' ', '-', $is_title))] : $is_cnpj,
        ]);

        echo implode('', [
            '<nav', ...!empty(BSClass()['nav']) ? [ ' class=\'' . BSClass()['nav'] . '\'' ] : [], ...!$is_period ? [ ' data-bs-theme=\'dark\'' ] : [], '>',
                '<form', ' action=\'index.php\'', ' class=\'row m-0 p-0 h-100 w-100\'', ' method=\'POST\'', ' role=\'search\'', '>',
        ]);

        for ($i = 0; $i < sizeof($is_array); $i++):
            $is_placeholder = trim($is_array[$i]['title']);
            $is_id = $is_name = strtolower(str_replace(' ', '-', $is_placeholder));
            echo implode('', [
                '<div', ...IsTrue(BSClass()['column']) ? [ ' class=\'' . BSClass()['column'] . '\'' ] : [] ,'>',
                    '<input',
                        ' aria-label=\'' . $is_placeholder . '\'',
                        ...IsTrue(BSClass()['input']) ? [ ' class=\'' . BSClass()['input'] . '\'' ] : [],
                        ' id=\'' . $is_id . '\'',
                        ' name=\'' . $is_name . '\'',
                        ...ArrayKeyExist ($is_array[$i], 'maxlength') ? [ ' maxlength=\'' . $is_array[$i]['maxlength'] . '\'' ] : [],
                        ...ArrayKeyExist ($is_array[$i], 'minlength') ? [ ' minlength=\'' . $is_array[$i]['minlength'] . '\'' ] : [],
                        ' placeholder=\'' . $is_placeholder . '\'',
                        ' type=\'', ...ArrayKeyExist ($is_array[$i], 'type') ? [ $is_array[$i]['type'] ] : [ 'text' ] ,'\'',
                        ' value=\'', ...ArrayKeyExist ($is_array[$i], 'value') ? [ $is_array[$i]['value'] ] : [ $is_cnpj ] , '\'',
                    '>',
                '</div>',
            ]);
        endfor;

        echo implode('', [
                        '<div', ...IsTrue(BSClass()['column']) ? [ ' class=\'' . BSClass()['column'] . '\'' ] : [], '>',
                        '<button', ...IsTrue(BSClass()['button']) ? [ ' class=\'' . BSClass()['button'] . '\'' ] : [], ' type=\'submit\'', '>',
                            'Process',
                        '</button>',
                    '</div>',
                '</form>',
            '</nav>',
        ]);

        echo '<table' . (IsTrue(BSClass()['table']) ? ' class=\'' . BSClass()['table'] . '\'' : '') . '>';
            echo TheadDisplay ($is_thead);
            $is_merge = [];
            for ($i = 0; $i < sizeof($is_array); $i++):
                $is_merge = array_merge($is_merge, [ strtolower(str_replace(' ', '-', trim($is_array[$i]['title']))) => $is_array[$i]['value'] ]);
            endfor;
            echo TbodyDisplay ($is_merge);
        echo '</table>';

        echo BSContainer ([
            'title' => 'container',
            'button' => [ 'Copy', 'Print', 'Send' ]
        ]);

        echo ContainerBuilder();

        echo CallerBuilder();

    echo FooterDisplay ();

?>