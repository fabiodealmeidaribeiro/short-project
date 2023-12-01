import {
    CreateElement,
    Mask,
    Period,
    SetAttribute,
    ResizeElements,
    Titleize,
} from './master.js';

import {
    SocialNetwork
} from './network.js';

const Border = [ 'border', Period ? 'border-dark' : 'border-light', 'border-opacity-25' ];
const Color = { front : (Period ? '#212529' : '#ffffff'), back : (Period ? '#ffffff' : '#212529') };
const REM = parseFloat(getComputedStyle(document['documentElement'])['fontSize']);
const Width = 234, Height = 238;

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
            SetAttribute({ element : Content, attribute : 'class', value : [ 'align-items-center', ...Border, 'd-flex', 'justify-content-center' ] });
            SetAttribute({ element : Content, attribute : 'style', value : { 'width' : 'calc(' + Width + 'px + 1rem)' , 'height' : 'calc(' + Height + 'px + 1rem)' } });
            (new QRCode(Content, { colorDark : Color['front'], colorLight : Color['back'], width : Width, height : Height })).makeCode(Selector['textContent']);
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
            SetAttribute({ element : Content, attribute : 'class', value : [ ...Border ] });
            JsBarcode(Content, Selector['textContent'], { background : Color['back'], font : 'monospace', fontOptions : 'bold', fontSize : REM, format : 'EAN13', height : 200, lineColor : Color['front'], margin : 10, textMargin : 0 });
            document.querySelector('#body').appendChild(Container).appendChild(Content);
            document.querySelector('#container').click();
        });
    });

});

window.addEventListener('resize', Event => {
    ResizeElements();
});