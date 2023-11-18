import {
    CreateElement,
    SetAttribute,
} from './script-master.js';

import {
    NavigationBuilder,
} from './script-navigation.js';

import {
    LightboxAttribute,
    LightboxPosition,
    LightboxWidth,
    Style,
} from './script-variable.js';

export const LightboxBuilder = (Input = 0) => {
    const Background = CreateElement();
    SetAttribute({ element : Background, attribute : 'id', value : 'background' });
    SetAttribute({ element : Background, attribute : 'class', value : [
            ...Style['class']['background'],
        ],
    });
    SetAttribute({ element : Background, attribute : 'style', value : {
            ...Style['style']['background'],
        },
    });
    document.querySelector('body').appendChild(Background);
    const Border = CreateElement();
    SetAttribute({ element : Border, attribute : 'id', value : 'border' });
    SetAttribute({ element : Border, attribute : 'class', value : [
            ...Style['class']['border'],
        ],
    });
    SetAttribute({ element : Border, attribute : 'style', value : {
            ...Style['style']['border'],
            height : 'calc(' + '100%' + ' - ' + '1rem' + ' * ' + 2 + ')',
            width : 'calc(' + '100%' + ' - ' + '1rem' + ' * ' + 2 + ')',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border);
    const Container = CreateElement();
    SetAttribute({ element : Container, attribute : 'id', value : 'container' });
    SetAttribute({ element : Container, attribute : 'class', value : [
            ...Style['class']['container'],
        ],
    });
    SetAttribute({ element : Container, attribute : 'style', value : {
            ...Style['style']['container'],
            height : 'calc(' + '100%' + ' - ' + '1rem' + ' * ' + 2 + ')',
            width : 'calc(' + '100%' + ' - ' + '1rem' + ' * ' + 2 + ')',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container);
    const Inner = CreateElement();
    SetAttribute({ element : Inner, attribute : 'id', value : 'inner' });
    SetAttribute({ element : Inner, attribute : 'class', value : [
            ...Style['class']['inner'],
        ],
    });
    SetAttribute({ element : Inner, attribute : 'style', value : {
            ...Style['style']['inner'],
            left : LightboxAttribute[Input]['left'],
            width : LightboxAttribute[Input]['width'],
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner);
    const Content = CreateElement();
    SetAttribute({ element : Content, attribute : 'id', value : 'content' });
    SetAttribute({ element : Content, attribute : 'class', value : [
            ...Style['class']['content'],
        ],
    });
    SetAttribute({ element : Content, attribute : 'style', value : {
            ...Style['style']['content'],
            left : LightboxPosition[Input]['left'],
            width : LightboxWidth + 'px',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content);
    const Thumbnail = [];
    if (LightboxAttribute['length']) {
        for (let i = 0; i < LightboxAttribute['length']; i++) {
            Thumbnail[i] = CreateElement();
            SetAttribute({ element : Thumbnail[i], attribute : 'class', value : [
                    ...Style['class']['picture'],
                    'thumbnail',
                ],
            });
            SetAttribute({ element : Thumbnail[i], attribute : 'style', value : {
                    ...Style['style']['picture'],
                    ...LightboxAttribute[i]['url'] ? { 'background-image' : 'url(\'' + LightboxAttribute[i]['url'] + '\')' } : { 'background-color' : 'white' },
                    width : LightboxAttribute[i]['width'],
                },
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Thumbnail[i]);
            if (LightboxAttribute[i]['title']) {
                const Title = CreateElement({ element : 'h1', textnode : LightboxAttribute[i]['title'] });
                SetAttribute({ element : Title, attribute : 'class', value : [
                        ...Style['class']['title'],
                    ],
                });
                SetAttribute({ element : Title, attribute : 'style', value : {
                        ...Style['style']['title'],
                    },
                });
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Thumbnail[i]).appendChild(Title);
            };
            if (LightboxAttribute[i]['subtitle']) {
                const Subtitle = CreateElement({ element : 'h2', textnode : LightboxAttribute[i]['subtitle'] });
                SetAttribute({ element : Subtitle, attribute : 'class', value : [
                        ...Style['class']['subtitle'],
                    ],
                });
                SetAttribute({ element : Subtitle, attribute : 'style', value : {
                        ...Style['style']['subtitle'],
                    },
                });
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Thumbnail[i]).appendChild(Subtitle);
            };
            if (LightboxAttribute[i]['description']) {
                const Description = CreateElement({ element : 'p', textnode : LightboxAttribute[i]['description'] });
                SetAttribute({ element : Description, attribute : 'class', value : [
                        ...Style['class']['description'],
                    ],
                });
                SetAttribute({ element : Description, attribute : 'style', value : {
                        ...Style['style']['description'],
                    },
                });
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Thumbnail[i]).appendChild(Description);
            };
        };
    };
    const NavigationAttribute = NavigationBuilder(Input);
    if (NavigationAttribute) {
        if (NavigationAttribute['length']) {
            const NavigationArray = [];
            for (let i = 0; i < NavigationAttribute['length']; i++) {
                NavigationArray[i] = CreateElement();
                SetAttribute({ element : NavigationArray[i], attribute : 'id', value : NavigationAttribute[i]['id'] });
                SetAttribute({ element : NavigationArray[i], attribute : 'class', value : [
                        ...Style['class']['button'],
                        'd-flex',
                    ]
                });
                SetAttribute({ element : NavigationArray[i], attribute : 'style', value : {
                        ...Style['style']['button'],
                        ...NavigationAttribute[i]['style'],
                    }
                });
                const ButtonIcon = CreateElement({ element : 'i' });
                SetAttribute({ element : ButtonIcon, attribute : 'class', value : [
                        ...Style['class']['ico'],
                        ...NavigationAttribute[i]['ico']['class'],
                    ]
                });
                SetAttribute({ element : ButtonIcon, attribute : 'style', value : {
                        ...Style['style']['ico'],
                    }
                });
                document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(NavigationArray[i]).appendChild(ButtonIcon);
            };
        };
    };
};

export const LightboxTransition = (Input = {}) => {
    const Proper = {
        current : 'current' in Input ? (Input['current'] ? Input['current'] : 0) : 0,
        width : 'width' in Input ? (Input['width'] ? Input['width'] : LightboxWidth) : LightboxWidth,
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

export const TransitionRunning = (Input) => getComputedStyle(Input)['transition'] === 'running';

export const LightboxBlock = (Selector) => {
    if (document.querySelector(Selector)) {
        document.querySelector(Selector)['style']['display'] = 'flex';
        document.querySelector(Selector)['style']['zIndex'] = 9999;
        if (!TransitionRunning(document.querySelector(Selector))) {
            document.querySelector(Selector)['style']['opacity'] = 1;
        };
    };
};

export const LightboxNone = (Selector) => {
    if (document.querySelector(Selector)) {
        document.querySelector(Selector)['style']['opacity'] = 0;
        if (!TransitionRunning(document.querySelector(Selector))) {
            document.querySelector(Selector)['style']['display'] = 'none';
            document.querySelector(Selector)['style']['zIndex'] = - 1;
        };
    };
};