<?php
    include_once('functions.php');
    echo HeaderDisplay ();
    echo ThumbnailBuilder ('./image');
    echo FooterBuilder ([ 'content' => [
            [
                '<h1>',
                    'Viva Hostel Design.',
                '</h1>',
                '<h2>',
                    'O melhor da Vila Madalena em elegância e conforto.',
                '</h2>',
                '<p>',
                    'O Viva Hostel Design é uma opção de hospedagem diferenciada e moderna em São Paulo. Localizado no bairro da Vila Madalena, um dos mais descolados da cidade, o hostel oferece uma experiência única aos seus hóspedes.',
                '</p>',
                '<p>',
                    'Com uma decoração arrojada e criativa, o Viva Hostel Design conta com quartos compartilhados e privativos, todos equipados com ar-condicionado, armários individuais e Wi-Fi gratuito. Além disso, o Hostel dispõe de uma cozinha equipada e compartilhada, sala de estar, sala de TV, terraço com vista panorâmica, e um bar.',
                '</p>',
            ],
            [
                '<iframe',
                    ' height=\'450\'',
                    ' loading=\'lazy\'',
                    ' referrerpolicy=\'no-referrer-when-downgrade\'',
                    ' src=\'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1828.7761540190718!2d-46.69431836143666!3d-23.548599335861315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57c0910158c7%3A0x9b5ef45d847079f2!2sViva%20Hostel%20Design!5e0!3m2!1spt-BR!2sbr!4v1697988479266!5m2!1spt-BR!2sbr\'',
                    ' style=\'border : 0; margin : 0; padding : 0;\'',
                    ' width=\'100%\'',
                ' >',
                '</iframe>',
            ],
        ]
    ]);
    echo FooterDisplay ();
?>