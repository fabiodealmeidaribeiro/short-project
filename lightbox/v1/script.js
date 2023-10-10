import {
    Lightbox,
} from './script-lightbox.js';
import {
    DefineImageBody,
} from './script-main.js';
import {
    SocialNetwork,
} from './script-network.js';
document.addEventListener("DOMContentLoaded", () => {
    DefineImageBody({ id : '.photo-content' });
    document.querySelectorAll('.photo-content').forEach(element => {
        if (element) {
            [ 'mouseover', 'mouseenter' ].map(event => {
                element.addEventListener(event, () => {
                    element['style']['cursor'] = 'pointer';
                    if (element.querySelector('.photo-filter')) element.querySelector('.photo-filter')['style']['opacity'] = 'calc(1 / 100 * 75)';
                    if (element.querySelector('.photo-caption')) element.querySelector('.photo-caption')['style']['opacity'] = 1;
                });
            });
            [ 'mouseleave', 'mouseout' ].map(event => {
                element.addEventListener(event, () => {
                    element['style']['cursor'] = 'default';
                    if (element.querySelector('.photo-filter')) element.querySelector('.photo-filter')['style']['opacity'] = 0;
                    if (element.querySelector('.photo-caption')) element.querySelector('.photo-caption')['style']['opacity'] = 0;
                });
            });
            element.addEventListener('click', () => {
            });
        };
    });
    SocialNetwork();
    Lightbox();
});
window.addEventListener('resize', () => {
    DefineImageBody({ id : '.photo-content' });
});