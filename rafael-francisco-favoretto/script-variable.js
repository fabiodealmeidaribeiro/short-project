export const REM = parseFloat(getComputedStyle(document['documentElement'])['fontSize']);

export const BoxShadow = {
    'box-shadow' : '0 1px 2px 0 rgba(48, 48, 48, .3), 0 1px 3px 1px rgba(48, 48, 48, .15)',
};

export const TextShadow = {
    'text-shadow' : 'rgba(0, 0, 0, .5) 1px 1px 1px',
};

export const Style = {
    class : {
        background : [
            'align-items-center',
            'bg-secondary',
            'h-100',
            'justify-content-center',
            'position-fixed',
            'w-100',
        ],
        border : [
            'align-items-center',
            'bg-light',
            'd-flex',
            'justify-content-center',
            'overflow-hidden',
            'position-relative',
        ],
        container : [
            'align-items-center',
            'bg-white',
            'd-flex',
            'justify-content-center',
            'overflow-hidden',
            'position-relative',
        ],
        inner : [
            'align-self-center',
            'h-100',
            'overflow-hidden',
        ],
        content : [
            'align-items-center',
            'd-flex',
            'h-100',
            'justify-content-start',
            'position-relative',
        ],
        picture : [
            'align-items-lg-start',
            'align-items-center',
            'd-flex',
            'flex-column',
            'h-100',
            'justify-content-start',
        ],
        title : [
            'text-lg-start',
            'text-center',
            'text-white',
        ],
        subtitle : [
            'fs-3',
            'text-lg-start',
            'text-center',
            'text-white',
        ],
        description : [
            'fst-italic',
            'text-lg-start',
            'text-center',
            'text-white',
        ],
        button : [
            'align-items-center',
            'bg-secondary',
            'd-flex',
            'justify-content-center',
            'position-fixed',
            'rounded-circle',
        ],
        ico : [
            'text-white',
        ],
    },
    style : {
        background : {
            display : 'none',
            left : 0,
            opacity : 0,
            top : 0,
            'z-index' : - 1,
        },
        border : {
            border : '1px solid rgba(0, 0, 0, .125)',
            'border-radius' : '3.5rem',
            ...BoxShadow,
        },
        container : {
            'border-radius' : '2.5rem',
        },
        inner : {
            top : 0,
        },
        content : {
            top : 0,
        },
        picture : {
            'background-position' : 'center',
            'background-size' : 'cover',
            'padding' : '2.5rem',
        },
        title : {
            ...TextShadow,
        },
        subtitle : {
            ...TextShadow,
        },
        description : {
            ...TextShadow,
        },
        button : {
            height : '3rem',
            width : '3rem',
            ...BoxShadow,
        },
        ico : {
            'font-size' : 'calc(3rem / 2)',
        },
    },
};

export const LightboxContainer = () => {
    return {
        height : window['innerHeight'] - REM * 4,
        width : window['innerWidth'] - REM * 4,
        padding : '6.5rem',
    };
};

export const LightboxAttribute = [];

document.querySelectorAll('.thumbnail-content').forEach(Element => {
    let Picture = Element.querySelector('.thumbnail-background')
    ? (Element.querySelector('.thumbnail-background').querySelector('.thumbnail-picture') ? Element.querySelector('.thumbnail-background').querySelector('.thumbnail-picture') : [ undefined ])
    : [ undefined ];
    Picture = Picture ? {
        height : Picture.getAttribute('data-height') ? Picture.getAttribute('data-height') : [ undefined ],
        url : Picture.getAttribute('data-url') ? Picture.getAttribute('data-url') : [ undefined ],
        width : Picture.getAttribute('data-width') ? Picture.getAttribute('data-width') : [ undefined ],
    } : { };
    let Caption = Element.querySelector('.thumbnail-caption') ? {
        title : Element.querySelector('.thumbnail-caption').querySelector('h1')
        ? (Element.querySelector('.thumbnail-caption').querySelector('h1')['innerText'] ? Element.querySelector('.thumbnail-caption').querySelector('h1')['innerText'] : [ undefined ])
        : [ undefined ],
        subtitle : Element.querySelector('.thumbnail-caption').querySelector('h2')
        ? (Element.querySelector('.thumbnail-caption').querySelector('h2')['innerText'] ? Element.querySelector('.thumbnail-caption').querySelector('h2')['innerText'] : [ undefined ])
        : [ undefined ],
        description : Element.querySelector('.thumbnail-caption').querySelector('p')
        ? (Element.querySelector('.thumbnail-caption').querySelector('p')['innerText'] ? Element.querySelector('.thumbnail-caption').querySelector('p')['innerText'] : [ undefined ])
        : [ undefined ],
    } : { };
    LightboxAttribute.push({
        ...Caption ? { title : Caption['title'] ? Caption['title'] : [ undefined ] } : { },
        ...Caption ? { subtitle : Caption['subtitle'] ? Caption['subtitle'] : [ undefined ] } : { },
        ...Caption ? { description : Caption['description'] ? Caption['description'] : [ undefined ] } : { },
        ...Picture ? { left : ((LightboxContainer()['width'] - Picture['width'] * LightboxContainer()['height'] / Picture['height']) / 2) + 'px' } : { },
        ...Picture ? { url : Picture['url'] } : { },
        ...Picture ? { width : (Picture['width'] * LightboxContainer()['height'] / Picture['height'] > LightboxContainer()['width'] ? LightboxContainer()['width'] - REM * LightboxContainer()['padding'] : Picture['width'] * LightboxContainer()['height'] / Picture['height']) + 'px' } : { },
    });
});

export const NoUnit = Input => parseFloat(Input.replace('px', '').replace('rem', ''));

export const LightboxFunction = (Attribute = []) => {
    let Width = 0;
    const Position = [];
    Position.push({ left : 0 });
    for (let i = 0; i < Attribute['length']; i++) {
        Width += NoUnit(Attribute[i]['width']);
        Position.push({ left : - 1 * Width + 'px' });
    };
    return {
        width : Width,
        position : Position,
    };
};

export const LightboxWidth = LightboxFunction(LightboxAttribute)['width'];

export const LightboxPosition = LightboxFunction(LightboxAttribute)['position'];

export const Transform = {
    highlight : Element => {
        if (Element) {
            if (Element.querySelector('.thumbnail-filter')) {
                Element.querySelector('.thumbnail-filter')['style']['opacity'] = 'calc(1 / 100 * 75)';
            };
            if (Element.querySelector('.thumbnail-caption')) {
                Element.querySelector('.thumbnail-caption')['style']['opacity'] = 1;
            };
            if (Element.querySelector('.thumbnail-background')) {
                if (Element.querySelector('.thumbnail-background').querySelector('.thumbnail-picture')) {
                    Element.querySelector('.thumbnail-background').querySelector('.thumbnail-picture')['classList'].add('transform-scale');
                };
            };
        };
    },
    downlight : Element => {
        if (Element) {
            if (Element.querySelector('.thumbnail-filter')) {
                Element.querySelector('.thumbnail-filter')['style']['opacity'] = 0;
            };
            if (Element.querySelector('.thumbnail-caption')) {
                Element.querySelector('.thumbnail-caption')['style']['opacity'] = 0;
            };
            if (Element.querySelector('.thumbnail-background')) {
                if (Element.querySelector('.thumbnail-background').querySelector('.thumbnail-picture')) {
                    Element.querySelector('.thumbnail-background').querySelector('.thumbnail-picture')['classList'].remove('transform-scale');
                };
            };
        };
    },
};