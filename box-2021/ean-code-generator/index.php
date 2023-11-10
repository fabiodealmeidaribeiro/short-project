<?php

    $is_ID = [
        'Cnpj',
        'Starting Number',
        'End Number'
    ];

    $is_start = isset($_POST['starting-number']) ? $_POST['starting-number'] : 1;

    $is_end = isset($_POST['end-number']) ? $_POST['end-number'] : 10;

    $is_cnpj = preg_replace('/[^0-9]/', '', isset($_POST['cnpj']) ? $_POST['cnpj'] : '48.260.063/0001-03');

    $is_array = [];

    if ($is_cnpj && $is_start < $is_end):
        for ($i = $is_start; $i <= $is_end; $i++):
            array_push($is_array, $i);
        endfor;
    endif;

    include_once('functions.php');

    echo HeaderDisplay();

    echo '<nav class=\'' . NavClasses() . '\'>';
        echo '<form';
            echo ' action=\'index.php\'';
            echo ' class=\'row g-2 w-100\'';
            echo ' method=\'POST\'';
            echo ' role=\'search\'';
        echo '>';
            for ($i = 0; $i < sizeof($is_ID); $i++):
                echo '<div class=\'' . ColumnClasses() . '\'>';
                    echo '<input';
                        echo ' aria-label=\'' . trim($is_ID[$i]) . '\'';
                        echo ' class=\'form-control w-100 m-0 p-2\'';
                        echo ' id=\'' . strtolower(str_replace(' ', '-', trim($is_ID[$i]))) . '\'';
                        echo ' name=\'' . strtolower(str_replace(' ', '-', trim($is_ID[$i]))) . '\'';
                        echo ' placeholder=\'' . trim($is_ID[$i]) . '\'';
                        echo ' type=\'text\'';
                    echo '>';
                echo '</div>';
            endfor;
            echo '<div class=\'' . ColumnClasses() . '\'>';
                echo '<button class=\'btn btn-outline-success\' type=\'submit\'>';
                    echo 'Process';
                echo '</button>';
            echo '</div>';
        echo '</form>';
    echo '</nav>';

    echo '<table class=\'' . TableClasses() . '\'>';
        echo TheadDisplay ();
        echo '<tbody>';
            for ($i = 0; $i < sizeof($is_array); $i++):
                $is_order = '';
                $is_order .= 789;
                $is_order .= substr($is_cnpj, 0, 9 - strlen($is_array[$i]));
                $is_order .= $is_array[$i];
                echo '<tr>';
                    echo '<td scope=\'row\'>' . $i . '</td>';
                    echo '<td>' . $is_order . '</td>';
                    echo '<td>' . NumberGenerator ($is_order) . '</td>';
                    echo '<td>' . NumberGenerator ($is_order) . '</td>';
                echo '</tr>';
            endfor;
        echo '</tbody>';
    echo '</table>';

    echo FooterDisplay ();

?>