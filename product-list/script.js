import {
    ResizeElements,
} from './script-main.js';

import {
    SocialNetwork
} from './script-network.js';

window.addEventListener('DOMContentLoaded', Event => {
    SocialNetwork();
    ResizeElements();
});

window.addEventListener('resize', Event => {
    ResizeElements();
});