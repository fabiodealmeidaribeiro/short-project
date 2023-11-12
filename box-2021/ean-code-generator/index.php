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
            echo !$is_period ? ' data-bs-theme=\'dark\'' : '';
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
                            $is_class = implode(' ', [ 'form-control', ...$is_period ? [ 'bg-light', 'text-dark' ] : [ 'bg-dark', 'text-light' ], 'm-0', 'p-2', 'h-100', 'w-100' ]);
                            echo !empty($is_class) ? ' class=\'' . $is_class . '\'' : '';
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
                    $is_class = implode(' ', [ 'btn', ...$is_period ? [ 'btn-light' ] : [ 'btn-dark' ], 'm-0', 'p-2' ]);
                    echo '<button' . (!empty($is_class) ? ' class=\'' . $is_class . '\'' : '') . ' type=\'submit\'>';
                        echo 'Process';
                    echo '</button>';
                echo '</div>';
            echo '</form>';
        echo '</nav>';

        echo '<table class=\'' . TableClasses() . '\'>';
            echo TheadDisplay ();
            $is_merge = [];
            for ($i = 0; $i < sizeof($is_array); $i++):
                $is_title = strtolower(str_replace(' ', '-', trim($is_array[$i]['title'])));
                $is_merge = array_merge($is_merge, [ $is_title => $is_array[$i]['value'] ]);
            endfor;
            echo TbodyDisplay ($is_merge);
        echo '</table>';

        echo BootstrapModal ([
            'id' => 'Container',
            'title' => 'Container',
            'body' => [
                'Ad minim enim nulla nostrud consectetur mollit cupidatat duis aliqua velit velit eiusmod velit commodo.',
                'Proident laboris nisi adipisicing veniam esse.',
                'Occaecat et voluptate duis nulla labore eiusmod velit in ut reprehenderit ipsum aliqua nostrud velit.',
                'Eu ea consequat ut duis nostrud fugiat. Dolor nostrud tempor et do id qui sunt. Aute ad cillum ad cupidatat occaecat adipisicing labore culpa.',
                'Qui reprehenderit duis nostrud amet.',
                'Velit nisi commodo dolore ut eiusmod mollit veniam officia dolore elit laborum.',
                'Do proident sunt Lorem do.',
                'Nulla sint esse enim duis voluptate ut id do esse qui reprehenderit exercitation tempor.',
                'Do amet esse dolor dolor nostrud magna sunt adipisicing qui velit dolor tempor consequat non.',
                'Aliqua eiusmod nisi officia eiusmod labore aliqua et laboris.',
                'Ea ipsum eu ad fugiat velit quis.',
            ],
            'button' => [
                'Copy',
                'Print',
                'Send',
            ],
        ]);

    echo FooterDisplay ();

?>