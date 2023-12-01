<?php

    date_default_timezone_set('America/Sao_Paulo');

    $is_period = (date('H') > 6 && date('H') < (6 + 24 / 2));

    function Bootstrap ($is_input = 3) {
        global $is_period;
        return [
            'body' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                'w-100',
            ]),
            'nav' => implode(' ', [
                'navbar',
                'navbar-expand-lg',
                ...$is_period ? [ 'bg-white' ] : [ 'bg-dark' ],
                'ps-' . $is_input,
                'pe-' . $is_input,
                'pe-md-0',
                // 'pe-lg-' . $is_input,
                'pe-lg-0',
                'pt-' . $is_input,
                'pb-0',
                'pb-md-0',
                // 'pb-lg-' . $is_input,
                'pb-lg-0',
                'w-100',
            ]),
            'input' => implode(' ', [
                'border',
                'border-1',
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                ...$is_period ? [ 'border-light-subtle' ] : [ 'border-secondary' ],
                'form-control',
                ...$is_period ? [ 'text-dark' ] : [ 'text-light' ],
                'm-0',
                'p-2',
                'h-100',
                'w-100' ,
            ]),
            'table' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                'border',
                'border-1',
                ...$is_period ? [ 'border-light-subtle' ] : [ 'border-secondary' ],
                'table',
                ...$is_period ? [ 'table-light' ] : [ 'table-dark' ],
                'table-hover',
                'table-striped',
                'text-center',
                'm-0',
                'p-0',
                'w-100',

            ]),
            'column' => implode(' ', [
                'col-12',
                'col-md-6',
                // 'col-lg-3',
                'col-lg-6',
                'ps-0',
                'pe-0',
                'pe-md-' . $is_input,
                'pe-lg-' . $is_input,
                'mb-' . $is_input,
                'mb-md-' . $is_input,
                // 'mb-lg-0',
                'mb-lg-' . $is_input,
            ]),
            'button' => implode(' ', [
                'border',
                ...$is_period ? [ 'border-light-subtle' ] : [ 'border-secondary' ],
                'btn',
                ...$is_period ? [ 'btn-light' ] : [ 'btn-dark' ],
                'm-0',
                'p-2',
            ]),
            'p' => implode(' ', [
                // 'd-inline',
                'fw-semibold',
                'm-0',
                'p-0',
                
            ]),
            'a' => implode(' ', [
                'fw-semibold',
                'm-0',
                'p-0',
                'text-decoration-none',
                ...$is_period ? [ 'text-dark' ] : [ 'text-light' ],
            ]),
            'container' => [
                'navbar' => implode(' ', [
                    'navbar-container',
                    'w-100',
                ]),
                'table' => implode(' ', [
                    'table-container',
                    ...$is_period ? [ 'bg-white' ] : [ 'bg-dark' ],
                    'px-3',
                    'py-0',
                    'w-100',
                ]),
            ],
        ];
    };

    $is_fields = [
        [
            'title' => 'Descricao',
            'type' => 'text',
        ],
    ];

    for ($i = 0; $i < sizeof($is_fields); $i++):
        $is_fields[$i] = array_merge($is_fields[$i], [ 'value' => $_POST[strtolower(str_replace('_', '-', trim($is_fields[$i]['title'])))] ?? '' ]);
    endfor;

    $is_archive = JSONFetch('database.json') ? JSONFetch('database.json')->Nomenclaturas : [];

    $is_database = [];

    if (IsTrue($is_archive)):
        for ($i = 0; $i < sizeof($is_archive); $i++):
            array_push($is_database, get_object_vars($is_archive[$i]));
        endfor;
    endif;

    function SearchIndex ($is_index) {
        return stripos($is_index['Descricao'], $_POST['descricao'] ?? '');
    };

    $is_filtered = array_filter($is_database, 'SearchIndex');

?>