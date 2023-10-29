// export async function FetchAndParseImage (output) {
//     try {
//         const Response = await fetch(output);
//         if (!Response['ok'])
//             throw new Error(Response['status']);
//         const Html = await Response.text();
//         const Parser = new DOMParser();
//         const DOC = Parser.parseFromString(Html, 'text/html');
//         DOC.querySelectorAll('img').forEach(index => {
//             console.log(index.getAttribute('src'));
//         });
//     } catch (error) {
//         console.error(error['message']);
//     };
// };

// const fetchData = async (output = '') => {
//     if (output) {
//         const Response = await fetch(output);
//         const Result = await Response.json();
//         return Result;
//     };
// };

export const Period = (new Date().getHours() > 6 && new Date().getHours() < 18);

// export const XPathReturn = (output = {}) => {
//     return document.evaluate('//' + output['selector'] + '[@id=\'' + output['id'] + '\']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)['singleNodeValue']['outerHTML'];
// };

export const Is = {
    email : (output = '') => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(output);
    },
    cpf : (output = '') => {
        output = output.replace(/[^\d]/g, '');
        if (output['length'] !== 11 || /^(.)\1+$/.test(output))
            return false;
        let Sum = 0;
        for (let i = 0; i < 9; i++)
            Sum += parseInt(output.charAt(i)) * (10 - i);
        let Rest = Sum % 11;
        let ni = Rest < 2 ? 0 : 11 - Rest;
        Sum = 0;
        for (let i = 0; i < 10; i++)
            Sum += parseInt(output.charAt(i)) * (11 - i);
        Rest = Sum % 11;
        let nii = Rest < 2 ? 0 : 11 - Rest;
        return (parseInt(output.charAt(9)) === ni && parseInt(output.charAt(10)) === nii);
    },
    minimum : (output = '', number = 2) => {
        return number < output.trim().split(' ')['length'];
    },
    noempty : (output) => {
        return !(output <= 0 || output === '');
    },
    phone : (output = '') => {
        const DDI = '55', Array = [];
        for (let i = 1; i <= 9; i++) for (let j = 1; j <= 9; j++) Array.push([i] + [j]);
        const DDD = output.substring(('+' + DDI + ' (')['length'], ('+' + DDI + ' (11')['length']);
        if (output['length'] <= ('+' + DDI + ' (11) 9 9163-3880').replace(/[^a-zA-Z0-9]/g, '')['length']) { return false; } {
            if (Array.includes(DDD)) {
                return new RegExp(`^\\+${ DDI } \\(${ DDD }\\) 9 [0-9]{4}-[0-9]{4}$`).test(output);
            };
        };
    },
    date : (output = '') => {
        return !isNaN(new Date(output)) && (new Date(output)).toString() !== 'Invalid Date';
    },
    more : (output = {}) => {
        const Proper = {
            date : 'date' in output ? (output['date'] ? output['date'] : Date.now()) : Date.now(),
            year : 'year' in output ? (output['year'] ? output['year'] : 18) : 18,
        };
        if (!Proper['date']) return false;
        let CurrentDate = new Date();
        return !((CurrentDate.setDate(CurrentDate.getDate() + 1) - new Date(Proper['date'])) / (1000 * 60 * 60 * 24 * 365.25) < Proper['year']);
    },
};

export const Apply = {
    camelcase : (output = '') => {
        output['value'] = output['value'].match(/\d+/g) ? output['value'].replace(/\d+/g, '') : output['value'];
        var Term = output['value'].split(' ');
        for (var i = 0; i < Term['length']; i++) Term[i] = Term[i]['length'] > 2 ? Term[i].charAt(0).toUpperCase() + Term[i].slice(1).toLowerCase() : Term[i];
        output['value'] = Term.join(' ');
    },
    cep : (output = '') => {
        let Value = output['value'].replace(/\D/g, '');
        return output['value'] = Value['length'] === '05109-200'.replace(/[^0-9]/g, '')['length'] ? Value.replace(/(\d{5})(\d{3})/, '$1-$2') : Value;
    },
    cpf : (output = '') => {
        let Value = output['value'].replace(/\D/g, '');
        return output['value'] = Value['length'] === '123.456.789-10'.replace(/[^0-9]/g, '')['length'] ? Value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : Value;
    },
    date : (output = {}) => {
        const Proper = {
            date : 'date' in output ? (output['date'] ? output['date'] : Date.now()) : Date.now(),
            format : 'format' in output ? (output['format'] ? output['format'] : 'dd/mm/aaaa') : 'dd/mm/aaaa',
            year : 'year' in output ? (output['year'] ? output['year'] : - 18) : - 18,
        };
        const Map = {
            dd : (new Date(Proper['date']).getDate() + 1).toString().padStart(2, '0'),
            mm : (new Date(Proper['date']).getMonth() + 1).toString().padStart(2, '0'),
            aaaa : (new Date(Proper['date']).getFullYear() + Proper['year']),
        };
        return Proper['format'].replace(/mm|dd|aaaa/gi, matched => Map[matched]);
    },
    phone : (output = '') => {
        const Value = output['value'].replace(/\D/g, '');
        return output['value'] = Value['length'] === '+55 (11) 9 9163-3880'.replace(/[^0-9]/g, '')['length'] ? Value.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/, '+$1 ($2) $3 $4-$5') : Value;
    },
};

export const ThereIsKeyWithRealValue = (output = []) => {
    const Proper = {
        objeto : 'objeto' in output ? (Validator['Array'](output['objeto']) ? output['objeto'] : []) : [],
        key : 'key' in output ? (Validator['String'](output['key']) ? output['key'] : '') : '',
    };
    if (Validator['Array'](Proper['objeto'])) {
        if (Validator['String'](Proper['key'])) {
            for (let i = 0; i < Proper['objeto']['length']; i++) {
                if (Proper['objeto'][i].hasOwnProperty(Proper['key']) && Proper['objeto'][i][Proper['key']]) {
                    return true;
                };
            };
        };
    };
    return false;
};

export const LocalLanguage = () => (navigator['language'] || navigator['userLanguage']) === 'pt-BR';

export const SumObjectValues = output => {
    let result = 0;
    for (let key in output) {
        if (typeof output[key] === 'number') {
            result += output[key];
        };
    };
    return result;
};

export const CheckJSONTermination = output => output.substr(- 1 * '.json'['length']) === '.json';

export const CheckHTMLTermination = output => output.substr(- 1 * '.html'['length']) === '.html';

export const IsHTMLFormat = (output = '') => output.startsWith('<') && output.endsWith('>');

export const SetTextNode = (output = '', value = '') => output['textContent'] = output['innerText'] = output['value'] = value;

export const GetTextNode = (output = '') => {
    const TextNode = output['textContent'] || output['innerText'] || output['value'];
    return TextNode ? TextNode : '';
};

export const GetElementContent = (output = {}) => {
    const Array = [];
    const Proper = {
        path : 'path' in output ? (output['path'] ? output['path'] : '') : '',
        slave : 'slave' in output ? (Validator['Array'](output['slave']) ? output['slave'] : []) : [],
    };
    const Master = Proper['slave'].shift();
    if (Proper['path']) {
        Proper['path'].querySelectorAll('.' + Master).forEach((element, i) => {
            Array.push({ [ Master ] : (element ? GetTextNode(element) : '') });
            Proper['slave'].map(index => {
                const Element = Proper['path'].querySelectorAll('.' + index)[i];
                Array[i][index] = Element ? GetTextNode(Element) : '';
            });
        });
    };
    return Array;
};

export const SelectorOrID = (output = '') => {
    const result = [ 
        'html', 'head', 'title', 'meta', 'link', 'style', 'script', 'base', 'body', 'h1',
        'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'a', 'img',
        'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'table', 'tr', 'td', 'th', 'caption',
        'form', 'input', 'textarea', 'button', 'select', 'option', 'label', 'fieldset', 'legend', 'iframe', 'audio',
        'video', 'canvas', 'svg', 'div', 'span', 'blockquote', 'q', 'cite', 'abbr', 'code', 'pre',
        'time', 'mark', 'del', 'ins', 'sup', 'sub', 'small', 'strong', 'em', 'dfn', 'samp',
        'kbd', 'var', 'progress', 'meter', 'details', 'summary', 'figure', 'figcaption', 'aside', 'nav', 'header',
        'footer', 'main', 'article', 'section', 'address', 'pre', 'wbr'
     ].filter(index => index.includes(output));
    return 0 < result['length'] ? output : ('#' + output);
};

export const IndexExistenceChecker = (output = {}) => {
    const result = output['array'].filter(index => index.includes(output['index']));
    return 0 < result['length'];
};

export const KeysAreSame = (output = {}) => {
    const Proper = {
        objeto : 'objeto' in output ? (Validator['Array'](output['objeto']) ? output['objeto'] : []) : [],
        key : 'key' in output ? (Validator['String'](output['key']) ? output['key'] : []) : [],
    };
    if (Validator['Gene'](Proper['objeto']) && Validator['Gene'](Proper['key'])) {
        if (!Validator['Gene'](Proper['objeto']['length'])) {
            return false;
        };
        for (let i = 1; i < Proper['objeto']['length']; i++) {
            if (Proper['objeto'][i][Proper['key']] !== Proper['objeto'][0][Proper['key']]) {
                return false;
            };
        };
    };
    return Proper['objeto'][0][Proper['key']];
};

export const PasswordBuilder = (output = {}) => {
    const Proper = {
        amount : 'amount' in output ? (Validator['Number'](output['amount']) ? output['amount'] : 10) : 10,
        number : 'number' in output ? (Validator['Boolean'](output['number']) ? output['number'] : true) : true,
        special : 'special' in output ? (Validator['Boolean'](output['special']) ? output['special'] : true) : true,
        uppercase : 'uppercase' in output ? (Validator['Boolean'](output['uppercase']) ? output['uppercase'] : true) : true,
    };
    let Char = '', Password = '';
    Char += 'abcdefghijklmnopqrstuvwxyz';
    Char += Validator['Gene'](Proper['number']) ? '0123456789' : '';
    Char += Validator['Gene'](Proper['special']) ? '!@#$%^&*()_+[]{}|;:,.<>?' : '';
    Char += Validator['Gene'](Proper['uppercase']) ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
    for (let i = 0; i < Proper['amount']; i++) Password += Char[Math.floor(Math.random() * Char['length'])];
    return Password;
};

export const JustLetters = (output = '') => {
    return output
    .replace(/[^\w\s\-ÁÀÂÃáàâãÉÈÊéèêÍÌíìÓÒÔÕóòôõÚÙÛúùûÇç]/gi, '')
    .replace(/[ÁÀÂÃ]/gi, 'A').replace(/[áàâã]/gi, 'a')
    .replace(/[ÉÈÊ]/gi, 'E').replace(/[éèê]/gi, 'e')
    .replace(/[ÍÌ]/gi, 'I').replace(/[íì]/gi, 'i')
    .replace(/[ÓÒÔÕ]/gi, 'O').replace(/[óòôõ]/gi, 'o')
    .replace(/[ÚÙÛ]/gi, 'U').replace(/[úùû]/gi, 'u')
    .replace(/[Ç]/gi, 'C').replace(/[ç]/gi, 'c')
    .replace(/[_]/gi, '')
    .replace(/\s+/gi, '');
};

export const JustLowerLetters = (output = '') => JustLetters(output).toLowerCase();

export const FirstUpper = (output = '') => ((output).charAt(0).toUpperCase() + (output).slice(1)).trim();

export const LinkedinWidget = (output = {}) => {
    const Proper = {
        class : 'class' in output ? (Validator['Array'](output['class']) ? output['class'] : [ 'badge-base', 'LI-profile-badge' ]) : [ 'badge-base', 'LI-profile-badge' ],
        father : 'father' in output ? (Validator['String'](output['father']) ? output['father'] : 'body') : 'body',
        locale : 'data-locale' in output ? (Validator['String'](output['data-locale']) ? output['data-locale'] : 'pt_BR') : 'pt_BR',
        size : 'data-size' in output ? (Validator['String'](output['data-size']) ? output['data-size'] : 'medium') : 'medium',
        theme : 'data-theme' in output ? (Validator['String'](output['data-theme']) ? output['data-theme'] : 'light') : 'light',
        type : 'data-type' in output ? (Validator['String'](output['data-type']) ? output['data-type'] : 'VERTICAL') : 'VERTICAL',
        vanity : 'data-vanity' in output ? (Validator['String'](output['data-vanity']) ? output['data-vanity'] : 'fabiodealmeidaribeiro') : 'fabiodealmeidaribeiro',
        version : 'data-version' in output ? (Validator['String'](output['data-version']) ? output['data-version'] : 'v1') : 'v1',
    };
    const Container = CreateElement();
    SetAttribute({ element : Container, attribute : 'class', value : [ ...Proper['class'], 'mb-5', 'mx-auto' ] });
    SetAttribute({ element : Container, attribute : 'data-locale', value : Proper['locale'] });
    SetAttribute({ element : Container, attribute : 'data-size', value : Proper['size'] });
    SetAttribute({ element : Container, attribute : 'data-theme', value : Proper['theme'] });
    SetAttribute({ element : Container, attribute : 'data-type', value : Proper['type'] });
    SetAttribute({ element : Container, attribute : 'data-vanity', value : Proper['vanity'] });
    SetAttribute({ element : Container, attribute : 'data-version', value : Proper['version'] });
    SetAttribute({ element : Container, attribute : 'style', value : { background : '#e9ecef', height : '240.98px', width : '250px' }});
    if (document.querySelector(Proper['father'])) document.querySelector(Proper['father']).appendChild(Container);
};

export const IndexProper = output => {
    return {
        'aria-label' : 'aria-label' in output ? (Validator['String'](output['aria-label']) ? output['aria-label'].trim() : '') : '',
        bottom : 'bottom' in output ? (Validator['Boolean'](output['bottom']) ? output['bottom'] : false) : false,
        classes : 'classes' in output ? (Validator['Array'](output['classes']) ? output['classes'] : []) : [],
        'data-bs-target' : 'data-bs-target' in output ? (Validator['String'](output['data-bs-target']) ? SelectorOrID(output['data-bs-target']) : '') : '',
        'data-bs-toggle' : 'data-bs-toggle' in output ? (Validator['String'](output['data-bs-toggle']) ? output['data-bs-toggle'].trim() : '') : '',
        feedback : 'feedback' in output ? (Validator['String'](output['feedback']) ? output['feedback'].trim() : '') : '',
        disabled : 'disabled' in output ? (Validator['Boolean'](output['disabled']) ? output['disabled'] : false) : false,
        function : 'function' in output ? (Validator['Function'](output['function']) ? output['function'] : {}) : {},
        id : 'id' in output ? (Validator['String'](output['id']) ? output['id'].trim() : JustLetters(PasswordBuilder())) : JustLetters(PasswordBuilder()),
        label : 'label' in output ? (Validator['String'](output['label']) ? output['label'].trim() : '') : '',
        maxlength : 'maxlength' in output ? (Validator['Number'](output['maxlength']) ? output['maxlength'].toString() : '') : '',
        minlength : 'minlength' in output ? (Validator['Number'](output['minlength']) ? output['minlength'].toString() : '') : '',
        multiple : 'multiple' in output ? (Validator['Boolean'](output['multiple']) ? output['multiple'] : false) : false,
        option : 'option' in output ? (Validator['Array'](output['option']) ? output['option'] : []) : [],
        rows : 'rows' in output ? (Validator['Number'](output['rows']) ? output['rows'].toString() : '') : '',
        size : 'size' in output ? (Validator['Number'](output['size']) ? output['size'].toString() : '') : '',
        placeholder : 'placeholder' in output ? (Validator['String'](output['placeholder']) ? output['placeholder'].trim() : '') : '',
        selector : 'selector' in output ? (Validator['String'](output['selector']) ? output['selector'] : 'input') : 'input',
        style : 'style' in output ? (Validator['Object'](output['style']) ? output['style'] : {}) : {},
        title : 'title' in output ? (Validator['String'](output['title']) ? output['title'] : '') : '',
        type : 'type' in output ? (Validator['String'](output['type']) ? output['type'] : 'text') : 'text',
    };
};

export const InvalidElements = () => {
    const Array = [];
    [ ...[ 'title', 'label', 'content', 'feedback' ].filter(index => index === 'content') ].map(index => {
        document.querySelector('form').querySelectorAll('.' + index).forEach((element, i) => {
            if (element) {
                Array[i] = !element['classList'].contains('is-valid') ? 1 : 0;
            };
        });
    });
    let Result = 0;
    for (let Key in Array) {
        if (typeof Array[Key] === 'number') {
            Result += Array[Key];
        };
    };
    return Result;
};

export const ButtonColorChange = (output = {}) => {
    const Proper = {
        id : 'id' in output ? (Validator['String'](output['id']) ? output['id'] : '') : '',
        status : 'status' in output ? (Validator['String'](output['status']) ? output['status'] : 'invalid') : 'invalid',
    };
    [ 'button-sender', 'button-result' ].map(index => {
        if (Proper['status'] === 'invalid') {
            document.querySelector(SelectorOrID(index))['classList'].add(...[
                ...Proper['id'] === index ? [ 'btn-danger' ] : [ 'btn-outline-secondary' ],
            ]);
            document.querySelector(SelectorOrID(index))['classList'].remove(...[
                ...Proper['id'] !== index ? [ 'btn-danger' ] : [ 'btn-outline-secondary' ],
            ]);
        };
        if (Proper['status'] === 'valid') {
            document.querySelector(SelectorOrID(index))['classList'].add(...[ 'btn-outline-secondary' ]);
            document.querySelector(SelectorOrID(index))['classList'].remove(...[ 'btn-danger' ]);
        };
    });
};

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

export const NoUnit = output => parseFloat(output.replace('px', '').replace('rem', ''));

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