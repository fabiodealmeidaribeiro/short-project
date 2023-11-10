<?php
    include_once('functions.php');
    echo HeaderDisplay();
    $is_array = [
        [
            'maxlength' => strlen('48.260.063/0001-03'),
            'minlength' => strlen('48.260.063/0001-03'),
            'title' => 'Cnpj Number',
            'type' => 'text',
        ],
        [
            'maxlength' => strlen(999999),
            'minlength' => strlen(9),
            'title' => 'Start Number',
            'type' => 'number',
        ],
        [
            'maxlength' => strlen(999999),
            'minlength' => strlen(9),
            'title' => 'End Number',
            'type' => 'number',
        ]
    ];
    echo '<nav class=\'' . NavClasses() . '\'>';
        echo '<form';
            echo ' action=\'index.php\'';
            echo ' class=\'row g-2 w-100\'';
            echo ' method=\'POST\'';
            echo ' role=\'search\'';
        echo '>';
            for ($i = 0; $i < sizeof($is_array); $i++):
                echo '<div class=\'' . ColumnClasses() . '\'>';
                    echo '<input';
                        echo ' aria-label=\'' . trim($is_array[$i]['title']) . '\'';
                        echo ' class=\'form-control w-100 m-0 p-2\'';
                        echo ' id=\'' . strtolower(str_replace(' ', '-', trim($is_array[$i]['title']))) . '\'';
                        echo ' name=\'' . strtolower(str_replace(' ', '-', trim($is_array[$i]['title']))) . '\'';
                        echo ArrayKeyExist ($is_array[$i], 'maxlength') ? ' maxlength=\'' . $is_array[$i]['maxlength'] . '\'' : '';
                        echo ArrayKeyExist ($is_array[$i], 'minlength') ? ' minlength=\'' . $is_array[$i]['minlength'] . '\'' : '';
                        echo ' placeholder=\'' . trim($is_array[$i]['title']) . '\'';
                        echo ' type=\'' . (ArrayKeyExist ($is_array[$i], 'type') ? $is_array[$i]['type'] : 'text') . '\'';
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
        echo TbodyDisplay ([
            'start-number' => isset($_POST['start-number']) ? $_POST['start-number'] : 1,
            'end-number' => isset($_POST['end-number']) ? $_POST['end-number'] : 10,
            'cnpj-number' => isset($_POST['cnpj-number']) ? $_POST['cnpj-number'] : '48.260.063/0001-03',
        ]);
    echo '</table>';
    echo FooterDisplay ();
?>