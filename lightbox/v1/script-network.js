import {
    CreateElement,
    SetAttribute,
    Validator,
} from './script-main.js';
import {
    SetStyle,
    TextTemplate,
} from './script-variables.js';
export const SocialNetwork = () => {
    const Array = [];
    const Attribute = [
        {
            function : () => {
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
            function : () => {
            },
            hover : [
                'bg-info',
            ],
            ico : {
                class : [
                    'bi',
                    'bi-messenger',
                ],
            },
            id : 'btn-messenger',
        },
        {
            function : (output = {}) => {
                const Proper = {
                    phone : 'phone' in output ? (Validator['String'](output['phone']) ? output['phone'] : '+55 (11) 9 9163-3880') : '+55 (11) 9 9163-3880',
                    message : 'message' in output ? (Validator['String'](output['message']) ? output['message'] : TextTemplate) : TextTemplate,
                };
                let https = '';
                if (Validator['String'](Proper['phone'])) {
                    https += 'https://api.whatsapp.com/send?phone=';
                    https += Proper['phone'].replace(/[^a-zA-Z0-9]/g, '');
                    if (Validator['String'](Proper['message'])) {
                        https += '&text=';
                        https += Proper['message'].trim().replace(/' '/, '%20');
                    };
                    window.open(https, '_blank');
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
                if (document.querySelector('#btn-arrow')['classList'].contains('rotate'))
                    document['documentElement']['scrollTop'] = 0;
                if (!document.querySelector('#btn-arrow')['classList'].contains('rotate'))
                    window.scrollTo(0, document['body']['scrollHeight']);
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
                        'bg-secondary',
                        'd-lg-flex',
                        'd-none',
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
                [ 'mouseover', 'mouseenter' ].map(index => {
                    Array[i].addEventListener(index, event => {
                        Array[i]['classList'].add(...Attribute[i]['hover']);
                        Array[i]['classList'].remove('bg-secondary');
                        Array[i]['style']['cursor'] = 'pointer';
                    });
                });
                [ 'mouseleave', 'mouseout' ].map(index => {
                    Array[i].addEventListener(index, event => {
                        Array[i]['classList'].add('bg-secondary');
                        Array[i]['classList'].remove(...Attribute[i]['hover']);
                        Array[i]['style']['cursor'] = 'default';
                    });
                });
                Array[i].addEventListener('click', event => {
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