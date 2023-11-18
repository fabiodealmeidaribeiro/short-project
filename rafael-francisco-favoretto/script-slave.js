import {
    SetAttribute,
} from './script-master.js';

import {
    Style,
} from './script-variable.js';

export const SetContent = (Input = {}) => {
    const Array = [ 1, 1.33, 1.85, 2.35 ];
    const Proper = {
        class : 'class' in Input ? (Input['class'] ? Input['class'] : '') : '',
        height : 'height' in Input ? (Input['height'] ? Input['height'] : 1) : 1,
        width : 'width' in Input ? (Input['width'] ? Input['width'] : Array[0]) : Array[0],
    };
    document.querySelectorAll(Proper['class']).forEach(Element => {
        if (Element) {
            Element['style']['height'] = Proper['height'] * Element['clientWidth'] / Proper['width'] + 'px';
            const Caption = Element.querySelector('.thumbnail-caption');
            if (Caption) {
                const Title = Caption.querySelector('h1');
                if (Title) {
                    SetAttribute({ element : Title, attribute : 'class', value : [
                            ...Style['class']['title'],
                        ],
                    });
                    SetAttribute({ element : Title, attribute : 'style', value : {
                            ...Style['style']['title'],
                        },
                    });
                };
                const Subtitle = Caption.querySelector('h2');
                if (Subtitle) {
                    SetAttribute({ element : Subtitle, attribute : 'class', value : [
                            ...Style['class']['subtitle'],
                        ],
                    });
                    SetAttribute({ element : Subtitle, attribute : 'style', value : {
                            ...Style['style']['subtitle'],
                        },
                    });
                };
                const Description = Caption.querySelector('p');
                if (Description) {
                    SetAttribute({ element : Description, attribute : 'class', value : [
                            ...Style['class']['description'],
                        ],
                    });
                    SetAttribute({ element : Description, attribute : 'style', value : {
                            ...Style['style']['description'],
                        },
                    });
                };
            };
        };
    });
};