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
    document.querySelectorAll('.photo-content').forEach((element, index) => {
        if (element) {

            [ 'mouseover', 'mouseenter' ].map(index => {
                element.addEventListener(index, event => {
                    element['style']['cursor'] = 'pointer';
                    if (element.querySelector('.photo-filter')) element.querySelector('.photo-filter')['style']['opacity'] = 'calc(1 / 100 * 75)';
                    if (element.querySelector('.photo-caption')) element.querySelector('.photo-caption')['style']['opacity'] = 1;
                    event.stopPropagation();
                    event.preventDefault();
                });
            });

            [ 'mouseleave', 'mouseout' ].map(index => {
                element.addEventListener(index, event => {
                    element['style']['cursor'] = 'default';
                    if (element.querySelector('.photo-filter')) element.querySelector('.photo-filter')['style']['opacity'] = 0;
                    if (element.querySelector('.photo-caption')) element.querySelector('.photo-caption')['style']['opacity'] = 0;
                    event.stopPropagation();
                    event.preventDefault();
                });
            });
            
            element.addEventListener('click', event => {
                const Selector = document.querySelector('#background');
                Selector['style']['display'] = 'flex';
                Selector['style']['zIndex'] = 9999;
                Selector['style']['opacity'] = 1;
                event.stopPropagation();
                event.preventDefault();
            });
        };
    });
});
window.addEventListener('resize', () => {
    SetContentBody({ id : '.photo-content' });
});