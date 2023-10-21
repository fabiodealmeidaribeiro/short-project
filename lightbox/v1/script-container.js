import {
    CreateElement,
    SetAttribute,
    TransitionRunning,
} from './script-main.js';
import {
    NavigationBuilder,
} from './script-navigation.js';
import {
    LightboxAttribute,
    LightboxPosition,
    LightboxWidth,
    SetStyle,
} from './script-variables.js';
export const LightboxBuilder = (CurrentPicture = 0) => {
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
    const NavigationAttribute = NavigationBuilder(CurrentPicture);
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

                // [ 'mouseover', 'mouseenter' ].map(Index => {
                //     NavigationArray[i].addEventListener(Index, Event => {
                //         NavigationArray[i]['classList'].add('bg-danger');
                //         NavigationArray[i]['classList'].remove('bg-secondary');
                //         Event.stopPropagation();
                //         Event.preventDefault();
                //     });
                // });

                // [ 'mouseleave', 'mouseout' ].map(Index => {
                //     NavigationArray[i].addEventListener(Index, Event => {
                //         NavigationArray[i]['classList'].add('bg-secondary');
                //         NavigationArray[i]['classList'].remove('bg-danger');
                //         Event.stopPropagation();
                //         Event.preventDefault();
                //     });
                // });
                
                // NavigationArray[i].addEventListener('click', Event => {
                //     NavigationAttribute[i]['function']();
                //     Event.stopPropagation();
                //     Event.preventDefault();
                // });

                // if (NavigationAttribute[i]['key']['length']) {
                //     for (let j = 0; j < NavigationAttribute[i]['key']['length']; j++) {
                //         document.addEventListener('keydown', Event => {
                //             if (Event['key'] === NavigationAttribute[i]['key'][j]) {
                //                 document['body']['style']['pointerEvents'] = 'none';
                //                 NavigationArray[i]['classList'].add('bg-danger');
                //                 NavigationArray[i]['classList'].remove('bg-secondary');
                //                 NavigationAttribute[i]['function']();
                //                 Event.stopPropagation();
                //                 Event.preventDefault();
                //             };
                //         });
                //         document.addEventListener('keyup', Event => {
                //             if (Event['key'] === NavigationAttribute[i]['key'][j]) {
                //                 NavigationArray[i]['classList'].add('bg-secondary');
                //                 NavigationArray[i]['classList'].remove('bg-danger');
                //                 Event.stopPropagation();
                //                 Event.preventDefault();
                //             };
                //         });
                //         document.addEventListener('mousemove', Event => {
                //             document['body']['style']['pointerEvents'] = 'auto';
                //             Event.stopPropagation();
                //             Event.preventDefault();
                //         });
                //     };
                // };
                
            };
        };
    };
    LightboxTransition(CurrentPicture);
};
export const LightboxTransition = (CurrentPicture = 0) => {
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
export const LightboxDisplay = () => {
    let Selector = document.querySelector('#background');
    if (Selector) {
        Selector['style']['display'] = 'flex';
        Selector['style']['zIndex'] = 9999;
        if (!TransitionRunning(Selector)) {
            Selector['style']['opacity'] = 1;
        };
    };
};