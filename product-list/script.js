import {
    ResizeElements,
} from './master.js';

import {
    SocialNetwork
} from './network.js';

window.addEventListener('DOMContentLoaded', Event => {
    SocialNetwork();
    ResizeElements();
});

window.addEventListener('resize', Event => {
    ResizeElements();
});