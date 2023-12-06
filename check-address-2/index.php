<?php
    include_once('./functions.php');
    echo function_exists ('HeaderDisplay') ? HeaderDisplay () : null;
        echo implode('', [
            '<header', ...IsTrue(AllClasses()['header']) ? [ ' class=\'' . AllClasses()['header'] . '\'' ] : [], '>',
            '</header>',
            '<main', ...IsTrue(AllClasses()['main']) ? [ ' class=\'' . AllClasses()['main'] . '\'' ] : [], '>',
                function_exists ('FormBuilder') ? FormBuilder([ 'action' => 'process.php', 'database' => 'database.json' ]) : null,
            '</main>',
            '<footer', ...IsTrue(AllClasses()['footer']) ? [ ' class=\'' . AllClasses()['footer'] . '\'' ] : [], '>',
                function_exists ('LinkedinDisplay') ? LinkedinDisplay ([ 'user' => 'fabiodealmeidaribeiro' ]) : null,
            '</footer>',
        ]);
        echo function_exists ('CallerBuilder') ? CallerBuilder () : null;
        echo function_exists ('ContainerBuilder') ? ContainerBuilder () : null;
    echo function_exists ('FooterDisplay') ? FooterDisplay () : null;
?>