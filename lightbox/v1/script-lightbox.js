import {
    CreateElement,
    OnlyNumber,
    SetAttribute,
    TransitionRunning,
    Validator,
} from './script-main.js';
import {
    SetElement,
} from './script-variables.js';
const setBorderMargin = OnlyNumber(SetElement['border']['margin']);
const setContainerMargin = OnlyNumber(SetElement['container']['margin']);
const setContainerHeight = window['innerHeight'] - (setBorderMargin + setContainerMargin) * 2;
const setContainerWidth = window['innerWidth'] - (setBorderMargin + setContainerMargin) * 2;
const REM = parseFloat(getComputedStyle(document['documentElement'])['fontSize']);
const setPicturePadding = OnlyNumber(SetElement['picture']['style']['padding']);
const setContainerPadding = setBorderMargin + setContainerMargin + setPicturePadding;
const Attribute = [];
document.querySelectorAll('.photo-content').forEach((element, index) => {
    let Picture = element.querySelector('.photo-background')
    ? (element.querySelector('.photo-background').querySelector('.photo-picture') ? element.querySelector('.photo-background').querySelector('.photo-picture') : [ undefined ])
    : [ undefined ];
    Picture = Picture ? {
        height : Picture.getAttribute('data-height') ? Picture.getAttribute('data-height') : [ undefined ],
        id : (index).toString(),
        index : Picture.getAttribute('data-index') ? Picture.getAttribute('data-index') : [ undefined ],
        url : Picture.getAttribute('data-url') ? Picture.getAttribute('data-url') : [ undefined ],
        width : Picture.getAttribute('data-width') ? Picture.getAttribute('data-width') : [ undefined ],
    } : { };
    let Caption = element.querySelector('.photo-caption') ? element.querySelector('.photo-caption') : [ undefined ];
    Caption = Caption ? {
        title : Caption.querySelector('h1') ? Caption.querySelector('h1')['innerText'] : [ undefined ],
        subtitle : Caption.querySelector('h2') ? Caption.querySelector('h2')['innerText'] : [ undefined ],
        description : Caption.querySelector('p') ? Caption.querySelector('p')['innerText'] : [ undefined ],
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
export const LightboxContainer = (output = {}) => {
    const Proper = {
        current : 'current' in output ? (Validator['Number'](output['current']) ? output['current'] : 0) : 0,
    };
    var CurrentPicture = Proper['current'];
    const Background = CreateElement();
    SetAttribute({ element : Background, attribute : 'id', value : 'background' });
    SetAttribute({ element : Background, attribute : 'class', value : [
            ...SetElement['background']['class'],
        ],
    });
    SetAttribute({ element : Background, attribute : 'style', value : {
            ...SetElement['background']['style'],
        },
    });
    document.querySelector('body').appendChild(Background);
    const Border = CreateElement();
    SetAttribute({ element : Border, attribute : 'id', value : 'border' });
    SetAttribute({ element : Border, attribute : 'class', value : [
            ...SetElement['border']['class'],
        ],
    });
    SetAttribute({ element : Border, attribute : 'style', value : {
            ...SetElement['border']['style'],
            height : 'calc(' + '100%' + ' - ' + SetElement['border']['margin'] + ' * ' + 2 + ')',
            width : 'calc(' + '100%' + ' - ' + SetElement['border']['margin'] + ' * ' + 2 + ')',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border);
    const Container = CreateElement();
    SetAttribute({ element : Container, attribute : 'id', value : 'container' });
    SetAttribute({ element : Container, attribute : 'class', value : [
            ...SetElement['container']['class'],
        ],
    });
    SetAttribute({ element : Container, attribute : 'style', value : {
            ...SetElement['container']['style'],
            height : 'calc(' + '100%' + ' - ' + SetElement['container']['margin'] + ' * ' + 2 + ')',
            width : 'calc(' + '100%' + ' - ' + SetElement['container']['margin'] + ' * ' + 2 + ')',
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container);
    const Inner = CreateElement();
    SetAttribute({ element : Inner, attribute : 'id', value : 'inner' });
    SetAttribute({ element : Inner, attribute : 'class', value : [
            ...SetElement['inner']['class'],
        ],
    });
    SetAttribute({ element : Inner, attribute : 'style', value : {
            ...SetElement['inner']['style'],
            left : Attribute[CurrentPicture]['left'],
            width : Attribute[CurrentPicture]['width'],
        },
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner);
    const Content = CreateElement();
    SetAttribute({ element : Content, attribute : 'id', value : 'content' });
    SetAttribute({ element : Content, attribute : 'class', value : [
            ...SetElement['content']['class'],
        ],
    });
    SetAttribute({ element : Content, attribute : 'style', value : {
            ...SetElement['content']['style'],
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
                    ...SetElement['picture']['class'],
                ],
            });
            SetAttribute({ element : Picture[i], attribute : 'style', value : {
                    ...SetElement['picture']['style'],
                    'background-image' : 'url(\'' + Attribute[i]['url'] + '\')',
                    width : Attribute[i]['width'],
                },
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]);
            const Title = CreateElement({ element : 'h1', textnode : Attribute[i]['title'] });
            SetAttribute({ element : Title, attribute : 'class', value : [
                    ...SetElement['title']['class'],
                ],
            });
            SetAttribute({ element : Title, attribute : 'style', value : {
                    ...SetElement['title']['style'],
                },
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Title);
            const Subtitle = CreateElement({ element : 'h2', textnode : Attribute[i]['subtitle'] });
            SetAttribute({ element : Subtitle, attribute : 'class', value : [
                    ...SetElement['subtitle']['class'],
                ],
            });
            SetAttribute({ element : Subtitle, attribute : 'style', value : {
                    ...SetElement['subtitle']['style'],
                },
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Subtitle);
            const Description = CreateElement({ element : 'p', textnode : Attribute[i]['description'] });
            SetAttribute({ element : Description, attribute : 'class', value : [
                    ...SetElement['description']['class'],
                ],
            });
            SetAttribute({ element : Description, attribute : 'style', value : {
                    ...SetElement['description']['style'],
                },
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Description);
        };
    };
    const ButtonAttri = [
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
            id : 'btnArrowLeft',
            style : {
                left : 'calc(' + SetElement['button']['margin'] + ' * ' + 3 + ')',
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
            id : 'btnArrowRight',
            style : {
                right : 'calc(' + SetElement['button']['margin'] + ' * ' + 3 + ')',
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
            id : 'btnArrowDown',
            style : {
                bottom : 'calc(' + SetElement['button']['margin'] + ' * ' + 3 + ')',
                left : '50%',
                transform : 'translate(-50%, 0)',
                cursor : 'pointer',
            },
        },
    ];
    const ButtonArray = [];
    if (ButtonAttri['length']) {
        for (let i = 0; i < ButtonAttri['length']; i++) {
            ButtonArray[i] = CreateElement();
            SetAttribute({ element : ButtonArray[i], attribute : 'id', value : ButtonAttri[i]['id'] });
            SetAttribute({ element : ButtonArray[i], attribute : 'class', value : [
                    ...SetElement['button']['class'],
                    'd-flex',
                ]
            });
            SetAttribute({ element : ButtonArray[i], attribute : 'style', value : {
                    ...SetElement['button']['style'],
                    ...ButtonAttri[i]['style'],
                }
            });
            const ButtonIcon = CreateElement({ element : 'i' });
            SetAttribute({ element : ButtonIcon, attribute : 'class', value : [
                    ...SetElement['ico']['class'],
                    ...ButtonAttri[i]['ico']['class'],
                ]
            });
            SetAttribute({ element : ButtonIcon, attribute : 'style', value : {
                    ...SetElement['ico']['style'],
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
                ButtonAttri[i]['function']();
                Event.stopPropagation();
                Event.preventDefault();
            });
            document.addEventListener('keydown', Event => {
                if (ButtonAttri[i]['id'].replace('btn', '') === Event['key']) {
                    ButtonArray[i]['classList'].add('bg-danger');
                    ButtonArray[i]['classList'].remove('bg-secondary');
                    ButtonAttri[i]['function']();
                    Event.stopPropagation();
                    Event.preventDefault();
                };
            });
            document.addEventListener('keyup', Event => {
                if (ButtonAttri[i]['id'].replace('btn', '') === Event['key']) {
                    ButtonArray[i]['classList'].add('bg-secondary');
                    ButtonArray[i]['classList'].remove('bg-danger');
                    Event.stopPropagation();
                    Event.preventDefault();
                };
            });
        };
        Transition(CurrentPicture);
    };
};

export const Transition = (output = 0) => {
    document.querySelector('#content')['style']['left'] = Position[output]['left'];
    document.querySelector('#inner')['style']['height'] = Attribute[output]['height'];
    document.querySelector('#inner')['style']['left'] = Attribute[output]['left'];
    document.querySelector('#inner')['style']['top'] = Attribute[output]['top'];
    document.querySelector('#inner')['style']['width'] = Attribute[output]['width'];
    if (output < 1) {
        document.querySelector('#btnArrowLeft')['style']['opacity'] = 0;
        document.querySelector('#btnArrowLeft')['style']['transform'] = 'scale(0)';
    };
    if (output > (Attribute['length'] - 2)) {
        document.querySelector('#btnArrowRight')['style']['opacity'] = 0;
        document.querySelector('#btnArrowRight')['style']['transform'] = 'scale(0)';
    };
    if (!(output < 1)) {
        document.querySelector('#btnArrowLeft')['style']['opacity'] = 1;
        document.querySelector('#btnArrowLeft')['style']['transform'] = 'scale(1)';
    };
    if (!(output > (Attribute['length'] - 2))) {
        document.querySelector('#btnArrowRight')['style']['opacity'] = 1;
        document.querySelector('#btnArrowRight')['style']['transform'] = 'scale(1)';
    };
};