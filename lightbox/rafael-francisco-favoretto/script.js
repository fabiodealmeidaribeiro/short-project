import {
    LightboxBuilder,
} from './script-container.js';
import {
    SetContent,
} from './script-function.js';
import {
    NoUnit,
    TransitionRunning,
} from './script-main.js';
import {
    NavigationBuilder,
} from './script-navigation.js';
import {
    SocialNetwork,
} from './script-network.js';
import {
    LightboxAttribute,
    LightboxPosition,
    LightboxWidth,
    SetStyle,
    Transform,
} from './script-variable.js';
const LightboxTransition = (output = {}) => {
    const Proper = {
        current : 'current' in output ? (output['current'] ? output['current'] : 0) : 0,
        width : 'width' in output ? (output['width'] ? output['width'] : LightboxWidth) : LightboxWidth,
    };
    document.querySelector('#content')['style']['left'] = LightboxPosition[Proper['current']]['left'];
    document.querySelector('#content')['style']['width'] = Proper['width'] + 'px';
    document.querySelector('#inner')['style']['height'] = LightboxAttribute[Proper['current']]['height'];
    document.querySelector('#inner')['style']['left'] = LightboxAttribute[Proper['current']]['left'];
    document.querySelector('#inner')['style']['top'] = LightboxAttribute[Proper['current']]['top'];
    document.querySelector('#inner')['style']['width'] = LightboxAttribute[Proper['current']]['width'];
    if (Proper['current'] < 1) {
        document.querySelector('#btn-arrow-left')['style']['opacity'] = 0;
        document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(0)';
    };
    if (Proper['current'] > (LightboxAttribute['length'] - 2)) {
        document.querySelector('#btn-arrow-right')['style']['opacity'] = 0;
        document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(0)';
    };
    if (!(Proper['current'] < 1)) {
        document.querySelector('#btn-arrow-left')['style']['opacity'] = 1;
        document.querySelector('#btn-arrow-left')['style']['transform'] = 'scale(1)';
    };
    if (!(Proper['current'] > (LightboxAttribute['length'] - 2))) {
        document.querySelector('#btn-arrow-right')['style']['opacity'] = 1;
        document.querySelector('#btn-arrow-right')['style']['transform'] = 'scale(1)';
    };
};
var CurrentPicture = 0;
document.addEventListener('DOMContentLoaded', () => {
    SocialNetwork();
    LightboxBuilder();
    LightboxTransition();
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
            LightboxTransition({ current : CurrentPicture });
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
    const HighlightListener = (Event, Index) => {
        if (Event['key'] === Array()[Index]['key']) {
            const Current = Content[CurrentPicture];
            const Highlight = Content[CurrentPicture][Array()[Index]['sibling']];
            if (Highlight) {
                Transform['downlight'](Current);
                Transform['highlight'](Highlight);
                Highlight.scrollIntoView({ behavior : 'smooth' });
            };
            CurrentPicture = CurrentPicture + Array(CurrentPicture)[Index]['condition'];
            Event.stopPropagation();
            Event.preventDefault();
        };
    };
    for (let i = 0; i < Array()['length']; i++) {
        document.addEventListener('keydown', Event => {
            HighlightListener(Event, i);
        });
    };
    document.addEventListener('keydown', Event => {
        if (Event['key'] === 'Enter') {
            LightboxTransition({ current : CurrentPicture });
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
        };
    });
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
            LightboxTransition({ current : CurrentPicture });
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
    LightboxTransition({ current : CurrentPicture, width : LightboxWidth });
    const Container = () => {
        return {
            height : window['innerHeight'] - (NoUnit(SetStyle['border']['margin']) + NoUnit(SetStyle['container']['margin'])) * 2,
            width : window['innerWidth'] - (NoUnit(SetStyle['border']['margin']) + NoUnit(SetStyle['container']['margin'])) * 2,
            padding : NoUnit(SetStyle['border']['margin']) + NoUnit(SetStyle['container']['margin']) + NoUnit(SetStyle['picture']['style']['padding']),
            rem : parseFloat(getComputedStyle(document['documentElement'])['fontSize']),
        };
    };
    const LightboxAttribute = [];
    document.querySelectorAll('.thumbnail-content').forEach(Element => {
        let Picture = Element.querySelector('.thumbnail-background')
        ? (Element.querySelector('.thumbnail-background').querySelector('.thumbnail-picture') ? Element.querySelector('.thumbnail-background').querySelector('.thumbnail-picture') : [ undefined ])
        : [ undefined ];
        Picture = Picture ? {
            height : Picture.getAttribute('data-height') ? Picture.getAttribute('data-height') : [ undefined ],
            url : Picture.getAttribute('data-url') ? Picture.getAttribute('data-url') : [ undefined ],
            width : Picture.getAttribute('data-width') ? Picture.getAttribute('data-width') : [ undefined ],
        } : { };
        let Caption = Element.querySelector('.thumbnail-caption') ? {
            title : Element.querySelector('.thumbnail-caption').querySelector('h1')
            ? (Element.querySelector('.thumbnail-caption').querySelector('h1')['innerText'] ? Element.querySelector('.thumbnail-caption').querySelector('h1')['innerText'] : [ undefined ])
            : [ undefined ],
            subtitle : Element.querySelector('.thumbnail-caption').querySelector('h2')
            ? (Element.querySelector('.thumbnail-caption').querySelector('h2')['innerText'] ? Element.querySelector('.thumbnail-caption').querySelector('h2')['innerText'] : [ undefined ])
            : [ undefined ],
            description : Element.querySelector('.thumbnail-caption').querySelector('p')
            ? (Element.querySelector('.thumbnail-caption').querySelector('p')['innerText'] ? Element.querySelector('.thumbnail-caption').querySelector('p')['innerText'] : [ undefined ])
            : [ undefined ],
        } : { };
        LightboxAttribute.push({
            ...Caption ? { title : Caption['title'] ? Caption['title'] : [ undefined ] } : { },
            ...Caption ? { subtitle : Caption['subtitle'] ? Caption['subtitle'] : [ undefined ] } : { },
            ...Caption ? { description : Caption['description'] ? Caption['description'] : [ undefined ] } : { },
            ...Picture ? { left : ((Container()['width'] - Picture['width'] * Container()['height'] / Picture['height']) / 2) + 'px' } : { },
            ...Picture ? { url : Picture['url'] } : { },
            ...Picture ? { width : (Picture['width'] * Container()['height'] / Picture['height'] > Container()['width'] ? Container()['width'] - Container()['rem'] * Container()['padding'] : Picture['width'] * Container()['height'] / Picture['height']) + 'px' } : { },
        });
    });
    document.querySelectorAll('.thumbnail').forEach((Thumbnail, Index) => {
        Thumbnail['style']['width'] = LightboxAttribute[Index]['width'];
        console.log(Thumbnail);
    });
});