import {
    CreateElement,
    OnlyNumber,
    SetAttribute,
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
        description : Caption.querySelector('p') ? Caption.querySelector('p')['innerText'] : [ undefined ],
    } : { };
    Attribute.push({
        title : Caption['title'],
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
        ]
    });
    SetAttribute({ element : Background, attribute : 'style', value : {
            ...SetElement['background']['style'],
        }
    });
    document.querySelector('body').appendChild(Background);
    const Border = CreateElement();
    SetAttribute({ element : Border, attribute : 'id', value : 'border' });
    SetAttribute({ element : Border, attribute : 'class', value : [
            ...SetElement['border']['class'],
        ]
    });
    SetAttribute({ element : Border, attribute : 'style', value : {
            ...SetElement['border']['style'],
            height : 'calc(' + '100%' + ' - ' + SetElement['border']['margin'] + ' * ' + 2 + ')',
            width : 'calc(' + '100%' + ' - ' + SetElement['border']['margin'] + ' * ' + 2 + ')',
        }
    });
    document.querySelector('body').appendChild(Background).appendChild(Border);
    const Container = CreateElement();
    SetAttribute({ element : Container, attribute : 'id', value : 'container' });
    SetAttribute({ element : Container, attribute : 'class', value : [
            ...SetElement['container']['class'],
        ]
    });
    SetAttribute({ element : Container, attribute : 'style', value : {
            ...SetElement['container']['style'],
            height : 'calc(' + '100%' + ' - ' + SetElement['container']['margin'] + ' * ' + 2 + ')',
            width : 'calc(' + '100%' + ' - ' + SetElement['container']['margin'] + ' * ' + 2 + ')',
        }
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container);
    const Inner = CreateElement();
    SetAttribute({ element : Inner, attribute : 'id', value : 'inner' });
    SetAttribute({ element : Inner, attribute : 'class', value : [
            ...SetElement['inner']['class'],
        ]
    });
    SetAttribute({ element : Inner, attribute : 'style', value : {
            ...SetElement['inner']['style'],
            left : Attribute[CurrentPicture]['left'],
            width : Attribute[CurrentPicture]['width'],
        }
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner);
    const Content = CreateElement();
    SetAttribute({ element : Content, attribute : 'id', value : 'content' });
    SetAttribute({ element : Content, attribute : 'class', value : [
            ...SetElement['content']['class'],
        ]
    });
    SetAttribute({ element : Content, attribute : 'style', value : {
            ...SetElement['content']['style'],
            left : Position[CurrentPicture]['left'],
            width : ContentWidth + 'px',
        }
    });
    document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content);
    const Picture = [];
    if (Attribute['length']) {
        for (let i = 0; i < Attribute['length']; i++) {
            Picture[i] = CreateElement();
            SetAttribute({ element : Picture[i], attribute : 'class', value : [
                    ...SetElement['picture']['class'],
                ]
            });
            SetAttribute({ element : Picture[i], attribute : 'style', value : {
                    ...SetElement['picture']['style'],
                    'background-image' : 'url(\'' + Attribute[i]['url'] + '\')',
                    width : Attribute[i]['width'],
                }
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]);
            const Title = CreateElement({ element : 'h1', textnode : Attribute[i]['title'] });
            SetAttribute({ element : Title, attribute : 'class', value : [
                    ...SetElement['title']['class'],
                ]
            });
            SetAttribute({ element : Title, attribute : 'style', value : {
                    ...SetElement['title']['style'],
                }
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Title);
            const Description = CreateElement({ element : 'p', textnode : Attribute[i]['description'] });
            SetAttribute({ element : Description, attribute : 'class', value : [
                    ...SetElement['description']['class'],
                ]
            });
            SetAttribute({ element : Description, attribute : 'style', value : {
                    ...SetElement['description']['style'],
                }
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Description);
        };
    };
    const ButtonAttribute = [
        {
            function : () => {
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
            style : {
                left : 'calc(' + SetElement['button']['margin'] + ' * ' + 3 + ')',
                cursor : 'pointer',
            },
        },
        {
            function : () => {
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
            style : {
                right : 'calc(' + SetElement['button']['margin'] + ' * ' + 3 + ')',
                cursor : 'pointer',
            },
        },
        {
            function : () => {
            },
            class : [
            ],
            ico : {
                class : [
                    'bi',
                    'bi-x-circle-fill',
                ],
            },
            id : 'btn-close',
            style : {
                bottom : 'calc(' + SetElement['button']['margin'] + ' * ' + 3 + ')',
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
                    ...SetElement['button']['class'],
                    'd-flex',
                ]
            });
            SetAttribute({ element : ButtonArray[i], attribute : 'style', value : {
                    ...SetElement['button']['style'],
                    ...ButtonAttribute[i]['style'],
                }
            });
            const ButtonIcon = CreateElement({ element : 'i' });
            SetAttribute({ element : ButtonIcon, attribute : 'class', value : [
                    ...SetElement['ico']['class'],
                    ...ButtonAttribute[i]['ico']['class'],
                ]
            });
            SetAttribute({ element : ButtonIcon, attribute : 'style', value : {
                    ...SetElement['ico']['style'],
                }
            });
            document.querySelector('body').appendChild(Background).appendChild(Border).appendChild(Container).appendChild(ButtonArray[i]).appendChild(ButtonIcon);
            [ 'mouseover', 'mouseenter' ].map(index => {
                ButtonArray[i].addEventListener(index, event => {
                    ButtonArray[i]['classList'].add('bg-danger');
                    ButtonArray[i]['classList'].remove('bg-secondary');
                    event.stopPropagation();
                    event.preventDefault();
                });
            });
            [ 'mouseleave', 'mouseout' ].map(index => {
                ButtonArray[i].addEventListener(index, event => {
                    ButtonArray[i]['classList'].add('bg-secondary');
                    ButtonArray[i]['classList'].remove('bg-danger');
                    event.stopPropagation();
                    event.preventDefault();
                });
            });
        };
        document.querySelector('#btn-close').addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            const Selector = document.querySelector('#background');
            Selector['style']['opacity'] = 0;
            Selector.addEventListener('transitionend', event => {
                Selector['style']['display'] = 'none';
                Selector['style']['zIndex'] = - 1;
                event.preventDefault();
                event.stopPropagation();
            });
        });
        document.querySelector('#btn-arrow-right').addEventListener('click', event => {
            CurrentPicture = CurrentPicture > (Attribute['length'] - 2) ? CurrentPicture : CurrentPicture + 1;
            document.querySelector('#content')['style']['left'] = Position[CurrentPicture]['left'];
            document.querySelector('#inner')['style']['height'] = Attribute[CurrentPicture]['height'];
            document.querySelector('#inner')['style']['left'] = Attribute[CurrentPicture]['left'];
            document.querySelector('#inner')['style']['top'] = Attribute[CurrentPicture]['top'];
            document.querySelector('#inner')['style']['width'] = Attribute[CurrentPicture]['width'];
            if (CurrentPicture < 1) {
                document.querySelector('#btn-arrow-left')['style']['opacity'] = 0;
                document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(0)';
            };
            if (CurrentPicture > (Attribute['length'] - 2)) {
                document.querySelector('#btn-arrow-right')['style']['opacity'] = 0;
                document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(0)';
            };
            if (!(CurrentPicture < 1)) {
                document.querySelector('#btn-arrow-left')['style']['opacity'] = 1;
                document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(1)';
            };
            if (!(CurrentPicture > (Attribute['length'] - 2))) {
                document.querySelector('#btn-arrow-right')['style']['opacity'] = 1;
                document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(1)';
            };
            event.preventDefault();
            event.stopPropagation();
        });
        document.querySelector('#btn-arrow-left').addEventListener('click', event => {
            CurrentPicture = CurrentPicture < 1 ? CurrentPicture : CurrentPicture - 1;
            document.querySelector('#content')['style']['left'] = Position[CurrentPicture]['left'];
            document.querySelector('#inner')['style']['height'] = Attribute[CurrentPicture]['height'];
            document.querySelector('#inner')['style']['left'] = Attribute[CurrentPicture]['left'];
            document.querySelector('#inner')['style']['top'] = Attribute[CurrentPicture]['top'];
            document.querySelector('#inner')['style']['width'] = Attribute[CurrentPicture]['width'];
            if (CurrentPicture < 1) {
                document.querySelector('#btn-arrow-left')['style']['opacity'] = 0;
                document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(0)';
            };
            if (CurrentPicture > (Attribute['length'] - 2)) {
                document.querySelector('#btn-arrow-right')['style']['opacity'] = 0;
                document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(0)';
            };
            if (!(CurrentPicture < 1)) {
                document.querySelector('#btn-arrow-left')['style']['opacity'] = 1;
                document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(1)';
            };
            if (!(CurrentPicture > (Attribute['length'] - 2))) {
                document.querySelector('#btn-arrow-right')['style']['opacity'] = 1;
                document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(1)';
            };
            event.preventDefault();
            event.stopPropagation();
        });
        document.querySelector('#content')['style']['left'] = Position[CurrentPicture]['left'];
        document.querySelector('#inner')['style']['height'] = Attribute[CurrentPicture]['height'];
        document.querySelector('#inner')['style']['left'] = Attribute[CurrentPicture]['left'];
        document.querySelector('#inner')['style']['top'] = Attribute[CurrentPicture]['top'];
        document.querySelector('#inner')['style']['width'] = Attribute[CurrentPicture]['width'];
        if (CurrentPicture < 1) {
            document.querySelector('#btn-arrow-left')['style']['opacity'] = 0;
            document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(0)';
        };
        if (CurrentPicture > (Attribute['length'] - 2)) {
            document.querySelector('#btn-arrow-right')['style']['opacity'] = 0;
            document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(0)';
        };
        if (!(CurrentPicture < 1)) {
            document.querySelector('#btn-arrow-left')['style']['opacity'] = 1;
            document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(1)';
        };
        if (!(CurrentPicture > (Attribute['length'] - 2))) {
            document.querySelector('#btn-arrow-right')['style']['opacity'] = 1;
            document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(1)';
        };
    };
};