<?php

    $is_start = 1; $is_end = 10;
    
    $is_start = isset($is_start)
    ? ($is_start > $is_end ? $is_end - 1 : $is_start)
    : '';

    $is_end = isset($is_end)
    ? ($is_end > $is_length ? $is_length : $is_end)
    : '';

    $is_cnpj = '48.260.063/0001-03';
    $is_cnpj = isset($is_cnpj)
    ? (strlen($is_cnpj) === strlen('48.260.063/0001-03') ? preg_replace('/[^0-9]/', '', $is_cnpj) : '')
    : '';

    $is_length = '';
    $is_length .= 999;
    $is_length .= 999;
    $is_length .= 999;

    $is_array = [];

    if ($is_cnpj && $is_start < $is_end):
        for ($i = $is_start; $i <= $is_end; $i++):
            array_push($is_array, $i);
        endfor;
    endif;

    include_once('functions.php');

    if (empty($is_array)): else:

        echo HeaderDisplay ();

            $is_ID = [ 'Cnpj', 'Starting Number', 'End Number' ];

            echo '<nav class=\'p-2 w-100\'>';
                echo '<form class=\'row g-2 w-100\' role=\'search\'>';
                    for ($i = 0; $i < sizeof($is_ID); $i++):
                        echo '<div class=\'' . implode(' ', NavClasses ()) . '\'>';
                            echo '<input';
                                echo ' class=\'form-control w-100 m-0 p-2\'';
                                echo ' type=\'number\'';
                                echo ' id=\'' . strtolower(str_replace(' ', '-', trim($is_ID[$i]))) . '\'';
                                echo ' placeholder=\'' . trim($is_ID[$i]) . '\'';
                                echo ' aria-label=\'' . trim($is_ID[$i]) . '\'';
                            echo '>';
                        echo '</div>';
                    endfor;

                    echo '<div class=\'' . implode(' ', NavClasses ()) . '\'>';
                        echo '<button class=\'btn btn-outline-success\' type=\'submit\'>';
                            echo 'Process';
                        echo '</button>';
                    echo '</div>';

                    
                echo '</form>';
            echo '</nav>';

            echo '<table class=\'' . implode(' ', TableClasses()) . '\'>';

                echo TheadDisplay ([ 'order', 'ean code' ]);

                echo '<tbody>';
                    for ($i = 0; $i < sizeof($is_array); $i++):
                        $is_order = '';
                        $is_order .= 789;
                        $is_order .= substr($is_cnpj, 0, strlen($is_length) - strlen($is_array[$i]));
                        $is_order .= $is_array[$i];
                        echo '<tr>';
                            echo '<td scope=\'row\'>' . $is_order . '</td>';
                            echo '<td>' . NumberGenerator ($is_order) . '</td>';
                        echo '</tr>';
                    endfor;
                echo '</tbody>';
            echo '</table>';
            
        echo FooterDisplay ();

    endif;

?>