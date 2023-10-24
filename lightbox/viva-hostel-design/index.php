<?php
    include_once('functions.php');
    echo HeaderDisplay ();
    echo ThumbnailBuilder ([ 'subtitle' => true, 'concept' => true ]);
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
                '<iframe',
                    ' src=\'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.5523768884177!2d-46.6956058249413!3d-23.548596861122896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57c0910158c7%3A0x9b5ef45d847079f2!2sViva%20Hostel%20Design!5e0!3m2!1spt-BR!2sbr!4v1698190540935!5m2!1spt-BR!2sbr\'',
                    ' width=\'100%\'',
                    ' height=\'450\'',
                    ' style=\'border : 0;\'',
                    ' allowfullscreen=\'\'',
                    ' loading=\'lazy\'',
                    ' referrerpolicy=\'no-referrer-when-downgrade\'',
                '>',
                '</iframe>',
            ],
        ]
    ]);
    echo FooterDisplay ();
?>