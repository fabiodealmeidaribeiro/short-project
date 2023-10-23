<?php
    include_once('functions.php');
    echo HeaderDisplay ();
    echo ThumbnailBuilder ('./image');
    $is_about = ReadJSONFile('settings.json')->about;
    $is_title = $is_about->title ? [ '<h1>' . $is_about->title . '</h1>' ] : [];
    $is_subtitle = $is_about->subtitle ? [ '<h2>' . $is_about->subtitle . '</h2>' ] : [];
    $is_description = '';
    if (empty($is_about->description)): else:
        for ($i = 0; $i < sizeof($is_about->description); $i++):
            if (empty($is_about->description[$i])): else:
                $is_description .= '<p>' . trim($is_about->description[$i]) . '</p>';
            endif;
        endfor;
    endif;
    echo FooterBuilder ([ 'content' => [
            [
                ...$is_title,
                ...$is_subtitle,
                ...!empty($is_description) ? [ $is_description ] : [],
            ],
            [
                '<iframe',
                    ' height=\'450\'',
                    ' loading=\'lazy\'',
                    ' referrerpolicy=\'no-referrer-when-downgrade\'',
                    ' src=\'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1828.7761540190718!2d-46.69431836143666!3d-23.548599335861315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57c0910158c7%3A0x9b5ef45d847079f2!2sViva%20Hostel%20Design!5e0!3m2!1spt-BR!2sbr!4v1697988479266!5m2!1spt-BR!2sbr\'',
                    ' style=\'border : 0; margin : 0; padding : 0;\'',
                    ' width=\'100%\'',
                ' >',
                '</iframe>',
            ],
        ]
    ]);
    echo FooterDisplay ();
?>