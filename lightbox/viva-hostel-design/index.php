<?php
    include_once('functions.php');
    echo HeaderDisplay ();
    echo ThumbnailBuilder ([ 'subtitle' => true, 'concept' => true ]);
    $is_json = ReadJSONFile('settings.json') ? ReadJSONFile('settings.json') : [];
    echo FooterBuilder ([ 'content' => [
            [
                ...IsTrue($is_json->about->title) ? [ '<h1>' . trim($is_json->about->title) . '</h1>' ] : [],
                ...IsTrue($is_json->about->subtitle) ? [ '<h2>' . trim($is_json->about->subtitle) . '</h2>' ] : [],
                ...IsTrue($is_json->about->description)
                ? array_map(function($i) { return '<p>' . trim($i) . '</p>'; }, $is_json->about->description)
                : [],
            ],
            ...IsTrue($is_json->footer) ? $is_json->footer : [],
        ]
    ]);
    echo FooterDisplay ();
?>