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
    document.querySelectorAll('.' + 'qr-code').forEach(Selector => {
        Selector.addEventListener('click', Event => {
            document.querySelector('#body')['innerHTML'] = '';
            let Title = '';
            Title += Titleize('qr-code'.replaceAll('-', ' '));
            Title += ' : ';
            Title += Selector['textContent'];
            if (document.querySelector('#ContainerLabel')) document.querySelector('#ContainerLabel')['textContent'] = Title;
            let Container = CreateElement({ element : 'div' });
            SetAttribute({ element : Container, attribute : 'class', value : [ 'align-items-center', 'd-flex', 'flex-column', 'justify-content-center', 'h-100', 'w-100' ] });
            let Content = CreateElement({ element : 'div' });
            SetAttribute({ element : Content, attribute : 'class', value : [ 'align-items-center', 'd-flex', 'justify-content-center' ] });
            const Width = 234, Height = 238;
            SetAttribute({ element : Content, attribute : 'style', value : { 'box-shadow' : 'rgba(48, 48, 48, 0.3) 0px 1px 2px 0px, rgba(48, 48, 48, 0.15) 0px 1px 3px 1px', 'width' : 'calc(' + Width + 'px + 1rem)' , 'height' : 'calc(' + Height + 'px + 1rem)' } });
            (new QRCode(Content, { width : Width, height : Height })).makeCode(Selector['textContent']);
            document.querySelector('#body').appendChild(Container).appendChild(Content);
            document.querySelector('#container').click();
        });
    });
    document.querySelectorAll('.' + 'ean-code-13').forEach(Selector => {
        Selector.addEventListener('click', Event => {
            document.querySelector('#body')['innerHTML'] = '';
            let Title = '';
            Title += Titleize('ean-code-13'.replaceAll('-', ' '));
            Title += ' : ';
            Title += Selector['textContent'];
            if (document.querySelector('#ContainerLabel')) document.querySelector('#ContainerLabel')['textContent'] = Title;
            let Container = CreateElement({ element : 'div' });
            SetAttribute({ element : Container, attribute : 'class', value : [ 'align-items-center', 'd-flex', 'flex-column', 'justify-content-center', 'h-100', 'w-100' ] });
            let Content = CreateElement({ element : 'canvas' });
            SetAttribute({ element : Content, attribute : 'style', value : { 'box-shadow' : 'rgba(48, 48, 48, 0.3) 0px 1px 2px 0px, rgba(48, 48, 48, 0.15) 0px 1px 3px 1px' } });
            JsBarcode(Content, Selector['textContent'], { background : '#ffffff', font : 'monospace', fontOptions : 'bold', fontSize : 18, format : 'EAN13', height : 200, lineColor : '#000000', margin : 10, textMargin : 0 });
            document.querySelector('#body').appendChild(Container).appendChild(Content);
            document.querySelector('#container').click();
        });
    });
});
window.addEventListener('resize', Event => {
    ResizeElements();
});