import {
    ButtonColorChange,
    CreateElement,
    FirstUpper,
    IndexProper,
    KeysAreSame,
    SelectorOrID,
    SetAttribute,
    SetTextNode,
    ThereIsKeyWithRealValue,
    Validator,
} from './main.js';

import {
    Classes,
    FormatDate,
} from './variable.js';

export const FormFieldBuilder = Input => {
    const Proper = {
        array : 'array' in Input ? (Validator['Array'](Input['array']) ? Input['array'] : []) : [],
        father : 'father' in Input ? (Validator['String'](Input['father']) ? Input['father'] : 'body') : 'body',
    };
    const Array = Proper['array'];
    const Father = Proper['father'];
    if (Validator['Array'](Array)) {
        const Container = CreateElement({ element : 'form' });
        SetAttribute({ element : Container, attribute : 'action', value : 'process.php' });
        SetAttribute({ element : Container, attribute : 'class', value : Classes['form'] });
        SetAttribute({ element : Container, attribute : 'enctype', value : 'multipart/form-data' });
        SetAttribute({ element : Container, attribute : 'method', value : 'post' });
        if (document.querySelector(Father)) document.querySelector(Father).appendChild(Container);
        for (let i = 0; i < Array['length']; i++) {
            const Wrapper = CreateElement();
            const WrapperClasses = [ ...(KeysAreSame({ objeto : Array[i], key : 'selector' }) === 'button') ? [ 'justify-content-center' ] : [ 'flex-column' ], 'd-flex' ];
            SetAttribute({ element : Wrapper, attribute : 'class', value : WrapperClasses });
            Container.appendChild(Wrapper);
            const Content = {
                bottom : CreateElement(),
                feedback : CreateElement(),
                content : CreateElement(),
                label : CreateElement(),
                title : CreateElement(),
            };
            const ContentClasses = [ 'd-flex', 'flex-row' ];
            SetAttribute({ element : Content['bottom'], attribute : 'class', value : [ ...ContentClasses ]});
            SetAttribute({ element : Content['feedback'], attribute : 'class', value : [ ...ContentClasses ]});
            SetAttribute({ element : Content['content'], attribute : 'class', value : [ ...(KeysAreSame({ objeto : Array[i], key : 'selector' }) === 'button') ? [ 'btn-group' ] : [ 'input-group' ] ]});
            SetAttribute({ element : Content['label'], attribute : 'class', value : [ ...ContentClasses ]});
            SetAttribute({ element : Content['title'], attribute : 'class', value : [ ...ContentClasses ]});
            const ContentStyle = { 'min-height' : '24px' };
            SetAttribute({ element : Content['feedback'], attribute : 'style', value : ContentStyle });
            SetAttribute({ element : Content['label'], attribute : 'style', value : ContentStyle });
            SetAttribute({ element : Content['title'], attribute : 'style', value : ContentStyle });
            if (Validator['Gene'](Array[i])) {
                if (!(KeysAreSame({ objeto : Array[i], key : 'selector' }) === 'button')) {
                    Wrapper.appendChild(Content['title']);
                    Wrapper.appendChild(Content['label']);
                };
                Wrapper.appendChild(Content['content']);
                if (!(KeysAreSame({ objeto : Array[i], key : 'selector' }) === 'button')) {
                    Wrapper.appendChild(Content['feedback']);
                    if (ThereIsKeyWithRealValue({ objeto : Array[i], key : 'bottom' })) {
                        Wrapper.appendChild(Content['bottom']);
                    };
                };
            };
            const Constructor = (Input = {}, ) => {
                if (Validator['Object'](Input)) {
                    const Proper = IndexProper(Input);
                    const Checker = {
                        date : Proper['type'] === 'date',
                        button : Proper['selector'] === 'button',
                        'button-select' : Proper['selector'] === 'button' || Proper['selector'] === 'select',
                        select : Proper['selector'] === 'select',
                        'select-textarea' : Proper['selector'] === 'select' || Proper['selector'] === 'textarea',
                        textarea : Proper['selector'] === 'textarea',
                    };
                    const Index = {
                        bottom : CreateElement(),
                        feedback : CreateElement({ element : 'p', textnode : FirstUpper(Proper['feedback']) }),
                        content : CreateElement({ element : Proper['selector'] }),
                        label : CreateElement({ element : 'label', textnode : FirstUpper(Proper['label']) }),
                        title : CreateElement({ element : 'h6', textnode : FirstUpper(Proper['title']) }),
                    };
                    SetAttribute({ element : Index['bottom'], attribute : 'class', value : [ 'bottom', 'bottom-' + Proper['id'], ...Classes['bottom'], ] });
                    SetAttribute({ element : Index['feedback'], attribute : 'class', value : [ 'feedback', 'feedback-' + Proper['id'], ...Classes['feedback'] ] });
                    SetAttribute({ element : Index['content'], attribute : 'class', value : [
                        ...Validator['Array'](Proper['classes']) ? Proper['classes'] : [],
                        ...Validator['Gene'](Proper['disabled']) ? Classes['disabled'] : [],
                        ...Checker['button'] ? Classes['button'] : [ 'content', 'content-' + Proper['id'] ],
                        ...Checker['button'] ? [ 'p-2' ] : [ 'ps-2', 'pe-5', 'py-2' ],
                        ...Checker['button-select'] ? [] : [ 'form-control' ],
                        ...Checker['select'] ? [ 'form-select' ] : [],
                    ] });
                    SetAttribute({ element : Index['label'], attribute : 'class', value : [ 'label', 'label-' + Proper['id'], ...Classes['label'] ] });
                    SetAttribute({ element : Index['label'], attribute : 'for', value : Proper['id'] });
                    SetAttribute({ element : Index['title'], attribute : 'class', value : [ 'title', 'title-' + Proper['id'], ...Classes['h6'], 'mt-3', 'pe-3' ] });
                    if (Validator['Boolean'](Proper['disabled'])) Index['content']['disabled'] = Proper['disabled'];
                    if (Validator['Object'](Proper['style'])) SetAttribute({ element : Index['content'], attribute : 'style', value : Proper['style'] });
                    if (Validator['String'](Proper['aria-label'])) SetAttribute({ element : Index['content'], attribute : 'aria-label', value : Proper['aria-label'] });
                    if (Validator['String'](Proper['id'])) SetAttribute({ element : Index['content'], attribute : 'id', value : Proper['id'] });
                    if (!Checker['button']) {
                        Index['content']['required'] = true;
                    };
                    if (Checker['date']) {
                        SetTextNode(Index['content'], FormatDate({ format : 'aaaa-mm-dd' }));
                    };
                    if (Checker['button']) {
                        SetTextNode(Index['content'], FirstUpper(Proper['label']));
                        if (Validator['String'](Proper['data-bs-target'])) SetAttribute({ element : Index['content'], attribute : 'data-bs-target', value : Proper['data-bs-target'] });
                        if (Validator['String'](Proper['data-bs-toggle'])) SetAttribute({ element : Index['content'], attribute : 'data-bs-toggle', value : Proper['data-bs-toggle'] });
                    };
                    if (!Checker['button-select']) {
                        if (Validator['String'](Proper['maxlength'])) SetAttribute({ element : Index['content'], attribute : 'maxlength', value : Proper['maxlength'] });
                        if (Validator['String'](Proper['maxlength'])) SetAttribute({ element : Index['content'], attribute : 'minlength', value : Proper['maxlength'] });
                        if (Validator['String'](Proper['placeholder'])) SetAttribute({ element : Index['content'], attribute : 'placeholder', value : Proper['placeholder'] });
                    };
                    if (Checker['select']) {
                        if (Validator['Boolean'](Proper['multiple'])) Index['content']['multiple'] = Proper['multiple'];
                        if (Validator['String'](Proper['size'])) SetAttribute({ element : Index['content'], attribute : 'size', value : Proper['size'] });
                    };
                    if (!Checker['select-textarea']) {
                        if (Validator['String'](Proper['type'])) SetAttribute({ element : Index['content'], attribute : 'type', value : Proper['type'] });
                    };
                    if (Checker['textarea']) {
                        if (Validator['String'](Proper['rows'])) SetAttribute({ element : Index['content'], attribute : 'rows', value : Proper['rows'] });
                    };
                    if (!Checker['button']) {
                        Content['title'].appendChild(Index['title']);
                        Content['label'].appendChild(Index['label']);
                    };
                    Content['content'].appendChild(Index['content']);
                    if (Checker['select']) {
                        if (Validator['Array'](Proper['option'])) {
                            const OptionArray = [];
                            for (let i = 0; i < Proper['option']['length']; i++) {
                                OptionArray[i] = CreateElement({ element : 'option', textnode : FirstUpper(Proper['option'][i]) });
                                Index['content'].appendChild(OptionArray[i]);
                                Index['content']['options'][i]['disabled'] = !i ? true : false;
                                Index['content']['options'][i]['selected'] = !i ? true : false;
                                Index['content']['options'][i]['value'] = FirstUpper(Proper['option'][i]);
                            };
                        };
                    };
                    if (!Checker['button']) {
                        Content['feedback'].appendChild(Index['feedback']);
                        Content['bottom'].appendChild(Index['bottom']);
                    };
                };
            };
            if (Validator['Object'](Array[i])) {
                Constructor(Array[i]);
            };
            if (Validator['Array'](Array[i])) {
                for (let j = 0; j < Array[i]['length']; j++) {
                    Constructor(Array[i][j]);
                };
            };
        };
    };
};

export const FormFieldValidator = (Input = {}) => {
    if (Validator['Object'](Input)) {
        if ('index' in Input) {
            const Content = document.querySelector(SelectorOrID(Input['index']['id']));
            const Title = Content['parentElement']['parentElement'].querySelector('.title-' + Input['index']['id']) ? Content['parentElement']['parentElement'].querySelector('.title-' + Input['index']['id']) : [ undefined ];
            const Label = Content['parentElement']['parentElement'].querySelector('.label-' + Input['index']['id']) ? Content['parentElement']['parentElement'].querySelector('.label-' + Input['index']['id']) : [ undefined ];
            const Feedback = Content['parentElement']['parentElement'].querySelector('.feedback-' + Input['index']['id']) ? Content['parentElement']['parentElement'].querySelector('.feedback-' + Input['index']['id']) : [ undefined ];
            [ 'change', 'input' ].map(event => {
                if (Content) {
                    Content.addEventListener(event, () => {
                        const Element = Content['value'];
                        if ('Mask' in Input) {
                            if (Validator['Function'](Input['Mask'])) {
                                Input['Mask'](Content);
                            };
                        };
                        if ('Validator' in Input) {
                            if (Validator['Function'](Input['Validator'])) {
                                if (Title) {
                                    if (Input['Validator'](Element)) {
                                        Title['classList'].add(...Classes['approved']);
                                        Title['classList'].remove(...Classes['disapproved']);
                                    };
                                    if (!Input['Validator'](Element)) {
                                        Title['classList'].add(...Classes['disapproved']);
                                        Title['classList'].remove(...Classes['approved']);
                                    };
                                };
                                if (Label) {
                                    if (Input['Validator'](Element)) {
                                        Label['classList'].add(...Classes['approved']);
                                        Label['classList'].remove(...Classes['disapproved']);
                                    };
                                    if (!Input['Validator'](Element)) {
                                        Label['classList'].add(...Classes['disapproved']);
                                        Label['classList'].remove(...Classes['approved']);
                                    };
                                };
                                if (Input['Validator'](Element)) {
                                    Content['classList'].add(...Classes['approved']);
                                    Content['classList'].remove(...Classes['disapproved']);
                                    ButtonColorChange({ status : 'valid' });
                                };
                                if (!Input['Validator'](Element)) {
                                    Content['classList'].add(...Classes['disapproved']);
                                    Content['classList'].remove(...Classes['approved']);
                                };
                                if (Feedback) {
                                    if (Input['Validator'](Element)) {
                                        Feedback['classList'].add(...Classes['approved']);
                                        Feedback['classList'].remove(...Classes['disapproved']);
                                        const TextNode = 'Completo!';
                                        SetTextNode(Feedback, TextNode);
                                    };
                                    if (!Input['Validator'](Element)) {
                                        Feedback['classList'].add(...Classes['disapproved']);
                                        Feedback['classList'].remove(...Classes['approved']);
                                        const TextNode = Validator['String'](Input['index']['feedback']) ? Input['index']['feedback'] : 'Incompleto!';
                                        SetTextNode(Feedback, TextNode);
                                    };
                                };
                            };
                        };
                    });
                };
            });
        };
    };
};

export const FormFieldType = (Input = {}) => {
    FormFieldValidator({
        'index' : Input,
        'Mask' : 'function' in Input ? ('Mask' in Input['function'] ? (Validator['Function'](Input['function']['Mask']) ? Input['function']['Mask'] : [ undefined ]) : [ undefined ]) : [ undefined ],
        'Validator' : 'function' in Input ? ('Validator' in Input['function'] ? (Validator['Function'](Input['function']['Validator']) ? Input['function']['Validator'] : [ undefined ]) : [ undefined ]) : [ undefined ],
    });
};

export const FormFieldParams = (Input = {}) => {
    const Proper = {
        array : 'array' in Input ? (Validator['Array'](Input['array']) ? Input['array'] : []) : [],
        father : 'father' in Input ? (Validator['String'](Input['father']) ? Input['father'] : 'body') : 'body',
    };
    if (Validator['Array'](Proper['array'])) {
        FormFieldBuilder({ array : Proper['array'], father : Proper['father'] });
        for (let i = 0; i < Proper['array']['length']; i++) {
            if (Validator['Object'](Proper['array'][i])) {
                FormFieldType(Proper['array'][i]);
            };
            if (Validator['Array'](Proper['array'][i])) {
                for (let j = 0; j < Proper['array'][i]['length']; j++) {
                    FormFieldType(Proper['array'][i][j]);
                };
            };
        };
    };
};