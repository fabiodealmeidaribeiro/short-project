<?php
    include_once('./functions.php');
    echo HeaderDisplay ();
        echo implode('', [
            '<header', ...IsTrue(AllClasses()['header']) ? [ ' class=\'' . AllClasses()['header'] . '\'' ] : [], '>',
            '</header>',
            '<main', ...IsTrue(AllClasses()['main']) ? [ ' class=\'' . AllClasses()['main'] . '\'' ] : [], '>',
                FormBuilder([ 'action' => 'process.php', 'database' => 'database.json' ]),
            '</main>',
            '<footer', ...IsTrue(AllClasses()['footer']) ? [ ' class=\'' . AllClasses()['footer'] . '\'' ] : [], '>',
                LinkedinDisplay (),
            '</footer>',
        ]);
        echo CallerBuilder ();
        echo ContainerBuilder ();
    echo FooterDisplay ();
?>