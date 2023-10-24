import {
    CreateElement,
    SetAttribute,
    Validator,
} from './script-main.js';
import {
    SetStyle,
} from './script-variable.js';
export const SocialNetwork = (output = {}) => {
    const Proper = {
        phone : 'phone' in output ? (Validator['String'](output['phone']) ? output['phone'] : '') : '',
        message : 'message' in output ? (Validator['Array'](output['message']) ? output['message'] : []) : [],
        https : 'https' in output ? (Validator['Array'](output['https']) ? output['https'] : []) : [],
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
                if (Validator['Array'](Proper['message'])) {
                    Https += '&text=';
                    for (let i = 0; i < Proper['message']['length']; i++) {
                        Https += Proper['message'][i].trim().replace(/' '/, '%20');
                        Https += i < Proper['message']['length'] - 1 ? '%20' : '';
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
            title : 'youtube',
            background : 'bg-danger'
        },
    ];
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
                document.addEventListener('keydown', Event => {
                    Array[i]['classList'].add('bg-secondary');
                    Array[i]['classList'].remove(...Attribute[i]['hover']);
                    if (Event['key'] === (i + 1).toString()) {
                        Array[i]['classList'].add(...Attribute[i]['hover']);
                        Array[i]['classList'].remove('bg-secondary');
                    };
                    Event.stopPropagation();
                    Event.preventDefault();
                });
                Array[i].addEventListener('click', Event => {
                    Attribute[i]['function']();
                    switch (Attribute[i]['id']) {
                        case 'btn-arrow' :
                            Array[i]['classList'].toggle('rotate');
                        break;
                    };
                });
            };
        };
    };
};