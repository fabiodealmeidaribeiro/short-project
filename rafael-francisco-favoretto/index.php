<?php
    include_once('functions.php');
    echo HeaderDisplay();
    echo ThumbnailBuilder();
    $is_footer = JSONFetch('footer.json') ? JSONFetch('footer.json') : [];
    $is_settings = JSONFetch('settings.json') ? JSONFetch('settings.json') : [];
    echo FooterBuilder ([
        [
            ...IsTrue($is_settings) ? (property_exists($is_settings, 'title') ? [ '<h1>' . trim($is_settings->title) . '</h1>' ] : []) : [],
            ...IsTrue($is_settings) ? (property_exists($is_settings, 'subtitle') ? [ '<h2>' . trim($is_settings->subtitle) . '</h2>' ] : []) : [],
            ...IsTrue($is_settings) ? (property_exists($is_settings, 'description') ? array_map(function($is_index) { return '<p>' . trim($is_index) . '</p>'; }, $is_settings->description) : []) : [],
        ],
        ...IsTrue($is_footer) ? $is_footer : [],
    ]);
    echo FooterDisplay();
?>