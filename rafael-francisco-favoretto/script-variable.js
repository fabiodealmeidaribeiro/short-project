const BoxShadow = {
    'box-shadow' : '0 1px 2px 0 rgba(48, 48, 48, .3), 0 1px 3px 1px rgba(48, 48, 48, .15)',
};

const TextShadow = {
    'text-shadow' : 'rgba(0, 0, 0, .5) 1px 1px 1px',
};

const Button = 3;

const Margin = 1;

export const Style = {
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
            'align-items-lg-start',
            'align-items-center',
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
            'd-flex',
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

export const NoUnit = Input => parseFloat(Input.replace('px', '').replace('rem', ''));

export const LightboxContainer = () => {
    return {
        height : window['innerHeight'] - (NoUnit(Style['border']['margin']) + NoUnit(Style['container']['margin'])) * 2,
        width : window['innerWidth'] - (NoUnit(Style['border']['margin']) + NoUnit(Style['container']['margin'])) * 2,
        padding : NoUnit(Style['border']['margin']) + NoUnit(Style['container']['margin']) + NoUnit(Style['picture']['style']['padding']),
        rem : parseFloat(getComputedStyle(document['documentElement'])['fontSize']),
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
        ...Picture ? { width : (Picture['width'] * LightboxContainer()['height'] / Picture['height'] > LightboxContainer()['width'] ? LightboxContainer()['width'] - LightboxContainer()['rem'] * LightboxContainer()['padding'] : Picture['width'] * LightboxContainer()['height'] / Picture['height']) + 'px' } : { },
    });
});

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