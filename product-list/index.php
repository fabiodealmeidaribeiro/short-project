<?php

    include_once('functions.php');

    echo HeaderDisplay ();

        if (IsTrue($is_array)):

        //     echo implode('', [
        //         '<nav',
        //             !empty(BootstrapClasses()['nav']) ? ' class=\'' . BootstrapClasses()['nav'] . '\'' : '',
        //             !$is_period ? ' data-bs-theme=\'dark\'' : '',
        //         '>',
        //             '<form',
        //                 ' action=\'index.php\'',
        //                 ' class=\'row m-0 p-0 h-100 w-100\'',
        //                 ' method=\'POST\'',
        //                 ' role=\'search\'',
        //             '>',
        //                 array_map(function ($is_index) {

        //                     if (ArrayKeyExist ($is_index, 'type')):
        //                         return implode('', [
        //                             '<div' . (IsTrue(BootstrapClasses()['column']) ? ' class=\'' . BootstrapClasses()['column'] . '\'' : '') . '>',
                                    
        //                                 $is_placeholder = '',
        //                                 $is_placeholder_array = explode(' ', trim($is_index['title'])),
                                        
        //                                 for ($j = 0, $j < sizeof($is_placeholder_array), $j++):
        //                                     $is_placeholder .= ucwords($is_placeholder_array[$j]),
        //                                     $is_placeholder .= $j < sizeof($is_placeholder_array) - 1 ? ' ' : '',
        //                                 endfor,
        //                                 $is_id = $is_name = strtolower(str_replace(' ', '-', $is_placeholder)),

        //                                 '<input',
        //                                     ' aria-label=\'' . $is_placeholder . '\'',
        //                                     IsTrue(BootstrapClasses()['input']) ? ' class=\'' . BootstrapClasses()['input'] . '\'' : '',
        //                                     ' id=\'' . $is_id . '\'',
        //                                     ' name=\'' . $is_name . '\'',
        //                                     ArrayKeyExist ($is_index, 'maxlength') ? ' maxlength=\'' . strtolower(trim($is_index['maxlength'])) . '\'' : '',
        //                                     ArrayKeyExist ($is_index, 'minlength') ? ' minlength=\'' . strtolower(trim($is_index['minlength'])) . '\'' : '',
        //                                     ' placeholder=\'' . $is_placeholder . '\'',
        //                                     ' type=\'' . strtolower(trim($is_index['type'])) . '\'',
        //                                     ' value=\'' . (ArrayKeyExist ($is_index, 'value') ? $is_index['value'] : '') . '\'',
        //                                 '>',
        //                             '</div>',
        //                         ]);
        //                     endif;
        //                 }, $is_array),
        //                 '<div' . (IsTrue(BootstrapClasses()['column']) ? ' class=\'' . BootstrapClasses()['column'] . '\'' : '') . '>',
        //                     '<button',
        //                         IsTrue(BootstrapClasses()['button']) ? ' class=\'' . BootstrapClasses()['button'] . '\'' : '',
        //                         ' type=\'submit\'',
        //                     '>',
        //                         'Process',
        //                     '</button>',
        //                 '</div>',
        //             '</form>',
        //         '</nav>',
        //     ]);

            echo '<nav';
                echo !empty(BootstrapClasses()['nav']) ? ' class=\'' . BootstrapClasses()['nav'] . '\'' : '';
                echo !$is_period ? ' data-bs-theme=\'dark\'' : '';
            echo '>';
                echo '<form';
                    echo ' action=\'index.php\'';
                    echo ' class=\'row m-0 p-0 h-100 w-100\'';
                    echo ' method=\'POST\'';
                    echo ' role=\'search\'';
                echo '>';
                    for ($i = 0; $i < sizeof($is_array); $i++):
                        if (ArrayKeyExist ($is_array[$i], 'type')):
                            echo '<div' . (IsTrue(BootstrapClasses()['column']) ? ' class=\'' . BootstrapClasses()['column'] . '\'' : '') . '>';
                                $is_placeholder = '';
                                $is_placeholder_array = explode(' ', trim($is_array[$i]['title']));
                                for ($j = 0; $j < sizeof($is_placeholder_array); $j++):
                                    $is_placeholder .= ucwords($is_placeholder_array[$j]);
                                    $is_placeholder .= $j < sizeof($is_placeholder_array) - 1 ? ' ' : '';
                                endfor;
                                $is_id = $is_name = strtolower(str_replace(' ', '-', $is_placeholder));
                                echo '<input';
                                    echo ' aria-label=\'' . $is_placeholder . '\'';
                                    echo IsTrue(BootstrapClasses()['input']) ? ' class=\'' . BootstrapClasses()['input'] . '\'' : '';
                                    echo ' id=\'' . $is_id . '\'';
                                    echo ' name=\'' . $is_name . '\'';
                                    echo ArrayKeyExist ($is_array[$i], 'maxlength') ? ' maxlength=\'' . strtolower(trim($is_array[$i]['maxlength'])) . '\'' : '';
                                    echo ArrayKeyExist ($is_array[$i], 'minlength') ? ' minlength=\'' . strtolower(trim($is_array[$i]['minlength'])) . '\'' : '';
                                    echo ' placeholder=\'' . $is_placeholder . '\'';
                                    echo ' type=\'' . strtolower(trim($is_array[$i]['type'])) . '\'';
                                    echo ' value=\'' . (ArrayKeyExist ($is_array[$i], 'value') ? $is_array[$i]['value'] : '') . '\'';
                                echo '>';
                            echo '</div>';
                        endif;
                    endfor;
                    echo '<div' . (IsTrue(BootstrapClasses()['column']) ? ' class=\'' . BootstrapClasses()['column'] . '\'' : '') . '>';
                        echo '<button';
                            echo IsTrue(BootstrapClasses()['button']) ? ' class=\'' . BootstrapClasses()['button'] . '\'' : '';
                            echo ' type=\'submit\'';
                        echo '>';
                            echo 'Process';
                        echo '</button>';
                    echo '</div>';
                echo '</form>';
            echo '</nav>';
        endif;

        echo '<table' . (IsTrue(BootstrapClasses()['table']) ? ' class=\'' . BootstrapClasses()['table'] . '\'' : '') . '>';
            echo TheadDisplay ($is_thead);
            $is_merge = [];
            for ($i = 0; $i < sizeof($is_array); $i++):
                $is_title = strtolower(str_replace(' ', '-', trim($is_array[$i]['title'])));
                $is_merge = array_merge($is_merge, [ $is_title => $is_array[$i]['value'] ]);
            endfor;
            echo TbodyDisplay ($is_merge);
        echo '</table>';

    echo FooterDisplay ();

?>