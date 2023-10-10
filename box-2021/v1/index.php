<?php
    $is_deleted = [
        '8.jpg',
    ];
    $is_replace = [
        [
            'original' => '212-13',
            'replace' => '217-14',
        ],
        [
            'original' => 'INST-BOX/VANTAGENS.png',
            'replace' => 'INSTITUCIONAL/box-0.png',
        ],
        [
            'original' => 'INST-BOX/BENEFICIOS.png',
            'replace' => 'INSTITUCIONAL/forcemfe-1.png',
        ],
    ];
    $is_arrayoriginal = [];
    $is_arrayreplace = [];
    if (file_exists('database.txt')):
        $is_content = file_get_contents('database.txt');
        $is_search = [ ' ', "\t", "\n", "\r", ];
        $is_replace = '';
        $is_subject = trim($is_content, '"');
        $is_content = str_replace($is_search, $is_replace, $is_subject);
        $is_content = explode('""', $is_content);
        for ($i = 0; $i < sizeof($is_content); $i++):
            array_push($is_arrayoriginal, explode('|', $is_content[$i]));
        endfor;
    endif;
    if (isset($is_arrayoriginal)):
        if (empty($is_arrayoriginal)): else:
            for ($i = 0; $i < sizeof($is_arrayoriginal); $i++):
                array_push($is_arrayreplace, []);
            endfor;
        endif;
    endif;
    $is_regex = isset($is_deleted) ? (!empty($is_deleted) ? '/' . implode('|', array_map('preg_quote', $is_deleted)) . '/i' : '') : '';
    if (isset($is_arrayoriginal)):
        if (empty($is_arrayoriginal)): else:
            for ($i = 0; $i < sizeof($is_arrayoriginal); $i++):
                for ($j = 0; $j < sizeof($is_arrayoriginal[$i]); $j++):
                    !preg_match($is_regex, $is_arrayoriginal[$i][$j]) ? array_push($is_arrayreplace[$i], $is_arrayoriginal[$i][$j]) : null;
                endfor;
            endfor;
        endif;
    endif;
    if (isset($is_arrayreplace)):
        if (empty($is_arrayreplace)): else:
            for ($i = 0; $i < sizeof($is_arrayreplace); $i++):
                for ($j = 0; $j < sizeof($is_arrayreplace[$i]); $j++):
                    if (isset($is_replace)):
                        if (empty($is_replace)): else:
                            for ($k = 0; $k < sizeof($is_replace); $k++):
                                $is_keyexist = array_key_exists('original', $is_replace[$k]) && array_key_exists('replace', $is_replace[$k]);
                                $is_arrayreplace[$i][$j] = $is_keyexist ? ($is_replace[$k]['original'] && $is_replace[$k]['replace'] ? str_replace($is_replace[$k]['original'], $is_replace[$k]['replace'], $is_arrayreplace[$i][$j]) : $is_arrayreplace[$i][$j]) : $is_arrayreplace[$i][$j];
                            endfor;
                        endif;
                    endif;
                endfor;
            endfor;
        endif;
    endif;
    if (isset($is_arrayreplace)):
        if (empty($is_arrayreplace)): else:
            echo '<table>';
                echo '<tbody>';
                    for ($i = 0; $i < sizeof($is_arrayreplace); $i++):
                        echo '<tr>';
                            echo '<td>';
                                for ($j = 0; $j < sizeof($is_arrayreplace[$i]); $j++):
                                    echo $is_arrayreplace[$i][$j];
                                    echo $j < sizeof($is_arrayreplace[$i]) - 1 ? '|' : '';
                                endfor;
                            echo '</td>';
                        echo '</tr>';
                    endfor;
                echo '</tbody>';
            echo '</table>';
        endif;
    endif;
?>