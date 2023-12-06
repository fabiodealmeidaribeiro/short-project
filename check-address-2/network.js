import {
} from './master.js';

import {
} from './variable.js';

export const Validator = {
    Array : Input => !(Input === false || Input === null || Input === undefined || Input['length'] === 0) && typeof Input === 'object' && Array.isArray(Input),
    Boolean : Input => !(Input === null || Input === undefined) && typeof Input === 'boolean',
    Function : Input => {
        if (!(Input === null || Input === undefined || Input === false)) {
            if (typeof Input === 'function') {
                const Treat = Input.toString().replace(/\s+/g, '');
                return !(Treat === 'function(){}' || Treat === '()=>{}' || Treat === '(Input)=>{}' || Treat === 'Input=>{}');
            };
        };
    },
    Gene : Input => !(Input === false || Input === null || Input === undefined || Input === 0 || Input === ''),
    Number : Input => !(Input === false || Input === null || Input === undefined || Input === 0) && typeof Input === 'number',
    Object : Input => !(Input === false || Input === null || Input === undefined || Input['length'] === 0) && typeof Input === 'object' && !Array.isArray(Input) && Object.keys(Input)['length'] !== 0,
    String : Input => !(Input === false || Input === null || Input === undefined || Input === '') && typeof Input === 'string',
};

export const CreateElement = (Input = {}) => {
    const Proper = {
        element : 'element' in Input ? (Validator['String'](Input['element']) ? Input['element'] : 'div') : 'div',
        textnode : 'textnode' in Input ? (Validator['String'](Input['textnode']) ? Input['textnode'] : '') : '',
    };
    let Result = document.createElement(Proper['element']);
    if (Validator['Gene'](Proper['textnode'])) {
        Result.appendChild(document.createTextNode(Proper['textnode']));
    };
    return Result;
};

export const SetAttribute = (Input = {}) => {
    let Proper = {
        attribute : 'attribute' in Input ? (Validator['String'](Input['attribute']) ? Input['attribute'] : [ undefined ]) : [ undefined ],
        element : 'element' in Input ? (Validator['Gene'](Input['element']) ? Input['element'] : [ undefined ]) : [ undefined ],
        value : 'value' in Input ? (Validator['Array'](Input['value']) || Validator['Object'](Input['value']) || Validator['String'](Input['value']) ? Input['value'] : '') : '',
    };
    if (Validator['Gene'](Proper['element']) && Validator['String'](Proper['attribute']) && Validator['Gene'](Proper['value'])) {
        Proper['attribute'] = document.createAttribute(Proper['attribute']);
        Proper['attribute']['value'] = '';
        if (Validator['String'](Proper['value'])) {
            Proper['attribute']['value'] = Proper['value'];
        };
        if (Validator['Array'](Proper['value'])) {
            for (let i = 0; i < Proper['value']['length']; i++) {
                Proper['attribute']['value'] += Proper['value'][i];
                Proper['attribute']['value'] += i < Proper['value']['length'] - 1 ? ' ' : '';
            };
        };
        if (Validator['Object'](Proper['value'])) {
            for (let i = 0; i < Object.keys(Proper['value'])['length']; i++) {
                Proper['attribute']['value'] += Object.keys(Proper['value'])[i] + ': ' + Proper['value'][Object.keys(Proper['value'])[i]] + ';';
                Proper['attribute']['value'] += i < Object.keys(Proper['value'])['length'] - 1 ? ' ' : '';
            };
        };
        Proper['element'].setAttributeNode(Proper['attribute']);
    };
};

export const ReadJSONFile = async (Input = '') => {
    const Response = await fetch(Input);
    const Result = await Response.json();
    return Result;
};

export const BoxShadow = {
    'box-shadow' : '0 1px 2px 0 rgba(48, 48, 48, .3), 0 1px 3px 1px rgba(48, 48, 48, .15)',
};

export const TextShadow = {
    'text-shadow' : 'rgba(0, 0, 0, .5) 1px 1px 1px',
};

export const SetStyle = {
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

const Network = [
    {   
        title : 'facebook',
        background : 'bg-primary'
    },
    {
        title : 'instagram',
        background : 'bg-danger'
    },
    {
        title : 'linkedin',
        background : 'bg-primary'
    },
    {
        title : 'github',
        background : 'bg-dark'
    },
    {
        title : 'youtube',
        background : 'bg-danger'
    },
];

export const SocialNetwork = async () => {
    const Result = await ReadJSONFile ('settings.json');
    const Proper = {
        title : Validator['String'](Result['title']) ? Result['title'] : '',
        subtitle : Validator['String'](Result['subtitle']) ? Result['subtitle'] : '',
        description : Validator['Array'](Result['description']) ? Result['description'] : [],
        phone : Validator['String'](Result['phone']) ? Result['phone'] : '',
        network : Validator['Array'](Result['network']) ? Result['network'] : [],
    };
    const Element = [];
    let Attribute = [];
    let OverallHeight = 0;
    [ '.navbar-container', '.table-container', '.footer-container' ].map(Element => {
        if (document.querySelector(Element)) {
            OverallHeight += document.querySelector(Element).getBoundingClientRect()['height'];
        };
    });
    if (OverallHeight > window['innerHeight']) {
        Attribute.push({
            class : {
                btn : [
                    'bg-danger',
                ],
                ico : [
                    'bi',
                    'bi-arrow-down-circle-fill',
                ],
            },
            function : () => {
                if (document.querySelector('#btn-arrow')['classList'].contains('rotate')) {
                    window.scrollTo(0, 0);
                };
                if (!document.querySelector('#btn-arrow')['classList'].contains('rotate')) {
                    window.scrollTo(0, OverallHeight);
                };
            },
            id : 'btn-arrow',
        });
    };
    if (Validator['String'](Proper['phone'])) {
        Attribute.push({
            class : {
                btn : [
                    'bg-success',
                ],
                ico : [
                    'bi',
                    'bi-whatsapp',
                ],
            },
            function : () => {
                let Message = '';
                Message += 'https://api.whatsapp.com/send?phone=';
                Message += Proper['phone'].replace(/[^a-zA-Z0-9]/g, '');
                if (Validator['Array'](Proper['description'])) {
                    Message += '&text=';
                    if (Proper['title']) {
                        Message += Proper['title'].trim().replace(/' '/, '%20');
                        Message += ', '.trim().replace(/' '/, '%20');
                    };
                    for (let i = 0; i < Proper['description']['length']; i++) {
                        if (Proper['title']) {
                            Message += !i
                            ? (Proper['description'][i].slice(0, 1).toLowerCase() + Proper['description'][i].slice(1)).trim().replace(/' '/, '%20')
                            : Proper['description'][i].trim().replace(/' '/, '%20');
                        };
                        if (!Proper['title']) {
                            Message += Proper['description'][i].trim().replace(/' '/, '%20');
                        };
                        Message += i < (Proper['description']['length'] - 1) ? '%20' : '';
                    };
                };
                window.open(Message, '_blank');
            },
            id : 'btn-whatsapp',
        });
    };
    if (Proper['network']) {
        if (Proper['network']['length']) {
            for (let i = 0; i < Proper['network']['length']; i++) {
                for (let j = 0; j < Network['length']; j++) {
                    if (Proper['network'][i].includes(Network[j]['title'])) {
                        Attribute.push({
                            class : {
                                btn : [
                                    Network[j]['background'],
                                ],
                                ico : [
                                    'bi',
                                    'bi-' + Network[j]['title'],
                                ],
                            },
                            function : () => {
                                window.open(Proper['network'][i], '_blank');
                            },
                            id : 'btn-' + Network[j]['title'],
                        });
                    };
                };
            };
        };
    };
    if (Attribute) {
        if (Attribute['length']) {
            for (let i = 0; i < Attribute['length']; i++) {
                Element[i] = CreateElement();
                SetAttribute({ element : Element[i], attribute : 'id', value : Attribute[i]['id'] });
                SetAttribute({ element : Element[i], attribute : 'class', value : [
                        ...SetStyle['class']['button'],
                    ],
                });
                SetAttribute({ element : Element[i], attribute : 'style', value : {
                        ...SetStyle['style']['button'],
                        bottom : 'calc(1rem + (' + i + ' * (1rem / 2)) + ' + i + ' * 3rem)',
                        right : '1rem',
                    },
                });
                const Icon = CreateElement({ element : 'i' });
                SetAttribute({ element : Icon, attribute : 'class', value : [
                        ...Attribute[i]['class']['ico'],
                        ...SetStyle['class']['ico'],
                    ],
                });
                SetAttribute({ element : Icon, attribute : 'style', value : {
                        ...SetStyle['style']['ico'],
                    },
                });
                document.querySelector('body').appendChild(Element[i]).appendChild(Icon);
                [ 'mouseover', 'mouseenter' ].map(Index => {
                    Element[i].addEventListener(Index, Event => {
                        Element[i]['style']['cursor'] = 'pointer';
                        Element[i]['classList'].add(...Attribute[i]['class']['btn']);
                        Element[i]['classList'].remove('bg-secondary');
                        Event.stopPropagation();
                        Event.preventDefault();
                    });
                });
                [ 'mouseleave', 'mouseout' ].map(Index => {
                    Element[i].addEventListener(Index, Event => {
                        Element[i]['style']['cursor'] = 'default';
                        Element[i]['classList'].add('bg-secondary');
                        Element[i]['classList'].remove(...Attribute[i]['class']['btn']);
                        Event.stopPropagation();
                        Event.preventDefault();
                    });
                });
                Element[i].addEventListener('click', Event => {
                    Attribute[i]['function']();
                    switch (Attribute[i]['id']) {
                        case 'btn-arrow' : Element[i]['classList'].toggle('rotate'); break;
                    };
                    Event.stopPropagation();
                    Event.preventDefault();
                });
            };
        };
    };
};