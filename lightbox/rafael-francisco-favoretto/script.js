import {
    LightboxBlock,
    LightboxBuilder,
    LightboxNone,
    LightboxTransition,
} from './script-container.js';
import {
    SetContent,
} from './script-function.js';
import {
    NavigationBuilder,
} from './script-navigation.js';
import {
    SocialNetwork,
} from './script-network.js';
import {
    Transform,
} from './script-variable.js';
var CurrentThumbnail = 0;
document.addEventListener('DOMContentLoaded', () => {
    SocialNetwork();
    LightboxBuilder();
    LightboxTransition();
    for (let i = 0; i < NavigationBuilder()['length']; i++) {
        let Selector = document.querySelector('#' + NavigationBuilder()[i]['id']);
        Selector.addEventListener('click', Event => {
            if (NavigationBuilder()[i]['id'] === 'btn-arrow-down') {
                LightboxNone('#background');
            };
            CurrentThumbnail = CurrentThumbnail + NavigationBuilder(CurrentThumbnail)[i]['condition'];
            LightboxTransition({ current : CurrentThumbnail });
            Event.stopPropagation();
            Event.preventDefault();
        });
        [ 'mouseover', 'mouseenter' ].map(Index => {
            Selector.addEventListener(Index, Event => {
                Selector['classList'].add('bg-danger');
                Selector['classList'].remove('bg-secondary');
                Event.stopPropagation();
                Event.preventDefault();
            });
        });
        [ 'mouseleave', 'mouseout' ].map(Index => {
            Selector.addEventListener(Index, Event => {
                Selector['classList'].add('bg-secondary');
                Selector['classList'].remove('bg-danger');
                Event.stopPropagation();
                Event.preventDefault();
            });
        });
    };
    SetContent({ class : '.thumbnail-content' });
    const Content = document.querySelectorAll('.thumbnail-content');
    const Array = (output = 0) => {
        return [
            {
                condition : output < 1 ? 0 : - 1,
                key : 'ArrowLeft',
                sibling : 'previousElementSibling',
            },
            {
                condition : output > Content['length'] - 2 ? 0 : + 1,
                key : 'ArrowRight',
                sibling : 'nextElementSibling',
            },
        ];
    };
    Transform['highlight'](Content[CurrentThumbnail]);
    const HighlightListener = (Event, Index) => {
        if (Event['key'] === Array()[Index]['key']) {
            const Current = Content[CurrentThumbnail];
            const Highlight = Content[CurrentThumbnail][Array()[Index]['sibling']];
            if (Highlight) {
                Transform['downlight'](Current);
                Transform['highlight'](Highlight);
                Highlight.scrollIntoView({ behavior : 'smooth' });
            };
            CurrentThumbnail = CurrentThumbnail + Array(CurrentThumbnail)[Index]['condition'];
            Event.stopPropagation();
            Event.preventDefault();
        };
    };
    for (let i = 0; i < Array()['length']; i++) {
        document.addEventListener('keydown', Event => {
            HighlightListener(Event, i);
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
                CurrentThumbnail = i;
                Element['style']['cursor'] = 'pointer';
                Content.forEach(Content => Transform['downlight'](Content));
                Transform['highlight'](Element);
                Event.stopPropagation();
                Event.preventDefault();
            });
        });
        Element.addEventListener('click', Event => {
            CurrentThumbnail = i;
            LightboxTransition({ current : CurrentThumbnail });
            LightboxBlock('#background');
            Event.stopPropagation();
            Event.preventDefault();
        });
    });
    document.addEventListener('keydown', Event => {
        if (Event['key'] === 'Enter') {
            LightboxTransition({ current : CurrentThumbnail });
            LightboxBlock('#background');
            Event.stopPropagation();
            Event.preventDefault();
        };
    });
    document.addEventListener('keydown', Event => {
        if (Event['key'] === 'Escape') {
            LightboxNone('#background');
            Event.stopPropagation();
            Event.preventDefault();
        };
    });
    document.addEventListener('keydown', Event => {
        document['body']['style']['pointerEvents'] = 'none';
        Event.stopPropagation();
        Event.preventDefault();
    });
    document.addEventListener('mousemove', Event => {
        document['body']['style']['pointerEvents'] = 'auto';
        Event.stopPropagation();
        Event.preventDefault();
    });
});
window.addEventListener('resize', () => {
    SetContent({ class : '.thumbnail-content' });
});