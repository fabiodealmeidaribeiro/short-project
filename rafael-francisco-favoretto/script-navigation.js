import {
    LightboxAttribute,
    Style,
} from './script-variable.js';

export const NavigationBuilder = (Input = 0) => {
    return [
        {
            condition : Input < 1 ? 0 : - 1,
            function : () => {
            },
            class : [
            ],
            ico : {
                class : [
                    'bi',
                    'bi-arrow-left-circle-fill',
                ],
            },
            id : 'btn-arrow-left',
            key : [
                'ArrowLeft',
            ],
            style : {
                left : 'calc(' + Style['button']['margin'] + ' * ' + 3 + ')',
                cursor : 'pointer',
            },
        },
        {
            condition : Input > LightboxAttribute['length'] - 2 ? 0 : + 1,
            function : () => {
            },
            class : [
            ],
            ico : {
                class : [
                    'bi',
                    'bi-arrow-right-circle-fill',
                ],
            },
            id : 'btn-arrow-right',
            key : [
                'ArrowRight',
            ],
            style : {
                right : 'calc(' + Style['button']['margin'] + ' * ' + 3 + ')',
                cursor : 'pointer',
            },
        },
        {
            condition : 0,
            function : () => {
            },
            class : [
            ],
            ico : {
                class : [
                    'bi',
                    'bi-x-circle-fill',
                ],
            },
            id : 'btn-arrow-down',
            key : [
                'ArrowDown',
                'Escape',
            ],
            style : {
                bottom : 'calc(' + Style['button']['margin'] + ' * ' + 3 + ')',
                left : '50%',
                transform : 'translate(-50%, 0)',
                cursor : 'pointer',
            },
        },
    ];
};