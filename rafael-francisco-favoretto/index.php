<?php
    include_once('functions.php');
    echo HeaderDisplay();
    echo ThumbnailBuilder();
    $is_JSON = ReadJSONFile('settings.json') ? ReadJSONFile('settings.json') : [];
    echo FooterBuilder ([
        [
            ...IsTrue($is_JSON) ? (property_exists($is_JSON, 'title') ? [ '<h1>' . trim($is_JSON->title) . '</h1>' ] : []) : [],
            ...IsTrue($is_JSON) ? (property_exists($is_JSON, 'subtitle') ? [ '<h2>' . trim($is_JSON->subtitle) . '</h2>' ] : []) : [],
            ...IsTrue($is_JSON) ? (property_exists($is_JSON, 'description') ? array_map(function($is_index) { return '<p>' . trim($is_index) . '</p>'; }, $is_JSON->description) : []) : [],
        ],
        ...property_exists($is_JSON, 'widget') ? $is_JSON->widget : [],
    ]);
    echo FooterDisplay();
?>