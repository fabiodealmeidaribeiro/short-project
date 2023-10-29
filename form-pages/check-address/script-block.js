import {
    Classes,
    ClassesArray,
} from './script-variable.js';

import {
    // CheckJSONTermination,
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
    SetAttribute({ element : Content, attribute : 'class', value : [ ...ClassesArray['dimension'], ...Proper['classes'] ] });
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

const FetchData = async (output = '') => {
    if (output) {
        const Response = await fetch(output);
        const Result = await Response.json();
        return Result;
    };
};

export const BlockParams = async (output = {}) => {
    const Proper = {
        archive : 'archive' in output ? (Validator['String'](output['archive']) ? output['archive'] : [ undefined ]) : [ undefined ],
        body : 'body' in output ? (Validator['String'](output['body']) ? output['body'] : '') : '',
        classes : 'classes' in output ? (Validator['Array'](output['classes']) ? output['classes'] : []) : [],
        father : 'father' in output ? (Validator['String'](output['father']) ? output['father'] : 'body') : 'body',
        title : 'title' in output ? (Validator['String'](output['title']) ? output['title'] : '') : '',
    };
    const Result = await FetchData(Proper['archive']);
    BlockBuilder({
        body : Result['body'],
        classes : Proper['classes'],
        father : Proper['father'],
        title : Result['title'],
    });
};