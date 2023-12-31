<?php
    include_once('./functions.php');

    echo HeaderDisplay ();
    
        if (IsTrue($is_fields)):
            echo implode('', [
                '<div class=\'', BSClass()['container']['navbar'], '\'>',
                    '<nav class=\'', BSClass()['nav'], '\'', ...!$is_period ? [ ' data-bs-theme=\'dark\'' ] : [], '>',
                        '<form action=\'index.php\' class=\'row m-0 p-0 h-100 w-100\' method=\'POST\' role=\'search\'>',
            ]);
            for ($i = 0; $i < sizeof($is_fields); $i++):
                $is_placeholder = '';
                $is_explode = explode('_', trim($is_fields[$i]['title']));
                for ($j = 0; $j < sizeof($is_explode); $j++) $is_placeholder .= implode('', [ ucwords($is_explode[$j]), ...$j < sizeof($is_explode) - 1 ? [' '] : [], ]);
                $is_id = $is_name = strtolower(str_replace(' ', '-', $is_placeholder));
                echo implode('', [
                    '<div', ...IsTrue(BSClass()['column']) ? [ ' class=\'' . BSClass()['column'] . '\'' ] : [] ,'>',
                        '<input',
                            ' aria-label=\'' . $is_placeholder . '\'',
                            ...IsTrue(BSClass()['input']) ? [ ' class=\'' . BSClass()['input'] . '\'' ] : [],
                            ' id=\'' . $is_id . '\'',
                            ' name=\'' . $is_name . '\'',
                            ...ArrayKeyExist ($is_fields[$i], 'maxlength') ? [ ' maxlength=\'' . $is_fields[$i]['maxlength'] . '\'' ] : [],
                            ...ArrayKeyExist ($is_fields[$i], 'minlength') ? [ ' minlength=\'' . $is_fields[$i]['minlength'] . '\'' ] : [],
                            ' placeholder=\'' . $is_placeholder . '\'',
                            ' type=\'', ...ArrayKeyExist ($is_fields[$i], 'type') ? [ $is_fields[$i]['type'] ] : [ 'text' ] ,'\'',
                            ' value=\'', ...ArrayKeyExist ($is_fields[$i], 'value') ? [ $is_fields[$i]['value'] ] : [] , '\'',
                        '>',
                    '</div>',
                ]);
            endfor;
            echo implode('', [
                                '<div class=\'', BSClass()['column'], '\'>',
                                '<button class=\'', BSClass()['button'], '\' type=\'submit\'>',
                                    'Process',
                                '</button>',
                            '</div>',
                        '</form>',
                    '</nav>',
                '</div>',
            ]);
        endif;

        echo implode('', [
            '<div class=\'' . BSClass()['container']['table'] . '\'>',
                '<table class=\'' . BSClass()['table'] . '\'>',
                    TheadDisplay(),
                    TbodyDisplay(),
                '</table>',
            '</div>',
        ]);

        echo ContainerBuilder();

        echo CallerBuilder();
        
    echo FooterDisplay ();

?>