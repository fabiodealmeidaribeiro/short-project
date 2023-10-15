import {
    CreateElement,
    OnlyNumber,
    SetAttribute,
    TransitionRunning,
    Validator,
} from './script-main.js';
import {
    SetStyle,
} from './script-variables.js';
const setBorderMargin = OnlyNumber(SetStyle['border']['margin']);
const setContainerMargin = OnlyNumber(SetStyle['container']['margin']);
const setContainerHeight = window['innerHeight'] - (setBorderMargin + setContainerMargin) * 2;
const setContainerWidth = window['innerWidth'] - (setBorderMargin + setContainerMargin) * 2;
const REM = parseFloat(getComputedStyle(document['documentElement'])['fontSize']);
const setPicturePadding = OnlyNumber(SetStyle['picture']['style']['padding']);
const setContainerPadding = setBorderMargin + setContainerMargin + setPicturePadding;
const Attribute = [];
document.querySelectorAll('.photo-content').forEach((element, index) => {
    let Picture = element.querySelector('.photo-background')
    ? (element.querySelector('.photo-background').querySelector('.photo-picture') ? element.querySelector('.photo-background').querySelector('.photo-picture') : [ undefined ])
    : [ undefined ];
    Picture = Picture ? {
        height : Picture.getAttribute('data-height') ? Picture.getAttribute('data-height') : [ undefined ],
        url : Picture.getAttribute('data-url') ? Picture.getAttribute('data-url') : [ undefined ],
        width : Picture.getAttribute('data-width') ? Picture.getAttribute('data-width') : [ undefined ],
    } : { };
    let Caption = element.querySelector('.photo-caption') ? element.querySelector('.photo-caption') : [ undefined ];
    Caption = Caption ? {
        title : Caption.querySelector('h1')
        ? (Caption.querySelector('h1')['innerText'] ? Caption.querySelector('h1')['innerText'] : [ undefined ])
        : [ undefined ],
        subtitle : Caption.querySelector('h2')
        ? (Caption.querySelector('h2')['innerText'] ? Caption.querySelector('h2')['innerText'] : [ undefined ])
        : [ undefined ],
        description : Caption.querySelector('p')
        ? (Caption.querySelector('p')['innerText'] ? Caption.querySelector('p')['innerText'] : [ undefined ])
        : [ undefined ],
    } : { };
    Attribute.push({
        title : Caption['title'],
        subtitle : Caption['subtitle'],
        description : Caption['description'],
        left : ((setContainerWidth - Picture['width'] * setContainerHeight / Picture['height']) / 2) + 'px',
        url : Picture['url'],
        width : (Picture['width'] * setContainerHeight / Picture['height'] > setContainerWidth ? setContainerWidth - REM * setContainerPadding : Picture['width'] * setContainerHeight / Picture['height']) + 'px',
    });
});
const Position = [];
var ContentWidth = 0;
Position.push({ left : 0 });
for (let i = 0; i < Attribute['length']; i++) {
    ContentWidth += OnlyNumber(Attribute[i]['width']);
    Position.push({ left : - 1 * ContentWidth + 'px' });
};
export const LightboxContainer = (Output = {}) => {
    const Proper = {
        current : 'current' in Output ? (Validator['Number'](Output['current']) ? Output['current'] : 0) : 0,
    };
    var CurrentPicture = Proper['current'];
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
            left : Attribute[CurrentPicture]['left'],
            width : Attribute[CurrentPicture]['width'],
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
            left : Position[CurrentPicture]['left'],
            width : ContentWidth + 'px',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content);
    const Picture = [];
    if (Attribute['length']) {
        for (let i = 0; i < Attribute['length']; i++) {
            Picture[i] = CreateElement();
            SetAttribute({ element : Picture[i], attribute : 'class', value : [
                    ...SetStyle['picture']['class'],
                ],
            });
            SetAttribute({ element : Picture[i], attribute : 'style', value : {
                    ...SetStyle['picture']['style'],
                    ...Attribute[i]['url'] ? { 'background-image' : 'url(\'' + Attribute[i]['url'] + '\')' } : { 'background-color' : 'white' },
                    width : Attribute[i]['width'],
                },
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]);
            if (Attribute[i]['title']) {
                const Title = CreateElement({ element : 'h1', textnode : Attribute[i]['title'] });
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
            if (Attribute[i]['subtitle']) {
                const Subtitle = CreateElement({ element : 'h2', textnode : Attribute[i]['subtitle'] });
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
            if (Attribute[i]['description']) {
                const Description = CreateElement({ element : 'p', textnode : Attribute[i]['description'] });
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
    const ButtonAttribute = [
        {
            function : () => {
                CurrentPicture = CurrentPicture < 1 ? CurrentPicture : CurrentPicture - 1;
                Transition(CurrentPicture);
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
                CurrentPicture = CurrentPicture > (Attribute['length'] - 2) ? CurrentPicture : CurrentPicture + 1;
                Transition(CurrentPicture);
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
                Selector['style']['opacity'] = 0;
                if (!TransitionRunning(Selector)) {
                    Selector['style']['display'] = 'none';
                    Selector['style']['zIndex'] = - 1;
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
    const ButtonArray = [];
    if (ButtonAttribute['length']) {
        for (let i = 0; i < ButtonAttribute['length']; i++) {
            ButtonArray[i] = CreateElement();
            SetAttribute({ element : ButtonArray[i], attribute : 'id', value : ButtonAttribute[i]['id'] });
            SetAttribute({ element : ButtonArray[i], attribute : 'class', value : [
                    ...SetStyle['button']['class'],
                    'd-flex',
                ]
            });
            SetAttribute({ element : ButtonArray[i], attribute : 'style', value : {
                    ...SetStyle['button']['style'],
                    ...ButtonAttribute[i]['style'],
                }
            });
            const ButtonIcon = CreateElement({ element : 'i' });
            SetAttribute({ element : ButtonIcon, attribute : 'class', value : [
                    ...SetStyle['ico']['class'],
                    ...ButtonAttribute[i]['ico']['class'],
                ]
            });
            SetAttribute({ element : ButtonIcon, attribute : 'style', value : {
                    ...SetStyle['ico']['style'],
                }
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(ButtonArray[i]).appendChild(ButtonIcon);
            [ 'mouseover', 'mouseenter' ].map(Index => {
                ButtonArray[i].addEventListener(Index, Event => {
                    ButtonArray[i]['classList'].add('bg-danger');
                    ButtonArray[i]['classList'].remove('bg-secondary');
                    Event.stopPropagation();
                    Event.preventDefault();
                });
            });
            [ 'mouseleave', 'mouseout' ].map(Index => {
                ButtonArray[i].addEventListener(Index, Event => {
                    ButtonArray[i]['classList'].add('bg-secondary');
                    ButtonArray[i]['classList'].remove('bg-danger');
                    Event.stopPropagation();
                    Event.preventDefault();
                });
            });
            ButtonArray[i].addEventListener('click', Event => {
                ButtonAttribute[i]['function']();
                Event.stopPropagation();
                Event.preventDefault();
            });
            if (ButtonAttribute[i]['key']['length']) {
                for (let j = 0; j < ButtonAttribute[i]['key']['length']; j++) {
                    document.addEventListener('keydown', Event => {
                        if (Event['key'] === ButtonAttribute[i]['key'][j]) {
                            ButtonArray[i]['classList'].add('bg-danger');
                            ButtonArray[i]['classList'].remove('bg-secondary');
                            ButtonAttribute[i]['function']();
                            Event.stopPropagation();
                            Event.preventDefault();
                        };
                    });
                    document.addEventListener('keyup', Event => {
                        if (Event['key'] === ButtonAttribute[i]['key'][j]) {
                            ButtonArray[i]['classList'].add('bg-secondary');
                            ButtonArray[i]['classList'].remove('bg-danger');
                            Event.stopPropagation();
                            Event.preventDefault();
                        };
                    });
                };
            };
        };
        Transition(CurrentPicture);
    };
};
export const Transition = (Output = 0) => {
    document.querySelector('#content')['style']['left'] = Position[Output]['left'];
    document.querySelector('#inner')['style']['height'] = Attribute[Output]['height'];
    document.querySelector('#inner')['style']['left'] = Attribute[Output]['left'];
    document.querySelector('#inner')['style']['top'] = Attribute[Output]['top'];
    document.querySelector('#inner')['style']['width'] = Attribute[Output]['width'];
    if (Output < 1) {
        document.querySelector('#btn-arrow-left')['style']['opacity'] = 0;
        document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(0)';
    };
    if (Output > (Attribute['length'] - 2)) {
        document.querySelector('#btn-arrow-right')['style']['opacity'] = 0;
        document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(0)';
    };
    if (!(Output < 1)) {
        document.querySelector('#btn-arrow-left')['style']['opacity'] = 1;
        document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(1)';
    };
    if (!(Output > (Attribute['length'] - 2))) {
        document.querySelector('#btn-arrow-right')['style']['opacity'] = 1;
        document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(1)';
    };
};