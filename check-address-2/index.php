<?php

    include_once('./functions.php');

    echo HeaderDisplay ();

        echo implode('', [
            '<header', ...IsTrue(BSClass()['header']) ? [ ' class=\'' . BSClass()['header'] . '\'' ] : [], '>',
            '</header>',
        ]);

        echo implode('', [
            '<main', ...IsTrue(BSClass()['main']) ? [ ' class=\'' . BSClass()['main'] . '\'' ] : [], '>',
                '<form action=\'process.php\'', ...IsTrue(BSClass()['form']) ? [ ' class=\'' . BSClass()['form'] . '\'' ] : [], ' enctype=\'multipart/form-data\' method=\'POST\'>',
                '</form>',
            '</main>',
        ]);

        echo implode('', [
            '<footer', ...IsTrue(BSClass()['footer']) ? [ ' class=\'' . BSClass()['footer'] . '\'' ] : [], '>',
            '</footer>',
        ]);

    echo FooterDisplay ();

?>