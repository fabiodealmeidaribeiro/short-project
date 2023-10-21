import {
    LightboxBuilder,
    LightboxDisplay,
    LightboxTransition,
} from './script-container.js';
import {
    SetContent,
} from './script-function.js';
import {
    TransitionRunning,
} from './script-main.js';
import {
    NavigationBuilder,
} from './script-navigation.js';
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
    for (let i = 0; i < NavigationBuilder()['length']; i++) {
        document.querySelector('#' + NavigationBuilder()[i]['id']).addEventListener('click', Event => {
            if (NavigationBuilder()[i]['id'] === 'btn-arrow-down') {
                const Selector = document.querySelector('#background');
                if (Selector) {
                    Selector['style']['opacity'] = 0;
                    if (!TransitionRunning(Selector)) {
                        Selector['style']['display'] = 'none';
                        Selector['style']['zIndex'] = - 1;
                    };
                };
            };
            CurrentPicture = CurrentPicture + NavigationBuilder(CurrentPicture)[i]['condition'];
            LightboxTransition(CurrentPicture);
            Event.stopPropagation();
            Event.preventDefault();
        });
    };
    SetContent({ class : '.photo-content' });
    const Content = document.querySelectorAll('.photo-content');
    const Array = (CurrentPicture = 0) => {
        return [
            {
                condition : CurrentPicture < 1 ? 0 : - 1,
                key : 'ArrowLeft',
                sibling : 'previousElementSibling',
            },
            {
                condition : CurrentPicture > Content['length'] - 2 ? 0 : + 1,
                key : 'ArrowRight',
                sibling : 'nextElementSibling',
            },
        ];
    };
    Transform['highlight'](Content[CurrentPicture]);
    if (Array()) {
        for (let i = 0; i < Array()['length']; i++) {
            document.addEventListener('keydown', (Event) => {
                if (Event['key'] === Array()[i]['key']) {
                    document['body']['style']['pointerEvents'] = 'none';
                    const Current = Content[CurrentPicture];
                    const Highlight = Content[CurrentPicture][Array()[i]['sibling']];
                    if (Highlight) {
                        Transform['downlight'](Current);
                        Transform['highlight'](Highlight);
                        Highlight.scrollIntoView({ behavior : 'smooth' });
                    };
                    CurrentPicture = CurrentPicture + Array(CurrentPicture)[i]['condition'];
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