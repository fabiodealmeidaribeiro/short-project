<?php

    $is_cnpj = '48.260.063/0001-03';

    $is_display = true;
    $is_start = 1;
    $is_end = 10;

    $is_length = '';
    $is_length .= 999;
    $is_length .= 999;
    $is_length .= 999;

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


                $is_ID = [ 'Cnpj', 'Starting Number', 'End Number' ];



                echo '<nav class=\'p-2 w-100\'>';
                    echo '<form class=\'row g-2 w-100\' role=\'search\'>';
                        $is_classes = [ 'col-12', 'col-md-6', 'col-lg-3' ];
                        for ($i = 0; $i < sizeof($is_ID); $i++):
                            echo '<div' . (!empty($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . '>';
                                echo '<input';
                                    echo ' class=\'form-control w-100 m-0 p-2\'';
                                    echo ' type=\'number\'';
                                    echo ' id=\'' . strtolower(str_replace(' ', '-', trim($is_ID[$i]))) . '\'';
                                    echo ' placeholder=\'' . trim($is_ID[$i]) . '\'';
                                    echo ' aria-label=\'' . trim($is_ID[$i]) . '\'';
                                echo '>';
                            echo '</div>';
                        endfor;
                        echo '<div' . (!empty($is_classes) ? ' class=\'' . implode(' ', $is_classes) . '\'' : '') . '>';
                            echo '<button class=\'btn btn-outline-success\' type=\'submit\'>';
                                echo 'Process';
                            echo '</button>';
                        echo '</div>';
                    echo '</form>';
                echo '</nav>';


                echo '<table' . ($is_class ? ' class=\'' . trim($is_class) . '\'' : '') . '>';
                    echo $is_display ? TheadDisplay ([ 'order', 'ean code' ]) : '';
                    echo '<tbody>';
                        for ($i = 0; $i < sizeof($is_array); $i++):
                            $is_order = '';
                            $is_order .= 789;
                            $is_order .= substr($is_cnpj, 0, strlen($is_length) - strlen($is_array[$i]));
                            $is_order .= $is_array[$i];
                            echo '<tr>';
                                echo '<td' . ($is_display ? ' scope=\'row\'' : '') . '>' . $is_order . '</td>';
                                echo '<td>' . NumberGenerator ($is_order) . '</td>';
                            echo '</tr>';
                        endfor;
                    echo '</tbody>';
                echo '</table>';



            echo $is_display ? FooterDisplay () : '';
        endif;
    endif;

?>