import {
    CreateElement,
    SetAttribute,
    TransitionRunning,
    Validator,
} from './script-main.js';
import {
    LightboxAttribute,
    LightboxPosition,
    LightboxWidth,
    SetStyle,
} from './script-variables.js';
export const LightboxBuilder = (output = {}) => {
    let Proper = {
        current : 'current' in output ? (Validator['Number'](output['current']) ? output['current'] : 0) : 0,
    };
    let CurrentPicture = Proper['current'];
    const Background = CreateElement();
    SetAttribute({ element : Background, attribute : 'id', value : 'background' });
    SetAttribute({ element : Background, attribute : 'class', value : [
            ...SetStyle['background']['class'],
        ],
    });
    SetAttribute({ element : Background, attribute : 'style', value : {
            ...SetStyle['background']['style'],
        },
    });
    document.querySelector('body').appendChild(Background);
    const Border = CreateElement();
    SetAttribute({ element : Border, attribute : 'id', value : 'border' });
    SetAttribute({ element : Border, attribute : 'class', value : [
            ...SetStyle['border']['class'],
        ],
    });
    SetAttribute({ element : Border, attribute : 'style', value : {
            ...SetStyle['border']['style'],
            height : 'calc(' + '100%' + ' - ' + SetStyle['border']['margin'] + ' * ' + 2 + ')',
            width : 'calc(' + '100%' + ' - ' + SetStyle['border']['margin'] + ' * ' + 2 + ')',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border);
    const Container = CreateElement();
    SetAttribute({ element : Container, attribute : 'id', value : 'container' });
    SetAttribute({ element : Container, attribute : 'class', value : [
            ...SetStyle['container']['class'],
        ],
    });
    SetAttribute({ element : Container, attribute : 'style', value : {
            ...SetStyle['container']['style'],
            height : 'calc(' + '100%' + ' - ' + SetStyle['container']['margin'] + ' * ' + 2 + ')',
            width : 'calc(' + '100%' + ' - ' + SetStyle['container']['margin'] + ' * ' + 2 + ')',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container);
    const Inner = CreateElement();
    SetAttribute({ element : Inner, attribute : 'id', value : 'inner' });
    SetAttribute({ element : Inner, attribute : 'class', value : [
            ...SetStyle['inner']['class'],
        ],
    });
    SetAttribute({ element : Inner, attribute : 'style', value : {
            ...SetStyle['inner']['style'],
            left : LightboxAttribute[CurrentPicture]['left'],
            width : LightboxAttribute[CurrentPicture]['width'],
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner);
    const Content = CreateElement();
    SetAttribute({ element : Content, attribute : 'id', value : 'content' });
    SetAttribute({ element : Content, attribute : 'class', value : [
            ...SetStyle['content']['class'],
        ],
    });
    SetAttribute({ element : Content, attribute : 'style', value : {
            ...SetStyle['content']['style'],
            left : LightboxPosition[CurrentPicture]['left'],
            width : LightboxWidth + 'px',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content);
    const Picture = [];
    if (LightboxAttribute['length']) {
        for (let i = 0; i < LightboxAttribute['length']; i++) {
            Picture[i] = CreateElement();
            SetAttribute({ element : Picture[i], attribute : 'class', value : [
                    ...SetStyle['picture']['class'],
                ],
            });
            SetAttribute({ element : Picture[i], attribute : 'style', value : {
                    ...SetStyle['picture']['style'],
                    ...LightboxAttribute[i]['url'] ? { 'background-image' : 'url(\'' + LightboxAttribute[i]['url'] + '\')' } : { 'background-color' : 'white' },
                    width : LightboxAttribute[i]['width'],
                },
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]);
            if (LightboxAttribute[i]['title']) {
                const Title = CreateElement({ element : 'h1', textnode : LightboxAttribute[i]['title'] });
                SetAttribute({ element : Title, attribute : 'class', value : [
                        ...SetStyle['title']['class'],
                    ],
                });
                SetAttribute({ element : Title, attribute : 'style', value : {
                        ...SetStyle['title']['style'],
                    },
                });
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Title);
            };
            if (LightboxAttribute[i]['subtitle']) {
                const Subtitle = CreateElement({ element : 'h2', textnode : LightboxAttribute[i]['subtitle'] });
                SetAttribute({ element : Subtitle, attribute : 'class', value : [
                        ...SetStyle['subtitle']['class'],
                    ],
                });
                SetAttribute({ element : Subtitle, attribute : 'style', value : {
                        ...SetStyle['subtitle']['style'],
                    },
                });
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Subtitle);
            };
            if (LightboxAttribute[i]['description']) {
                const Description = CreateElement({ element : 'p', textnode : LightboxAttribute[i]['description'] });
                SetAttribute({ element : Description, attribute : 'class', value : [
                        ...SetStyle['description']['class'],
                    ],
                });
                SetAttribute({ element : Description, attribute : 'style', value : {
                        ...SetStyle['description']['style'],
                    },
                });
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Description);
            };
        };
    };
    const NavigationButtonAttribute = NavigationButtonAttributeFunction({ current : CurrentPicture });
    if (NavigationButtonAttribute) {
        if (NavigationButtonAttribute['length']) {
            const NavigationButtonArray = [];
            for (let i = 0; i < NavigationButtonAttribute['length']; i++) {
                NavigationButtonArray[i] = CreateElement();
                SetAttribute({ element : NavigationButtonArray[i], attribute : 'id', value : NavigationButtonAttribute[i]['id'] });
                SetAttribute({ element : NavigationButtonArray[i], attribute : 'class', value : [
                        ...SetStyle['button']['class'],
                        'd-flex',
                    ]
                });
                SetAttribute({ element : NavigationButtonArray[i], attribute : 'style', value : {
                        ...SetStyle['button']['style'],
                        ...NavigationButtonAttribute[i]['style'],
                    }
                });
                const ButtonIcon = CreateElement({ element : 'i' });
                SetAttribute({ element : ButtonIcon, attribute : 'class', value : [
                        ...SetStyle['ico']['class'],
                        ...NavigationButtonAttribute[i]['ico']['class'],
                    ]
                });
                SetAttribute({ element : ButtonIcon, attribute : 'style', value : {
                        ...SetStyle['ico']['style'],
                    }
                });
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(NavigationButtonArray[i]).appendChild(ButtonIcon);
                [ 'mouseover', 'mouseenter' ].map(Index => {
                    NavigationButtonArray[i].addEventListener(Index, Event => {
                        NavigationButtonArray[i]['classList'].add('bg-danger');
                        NavigationButtonArray[i]['classList'].remove('bg-secondary');
                        Event.stopPropagation();
                        Event.preventDefault();
                    });
                });
                [ 'mouseleave', 'mouseout' ].map(Index => {
                    NavigationButtonArray[i].addEventListener(Index, Event => {
                        NavigationButtonArray[i]['classList'].add('bg-secondary');
                        NavigationButtonArray[i]['classList'].remove('bg-danger');
                        Event.stopPropagation();
                        Event.preventDefault();
                    });
                });
                NavigationButtonArray[i].addEventListener('click', Event => {
                    NavigationButtonAttribute[i]['function']();
                    Event.stopPropagation();
                    Event.preventDefault();
                });
                if (NavigationButtonAttribute[i]['key']['length']) {
                    for (let j = 0; j < NavigationButtonAttribute[i]['key']['length']; j++) {
                        document.addEventListener('keydown', Event => {
                            if (Event['key'] === NavigationButtonAttribute[i]['key'][j]) {
                                document['body']['style']['pointerEvents'] = 'none';
                                NavigationButtonArray[i]['classList'].add('bg-danger');
                                NavigationButtonArray[i]['classList'].remove('bg-secondary');
                                NavigationButtonAttribute[i]['function']();
                                Event.stopPropagation();
                                Event.preventDefault();
                            };
                        });
                        document.addEventListener('keyup', Event => {
                            if (Event['key'] === NavigationButtonAttribute[i]['key'][j]) {
                                NavigationButtonArray[i]['classList'].add('bg-secondary');
                                NavigationButtonArray[i]['classList'].remove('bg-danger');
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
            LightboxTransition({ current : CurrentPicture });
        };
    };
};
export const LightboxTransition = (output = {}) => {
    let Proper = {
        current : 'current' in output ? (Validator['Number'](output['current']) ? output['current'] : 0) : 0,
    };
    let CurrentPicture = Proper['current'];
    document.querySelector('#content')['style']['left'] = LightboxPosition[CurrentPicture]['left'];
    document.querySelector('#inner')['style']['height'] = LightboxAttribute[CurrentPicture]['height'];
    document.querySelector('#inner')['style']['left'] = LightboxAttribute[CurrentPicture]['left'];
    document.querySelector('#inner')['style']['top'] = LightboxAttribute[CurrentPicture]['top'];
    document.querySelector('#inner')['style']['width'] = LightboxAttribute[CurrentPicture]['width'];
    if (CurrentPicture < 1) {
        document.querySelector('#btn-arrow-left')['style']['opacity'] = 0;
        document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(0)';
    };
    if (CurrentPicture > (LightboxAttribute['length'] - 2)) {
        document.querySelector('#btn-arrow-right')['style']['opacity'] = 0;
        document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(0)';
    };
    if (!(CurrentPicture < 1)) {
        document.querySelector('#btn-arrow-left')['style']['opacity'] = 1;
        document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(1)';
    };
    if (!(CurrentPicture > (LightboxAttribute['length'] - 2))) {
        document.querySelector('#btn-arrow-right')['style']['opacity'] = 1;
        document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(1)';
    };
};
export const LightboxShow = () => {
    let Selector = document.querySelector('#background');
    if (Selector) {
        Selector['style']['display'] = 'flex';
        Selector['style']['zIndex'] = 9999;
        if (!TransitionRunning(Selector)) {
            Selector['style']['opacity'] = 1;
        };
    };
};
export const NavigationButtonAttributeFunction = (output = {}) => {
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