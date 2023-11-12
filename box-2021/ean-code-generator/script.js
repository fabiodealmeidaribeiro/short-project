import {
    IsTrue,
} from './script-main.js';

import {
    SocialNetwork,
} from './script-network.js';

const SetElements = () => {
    document.querySelector('nav')['style']['left'] = 0;
    document.querySelector('nav')['style']['position'] = 'absolute';
    document.querySelector('nav')['style']['top'] = 0;
    let TableTop = 0;
    TableTop += document.querySelector('nav').getBoundingClientRect()['top'];
    TableTop += document.querySelector('nav').getBoundingClientRect()['height'];
    TableTop += 'px';
    document.querySelector('table')['style']['left'] = 0;
    document.querySelector('table')['style']['position'] = 'absolute';
    document.querySelector('table')['style']['top'] = TableTop;
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
                        document.querySelector('#modal-container-button').click();
                    });
                };
            });
        };
    };
});

window.addEventListener('resize', Event => {
    SetElements ();
});


