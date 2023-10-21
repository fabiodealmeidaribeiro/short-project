import {
    LightboxBuilder,
    LightboxDisplay,
    LightboxTransition,
} from './script-container.js';
import {
    SetContent,
} from './script-function.js';
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
    SetContent({ class : '.photo-content' });
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
    Transform['highlight'](Content[CurrentPicture]);
    if (Array()) {
        for (let i = 0; i < Array()['length']; i++) {
            document.addEventListener('keydown', Event => {
                if (Event['key'] === Array()[i]['key']) {
                    document['body']['style']['pointerEvents'] = 'none';
                    const Current = Content[CurrentPicture];
                    const Highlight = Content[CurrentPicture][Array()[i]['sibling']];
                    if (Highlight) {
                        Transform['downlight'](Current);
                        Transform['highlight'](Highlight);
                        Highlight.scrollIntoView({ behavior : 'smooth' });
                    };
                    CurrentPicture = CurrentPicture + Array(CurrentPicture)[i]['number'];
                    Event.stopPropagation();
                    Event.preventDefault();
                };
            });
        };
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
            CurrentPicture = i;
            LightboxTransition(CurrentPicture);
            LightboxDisplay();
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
    SetContent({ class : '.photo-content' });
});