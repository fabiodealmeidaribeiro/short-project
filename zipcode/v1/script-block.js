import {
    Classes,
    ClassesDimension,
} from './script-variable.js';

import {
    CheckJSONTermination,
    CreateElement,
    FirstUpper,
    IsHTMLFormat,
    JustLowerLetters,
    SelectorOrID,
    SetAttribute,
    Validator,
} from './script-main.js';

export const BlockBuilder = (output = {}) => {
    const Proper = {
        body : 'body' in output ? output['body'] : '',
        classes : 'classes' in output ? output['classes'] : [],
        father : 'father' in output ? SelectorOrID(JustLowerLetters(output['father'])) : 'body',
        title : 'title' in output ? output['title'] : '',
    };
    const Body = CreateElement({ element : 'p', textnode : Proper['body'].trim() });
    const Content = CreateElement();
    const Title = CreateElement({ element : 'h1', textnode : FirstUpper(Proper['title']) });
    SetAttribute({ element : Body, attribute : 'class', value : Classes['p'] });
    SetAttribute({ element : Content, attribute : 'class', value : [ ...ClassesDimension, ...Proper['classes'] ] });
    SetAttribute({ element : Title, attribute : 'class', value : Classes['h1'] });
    if (document.querySelector(Proper['father'])) {
        if (Validator['Gene'](Proper['title']) || Validator['Gene'](Proper['body'])) {
            document.querySelector(Proper['father']).appendChild(Content);
            if (Validator['Gene'](Proper['title'])) {
                IsHTMLFormat(Proper['title']) ? Content['innerHTML'] += Proper['title'] : Content.appendChild(Title);
            };
            if (Validator['Gene'](Proper['body'])) {
                IsHTMLFormat(Proper['body']) ? Content['innerHTML'] += Proper['body'] : Content.appendChild(Body);
            };
        };
    };
};

export const BlockParams = (output = {}) => {
    const Proper = {
        archive : 'archive' in output ? (Validator['String'](output['archive']) ? output['archive'] : [ undefined ]) : [ undefined ],
        body : 'body' in output ? (Validator['String'](output['body']) ? output['body'] : '') : '',
        classes : 'classes' in output ? (Validator['Array'](output['classes']) ? output['classes'] : []) : [],
        father : 'father' in output ? (Validator['String'](output['father']) ? output['father'] : 'body') : 'body',
        title : 'title' in output ? (Validator['String'](output['title']) ? output['title'] : '') : '',
    };
    if(Validator['String'](Proper['archive'])) {
        if (CheckJSONTermination(Proper['archive'])) {
            fetch(Proper['archive']).then(response => {
                if (!response['ok']) throw new Error(response['status']);
                return response.json();
            }).then(result => {
                BlockBuilder({
                    body : result['body'],
                    classes : Proper['classes'],
                    father : Proper['father'],
                    title : result['title'],
                });
            }).catch(error => {
                console.error(error['message']);
            });
        };
    };
    if(!Validator['String'](Proper['archive'])) {
        BlockBuilder({
            body : Proper['body'],
            classes : Proper['classes'],
            father : Proper['father'],
            title : Proper['title'],
        });
    };
};