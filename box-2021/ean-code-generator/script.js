import {
} from './script-main.js';

import {
    SocialNetwork,
} from './script-network.js';

const StartNumber = document.querySelector('#start-number');
const EndNumber = document.querySelector('#end-number');
const CNPJNumber = document.querySelector('#cnpj-number');

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

    SetElements ();

    document.querySelector('tbody').querySelectorAll('tr').forEach((Element, Index) => {
        Element.addEventListener('click', Event => {
            document.querySelector('#modal-container-button').click();
        });
    });
    
});

window.addEventListener('resize', Event => {
    SetElements ();
});


