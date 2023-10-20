import {
    NoUnit,
} from './script-main.js';
export let TextTemplate = '';
TextTemplate += ' Irure ut velit esse eiusmod eu occaecat officia reprehenderit dolore consequat ut anim culpa in. Sit aliqua ad eu minim. Do labore est proident amet reprehenderit cupidatat fugiat. Id nostrud aliquip dolore ad. Occaecat in ipsum ut irure aliqua qui adipisicing Lorem nostrud voluptate cupidatat.';
TextTemplate += ' Laborum mollit ut in ad fugiat sit sunt cillum in fugiat officia aute enim. Duis ad dolore laboris magna enim in amet culpa mollit cupidatat. Aliquip nostrud dolor esse et non. Commodo cillum laboris ullamco ut.';
TextTemplate += ' Culpa incididunt fugiat tempor non id commodo. Officia irure exercitation dolor sunt ullamco anim excepteur. Mollit nisi velit ut mollit. Quis tempor reprehenderit duis id id esse dolore commodo sint labore.';
TextTemplate += ' Aliquip Lorem Lorem Lorem ad occaecat nostrud occaecat Lorem aliqua deserunt occaecat sit irure do. Deserunt ad commodo laborum eu. Irure amet ea in consectetur ad aute. Enim do amet incididunt labore eiusmod eu tempor. Quis consequat deserunt commodo reprehenderit ut nostrud qui id eiusmod mollit nulla in proident. Aliquip nostrud in reprehenderit adipisicing ullamco incididunt nisi eiusmod qui aute magna reprehenderit.';
TextTemplate += ' Excepteur non nulla Lorem duis minim occaecat officia. Lorem aliqua consectetur do velit velit nulla proident tempor adipisicing est consequat minim enim. Aliquip aliquip adipisicing sint voluptate. Enim tempor cupidatat magna nulla elit velit. Deserunt culpa nulla reprehenderit do commodo amet labore ullamco irure aliquip adipisicing aliqua cupidatat voluptate. Do dolore ipsum fugiat est voluptate nulla ipsum dolor sunt dolore deserunt veniam aute. Qui pariatur sint culpa culpa ea deserunt duis.';
const BoxShadow = {
    'box-shadow' : '0 1px 2px 0 rgba(48, 48, 48, .3), 0 1px 3px 1px rgba(48, 48, 48, .15)',
};
const TextShadow = {
    'text-shadow' : 'rgba(0, 0, 0, .5) 1px 1px 1px',
};
const Button = 3;
const Margin = 1;
export const SetStyle = {
    background : {
        class : [
            'align-items-center',
            'bg-secondary',
            'h-100',
            'justify-content-center',
            'position-fixed',
            'w-100',
        ],
        style : {
            display : 'none',
            left : 0,
            opacity : 0,
            top : 0,
            'z-index' : - 1,
        },
    },
    border : {
        class : [
            'align-items-center',
            'bg-light',
            'd-flex',
            'justify-content-center',
            'overflow-hidden',
            'position-relative',
        ],
        style : {
            border : '1px solid rgba(0, 0, 0, .125)',
            'border-radius' : (Button + Margin / 2) + 'rem',
            ...BoxShadow,
        },
        margin : (Margin) + 'rem',
    },
    container : {
        class : [
            'align-items-center',
            'bg-white',
            'd-flex',
            'justify-content-center',
            'overflow-hidden',
            'position-relative',
        ],
        style : {
            'border-radius' : (Button - Margin + Margin / 2) + 'rem',
        },
        margin : Margin + 'rem',
    },
    inner : {
        class : [
            'align-self-center',
            'h-100',
            'overflow-hidden',
        ],
        style : {
            top : 0,
        }
    },
    content : {
        class : [
            'align-items-center',
            'd-flex',
            'h-100',
            'justify-content-start',
            'position-relative',
        ],
        style : {
            top : 0,
        },
    },
    picture : {
        class : [
            'align-items-start',
            'd-flex',
            'flex-column',
            'h-100',
            'justify-content-start',
        ],
        style : {
            'background-position' : 'center',
            'background-size' : 'cover',
            'padding' : (Button - Margin + Margin / 2) + 'rem',
        },
    },
    title : {
        class : [
            'text-lg-start',
            'text-center',
            'text-white',
        ],
        style : {
            ...TextShadow,
        },
    },
    subtitle : {
        class : [
            'fs-3',
            'text-lg-start',
            'text-center',
            'text-white',
        ],
        style : {
            ...TextShadow,
        },
    },
    description : {
        class : [
            'fst-italic',
            'text-lg-start',
            'text-center',
            'text-white',
        ],
        style : {
            ...TextShadow,
        },
    },
    button : {
        class : [
            'align-items-center',
            'bg-secondary',
            'justify-content-center',
            'position-fixed',
            'rounded-circle',
        ],
        style : {
            height : Button + 'rem',
            width : Button + 'rem',
            ...BoxShadow,
        },
        margin : Margin + 'rem',
    },
    ico : {
        class : [
            'text-white',
        ],
        style : {
            'font-size' : (Button / 2) + 'rem',
        },
    },
};
const REM = parseFloat(getComputedStyle(document['documentElement'])['fontSize']);
const ContainerHeight = window['innerHeight'] - (NoUnit(SetStyle['border']['margin']) + NoUnit(SetStyle['container']['margin'])) * 2;
const ContainerWidth = window['innerWidth'] - (NoUnit(SetStyle['border']['margin']) + NoUnit(SetStyle['container']['margin'])) * 2;
const ContainerPadding = NoUnit(SetStyle['border']['margin']) + NoUnit(SetStyle['container']['margin']) + NoUnit(SetStyle['picture']['style']['padding']);
export const LightboxAttribute = [];
document.querySelectorAll('.photo-content').forEach(element => {
    let Picture = element.querySelector('.photo-background') ? (element.querySelector('.photo-background').querySelector('.photo-picture') ? element.querySelector('.photo-background').querySelector('.photo-picture') : [ undefined ]) : [ undefined ];
    Picture = Picture ? {
        height : Picture.getAttribute('data-height') ? Picture.getAttribute('data-height') : [ undefined ],
        url : Picture.getAttribute('data-url') ? Picture.getAttribute('data-url') : [ undefined ],
        width : Picture.getAttribute('data-width') ? Picture.getAttribute('data-width') : [ undefined ],
    } : { };
    let Caption = element.querySelector('.photo-caption') ? element.querySelector('.photo-caption') : [ undefined ];
    Caption = Caption ? {
        title : Caption.querySelector('h1') ? (Caption.querySelector('h1')['innerText'] ? Caption.querySelector('h1')['innerText'] : [ undefined ]) : [ undefined ],
        subtitle : Caption.querySelector('h2') ? (Caption.querySelector('h2')['innerText'] ? Caption.querySelector('h2')['innerText'] : [ undefined ]) : [ undefined ],
        description : Caption.querySelector('p') ? (Caption.querySelector('p')['innerText'] ? Caption.querySelector('p')['innerText'] : [ undefined ]) : [ undefined ],
    } : { };
    LightboxAttribute.push({
        ...Caption ? { title : Caption['title'] ? Caption['title'] : [ undefined ] } : { },
        ...Caption ? { subtitle : Caption['subtitle'] ? Caption['subtitle'] : [ undefined ] } : { },
        ...Caption ? { description : Caption['description'] ? Caption['description'] : [ undefined ] } : { },
        ...Picture ? { left : ((ContainerWidth - Picture['width'] * ContainerHeight / Picture['height']) / 2) + 'px' } : { },
        ...Picture ? { url : Picture['url'] } : { },
        ...Picture ? { width : (Picture['width'] * ContainerHeight / Picture['height'] > ContainerWidth ? ContainerWidth - REM * ContainerPadding : Picture['width'] * ContainerHeight / Picture['height']) + 'px' } : { },
    });
});
export const LightboxPosition = [];
export var LightboxWidth = 0;
LightboxPosition.push({ left : 0 });
for (let i = 0; i < LightboxAttribute['length']; i++) {
    LightboxWidth += NoUnit(LightboxAttribute[i]['width']);
    LightboxPosition.push({ left : - 1 * LightboxWidth + 'px' });
};