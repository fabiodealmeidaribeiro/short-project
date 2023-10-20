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
document.addEventListener("DOMContentLoaded", () => {
    const Transform = {
        highlight : Element => {
            if (Element) {
                if (Element.querySelector('.photo-filter')) {
                    Element.querySelector('.photo-filter')['style']['opacity'] = 'calc(1 / 100 * 75)';
                };
                if (Element.querySelector('.photo-caption')) {
                    Element.querySelector('.photo-caption')['style']['opacity'] = 1;
                };
            };
        },
        downlight : Element => {
            if (Element) {
                if (Element.querySelector('.photo-filter')) {
                    Element.querySelector('.photo-filter')['style']['opacity'] = 0;
                };
                if (Element.querySelector('.photo-caption')) {
                    Element.querySelector('.photo-caption')['style']['opacity'] = 0;
                };
            };
        },
    };
    const LightboxContainerShow = (output = 0) => {
        // document.querySelector('#content')['style']['left'] = Attribute[output]['left'];
        const Selector = document.querySelector('#background');
        Selector['style']['display'] = 'flex';
        Selector['style']['zIndex'] = 9999;
        if (!TransitionRunning(Selector))
            Selector['style']['opacity'] = 1;
    };
    SocialNetwork();
    LightboxContainer({ current : 1 });
    SetContentBody({ id : '.photo-content' });
    const Content = document.querySelectorAll('.photo-content');
    const Array = (output = 0) => {
        return [
            {
                key : 'ArrowLeft',
                sibling : 'previousElementSibling',
                number : output < 1 ? 0 : - 1,
            },
            {
                key : 'ArrowRight',
                sibling : 'nextElementSibling',
                number : output > Content['length'] - 2 ? 0 : + 1,
            },
        ];
    };
    var Number = 0;
    Transform['highlight'](Content[Number]);
    const KeydownHighlight = (Event, Param) => {
        const Index = Param['index'];
        if (Event['key'] === Array()[Index]['key']) {
            document['body']['style']['pointerEvents'] = 'none';
            const Current = Content[Number];
            const Highlight = Content[Number][Array()[Index]['sibling']];
            if (Highlight) {
                Transform['downlight'](Current);
                Transform['highlight'](Highlight);
                Highlight.scrollIntoView({ behavior : 'smooth' });
            };
            Number = Number + Array(Number)[Index]['number'];
            Event.stopPropagation();
            Event.preventDefault();
        };
    };
    for (let i = 0; i < Array()['length']; i++) {
        document.addEventListener('keydown', KeydownHighlight, {
            index : i
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
                Event.stopPropagation();
                Event.preventDefault();
            });
        });
        Element.addEventListener('click', Event => {
            document.removeEventListener('keydown', KeydownHighlight);
            LightboxContainerShow(i);
            Event.stopPropagation();
            Event.preventDefault();
        });
        document.addEventListener('keydown', Event => {
            if (Event['key'] === 'Enter') {
                document['body']['style']['pointerEvents'] = 'none';
                document.removeEventListener('keydown', KeydownHighlight);
                LightboxContainerShow(i);
                Event.stopPropagation();
                Event.preventDefault();
            };
        });
    });
    document.addEventListener('mousemove', Event => {
        document['body']['style']['pointerEvents'] = 'auto';
        Event.stopPropagation();
        Event.preventDefault();
    });
});
window.addEventListener('resize', () => {
    SetContentBody({ id : '.photo-content' });
});