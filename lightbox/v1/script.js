import {
    LightboxContainer,
} from './script-lightbox.js';
import {
    SetContentBody,
} from './script-main.js';
import {
    SocialNetwork,
} from './script-network.js';
document.addEventListener("DOMContentLoaded", () => {
    SetContentBody({ id : '.photo-content' });
    SocialNetwork();
    LightboxContainer({ current : 1 });
    document.querySelectorAll('.photo-content').forEach(Element => {
        if (Element) {
            [ 'mouseover', 'mouseenter' ].map(Index => {
                Element.addEventListener(Index, Event => {
                    if (Element.querySelector('.photo-filter')) {
                        Element.querySelector('.photo-filter')['style']['opacity'] = 'calc(1 / 100 * 75)';
                    };
                    if (Element.querySelector('.photo-caption')) {
                        Element.querySelector('.photo-caption')['style']['opacity'] = 1;
                    };
                    Event.stopPropagation();
                    Event.preventDefault();
                });
            });
            [ 'mouseleave', 'mouseout' ].map(Index => {
                Element.addEventListener(Index, Event => {
                    if (Element.querySelector('.photo-filter')) {
                        Element.querySelector('.photo-filter')['style']['opacity'] = 0;
                    };
                    if (Element.querySelector('.photo-caption')) {
                        Element.querySelector('.photo-caption')['style']['opacity'] = 0;
                    };
                    Event.stopPropagation();
                    Event.preventDefault();
                });
            });
            Element.addEventListener('click', ClickEvent => {
                document.querySelector('#background')['style']['display'] = 'flex';
                document.querySelector('#background')['style']['zIndex'] = 9999;
                document.querySelector('#background')['style']['opacity'] = 1;
                ClickEvent.stopPropagation();
                ClickEvent.preventDefault();
            });
        };
    });
});
window.addEventListener('resize', () => {
    SetContentBody({ id : '.photo-content' });
});