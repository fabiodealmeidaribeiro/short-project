<?php
    include_once('./functions.php');
    echo HeaderDisplay ();
        echo implode('', [
            '<header', ...IsTrue(AllClasses()['header']) ? [ ' class=\'' . AllClasses()['header'] . '\'' ] : [], '>',
            '</header>',
        ]);
        echo implode('', [
            '<main', ...IsTrue(AllClasses()['main']) ? [ ' class=\'' . AllClasses()['main'] . '\'' ] : [], '>',
                '<form',
                    ' action=\'process.php\'',
                    ...IsTrue(AllClasses()['form']) ? [ ' class=\'' . AllClasses()['form'] . '\'' ] : [],
                    ' enctype=\'multipart/form-data\'',
                    ' method=\'POST\'',
                '>',
                    FieldBuilder(),
                '</form>',
            '</main>',
        ]);
        echo implode('', [
            '<footer', ...IsTrue(AllClasses()['footer']) ? [ ' class=\'' . AllClasses()['footer'] . '\'' ] : [], '>',
                LinkedinDisplay (),
            '</footer>',
        ]);
        echo CallerBuilder();
        echo ContainerBuilder();
    echo FooterDisplay ();

?>