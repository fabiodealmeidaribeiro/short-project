import {
    // Check,
    Mask,
} from './script-main.js';

import {
    SocialNetwork,
} from './script-network.js';

const SetElements = () => {
    document.querySelector('nav')['style']['left'] = 0;
    document.querySelector('nav')['style']['position'] = 'absolute';
    document.querySelector('nav')['style']['top'] = 0;
    let Position = 0;
    [ 'nav' ].map(Index => {
        Position += document.querySelector(Index).getBoundingClientRect()['height'];
    });
    Position += 'px';
    document.querySelector('table')['style']['left'] = 0;
    document.querySelector('table')['style']['position'] = 'absolute';
    document.querySelector('table')['style']['top'] = Position;
    Position = 0;
    [ 'nav', 'table' ].map(Index => {
        Position += document.querySelector(Index).getBoundingClientRect()['height'];
    });
    Position += 'px';
    document.querySelector('#container-call')['style']['left'] = 0;
    document.querySelector('#container-call')['style']['position'] = 'absolute';
    document.querySelector('#container-call')['style']['top'] = Position;
};

window.addEventListener('DOMContentLoaded', Event => {
    SocialNetwork();
    SetElements();
    document.querySelector('nav').querySelector('button').addEventListener('click', Event => {
        [ 'start-number', 'end-number', 'cnpj-number' ].map(Index => {
            if (document.querySelector('#' + Index)) {
                if (!document.querySelector('#' + Index)['value']) {
                    document.querySelector('#' + Index)['classList'].add('is-invalid');
                };
            };
        });
    });
    if (document.querySelector('tbody')) {
        if (document.querySelector('tbody').querySelectorAll('tr')) {
            document.querySelector('tbody').querySelectorAll('tr').forEach((Element, Index) => {
                if (Element) {
                    Element.addEventListener('click', Event => {
                        document.querySelector('#container').click();
                    });
                };
            });
        };
    };
});

window.addEventListener('resize', Event => {
    SetElements ();
});