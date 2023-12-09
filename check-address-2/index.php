<?php

    include_once('./functions.php');

    $is_database = ReadJSONFile('database.json') ? ReadJSONFile('database.json') : [];

    echo function_exists ('HeaderDisplay') ? HeaderDisplay () : null;

        echo implode('', [
            '<header', ...IsTrue(AllClasses()['header']) ? [ ' class=\'' . AllClasses()['header'] . '\'' ] : [], '>',
            '</header>',
            '<main', ...IsTrue(AllClasses()['main']) ? [ ' class=\'' . AllClasses()['main'] . '\'' ] : [], '>',
                function_exists ('FormBuilder') ? FormBuilder([ 'action' => 'process.php', 'database' => 'database.json' ]) : null,
            '</main>',
            '<footer', ...IsTrue(AllClasses()['footer']) ? [ ' class=\'' . AllClasses()['footer'] . '\'' ] : [], '>',
                function_exists ('LinkedinDisplay') ? LinkedinDisplay () : null,
            '</footer>',
        ]);

        echo function_exists ('HTMLCallerBuilder') ? HTMLCallerBuilder () : null;

        echo function_exists ('HTMLContainerBuilder') ? HTMLContainerBuilder () : null;

        if (IsArrayTrue($is_database)):
            for ($i = 0; $i < sizeof($is_database); $i++):
                if (IsArrayTrue($is_database[$i])):
                    for ($j = 0; $j < sizeof($is_database[$i]); $j++):
                        $is_index = get_object_vars($is_database[$i][$j]);
                        if (ArrayKeyExist ($is_index, 'container') && ArrayKeyExist ($is_index, 'selector')):
                            if ($is_index['container'] && $is_index['selector'] === 'button'):
                                if (function_exists('ContainerBuilder')):
                                    echo ContainerBuilder ([
                                        'body' => '',
                                        'id' => implode(' ', [ 'container', $is_index['id'] ]),
                                        'title' => $is_index['label']
                                    ]);
                                endif;
                            endif;
                        endif;
                    endfor;
                endif;
            endfor;
        endif;

    echo function_exists ('FooterDisplay') ? FooterDisplay () : null;

?>