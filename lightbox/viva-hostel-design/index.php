<?php
    include_once('functions.php');
    echo HeaderDisplay();
    echo ThumbnailBuilder();
    $is_about = $is_footer = ReadJSONFile('settings.json') ? ReadJSONFile('settings.json') : [];
    $is_about = property_exists($is_about, 'about') ? $is_about->about : [];
    echo FooterBuilder ([
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
        ...property_exists($is_footer, 'footer') ? $is_footer->footer : [],
    ]);
    echo FooterDisplay();
?>