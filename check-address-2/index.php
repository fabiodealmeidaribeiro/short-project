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
                function_exists ('LinkedinDisplay') ? LinkedinDisplay () : null,
            '</footer>',
        ]);
        echo function_exists ('HTMLCallerBuilder') ? HTMLCallerBuilder () : null;
        echo function_exists ('HTMLContainerBuilder') ? HTMLContainerBuilder () : null;
        echo function_exists ('ContainerBuilder') ? ContainerBuilder ([ 'body' => [], 'title' => '' ]) : null;
    echo function_exists ('FooterDisplay') ? FooterDisplay () : null;
?>