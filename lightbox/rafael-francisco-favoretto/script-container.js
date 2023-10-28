import {
    CreateElement,
    SetAttribute,
} from './script-main.js';
import {
    NavigationBuilder,
} from './script-navigation.js';
import {
    LightboxAttribute,
    LightboxPosition,
    LightboxWidth,
    SetStyle,
} from './script-variable.js';
export const LightboxBuilder = (output = 0) => {
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
            left : LightboxAttribute[output]['left'],
            width : LightboxAttribute[output]['width'],
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
            left : LightboxPosition[output]['left'],
            width : LightboxWidth + 'px',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content);
    const Thumbnail = [];
    if (LightboxAttribute['length']) {
        for (let i = 0; i < LightboxAttribute['length']; i++) {
            Thumbnail[i] = CreateElement();
            SetAttribute({ element : Thumbnail[i], attribute : 'class', value : [
                    ...SetStyle['picture']['class'],
                    'thumbnail',
                ],
            });
            SetAttribute({ element : Thumbnail[i], attribute : 'style', value : {
                    ...SetStyle['picture']['style'],
                    ...LightboxAttribute[i]['url'] ? { 'background-image' : 'url(\'' + LightboxAttribute[i]['url'] + '\')' } : { 'background-color' : 'white' },
                    width : LightboxAttribute[i]['width'],
                },
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Thumbnail[i]);
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
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Thumbnail[i]).appendChild(Title);
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
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Thumbnail[i]).appendChild(Subtitle);
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
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Thumbnail[i]).appendChild(Description);
            };
        };
    };
    const NavigationAttribute = NavigationBuilder(output);
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
            };
        };
    };
};
export const LightboxTransition = (output = {}) => {
    const Proper = {
        current : 'current' in output ? (output['current'] ? output['current'] : 0) : 0,
        width : 'width' in output ? (output['width'] ? output['width'] : LightboxWidth) : LightboxWidth,
    };
    document.querySelector('#content')['style']['left'] = LightboxPosition[Proper['current']]['left'];
    document.querySelector('#content')['style']['width'] = Proper['width'] + 'px';
    document.querySelector('#inner')['style']['height'] = LightboxAttribute[Proper['current']]['height'];
    document.querySelector('#inner')['style']['left'] = LightboxAttribute[Proper['current']]['left'];
    document.querySelector('#inner')['style']['top'] = LightboxAttribute[Proper['current']]['top'];
    document.querySelector('#inner')['style']['width'] = LightboxAttribute[Proper['current']]['width'];
    if (Proper['current'] < 1) {
        document.querySelector('#btn-arrow-left')['style']['opacity'] = 0;
        document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(0)';
    };
    if (Proper['current'] > (LightboxAttribute['length'] - 2)) {
        document.querySelector('#btn-arrow-right')['style']['opacity'] = 0;
        document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(0)';
    };
    if (!(Proper['current'] < 1)) {
        document.querySelector('#btn-arrow-left')['style']['opacity'] = 1;
        document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(1)';
    };
    if (!(Proper['current'] > (LightboxAttribute['length'] - 2))) {
        document.querySelector('#btn-arrow-right')['style']['opacity'] = 1;
        document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(1)';
    };
};