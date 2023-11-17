<?php

    include_once('functions.php');

    echo HeaderDisplay ();

        

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
                            echo ' value=\'' . (ArrayKeyExist ($is_array[$i], 'value') ? $is_array[$i]['value'] : '') . '\'';
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

        echo '<header>';
        echo '</header>';
        echo '<main>';
        echo '</main>';
        echo '<footer>';
        echo '</footer>';

    echo FooterDisplay ();

?>