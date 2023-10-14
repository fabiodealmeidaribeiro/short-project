import {
    LightboxContainer,
} from './script-lightbox-container.js';
import {
    SetAttribute,
    TransitionRunning,
} from './script-main.js';
import {
    SocialNetwork,
} from './script-network.js';
import {
    SetStyle,
} from './script-variables.js';
const SetContentBody = (output = {}) => {
    const Array = [ 1, 1.33, 1.85, 2.35 ];
    const Proper = {
        id : 'id' in output ? (output['id'] ? output['id'] : '') : '',
        height : 1,
        width : 'width' in output ? (output['width'] ? output['width'] : Array[0]) : Array[0],
    };
    document.querySelectorAll(Proper['id']).forEach(Element => {
        if (Element) {
            Element['style']['height'] = Math.floor(Proper['height'] * Element['clientWidth'] / Proper['width']) + 'px';
            const Caption = Element.querySelector('.photo-caption');
            if (Caption) {
                const Title = Caption.querySelector('h1');
                if (Title) {
                    SetAttribute({ element : Title, attribute : 'class', value : [
                            ...SetStyle['title']['class'],
                        ],
                    });
                    SetAttribute({ element : Title, attribute : 'style', value : {
                            ...SetStyle['title']['style'],
                        },
                    });
                };
                const Subtitle = Caption.querySelector('h2');
                if (Subtitle) {
                    SetAttribute({ element : Subtitle, attribute : 'class', value : [
                            ...SetStyle['subtitle']['class'],
                        ],
                    });
                    SetAttribute({ element : Subtitle, attribute : 'style', value : {
                            ...SetStyle['subtitle']['style'],
                        },
                    });
                };
                const Description = Caption.querySelector('p');
                if (Description) {
                    SetAttribute({ element : Description, attribute : 'class', value : [
                            ...SetStyle['description']['class'],
                        ],
                    });
                    SetAttribute({ element : Description, attribute : 'style', value : {
                            ...SetStyle['description']['style'],
                        },
                    });
                };
            };
        };
    });
};
const Background = () => {
    const Selector = document.querySelector('#background');
    Selector['style']['display'] = 'flex';
    Selector['style']['zIndex'] = 9999;
    if (!TransitionRunning(Selector))
        Selector['style']['opacity'] = 1;
};
const Transform = {
    highlight : (Element) => {
        if (Element.querySelector('.photo-filter'))
            Element.querySelector('.photo-filter')['style']['opacity'] = 'calc(1 / 100 * 75)';
        if (Element.querySelector('.photo-caption'))
            Element.querySelector('.photo-caption')['style']['opacity'] = 1;
    },
    downlight : (Element) => {
        if (Element.querySelector('.photo-filter'))
            Element.querySelector('.photo-filter')['style']['opacity'] = 0;
        if (Element.querySelector('.photo-caption'))
            Element.querySelector('.photo-caption')['style']['opacity'] = 0;
    },
};
const Content = document.querySelectorAll('.photo-content');
document.addEventListener("DOMContentLoaded", () => {
    SocialNetwork();
    LightboxContainer({ current : 1 });
    SetContentBody({ id : '.photo-content' });
    var Number = 0;
    Transform['highlight'](Content[Number]);
    Content[Number].focus();
    document.addEventListener('keydown', Event => {
        if (Event['key'] === 'ArrowLeft') {
            document['body']['style']['pointerEvents'] = 'none';
            const Current = Content[Number];
            const Prev = Current['previousElementSibling'];
            Transform['downlight'](Current);
            Transform['highlight'](Prev);
            Prev.focus();
            Number--;
            Event.stopPropagation();
            Event.preventDefault();
        };
    });
    document.addEventListener('keydown', Event => {
        if (Event['key'] === 'ArrowRight') {
            document['body']['style']['pointerEvents'] = 'none';
            const Current = Content[Number];
            const Next = Current['nextElementSibling'];
            Transform['downlight'](Current);
            Transform['highlight'](Next);
            Next.focus();
            Number++;
            Event.stopPropagation();
            Event.preventDefault();
        };
    });
    const ArrayKey = [ 'ArrowLeft', 'ArrowRight' ];
    for (let i = 0; i < ArrayKey['length']; i++) {
        document.addEventListener('keyup', Event => {
            if (Event['key'] === ArrayKey[i]) {
                document['body']['style']['pointerEvents'] = 'auto';
                Event.stopPropagation();
                Event.preventDefault();
            };
        });
    };
    Content.forEach((Element, i) => {
        [ 'mouseleave', 'mouseout' ].map(Index => {
            Element.addEventListener(Index, Event => {
                Element['style']['cursor'] = 'default';
                Event.stopPropagation();
                Event.preventDefault();
            });
        });
        [ 'mouseover', 'mouseenter' ].map(Index => {
            Element.addEventListener(Index, Event => {
                Element['style']['cursor'] = 'pointer';
                Content.forEach(Content => Transform['downlight'](Content));
                Transform['highlight'](Element);
                Element.focus();
                Number = i;
                Event.stopPropagation();
                Event.preventDefault();
            });
        });
        Element.addEventListener('click', Event => {
            Background();
            Event.stopPropagation();
            Event.preventDefault();
        });Element.addEventListener('focus', Event => {
            const body = document.querySelector('body');
            const coordenadas = Element.getBoundibody();
            const posicao = coordenadas.top - body.scrollTop;
            body.scrollTop = posicao;
        });
        
    });
    document.addEventListener('keydown', Event => {
        if (Event['key'] === 'Enter') {
            Background();
            Event.stopPropagation();
            Event.preventDefault();
        };
    });





});


window.addEventListener('resize', () => {
    SetContentBody({ id : '.photo-content' });
});