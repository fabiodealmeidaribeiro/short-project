import {
    BootstrapParams,
} from './script-bootstrap.js';

import {
    CheckHTMLTermination,
    CreateElement,
    FirstUpper,
    IndexExistenceChecker,
    PasswordBuilder,
    SelectorOrID,
    SetAttribute,
    Validator,
} from './script-main.js';

import {
    Classes,
} from './script-variables.js';

export const FrontpageStyle = (output = '') => {
    let result = output;
    let Header = [];
    for (let i = 1; i <= 6; i++) Header.push(('<h' + i).toString());
    [ ...Header ].map(e => {
        result = result.replace(new RegExp(e, 'g'), (e + ' class=\'' + Classes['h' + e.slice(2, -1)].join(' ') + '\''));
    });
    [ '<li', '<p' ].map(e => {
        result = result.replace(new RegExp(e, 'g'), (e + ' class=\'' + Classes['p'].join(' ') + '\''));
    });
    result = result.replace(new RegExp('<a', 'g'), ('<a class=\'' + Classes['a'].join(' ') + '\''));
    result = result.replace(new RegExp('<div class="content"', 'g'), ('<div class=\'content ' + Classes['content'].join(' ') + '\''));
    result = result.replace(new RegExp('<figure', 'g'), ('<figure class=\'' + Classes['figure'].join(' ') + '\''));
    result = result.replace(new RegExp('<strong', 'g'), ('<strong class=\'' + Classes['strong'].join(' ') + '\''));
    result = result.replace(new RegExp('<ul', 'g'), ('<ul class=\'' + Classes['ul'].join(' ') + '\''));
    return result;
};

export const FrontpageBuilder = (output = {}) => {
    const Proper = {
        father : 'father' in output ? (Validator['String'](output['father']) ? ('btn-group-' + output['father']) : 'btn-group-footer') : 'btn-group-footer',
        id : 'id' in output ? (Validator['String'](output['id']) ? output['id'] : [ undefined ]) : [ undefined ],
        theme : 'theme' in output ? (Validator['String'](output['theme']) ? output['theme'].trim() : 'ModalComponent') : 'ModalComponent',
        title : 'title' in output ? (Validator['String'](output['title']) ? FirstUpper(output['title']) : [ undefined ]) : [ undefined ],
    };
    const ButtonIndex = CreateElement({ element : 'button', textnode : FirstUpper(Proper['title']) });
    SetAttribute({ element : ButtonIndex, attribute : 'class', value : [ ...Classes['button'] ] });
    SetAttribute({ element : ButtonIndex, attribute : 'type', value : 'button' });
    SetAttribute({ element : ButtonIndex, attribute : 'data-bs-toggle', value : (Proper['theme'].includes('Modal') ? 'modal' : Proper['id']) });
    SetAttribute({ element : ButtonIndex, attribute : 'data-bs-target', value : SelectorOrID(Proper['id']) });
    SetAttribute({ element : ButtonIndex, attribute : 'aria-controls', value : (Proper['id'] + '-label') });
    if (Validator['String'](Proper['id']) && Validator['String'](Proper['title'])) {
        if (document.querySelector(SelectorOrID(Proper['father']))) {
            document.querySelector(SelectorOrID(Proper['father'])).appendChild(ButtonIndex);
        };
    };
};

export const FrontpageParams = (output = {}) => {
    if (Validator['Array'](output)) {
        output.forEach(object => {
            if (Validator['Object'](object)) {
                const Proper = {
                    father : 'father' in object ? (Validator['String'](object['father']) ? (IndexExistenceChecker({ array : [ 'fixed', 'footer' ], index : object['father'] }) ? object['father'] : [ undefined ]) : [ undefined ]) : [ undefined ],
                    index : 'index' in object ? (Validator['Array'](object['index']) ? object['index'] : []) : [],
                };
                if (Validator['Array'](Proper['index'])) {
                    Proper['index'].forEach(element => {
                        const ID = PasswordBuilder({ number : false, special : false });
                        const Archive = 'archive' in element ? (Validator['String'](element['archive']) ? (CheckHTMLTermination(element['archive']) ? element['archive'] : '') : '') : '';
                        const Screen = 'screen' in element ? (Validator['String'](element['screen']) ? element['screen'] : false) : false;
                        const Theme = 'theme' in element ? (Validator['String'](element['theme']) ? element['theme'].trim() : 'ModalComponent') : 'ModalComponent';
                        const Title = 'title' in element ? (Validator['String'](element['title']) ? FirstUpper(element['title']) : '') : '';
                        if (Validator['Gene'](Archive)) {
                            fetch(Archive).then(response => {
                                if (!response['ok']) throw new Error(response['status']);
                                    return response.text();
                            }).then(result => {
                                FrontpageBuilder({
                                    father : Proper['father'],
                                    id : ID,
                                    theme : Theme,
                                    title : Title,
                                });
                                BootstrapParams[ Theme ]({
                                    body : FrontpageStyle(result),
                                    id : ID,
                                    screen : Screen,
                                    title : Title,
                                });
                            }).catch(error => {
                                console.error(error['message']);
                            });
                        };
                    });
                };
            };
        });
    };
};