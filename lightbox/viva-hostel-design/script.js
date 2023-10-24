import {
    LightboxBuilder,
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
} from './script-variable.js';
var CurrentPicture = 0;
document.addEventListener('DOMContentLoaded', () => {
    SocialNetwork({
        phone : '+55 (11) 9 9258-1757',
        message : [
            'Commodo aute nostrud consectetur incididunt labore nulla pariatur irure eu et aliqua ipsum nisi.',
            'Aliqua sit deserunt reprehenderit officia id nulla consectetur exercitation occaecat.',
            'Aliqua laborum tempor ut fugiat aliqua fugiat proident exercitation. Voluptate Lorem elit amet ex tempor dolor pariatur ullamco do.',
            'Sit mollit laboris nisi mollit nulla nisi.',
            'Eu enim ex in officia minim qui ipsum.',
            'In ipsum exercitation aliquip adipisicing.',
            'Commodo mollit nostrud nostrud est commodo in in pariatur incididunt pariatur culpa.',
        ],
        https : [
            'https://www.facebook.com/VivaHostel/',
            'https://www.instagram.com/vivahostel/',
            'https://www.linkedin.com/in/rafael-favoretto',
            'https://www.youtube.com/watch?v=1OaaUjyixVY',
        ],
    });
    LightboxBuilder();
    for (let i = 0; i < NavigationBuilder()['length']; i++) {
        let Selector = document.querySelector('#' + NavigationBuilder()[i]['id']);
        Selector.addEventListener('click', Event => {
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
    Transform['highlight'](Content[CurrentPicture]);
    for (let i = 0; i < Array()['length']; i++) {
        document.addEventListener('keydown', Event => {
            if (Event['key'] === Array()[i]['key']) {
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
                CurrentPicture = i;
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
            let Selector = document.querySelector('#background');
            if (Selector) {
                Selector['style']['display'] = 'flex';
                Selector['style']['zIndex'] = 9999;
                if (!TransitionRunning(Selector)) {
                    Selector['style']['opacity'] = 1;
                };
            };
            Event.stopPropagation();
            Event.preventDefault();
        });
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