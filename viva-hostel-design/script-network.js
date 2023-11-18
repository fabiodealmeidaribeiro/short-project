import {
    CreateElement,
    JSONFetch,
    SetAttribute,
    Validator,
} from './script-main.js';

const BoxShadow = {
    'box-shadow' : '0 1px 2px 0 rgba(48, 48, 48, .3), 0 1px 3px 1px rgba(48, 48, 48, .15)',
};

const Button = 3;

const Margin = 1;

const Style = {
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

const JSONFetch = async (Input = '') => {
    const Response = await fetch(Input);
    return await Response.json();
};

export const SocialNetwork = async () => {
    const Result = await JSONFetch ('settings.json');
    const Proper = {
        title : Validator['String'](Result['title']) ? Result['title'] : '',
        subtitle : Validator['String'](Result['subtitle']) ? Result['subtitle'] : '',
        description : Validator['Array'](Result['description']) ? Result['description'] : [],
        phone : Validator['String'](Result['phone']) ? Result['phone'] : '',
        network : Validator['Array'](Result['network']) ? Result['network'] : [],
    };
    const Element = [];
    let Attribute = [];
    if (window['outerHeight'] > window['innerHeight']) {
        Attribute.push({
            function : () => {
                if (document.querySelector('#btn-arrow')['classList'].contains('rotate')) {
                    window.scrollTo(0, 0);
                };
                if (!document.querySelector('#btn-arrow')['classList'].contains('rotate')) {
                    window.scrollTo(0, window['outerHeight']);
                };
            },
            hover : [
                'bg-danger',
            ],
            ico : {
                class : [
                    'bi',
                    'bi-arrow-down-circle-fill',
                ],
            },
            id : 'btn-arrow',
        });
    };
    if (Validator['String'](Proper['phone'])) {
        Attribute.push({
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
                            Message += !i ? (Proper['description'][i].slice(0, 1).toLowerCase() + Proper['description'][i].slice(1)).trim().replace(/' '/, '%20') : Proper['description'][i].trim().replace(/' '/, '%20');
                        };
                        if (!Proper['title']) {
                            Message += Proper['description'][i].trim().replace(/' '/, '%20');
                        };
                        Message += i < (Proper['description']['length'] - 1) ? '%20' : '';
                    };
                };
                window.open(Message, '_blank');
            },
            hover : [
                'bg-success',
            ],
            ico : {
                class : [
                    'bi',
                    'bi-whatsapp',
                ],
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
                            function : () => {
                                window.open(Proper['network'][i], '_blank');
                            },
                            hover : [
                                Network[j]['background'],
                            ],
                            ico : {
                                class : [
                                    'bi',
                                    'bi-' + Network[j]['title'],
                                ],
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
                        ...Style['button']['class'],
                    ],
                });
                SetAttribute({ element : Element[i], attribute : 'style', value : {
                        ...Style['button']['style'],
                        bottom : 'calc(' + Style['button']['margin'] + ' + ' + '(' + i + '*' + '(' + Style['button']['margin'] +  '/' + 2 + ')' + ')' + ' + ' + i + '*' + Style['button']['style']['height'] + ')',
                        right : Style['button']['margin'],
                    },
                });
                const Icon = CreateElement({ element : 'i' });
                SetAttribute({ element : Icon, attribute : 'class', value : [
                        ...Attribute[i]['ico']['class'],
                        ...Style['ico']['class'],
                    ],
                });
                SetAttribute({ element : Icon, attribute : 'style', value : {
                        ...Style['ico']['style'],
                    },
                });
                document.querySelector('body').appendChild(Element[i]).appendChild(Icon);
                [ 'mouseover', 'mouseenter' ].map(Index => {
                    Element[i].addEventListener(Index, Event => {
                        Element[i]['style']['cursor'] = 'pointer';
                        Element[i]['classList'].add(...Attribute[i]['hover']);
                        Element[i]['classList'].remove('bg-secondary');
                        Event.stopPropagation();
                        Event.preventDefault();
                    });
                });
                [ 'mouseleave', 'mouseout' ].map(Index => {
                    Element[i].addEventListener(Index, Event => {
                        Element[i]['style']['cursor'] = 'default';
                        Element[i]['classList'].add('bg-secondary');
                        Element[i]['classList'].remove(...Attribute[i]['hover']);
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