<?php

    $is_cnpj = '48.260.063/0001-03';
    $is_display = true;
    $is_end = 100;
    $is_start = 1;

    $is_length = 999999999;
    $is_start = isset($is_start) ? ($is_start > $is_end ? $is_end - 1 : $is_start) : '';
    $is_end = isset($is_end) ? ($is_end > $is_length ? $is_length : $is_end) : '';
    $is_cnpj = isset($is_cnpj) ? (strlen($is_cnpj) === strlen('48.260.063/0001-03') ? preg_replace('/[^0-9]/', '', $is_cnpj) : '') : '';
    $is_validity = $is_cnpj && $is_start < $is_end;

    $is_array = [];

    if ($is_validity):
        for ($i = $is_start; $i <= $is_end; $i++):
            array_push($is_array, $i);
        endfor;
    endif;

    include_once('functions.php');

    if (isset($is_array)):
        if (empty($is_array)): else:
            echo $is_display ? HeaderDisplay () : '';
                $is_class = '';
                $is_class .= $is_display ? ClassDisplay () : '';
                echo '<table' . ($is_class ? ' class=\'' . trim($is_class) . '\'' : '') . '>';
                    echo $is_display ? TheadDisplay ([ 'order', 'ean code', 'ean image' ]) : '';
                    echo '<tbody>';
                        for ($i = 0; $i < sizeof($is_array); $i++):
                            $is_order = '';
                            $is_order .= 789;
                            $is_order .= substr($is_cnpj, 0, strlen($is_length) - strlen($is_array[$i]));
                            $is_order .= $is_array[$i];
                            echo '<tr>';
                                echo '<td' . ($is_display ? ' scope=\'row\'' : '') . '>' . $is_order . '</td>';
                                echo '<td>' . NumberGenerator ($is_order) . '</td>';
                                echo '<td>';
                                    // echo CodeImageGenerator(numbergenerator($is_order));
                                echo '</td>';
                            echo '</tr>';
                        endfor;
                    echo '</tbody>';
                echo '</table>';
            echo $is_display ? FooterDisplay () : '';
        endif;
    endif;

?>