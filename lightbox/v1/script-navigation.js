import {
    LightboxTransition,
} from './script-container.js';
import {
    TransitionRunning,
} from './script-main.js';
import {
    LightboxAttribute,
    SetStyle,
} from './script-variables.js';
export const NavigationBuilder = (CurrentPicture = 0) => {
    return [
        {
            function : () => {
                CurrentPicture = CurrentPicture < 1 ? CurrentPicture : CurrentPicture - 1;
                LightboxTransition(CurrentPicture);
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
                left : 'calc(' + SetStyle['button']['margin'] + ' * ' + 3 + ')',
                cursor : 'pointer',
            },
        },
        {
            function : () => {
                CurrentPicture = CurrentPicture > (LightboxAttribute['length'] - 2) ? CurrentPicture : CurrentPicture + 1;
                LightboxTransition(CurrentPicture);
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
                right : 'calc(' + SetStyle['button']['margin'] + ' * ' + 3 + ')',
                cursor : 'pointer',
            },
        },
        {
            function : () => {
                const Selector = document.querySelector('#background');
                if (Selector) {
                    Selector['style']['opacity'] = 0;
                    if (!TransitionRunning(Selector)) {
                        Selector['style']['display'] = 'none';
                        Selector['style']['zIndex'] = - 1;
                    };
                };
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
                bottom : 'calc(' + SetStyle['button']['margin'] + ' * ' + 3 + ')',
                left : '50%',
                transform : 'translate(-50%, 0)',
                cursor : 'pointer',
            },
        },
    ];
};