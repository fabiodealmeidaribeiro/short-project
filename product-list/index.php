<?php

    include_once('functions.php');

    echo HeaderDisplay ();

        echo implode('', [
            '<nav', ...!empty(BootstrapClasses()['nav']) ? [ ' class=\'' . BootstrapClasses()['nav'] . '\'' ] : [], ...!$is_period ? [ ' data-bs-theme=\'dark\'' ] : [], '>',
                '<form', ' action=\'index.php\'', ' class=\'row m-0 p-0 h-100 w-100\'', ' method=\'POST\'', ' role=\'search\'', '>',
        ]);

        if (IsTrue($is_array)):
            for ($i = 0; $i < sizeof($is_array); $i++):
                if (ArrayKeyExist ($is_array[$i], 'type')):
                    $is_placeholder = '';
                    for ($j = 0; $j < sizeof(explode(' ', trim($is_array[$i]['title']))); $j++):
                        $is_placeholder .= implode('', [
                            ucwords(explode(' ', trim($is_array[$i]['title']))[$j]),
                            ...$j < sizeof(explode(' ', trim($is_array[$i]['title']))) - 1 ? [' '] : [],
                        ]);
                    endfor;
                    $is_id = $is_name = strtolower(str_replace(' ', '-', $is_placeholder));
                    echo implode('', [
                        '<div', ...IsTrue(BootstrapClasses()['column']) ? [ ' class=\'' . BootstrapClasses()['column'] . '\'' ] : [] ,'>',
                            '<input',
                                ' aria-label=\'' . $is_placeholder . '\'',
                                ...IsTrue(BootstrapClasses()['input']) ? [ ' class=\'' . BootstrapClasses()['input'] . '\'' ] : [],
                                ' id=\'' . $is_id . '\'',
                                ' name=\'' . $is_name . '\'',
                                ...ArrayKeyExist ($is_array[$i], 'maxlength') ? [ ' maxlength=\'' . $is_array[$i]['maxlength'] . '\'' ] : [],
                                ...ArrayKeyExist ($is_array[$i], 'minlength') ? [ ' minlength=\'' . $is_array[$i]['minlength'] . '\'' ] : [],
                                ' placeholder=\'' . $is_placeholder . '\'',
                                ' type=\'', ...ArrayKeyExist ($is_array[$i], 'type') ? [ $is_array[$i]['type'] ] : [ 'text' ] ,'\'',
                                ' value=\'', ...ArrayKeyExist ($is_array[$i], 'value') ? [ $is_array[$i]['value'] ] : [] , '\'',
                            '>',
                        '</div>',
                    ]);
                endif;
            endfor;
        endif;

        echo implode('', [
                        '<div', ...IsTrue(BootstrapClasses()['column']) ? [ ' class=\'' . BootstrapClasses()['column'] . '\'' ] : [], '>',
                        '<button', ...IsTrue(BootstrapClasses()['button']) ? [ ' class=\'' . BootstrapClasses()['button'] . '\'' ] : [], ' type=\'submit\'', '>',
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

    echo FooterDisplay ();

?>