import {
    LightboxContainer,
} from './script-lightbox-container.js';
import {
    SetAttribute,
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
const Elements = document.querySelectorAll('.photo-content');
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
document.addEventListener("DOMContentLoaded", () => {
    SetContentBody({ id : '.photo-content' });
    SocialNetwork();
    LightboxContainer({ current : 1 });
    let Number = 0;
    Transform['highlight'](Elements[Number]);
    document.addEventListener('keydown', Event => {
        if (Event['key'] === 'ArrowLeft') {
            document['body']['style']['pointerEvents'] = 'none';
            const CurrentContent = Elements[Number];
            const PrevContent = CurrentContent.previousElementSibling;
            if (CurrentContent) Transform['downlight'](CurrentContent);
            if (PrevContent) Transform['highlight'](PrevContent);
            Number--;
            Event.stopPropagation();
            Event.preventDefault();
        };
    });
    document.addEventListener('keydown', Event => {
        if (Event['key'] === 'ArrowRight') {
            document['body']['style']['pointerEvents'] = 'none';
            const CurrentContent = Elements[Number];
            const NextContent = CurrentContent.nextElementSibling;
            if (CurrentContent) Transform['downlight'](CurrentContent);
            if (NextContent) Transform['highlight'](NextContent);
            Number++;
            Event.stopPropagation();
            Event.preventDefault();
        };
    });
    document.addEventListener('keyup', Event => {
        if (Event['key'] === 'ArrowLeft') {
            document['body']['style']['pointerEvents'] = 'auto';
            Event.stopPropagation();
            Event.preventDefault();
        };
    });
    document.addEventListener('keyup', Event => {
        if (Event['key'] === 'ArrowRight') {
            document['body']['style']['pointerEvents'] = 'auto';
            Event.stopPropagation();
            Event.preventDefault();
        };
    });
    Elements.forEach(Element => {
        if (Element) {
            [ 'mouseover', 'mouseenter' ].map(Index => {
                Element.addEventListener(Index, Event => {
                    Transform['highlight'](Element);
                    Element['style']['cursor'] = 'pointer';
                    Event.stopPropagation();
                    Event.preventDefault();
                });
            });
            [ 'mouseleave', 'mouseout' ].map(Index => {
                Element.addEventListener(Index, Event => {
                    Transform['downlight'](Element);
                    Element['style']['cursor'] = 'default';
                    Event.stopPropagation();
                    Event.preventDefault();
                });
            });
            Element.addEventListener('click', Event => {
                document.querySelector('#background')['style']['display'] = 'flex';
                document.querySelector('#background')['style']['zIndex'] = 9999;
                document.querySelector('#background')['style']['opacity'] = 1;
                Event.stopPropagation();
                Event.preventDefault();
            });
        };
    });
});
window.addEventListener('resize', () => {
    SetContentBody({ id : '.photo-content' });
});