import {
} from './script-main.js';

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

window.addEventListener('DOMContentLoaded', () => {
    SetElements (); 
});

window.addEventListener('resize', () => {
    SetElements ();
});