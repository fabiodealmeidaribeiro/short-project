import {
    CreateElement,
    SetAttribute,
    Validator,
} from './script-main.js';
import {
    SetStyle,
} from './script-variable.js';
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
const FetchData = async (output = '') => {
    if (output) {
        const Response = await fetch(output);
        const Result = await Response.json();
        return Result;
    };
};
export const SocialNetwork = async () => {
    const Result = await FetchData('settings.json');
    const Proper = {
        description : Validator['Array'](Result['about']['description']) ? Result['about']['description'] : [],
        phone : Validator['String'](Result['network']['phone']) ? Result['network']['phone'] : '',
        https : Validator['Array'](Result['network']['https']) ? Result['network']['https'] : [],
    };
    const Array = [];
    let Attribute = [
        {
            function : () => {
                if (document.querySelector('#btn-arrow')['classList'].contains('rotate')) {
                    window.scrollTo(0, 0);
                };
                if (!document.querySelector('#btn-arrow')['classList'].contains('rotate')) {
                    window.scrollTo(0, document['body']['scrollHeight']);
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
        },
    ];
    if (Validator['String'](Proper['phone'])) {
        Attribute.push({
            function : () => {
                let Https = '';
                Https += 'https://api.whatsapp.com/send?phone=';
                Https += Proper['phone'].replace(/[^a-zA-Z0-9]/g, '');
                if (Validator['Array'](Proper['description'])) {
                    Https += '&text=';
                    for (let i = 0; i < Proper['description']['length']; i++) {
                        Https += Proper['description'][i].trim().replace(/' '/, '%20');
                        Https += i < Proper['description']['length'] - 1 ? '%20' : '';
                    };
                };
                window.open(Https, '_blank');
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
    if (Proper['https']) {
        if (Proper['https']['length']) {
            for (let i = 0; i < Proper['https']['length']; i++) {
                for (let j = 0; j < Network['length']; j++) {
                    if (Proper['https'][i].includes(Network[j]['title'])) {
                        Attribute.push({
                            function : () => {
                                window.open(Proper['https'][i], '_blank');
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
                Array[i] = CreateElement();
                SetAttribute({ element : Array[i], attribute : 'id', value : Attribute[i]['id'] });
                SetAttribute({ element : Array[i], attribute : 'class', value : [
                        ...SetStyle['button']['class'],
                    ],
                });
                SetAttribute({ element : Array[i], attribute : 'style', value : {
                        ...SetStyle['button']['style'],
                        bottom : 'calc(' + SetStyle['button']['margin'] + ' + ' + '(' + i + '*' + '(' + SetStyle['button']['margin'] +  '/' + 2 + ')' + ')' + ' + ' + i + '*' + SetStyle['button']['style']['height'] + ')',
                        right : SetStyle['button']['margin'],
                    },
                });
                const Icon = CreateElement({ element : 'i' });
                SetAttribute({ element : Icon, attribute : 'class', value : [
                        ...Attribute[i]['ico']['class'],
                        ...SetStyle['ico']['class'],
                    ],
                });
                SetAttribute({ element : Icon, attribute : 'style', value : {
                        ...SetStyle['ico']['style'],
                    },
                });
                document.querySelector('body').appendChild(Array[i]).appendChild(Icon);
                [ 'mouseover', 'mouseenter' ].map(Index => {
                    Array[i].addEventListener(Index, Event => {
                        Array[i]['style']['cursor'] = 'pointer';
                        Array[i]['classList'].add(...Attribute[i]['hover']);
                        Array[i]['classList'].remove('bg-secondary');
                        Event.stopPropagation();
                        Event.preventDefault();
                    });
                });
                [ 'mouseleave', 'mouseout' ].map(Index => {
                    Array[i].addEventListener(Index, Event => {
                        Array[i]['style']['cursor'] = 'default';
                        Array[i]['classList'].add('bg-secondary');
                        Array[i]['classList'].remove(...Attribute[i]['hover']);
                        Event.stopPropagation();
                        Event.preventDefault();
                    });
                });
                Array[i].addEventListener('click', Event => {
                    Attribute[i]['function']();
                    switch (Attribute[i]['id']) {
                        case 'btn-arrow' : Array[i]['classList'].toggle('rotate'); break;
                    };
                    Event.stopPropagation();
                    Event.preventDefault();
                });
            };
        };
    };
};