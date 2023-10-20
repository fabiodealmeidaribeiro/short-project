import {
    LightboxBuilder,
    LightboxTransition,
    LightboxShow,
} from './script-container.js';
import {
    SetContentBody,
} from './script-function.js';
// import {
//     NavigationBuilder,
// } from './script-navigation.js';
import {
    SocialNetwork,
} from './script-network.js';
import {
    Transform,
} from './script-variables.js';
export var CurrentPicture = 0;
document.addEventListener("DOMContentLoaded", () => {
    SocialNetwork();
    LightboxBuilder();
    // NavigationBuilder();
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
    for (let i = 0; i < Array()['length']; i++) {
        document.addEventListener('keydown', Event => {
            if (Event['key'] === Array()[i]['key']) {
                document['body']['style']['pointerEvents'] = 'none';
                const Current = Content[Number];
                const Highlight = Content[Number][Array()[i]['sibling']];
                if (Highlight) {
                    Transform['downlight'](Current);
                    Transform['highlight'](Highlight);
                    Highlight.scrollIntoView({ behavior : 'smooth' });
                };
                Number = Number + Array(Number)[i]['number'];
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
                Event.stopPropagation();
                Event.preventDefault();
            });
        });
        Element.addEventListener('click', Event => {
            LightboxTransition({ current : i });
            LightboxShow();
            Event.stopPropagation();
            Event.preventDefault();
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