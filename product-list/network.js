import {
    CreateElement,
    JSONFetch,
    SetAttribute,
    Validator,
} from './master.js';

import {
    SetStyle,
} from './variable.js';

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
    let OverallHeight = 0;
    [ '.navbar', '.table-container', '.footer' ].map(Element => {
        if (document.querySelector(Element))
            OverallHeight += document.querySelector(Element).getBoundingClientRect()['height'];
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