<?php

    date_default_timezone_set('America/Sao_Paulo');

    $is_period = !(date('H') > 6 && date('H') < (6 + 24 / 2));

    function AllClasses ($is_input = 3) {
        global $is_period;
        return [
            'body' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                'w-100',
            ]),
            'header' => implode(' ', [
                'align-items-center',
                'd-flex',
                'flex-column',
                'justify-content-center',
                'pb-5',
            ]),
            'main' => implode(' ', [
                'align-items-center',
                'd-flex',
                'flex-column',
                'justify-content-center',
                'pb-5',
            ]),
            'footer' => implode(' ', [
                'align-items-center',
                'd-flex',
                'flex-column',
                'justify-content-center',
                'pb-5',
            ]),
            'nav' => implode(' ', [
                'navbar',
                'navbar-expand-lg',
                ...$is_period ? [ 'bg-white' ] : [ 'bg-dark' ],
                'ps-' . $is_input,
                'pe-' . $is_input,
                'pe-md-0',
                'pe-lg-0',
                'pt-' . $is_input,
                'pb-0',
                'pb-md-0',
                'pb-lg-0',
                'w-100',
            ]),
            'form' => implode(' ', [
                'col-12',
                'col-lg-8',
                'mx-auto',
                ...$is_period ? [ 'bg-white' ] : [ 'bg-black' ],
                'border',
                'border-1',
                'rounded-3',
                'shadow-sm',
                'p-3',
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
                'col-lg-6',
                'ps-0',
                'pe-0',
                'pe-md-' . $is_input,
                'pe-lg-' . $is_input,
                'mb-' . $is_input,
                'mb-md-' . $is_input,
                'mb-lg-' . $is_input,
            ]),
            'button' => implode(' ', [
                'cursor-pointer',
                'btn',
                ...$is_period ? [ 'btn-outline-secondary' ] : [ 'btn-outline-secondary' ],
                'm-0',
                'p-2',
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
            'p' => implode(' ', [
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

    function ModalClasses ($is_input = 3) {
        global $is_period;
        return [
            'dialog' => implode(' ', [
                'modal-dialog',
                'modal-xl',
                'modal-dialog-centered',
                'modal-dialog-scrollable',
                'modal-fullscreen-md-down',
            ]),
            'content' => implode(' ', [
                'modal-content',
            ]),
            'header' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                ...$is_period ? [ 'text-dark' ] : [ 'text-light' ],
                'modal-header'
            ]),
            'body' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                ...$is_period ? [ 'text-dark' ] : [ 'text-light' ],
                'modal-body',
                'p-' . $is_input,
            ]),
            'title' => implode(' ', [
                'modal-title',
                'fs-5',
                'p-0',
            ]),
            'footer' => implode(' ', [
                ...$is_period ? [ 'bg-light' ] : [ 'bg-dark' ],
                'modal-footer'
            ]),
            'button' => implode(' ', [
                AllClasses()['button'],
                'ms-' . $is_input,
            ]),
        ];
    };

?>