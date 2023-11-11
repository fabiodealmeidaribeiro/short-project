<?php
    include_once('functions.php');
    
    echo HeaderDisplay();

    $is_array = [];

    $is_title = 'Start Number';

    array_push($is_array, [
        'maxlength' => 6,
        'minlength' => 1,
        'title' => $is_title,
        'type' => 'number',
        'value' => isset($_POST[strtolower(str_replace(' ', '-', $is_title))])
        ? $_POST[strtolower(str_replace(' ', '-', $is_title))]
        : '',
    ]);

    $is_title = 'End Number';

    array_push($is_array, [
        'maxlength' => 6,
        'minlength' => 1,
        'title' => $is_title,
        'type' => 'number',
        'value' => isset($_POST[strtolower(str_replace(' ', '-', $is_title))])
        ? $_POST[strtolower(str_replace(' ', '-', $is_title))]
        : '',
    ]);

    $is_title = 'Cnpj Number';
    
    array_push($is_array, [
        'maxlength' => strlen('01.234.567/0001-89'),
        'minlength' => strlen('01.234.567/0001-89'),
        'title' => $is_title,
        'type' => 'text',
        'value' => isset($_POST[strtolower(str_replace(' ', '-', $is_title))])
        ? $_POST[strtolower(str_replace(' ', '-', $is_title))]
        : 1,
    ]);

    echo '<nav';
        echo !empty(NavClasses()) ? ' class=\'' . NavClasses() . '\'' : '';
        date_default_timezone_set('America/Sao_Paulo');
        echo !(date('H') > 6 && date('H') < 18) ? ' data-bs-theme=\'dark\'' : '';
    echo '>';
        echo '<form';
            echo ' action=\'index.php\'';
            echo ' class=\'row m-0 p-0 h-100 w-100\'';
            echo ' method=\'POST\'';
            echo ' role=\'search\'';
        echo '>';
            for ($i = 0; $i < sizeof($is_array); $i++):
                echo '<div class=\'' . ColumnClasses() . '\'>';
                    $is_placeholder = trim($is_array[$i]['title']);
                    $is_id = $is_name = strtolower(str_replace(' ', '-', $is_placeholder));
                    echo '<input';
                        echo ' aria-label=\'' . $is_placeholder . '\'';
                        echo ' class=\'form-control m-0 p-2 h-100 w-100\'';
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
            echo '<div class=\'' . ColumnClasses() . '\'>';
                echo '<button class=\'btn btn-light m-0 p-2\' type=\'submit\'>';
                    echo 'Process';
                echo '</button>';
            echo '</div>';
        echo '</form>';
    echo '</nav>';

    echo '<table class=\'' . TableClasses() . '\'>';
        echo TheadDisplay ();
        echo TbodyDisplay ([
            strtolower(str_replace(' ', '-', trim($is_array[0]['title']))) => $is_array[0]['value'],
            strtolower(str_replace(' ', '-', trim($is_array[1]['title']))) => $is_array[1]['value'],
            strtolower(str_replace(' ', '-', trim($is_array[2]['title']))) => $is_array[2]['value'],
        ]);
    echo '</table>';

    echo BootstrapModal ();

    echo FooterDisplay ();

?>