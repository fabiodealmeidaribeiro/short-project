import {
    CreateElement,
    SetAttribute,
} from './script-main.js';
import {
    SetElement,
} from './script-variables.js';
export const Lightbox = () => {
    var CurrentPicture = 0;
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
    document.querySelector('body').appendChild(Background).appendChild(Container);
    const Attribute = [];
    document.querySelectorAll('.photo-content').forEach((element, index) => {
        let Picture = element.querySelector('.photo-background') ? (element.querySelector('.photo-background').querySelector('.photo-picture') ? element.querySelector('.photo-background').querySelector('.photo-picture') : [ undefined ]) : [ undefined ];
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
        const Width = Picture['width'] * Container['offsetHeight'] / Picture['height'] > Container['offsetWidth']
        ? Container['offsetWidth'] : Picture['width'] * Container['offsetHeight'] / Picture['height'];
        Attribute.push({
            title : Caption['title'],
            description : Caption['description'],
            left : (Container['offsetWidth'] - Width) / 2 + 'px',
            url : Picture['url'],
            width : Width + 'px',
        });
    });
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
    document.querySelector('body').appendChild(Background).appendChild(Container).appendChild(Inner);
    const Navbar = CreateElement();
    SetAttribute({ element : Navbar, attribute : 'id', value : 'navbar' });
    SetAttribute({ element : Navbar, attribute : 'class', value : [
            'align-items-center',
            'd-lg-flex',
            'd-none',
            'justify-content-between',
            'position-fixed',
        ]
    });
    SetAttribute({ element : Navbar, attribute : 'style', value : {
            height : '.75rem',
            left : '50%',
            top : '50%',
            transform : 'translate(-50%, -50%)',
            width : 'calc(' + Attribute['length'] + ' * 3 * .75rem)',
            'z-index' : 1,
        }
    });
    document.querySelector('body').appendChild(Background).appendChild(Navbar);
    const NavbarArray = [];
    if (Attribute['length']) {
        for (let i = 0; i < Attribute['length']; i++) {
            NavbarArray[i] = CreateElement();
            SetAttribute({ element : NavbarArray[i], attribute : 'class', value : [
                    'bg-secondary',
                    'rounded-circle',
                ]
            });
            SetAttribute({ element : NavbarArray[i], attribute : 'style', value : {
                    height : '.75rem',
                    width : '.75rem',
                }
            });
            document.querySelector('body').appendChild(Background).appendChild(Container).appendChild(Navbar).appendChild(NavbarArray[i]);
            [ 'mouseover', 'mouseenter' ].map(index => {
                NavbarArray[i].addEventListener(index, () => {
                    NavbarArray[i]['style']['cursor'] = 'pointer';
                });
            });
            [ 'mouseleave', 'mouseout' ].map(index => {
                NavbarArray[i].addEventListener(index, () => {
                    NavbarArray[i]['style']['cursor'] = 'default';
                });
            });
            NavbarArray[i].addEventListener('click', () => {
                NavbarArray.forEach(element => {
                    element['classList'].remove('bg-danger');
                });
                NavbarArray[i]['classList'].add('bg-danger');
                Transistor(i);
            });
        };
    };
    const OnlyNumber = output => parseFloat(output.replace('px', '').replace('rem', ''));
    const Position = [];
    var ContentWidth = 0;
    Position.push({ left : 0 });
    for (let i = 0; i < Attribute['length']; i++) {
        ContentWidth += OnlyNumber(Attribute[i]['width']);
        Position.push({ left : - 1 * ContentWidth + 'px' });
    };
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
    document.querySelector('body').appendChild(Background).appendChild(Container).appendChild(Inner).appendChild(Content);
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
            document.querySelector('body').appendChild(Background).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]);
            const Title = CreateElement({ element : 'h1', textnode : Attribute[i]['title'] });
            SetAttribute({ element : Title, attribute : 'class', value : [
                    ...SetElement['title']['class'],
                ]
            });
            SetAttribute({ element : Title, attribute : 'style', value : {
                    ...SetElement['title']['style'],
                }
            });
            document.querySelector('body').appendChild(Background).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Title);
            const Description = CreateElement({ element : 'p', textnode : Attribute[i]['description'] });
            SetAttribute({ element : Description, attribute : 'class', value : [
                    ...SetElement['description']['class'],
                ]
            });
            SetAttribute({ element : Description, attribute : 'style', value : {
                    ...SetElement['description']['style'],
                }
            });
            document.querySelector('body').appendChild(Background).appendChild(Container).appendChild(Inner).appendChild(Content).appendChild(Picture[i]).appendChild(Description);
        };
    };
    const Transistor = (output = 0) => {
        document.querySelector('#content')['style']['left'] = Position[output]['left'];
        document.querySelector('#inner')['style']['height'] = Attribute[output]['height'];
        document.querySelector('#inner')['style']['left'] = Attribute[output]['left'];
        document.querySelector('#inner')['style']['top'] = Attribute[output]['top'];
        document.querySelector('#inner')['style']['width'] = Attribute[output]['width'];
        if (output < 1) {
            document.querySelector('#btn-arrow-left')['style']['opacity'] = 0;
            document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(0)';
        };
        if (output > (Attribute['length'] - 2)) {
            document.querySelector('#btn-arrow-right')['style']['opacity'] = 0;
            document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(0)';
        };
        if (!(output < 1)) {
            document.querySelector('#btn-arrow-left')['style']['opacity'] = 1;
            document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(1)';
        };
        if (!(output > (Attribute['length'] - 2))) {
            document.querySelector('#btn-arrow-right')['style']['opacity'] = 1;
            document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(1)';
        };
    };
    const ButtonAttribute = [
        {
            function : () => {
                CurrentPicture = CurrentPicture < 1 ? CurrentPicture : CurrentPicture - 1;
                Transistor(CurrentPicture);
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
                left : 'calc(' + SetElement['button']['style']['width'] + ' + ' + SetElement['button']['margin'] + ')',
            },
        },
        {
            function : () => {
                CurrentPicture = CurrentPicture > (Attribute['length'] - 2) ? CurrentPicture : CurrentPicture + 1;
                Transistor(CurrentPicture);
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
                right : 'calc(' + SetElement['button']['style']['width'] + ' + ' + SetElement['button']['margin'] + ')',
            },
        },
        {
            function : () => {
                document.querySelector('#background')['style']['opacity'] = 0;
                document.querySelector('#background').addEventListener('transitionend', () => {
                    document.querySelector('#background')['style']['display'] = 'none';
                    document.querySelector('#background')['style']['zIndex'] = - 1;
                });
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
                bottom : 'calc(' + SetElement['button']['style']['width'] + ' + ' + SetElement['button']['margin'] + ')',
                left : '50%',
                transform : 'translate(-50%, 0)',
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
            document.querySelector('body').appendChild(Background).appendChild(Container).appendChild(ButtonArray[i]).appendChild(ButtonIcon);
            [ 'mouseover', 'mouseenter' ].map(index => {
                ButtonArray[i].addEventListener(index, () => {
                    ButtonArray[i]['classList'].add('bg-danger');
                    ButtonArray[i]['classList'].remove('bg-secondary');
                    ButtonArray[i]['style']['cursor'] = 'pointer';
                });
            });
            [ 'mouseleave', 'mouseout' ].map(index => {
                ButtonArray[i].addEventListener(index, () => {
                    ButtonArray[i]['classList'].add('bg-secondary');
                    ButtonArray[i]['classList'].remove('bg-danger');
                    ButtonArray[i]['style']['cursor'] = 'default';
                });
            });
            ButtonArray[i].addEventListener('click', () => {
                ButtonAttribute[i]['function']();
            });
            switch (ButtonAttribute[i]['id']) {
                case 'btn-arrow-left' :
                    document.addEventListener('keydown', (event) => {
                        if (event['key'] === 'ArrowLeft') {
                            ButtonArray[i]['classList'].add('bg-danger');
                            ButtonArray[i]['classList'].remove('bg-secondary');
                            ButtonAttribute[i]['function']();
                        };
                    });
                break;
                case 'btn-arrow-right' :
                    document.addEventListener('keydown', (event) => {
                        if (event['key'] === 'ArrowRight') {
                            ButtonArray[i]['classList'].add('bg-danger');
                            ButtonArray[i]['classList'].remove('bg-secondary');
                            ButtonAttribute[i]['function']();
                        };
                    });
                break;
                case 'btn-close' :
                    document.addEventListener('keydown', (event) => {
                        if (event['key'] === 'ArrowDown') {
                            ButtonAttribute[i]['function']();
                        };
                    });
                break;
            };
            document.addEventListener('keyup', () => {
                ButtonArray[i]['classList'].add('bg-secondary');
                ButtonArray[i]['classList'].remove('bg-danger');
            });
        };
        Transistor(CurrentPicture);
    };
};