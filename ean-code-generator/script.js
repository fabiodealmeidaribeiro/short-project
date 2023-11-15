import {
    CreateElement,
    Mask,
    SetAttribute,
    Titleize,
} from './script-main.js';

import {
    SocialNetwork
} from './script-network.js';

const SetElement = () => {
    document.querySelector('nav')['style']['left'] = 0;
    document.querySelector('nav')['style']['position'] = 'absolute';
    document.querySelector('nav')['style']['top'] = 0;
    let Position = 0;
    [ 'nav' ].map((Element, Index) => {
        Position += document.querySelector(Element).getBoundingClientRect()['height'];
    });
    Position += 'px';
    document.querySelector('table')['style']['left'] = 0;
    document.querySelector('table')['style']['position'] = 'absolute';
    document.querySelector('table')['style']['top'] = Position;
    Position = 0;
    [ 'nav', 'table' ].map((Element, Index) => {
        Position += document.querySelector(Element).getBoundingClientRect()['height'];
    });
    Position += 'px';
    document.querySelector('#container-call')['style']['left'] = 0;
    document.querySelector('#container-call')['style']['position'] = 'absolute';
    document.querySelector('#container-call')['style']['top'] = Position;
};

window.addEventListener('DOMContentLoaded', Event => {
    SetElement();
    SocialNetwork();
    [ 'change', 'input' ].map(Index => {
        document.querySelector('#cnpj-number').addEventListener(Index, Event => {
            Mask['cnpj'](document.querySelector('#cnpj-number'));
        });
    });
    document.querySelector('nav').querySelector('button').addEventListener('click', Event => {
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
                let Picture = CreateElement({ element : 'svg' });
                SetAttribute({ element : Picture, attribute : 'id', value : 'picture' });
                SetAttribute({ element : Picture, attribute : 'class', value : [ 'bg-light' ] });
                SetAttribute({ element : Picture, attribute : 'style', value : { height : 'calc(100% - 1rem)', width : 'calc(100% - 1rem)' } });
                let Number = CreateElement({ element : 'p', textnode : Selector['textContent'] });
                SetAttribute({ element : Number, attribute : 'class', value : [ 'fw-semibold', 'm-0', 'p-0' ] });
                document.querySelector('#body').appendChild(Container);
                document.querySelector('#body').appendChild(Container).appendChild(Frame);
                document.querySelector('#body').appendChild(Container).appendChild(Frame).appendChild(Picture);
                document.querySelector('#body').appendChild(Container).appendChild(Number);
                // format - O formato do código de barras. Os formatos disponíveis são : CODE128, CODE39, EAN13, EAN8, QRCode, etc.
                // value - O valor do código de barras.
                // width - A largura do código de barras.
                // height - A altura do código de barras.
                // moduleSize - O tamanho do módulo do código de barras.
                // color - A cor do código de barras.
                // background - A cor do fundo do código de barras.
                document.querySelector('#container').click();
            });
        });
    });
});

window.addEventListener('resize', Event => {
    SetElement();
});