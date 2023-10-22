import {
    SetAttribute,
} from './script-main.js';
import {
    SetStyle,
} from './script-variable.js';
export const SetContent = (output = {}) => {
    const Array = [ 1, 1.33, 1.85, 2.35 ];
    const Proper = {
        class : 'class' in output ? (output['class'] ? output['class'] : '') : '',
        height : 'height' in output ? (output['height'] ? output['height'] : 1) : 1,
        width : 'width' in output ? (output['width'] ? output['width'] : Array[0]) : Array[0],
    };
    document.querySelectorAll(Proper['class']).forEach(Element => {
        if (Element) {
            Element['style']['height'] = Proper['height'] * Element['clientWidth'] / Proper['width'] + 'px';
            const Caption = Element.querySelector('.thumbnail-caption');
            if (Caption) {
                const Title = Caption.querySelector('h1');
                if (Title) {
                    SetAttribute({ element : Title, attribute : 'class', value : [
                            ...SetStyle['title']['class'],
                        ],
                    });
                    SetAttribute({ element : Title, attribute : 'style', value : {
                            ...SetStyle['title']['style'],
                        },
                    });
                };
                const Subtitle = Caption.querySelector('h2');
                if (Subtitle) {
                    SetAttribute({ element : Subtitle, attribute : 'class', value : [
                            ...SetStyle['subtitle']['class'],
                        ],
                    });
                    SetAttribute({ element : Subtitle, attribute : 'style', value : {
                            ...SetStyle['subtitle']['style'],
                        },
                    });
                };
                const Description = Caption.querySelector('p');
                if (Description) {
                    SetAttribute({ element : Description, attribute : 'class', value : [
                            ...SetStyle['description']['class'],
                        ],
                    });
                    SetAttribute({ element : Description, attribute : 'style', value : {
                            ...SetStyle['description']['style'],
                        },
                    });
                };
            };
        };
    });
};