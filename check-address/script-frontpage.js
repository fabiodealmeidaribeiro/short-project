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
} from './script-variable.js';

export const FrontpageStyle = (Input = '') => {
    let Result = Input;
    let Header = [];
    for (let i = 1; i <= 6; i++) Header.push(('<h' + i).toString());
    [ ...Header ].map(e => {
        Result = Result.replace(new RegExp(e, 'g'), (e + ' class=\'' + Classes['h' + e.slice(2, -1)].join(' ') + '\''));
    });
    [ '<li', '<p' ].map(e => {
        Result = Result.replace(new RegExp(e, 'g'), (e + ' class=\'' + Classes['p'].join(' ') + '\''));
    });
    Result = Result.replace(new RegExp('<a', 'g'), ('<a class=\'' + Classes['a'].join(' ') + '\''));
    Result = Result.replace(new RegExp('<div class="content"', 'g'), ('<div class=\'content ' + Classes['content'].join(' ') + '\''));
    Result = Result.replace(new RegExp('<figure', 'g'), ('<figure class=\'' + Classes['figure'].join(' ') + '\''));
    Result = Result.replace(new RegExp('<strong', 'g'), ('<strong class=\'' + Classes['strong'].join(' ') + '\''));
    Result = Result.replace(new RegExp('<ul', 'g'), ('<ul class=\'' + Classes['ul'].join(' ') + '\''));
    return Result;
};

export const FrontpageBuilder = (Input = {}) => {
    const Proper = {
        father : 'father' in Input ? (Validator['String'](Input['father']) ? ('btn-group-' + Input['father']) : 'btn-group-footer') : 'btn-group-footer',
        id : 'id' in Input ? (Validator['String'](Input['id']) ? Input['id'] : [ undefined ]) : [ undefined ],
        theme : 'theme' in Input ? (Validator['String'](Input['theme']) ? Input['theme'].trim() : 'ModalComponent') : 'ModalComponent',
        title : 'title' in Input ? (Validator['String'](Input['title']) ? FirstUpper(Input['title']) : [ undefined ]) : [ undefined ],
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

export const FrontpageParams = (Input = {}) => {
    if (Validator['Array'](Input)) {
        Input.forEach(Object => {
            if (Validator['Object'](Object)) {
                const Proper = {
                    father : 'father' in Object ? (Validator['String'](Object['father']) ? (IndexExistenceChecker({ array : [ 'fixed', 'footer' ], index : Object['father'] }) ? Object['father'] : [ undefined ]) : [ undefined ]) : [ undefined ],
                    index : 'index' in Object ? (Validator['Array'](Object['index']) ? Object['index'] : []) : [],
                };
                if (Validator['Array'](Proper['index'])) {
                    Proper['index'].forEach(Element => {
                        const ID = PasswordBuilder({ number : false, special : false });
                        const Archive = 'archive' in Element ? (Validator['String'](Element['archive']) ? (CheckHTMLTermination(Element['archive']) ? Element['archive'] : '') : '') : '';
                        const Screen = 'screen' in Element ? (Validator['String'](Element['screen']) ? Element['screen'] : false) : false;
                        const Theme = 'theme' in Element ? (Validator['String'](Element['theme']) ? Element['theme'].trim() : 'ModalComponent') : 'ModalComponent';
                        const Title = 'title' in Element ? (Validator['String'](Element['title']) ? FirstUpper(Element['title']) : '') : '';
                        if (Validator['Gene'](Archive)) {
                            fetch(Archive).then(Response => {
                                if (!Response['ok']) throw new Error(Response['status']);
                                    return Response.text();
                            }).then(Result => {
                                FrontpageBuilder({
                                    father : Proper['father'],
                                    id : ID,
                                    theme : Theme,
                                    title : Title,
                                });
                                BootstrapParams[ Theme ]({
                                    body : FrontpageStyle(Result),
                                    id : ID,
                                    screen : Screen,
                                    title : Title,
                                });
                            }).catch(Error => {
                                console.error(Error['message']);
                            });
                        };
                    });
                };
            };
        });
    };
};