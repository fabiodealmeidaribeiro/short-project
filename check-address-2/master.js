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