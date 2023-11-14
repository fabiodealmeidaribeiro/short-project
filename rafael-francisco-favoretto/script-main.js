export const Validator = {
    Array : Input => !(Input === false || Input === null || Input === undefined || Input['length'] === 0) && typeof Input === 'object' && Array.isArray(Input),
    Boolean : Input => !(Input === null || Input === undefined) && typeof Input === 'boolean',
    Function : Input => {
        if (!(Input === null || Input === undefined || Input === false)) {
            if (typeof Input === 'function') {
                const Treat = Input.toString().replace(/\s+/g, '');
                return !(Treat === 'function(){}' || Treat === '()=>{}' || Treat === '(Input)=>{}' || Treat === 'Input=>{}');
            };
        };
    },
    Gene : Input => !(Input === false || Input === null || Input === undefined || Input === 0 || Input === ''),
    Number : Input => !(Input === false || Input === null || Input === undefined || Input === 0) && typeof Input === 'number',
    Object : Input => !(Input === false || Input === null || Input === undefined || Input['length'] === 0) && typeof Input === 'object' && !Array.isArray(Input) && Object.keys(Input)['length'] !== 0,
    String : Input => !(Input === false || Input === null || Input === undefined || Input === '') && typeof Input === 'string',
};

export const AddRemoveClass = (Input = {}) => {
    const Proper = {
        classes : 'classes' in Input ? (Validator['Array'](Input['classes']) ? Input['classes'] : []) : [],
        element : 'element' in Input ? (Validator['Array'](Input['element']) ? Input['element'] : []) : [],
        method : 'method' in Input ? (Validator['String'](Input['method']) ? Input['method'] : 'add') : 'add',
    };
    if (Validator['Array'](Proper['element'])) {
        for (let x = 0; x < Proper['element']['length']; x++) {
            for (let y = 0; y < document.querySelectorAll(Proper['element'][x])['length']; y++) {
                for (let z = 0; z < Proper['classes']['length']; z++) {
                    document.querySelectorAll(Proper['element'][x])[y]['classList'][Proper['method']](Proper['classes'][z]);
                };
            };
        };
    };
};

export const CreateElement = (Input = {}) => {
    const Proper = {
        element : 'element' in Input ? (Validator['String'](Input['element']) ? Input['element'] : 'div') : 'div',
        textnode : 'textnode' in Input ? (Validator['String'](Input['textnode']) ? Input['textnode'] : '') : '',
    };
    let Result = document.createElement(Proper['element']);
    if (Validator['Gene'](Proper['textnode'])) {
        Result.appendChild(document.createTextNode(Proper['textnode']));
    };
    return Result;
};

export const SetAttribute = (Input = {}) => {
    let Proper = {
        attribute : 'attribute' in Input ? (Validator['String'](Input['attribute']) ? Input['attribute'] : [ undefined ]) : [ undefined ],
        element : 'element' in Input ? (Validator['Gene'](Input['element']) ? Input['element'] : [ undefined ]) : [ undefined ],
        value : 'value' in Input ? (Validator['Array'](Input['value']) || Validator['Object'](Input['value']) || Validator['String'](Input['value']) ? Input['value'] : '') : '',
    };
    if (Validator['Gene'](Proper['element']) && Validator['String'](Proper['attribute']) && Validator['Gene'](Proper['value'])) {
        Proper['attribute'] = document.createAttribute(Proper['attribute']);
        Proper['attribute']['value'] = '';
        if (Validator['String'](Proper['value'])) {
            Proper['attribute']['value'] = Proper['value'];
        };
        if (Validator['Array'](Proper['value'])) {
            for (let i = 0; i < Proper['value']['length']; i++) {
                Proper['attribute']['value'] += Proper['value'][i];
                Proper['attribute']['value'] += i < Proper['value']['length'] - 1 ? ' ' : '';
            };
        };
        if (Validator['Object'](Proper['value'])) {
            for (let i = 0; i < Object.keys(Proper['value'])['length']; i++) {
                Proper['attribute']['value'] += Object.keys(Proper['value'])[i] + ': ' + Proper['value'][Object.keys(Proper['value'])[i]] + ';';
                Proper['attribute']['value'] += i < Object.keys(Proper['value'])['length'] - 1 ? ' ' : '';
            };
        };
        Proper['element'].setAttributeNode(Proper['attribute']);
    };
};