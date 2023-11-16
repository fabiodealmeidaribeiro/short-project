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
    [ 'order', 'ean-code-13' ].map(Index => {
        document.querySelectorAll('.' + Index).forEach(Selector => {
            Selector.addEventListener('click', Event => {
                document.querySelector('#body')['innerHTML'] = '';
                if (document.querySelector('#ContainerLabel')) document.querySelector('#ContainerLabel')['textContent'] = Titleize(Index.replaceAll('-', ' '));
                let Container = CreateElement({ element : 'div' });
                SetAttribute({ element : Container, attribute : 'class', value : [ 'align-items-center', 'd-flex', 'flex-column', 'justify-content-center', 'h-100', 'w-100' ] });
                let Barcode = CreateElement({ element : 'canvas' });
                SetAttribute({ element : Barcode, attribute : 'style', value : { 'box-shadow' : 'rgba(48, 48, 48, 0.3) 0px 1px 2px 0px, rgba(48, 48, 48, 0.15) 0px 1px 3px 1px' } });
                JsBarcode(Barcode, Selector['textContent'], {
                    font : 'monospace',
                    fontSize : 18,
                    format : Index === 'ean-code-13' ? 'EAN13' : 'UPC',
                    height : 200,
                    textMargin : 0,
                    background : '#ffffff',
                    lineColor : '#000000',
                    margin : 10,
                    fontOptions : 'bold',
                });
                document.querySelector('#body').appendChild(Container).appendChild(Barcode);
                document.querySelector('#container').click();
            });
        });
    });
});

window.addEventListener('resize', Event => {
    ResizeElements();
});