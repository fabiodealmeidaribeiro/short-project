<?php
    $is_road = '';
    for ($i = 0; $i < count(explode('\\', realpath(__FILE__))) - 5; $i++):
        $is_road .= '../';
    endfor;
    include_once $is_road . 'functions.php';
    echo HeaderDisplay ([ 'style' => $is_road . 'style.css' ]);
    echo ContainerBuilder ([
        'folder' => Directory(__FILE__),
        'url' => substr($_SERVER['PHP_SELF'], 0, strpos($_SERVER['PHP_SELF'], 'index.php')),
        'previous-page' => $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . dirname(dirname($_SERVER['PHP_SELF'])),
    ]);
    echo FooterDisplay ($is_road . 'script.js');
?>