import {
    CreateElement,
    SetAttribute,
    Validator,
} from './script-main.js';
import {
    SetStyle,
    TextTemplate,
} from './script-variable.js';
export const SocialNetwork = () => {
    const Array = [];
    const Attribute = [
        {
            function : () => {
                let Https = 'https://www.facebook.com/VivaHostel/';
                window.open(Https, '_blank');
            },
            hover : [
                'bg-primary',
            ],
            ico : {
                class : [
                    'bi',
                    'bi-facebook',
                ],
            },
            id : 'btn-facebook',
        },
        {
            function : () => {
                let Https = 'https://www.instagram.com/vivahostel/';
                window.open(Https, '_blank');
            },
            hover : [
                'bg-danger',
            ],
            ico : {
                class : [
                    'bi',
                    'bi-instagram',
                ],
            },
            id : 'btn-instagram',
        },
        {
            function : (output = {}) => {
                const Proper = {
                    phone : 'phone' in output ? (Validator['String'](output['phone']) ? output['phone'] : '+55 (11) 9 9258-1757') : '+55 (11) 9 9258-1757',
                    message : 'message' in output ? (Validator['String'](output['message']) ? output['message'] : TextTemplate) : TextTemplate,
                };
                let Https = '';
                if (Validator['String'](Proper['phone'])) {
                    Https += 'https://api.whatsapp.com/send?phone=';
                    Https += Proper['phone'].replace(/[^a-zA-Z0-9]/g, '');
                    if (Validator['String'](Proper['message'])) {
                        Https += '&text=';
                        Https += Proper['message'].trim().replace(/' '/, '%20');
                    };
                    window.open(Https, '_blank');
                };
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
        },
        {
            function : () => {
                let Https = 'https://www.youtube.com/watch?v=1OaaUjyixVY';
                window.open(Https, '_blank');
            },
            hover : [
                'bg-danger',
            ],
            ico : {
                class : [
                    'bi',
                    'bi-youtube',
                ],
            },
            id : 'btn-youtube',
        },
        {
            function : () => {
                let Https = 'https://www.linkedin.com/in/rafael-favoretto';
                window.open(Https, '_blank');
            },
            hover : [
                'bg-primary',
            ],
            ico : {
                class : [
                    'bi',
                    'bi-linkedin',
                ],
            },
            id : 'btn-linkedin',
        },
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
    if (Attribute) {
        if (Attribute['length']) {
            Attribute.reverse();
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