import {
    CreateElement,
    SetAttribute,
    TransitionRunning,
    Validator,
} from './script-main.js';
import {
    LightboxAttribute,
    SetStyle,
} from './script-variables.js';
export const NavigationAttributeFunction = (output = {}) => {
    let Proper = {
        current : 'current' in output ? (Validator['Number'](output['current']) ? output['current'] : 0) : 0,
    };
    let CurrentPicture = Proper['current'];
    return [
        {
            function : () => {
                CurrentPicture = CurrentPicture < 1 ? CurrentPicture : CurrentPicture - 1;
                LightboxTransition({ current : CurrentPicture });
            },
            class : [
            ],
            ico : {
                class : [
                    'bi',
                    'bi-arrow-left-circle-fill',
                ],
            },
            id : 'btn-arrow-left',
            key : [
                'ArrowLeft',
            ],
            style : {
                left : 'calc(' + SetStyle['button']['margin'] + ' * ' + 3 + ')',
                cursor : 'pointer',
            },
        },
        {
            function : () => {
                CurrentPicture = CurrentPicture > (LightboxAttribute['length'] - 2) ? CurrentPicture : CurrentPicture + 1;
                LightboxTransition({ current : CurrentPicture });
            },
            class : [
            ],
            ico : {
                class : [
                    'bi',
                    'bi-arrow-right-circle-fill',
                ],
            },
            id : 'btn-arrow-right',
            key : [
                'ArrowRight',
            ],
            style : {
                right : 'calc(' + SetStyle['button']['margin'] + ' * ' + 3 + ')',
                cursor : 'pointer',
            },
        },
        {
            function : () => {
                const Selector = document.querySelector('#background');
                if (Selector) {
                    Selector['style']['opacity'] = 0;
                    if (!TransitionRunning(Selector)) {
                        Selector['style']['display'] = 'none';
                        Selector['style']['zIndex'] = - 1;
                    };
                };
            },
            class : [
            ],
            ico : {
                class : [
                    'bi',
                    'bi-x-circle-fill',
                ],
            },
            id : 'btn-arrow-down',
            key : [
                'ArrowDown',
                'Escape',
            ],
            style : {
                bottom : 'calc(' + SetStyle['button']['margin'] + ' * ' + 3 + ')',
                left : '50%',
                transform : 'translate(-50%, 0)',
                cursor : 'pointer',
            },
        },
    ];
};
export const NavigationBuilder = (output = {}) => {
    const NavigationAttribute = NavigationAttributeFunction({ current : 0 });
    if (NavigationAttribute) {
        if (NavigationAttribute['length']) {
            const NavigationArray = [];
            for (let i = 0; i < NavigationAttribute['length']; i++) {
                NavigationArray[i] = CreateElement();
                SetAttribute({ element : NavigationArray[i], attribute : 'id', value : NavigationAttribute[i]['id'] });
                SetAttribute({ element : NavigationArray[i], attribute : 'class', value : [
                        ...SetStyle['button']['class'],
                        'd-flex',
                    ]
                });
                SetAttribute({ element : NavigationArray[i], attribute : 'style', value : {
                        ...SetStyle['button']['style'],
                        ...NavigationAttribute[i]['style'],
                    }
                });
                const ButtonIcon = CreateElement({ element : 'i' });
                SetAttribute({ element : ButtonIcon, attribute : 'class', value : [
                        ...SetStyle['ico']['class'],
                        ...NavigationAttribute[i]['ico']['class'],
                    ]
                });
                SetAttribute({ element : ButtonIcon, attribute : 'style', value : {
                        ...SetStyle['ico']['style'],
                    }
                });
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(NavigationArray[i]).appendChild(ButtonIcon);
                [ 'mouseover', 'mouseenter' ].map(Index => {
                    NavigationArray[i].addEventListener(Index, Event => {
                        NavigationArray[i]['classList'].add('bg-danger');
                        NavigationArray[i]['classList'].remove('bg-secondary');
                        Event.stopPropagation();
                        Event.preventDefault();
                    });
                });
                [ 'mouseleave', 'mouseout' ].map(Index => {
                    NavigationArray[i].addEventListener(Index, Event => {
                        NavigationArray[i]['classList'].add('bg-secondary');
                        NavigationArray[i]['classList'].remove('bg-danger');
                        Event.stopPropagation();
                        Event.preventDefault();
                    });
                });
                NavigationArray[i].addEventListener('click', Event => {
                    NavigationAttribute[i]['function']();
                    Event.stopPropagation();
                    Event.preventDefault();
                });
                if (NavigationAttribute[i]['key']['length']) {
                    for (let j = 0; j < NavigationAttribute[i]['key']['length']; j++) {
                        document.addEventListener('keydown', Event => {
                            if (Event['key'] === NavigationAttribute[i]['key'][j]) {
                                document['body']['style']['pointerEvents'] = 'none';
                                NavigationArray[i]['classList'].add('bg-danger');
                                NavigationArray[i]['classList'].remove('bg-secondary');
                                NavigationAttribute[i]['function']();
                                Event.stopPropagation();
                                Event.preventDefault();
                            };
                        });
                        document.addEventListener('keyup', Event => {
                            if (Event['key'] === NavigationAttribute[i]['key'][j]) {
                                NavigationArray[i]['classList'].add('bg-secondary');
                                NavigationArray[i]['classList'].remove('bg-danger');
                                Event.stopPropagation();
                                Event.preventDefault();
                            };
                        });
                        document.addEventListener('mousemove', Event => {
                            document['body']['style']['pointerEvents'] = 'auto';
                            Event.stopPropagation();
                            Event.preventDefault();
                        });
                    };
                };
            };
        };
    };
};