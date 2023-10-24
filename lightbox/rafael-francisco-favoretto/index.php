<?php
    include_once('functions.php');
    echo HeaderDisplay ();
    echo ThumbnailBuilder ();
    $is_about = ReadJSONFile('settings.json') ? ReadJSONFile('settings.json')->about : [];
    $is_title = IsTrue($is_about) ? (IsTrue($is_about->title) ? [ '<h1>' . trim($is_about->title) . '</h1>' ] : []) : [];
    $is_subtitle = IsTrue($is_about) ? (IsTrue($is_about->subtitle) ? [ '<h2>' . trim($is_about->subtitle) . '</h2>' ] : []) : [];
    $is_description = '';
    if (IsTrue($is_about)):
        if (IsTrue($is_about->description)):
            for ($i = 0; $i < sizeof($is_about->description); $i++):
                if (IsTrue($is_about->description[$i])):
                    $is_description .= '<p>' . trim($is_about->description[$i]) . '</p>';
                endif;
            endfor;
        endif;
    endif;
    echo FooterBuilder ([ 'content' => [
            [
                ...$is_title,
                ...$is_subtitle,
                ...IsTrue($is_description) ? [ $is_description ] : [],
            ],
            [
            ],
        ]
    ]);
    echo FooterDisplay ();
?>