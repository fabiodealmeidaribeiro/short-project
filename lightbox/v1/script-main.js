export const Validator = {
    Array : output => !(output === false || output === null || output === undefined || output['length'] === 0) && typeof output === 'object' && Array.isArray(output),
    Boolean : output => !(output === null || output === undefined) && typeof output === 'boolean',
    Function : output => {
        if (!(output === null || output === undefined || output === false)) {
            if (typeof output === 'function') {
                const Treat = output.toString().replace(/\s+/g, '');
                return !(Treat === 'function(){}' || Treat === '()=>{}' || Treat === '(output)=>{}' || Treat === 'output=>{}');
            };
        };
    },
    Gene : output => !(output === false || output === null || output === undefined || output === 0 || output === ''),
    Number : output => !(output === false || output === null || output === undefined || output === 0) && typeof output === 'number',
    Object : output => !(output === false || output === null || output === undefined || output['length'] === 0) && typeof output === 'object' && !Array.isArray(output) && Object.keys(output)['length'] !== 0,
    String : output => !(output === false || output === null || output === undefined || output === '') && typeof output === 'string',
};
export const OnlyNumber = output => parseFloat(output.replace('px', '').replace('rem', ''));
export const TransitionRunning = (output) => getComputedStyle(output)['transition'] === 'running';
export const AddRemoveClass = (output = {}) => {
    const Proper = {
        classes : 'classes' in output ? (Validator['Array'](output['classes']) ? output['classes'] : []) : [],
        element : 'element' in output ? (Validator['Array'](output['element']) ? output['element'] : []) : [],
        method : 'method' in output ? (Validator['String'](output['method']) ? output['method'] : 'add') : 'add',
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
export const CreateElement = (output = {}) => {
    const Proper = {
        element : 'element' in output ? (Validator['String'](output['element']) ? output['element'] : 'div') : 'div',
        textnode : 'textnode' in output ? (Validator['String'](output['textnode']) ? output['textnode'] : '') : '',
    };
    let Result = document.createElement(Proper['element']);
    if (Validator['Gene'](Proper['textnode'])) {
        Result.appendChild(document.createTextNode(Proper['textnode']));
    };
    return Result;
};
export const SetAttribute = (output = {}) => {
    let Proper = {
        attribute : 'attribute' in output ? (Validator['String'](output['attribute']) ? output['attribute'] : [ undefined ]) : [ undefined ],
        element : 'element' in output ? (Validator['Gene'](output['element']) ? output['element'] : [ undefined ]) : [ undefined ],
        value : 'value' in output ? (Validator['Array'](output['value']) || Validator['Object'](output['value']) || Validator['String'](output['value']) ? output['value'] : '') : '',
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