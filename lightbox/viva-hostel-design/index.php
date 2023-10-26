<?php
    include_once('functions.php');
    echo HeaderDisplay ();
    echo ThumbnailBuilder ([ 'subtitle' => true, 'concept' => true ]);
    $is_json = ReadJSONFile('settings.json') ? ReadJSONFile('settings.json') : [];
    $is_about = property_exists($is_json, 'about') ? $is_json->about : [];
    echo FooterBuilder ([ 'content' => [
            [
                ...IsTrue($is_about)
                ? (property_exists($is_about, 'title') ? [ '<h1>' . trim($is_about->title) . '</h1>' ] : [])
                : [],
                ...IsTrue($is_about)
                ? (property_exists($is_about, 'subtitle') ? [ '<h2>' . trim($is_about->subtitle) . '</h2>' ] : [])
                : [],
                ...IsTrue($is_about)
                ? (property_exists($is_about, 'description') ? array_map(function($i) { return '<p>' . trim($i) . '</p>'; }, $is_about->description) : [])
                : [],
            ],
            ...property_exists($is_json, 'footer') ? $is_json->footer : [],
        ]
    ]);
    echo FooterDisplay ();
?>