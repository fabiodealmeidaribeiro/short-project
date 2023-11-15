import {
    CreateElement,
    Mask,
    SetAttribute,
    ResizeElements,
    Titleize,
} from './script-main.js';

import {
    SocialNetwork
} from './script-network.js';

window.addEventListener('DOMContentLoaded', Event => {
    SocialNetwork();
    ResizeElements();
    [ 'change', 'input' ].map(Index => {
        document.querySelector('#cnpj-number').addEventListener(Index, Event => {
            Mask['cnpj'](document.querySelector('#cnpj-number'));
        });
    });
    document.querySelector('nav').querySelector('form').querySelector('button').addEventListener('click', Event => {
        ResizeElements();
        [ 'start-number', 'amount-number' ].map(Index => {
            if (document.querySelector('#' + Index)) {
                if (!document.querySelector('#' + Index)['value']) {
                    document.querySelector('#' + Index)['classList'].add('is-invalid');
                };
            };
        });
    });
    [ 'order', 'ean-code' ].map(Index => {
        document.querySelectorAll('.' + Index).forEach(Selector => {
            Selector.addEventListener('click', Event => {
                if (document.querySelector('#ContainerLabel'))
                    document.querySelector('#ContainerLabel')['textContent'] = Titleize(Index.replaceAll('-', ' '));
                document.querySelector('#body')['innerHTML'] = '';
                let Container = CreateElement({ element : 'div' });
                SetAttribute({ element : Container, attribute : 'class', value : [ ...[ 'align-items-center', 'd-flex', 'flex-column', 'justify-content-center' ], 'h-100', 'w-100' ] });
                let Frame = CreateElement({ element : 'div' });
                SetAttribute({ element : Frame, attribute : 'class', value : [ ...[ 'align-items-center', 'd-flex', 'justify-content-center' ], 'bg-white', 'mb-1' ] });
                const Size = '17.338rem';
                SetAttribute({ element : Frame, attribute : 'style', value : { 'box-shadow' : 'rgba(48, 48, 48, 0.3) 0px 1px 2px 0px, rgba(48, 48, 48, 0.15) 0px 1px 3px 1px', height : Size, width : Size, }, });
                let Barcode = CreateElement({ element : 'canvas' });
                JsBarcode(Barcode, Selector['textContent'], {
                    displayValue : true,
                    flat : true,
                    font : 'OCRB',
                    fontSize : '1rem',
                    format : 'EAN13',
                    height : 245,
                    textMargin : 0,
                });
                let Number = CreateElement({ element : 'p', textnode : Selector['textContent'] });
                SetAttribute({ element : Number, attribute : 'class', value : [ 'fw-semibold', 'm-0', 'p-0' ] });
                document.querySelector('#body').appendChild(Container);
                document.querySelector('#body').appendChild(Container).appendChild(Frame);
                document.querySelector('#body').appendChild(Container).appendChild(Frame).appendChild(Barcode);
                document.querySelector('#body').appendChild(Container).appendChild(Number);
                document.querySelector('#container').click();
            });
        });
    });
});

window.addEventListener('resize', Event => {
    ResizeElements();
});