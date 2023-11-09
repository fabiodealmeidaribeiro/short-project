export const Period = (new Date().getHours() > 6 && new Date().getHours() < 18);

export const ToValidator = {
    email : (Input = '') => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(Input);
    },
    cpf : (Input = '') => {
        Input = Input.replace(/[^\d]/g, '');
        if (Input['length'] !== 11 || /^(.)\1+$/.test(Input))
            return false;
        let Sum = 0;
        for (let i = 0; i < 9; i++)
            Sum += parseInt(Input.charAt(i)) * (10 - i);
        let Rest = Sum % 11;
        let ni = Rest < 2 ? 0 : 11 - Rest;
        Sum = 0;
        for (let i = 0; i < 10; i++)
            Sum += parseInt(Input.charAt(i)) * (11 - i);
        Rest = Sum % 11;
        let nii = Rest < 2 ? 0 : 11 - Rest;
        return (parseInt(Input.charAt(9)) === ni && parseInt(Input.charAt(10)) === nii);
    },
    minimum : (Input = '', number = 2) => {
        return number < Input.trim().split(' ')['length'];
    },
    empty : (Input) => Input <= 0 || Input === '',
    phone : (Input = '') => {
        const DDI = '55', Array = [];
        for (let i = 1; i <= 9; i++) for (let j = 1; j <= 9; j++) Array.push([i] + [j]);
        const DDD = Input.substring(('+' + DDI + ' (')['length'], ('+' + DDI + ' (11')['length']);
        if (Input['length'] <= ('+' + DDI + ' (11) 9 9163-3880').replace(/[^a-zA-Z0-9]/g, '')['length']) { return false; } {
            if (Array.includes(DDD)) {
                return new RegExp(`^\\+${ DDI } \\(${ DDD }\\) 9 [0-9]{4}-[0-9]{4}$`).test(Input);
            };
        };
    },
    date : (Input = '') => {
        return !isNaN(new Date(Input)) && (new Date(Input)).toString() !== 'Invalid Date';
    },
    more : (Input = {}) => {
        const Proper = {
            date : 'date' in Input ? (Input['date'] ? Input['date'] : Date.now()) : Date.now(),
            year : 'year' in Input ? (Input['year'] ? Input['year'] : 18) : 18,
        };
        if (!Proper['date']) return false;
        let CurrentDate = new Date();
        return !((CurrentDate.setDate(CurrentDate.getDate() + 1) - new Date(Proper['date'])) / (1000 * 60 * 60 * 24 * 365.25) < Proper['year']);
    },
};

export const ToMask = {
    camelcase : (Input = '') => {
        Input['value'] = Input['value'].match(/\d+/g) ? Input['value'].replace(/\d+/g, '') : Input['value'];
        var Term = Input['value'].split(' ');
        for (var i = 0; i < Term['length']; i++) Term[i] = Term[i]['length'] > 2 ? Term[i].charAt(0).toUpperCase() + Term[i].slice(1).toLowerCase() : Term[i];
        Input['value'] = Term.join(' ');
    },
    cep : (Input = '') => {
        let Value = Input['value'].replace(/\D/g, '');
        return Input['value'] = Value['length'] === '05109-200'.replace(/[^0-9]/g, '')['length'] ? Value.replace(/(\d{5})(\d{3})/, '$1-$2') : Value;
    },
    cpf : (Input = '') => {
        let Value = Input['value'].replace(/\D/g, '');
        return Input['value'] = Value['length'] === '123.456.789-10'.replace(/[^0-9]/g, '')['length'] ? Value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : Value;
    },
    date : (Input = {}) => {
        const Proper = {
            date : 'date' in Input ? (Input['date'] ? Input['date'] : Date.now()) : Date.now(),
            format : 'format' in Input ? (Input['format'] ? Input['format'] : 'dd/mm/aaaa') : 'dd/mm/aaaa',
            year : 'year' in Input ? (Input['year'] ? Input['year'] : - 18) : - 18,
        };
        const Map = {
            dd : (new Date(Proper['date']).getDate() + 1).toString().padStart(2, '0'),
            mm : (new Date(Proper['date']).getMonth() + 1).toString().padStart(2, '0'),
            aaaa : (new Date(Proper['date']).getFullYear() + Proper['year']),
        };
        return Proper['format'].replace(/mm|dd|aaaa/gi, matched => Map[matched]);
    },
    phone : (Input = '') => {
        const Value = Input['value'].replace(/\D/g, '');
        return Input['value'] = Value['length'] === '+55 (11) 9 9163-3880'.replace(/[^0-9]/g, '')['length'] ? Value.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/, '+$1 ($2) $3 $4-$5') : Value;
    },
};

export const ThereIsKeyWithRealValue = (Input = []) => {
    const Proper = {
        objeto : 'objeto' in Input ? (Validator['Array'](Input['objeto']) ? Input['objeto'] : []) : [],
        key : 'key' in Input ? (Validator['String'](Input['key']) ? Input['key'] : '') : '',
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

export const SumObjectValues = Input => {
    let result = 0;
    for (let key in Input) {
        if (typeof Input[key] === 'number') {
            result += Input[key];
        };
    };
    return result;
};

export const CheckJSONTermination = Input => Input.substr(- 1 * '.json'['length']) === '.json';

export const CheckHTMLTermination = Input => Input.substr(- 1 * '.html'['length']) === '.html';

export const IsHTMLFormat = (Input = '') => Input.startsWith('<') && Input.endsWith('>');

export const SetTextNode = (Input = '', value = '') => Input['textContent'] = Input['innerText'] = Input['value'] = value;

export const GetTextNode = (Input = '') => {
    const TextNode = Input['textContent'] || Input['innerText'] || Input['value'];
    return TextNode ? TextNode : '';
};

export const GetElementContent = (Input = {}) => {
    const Array = [];
    const Proper = {
        path : 'path' in Input ? (Input['path'] ? Input['path'] : '') : '',
        slave : 'slave' in Input ? (Validator['Array'](Input['slave']) ? Input['slave'] : []) : [],
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

export const SelectorOrID = (Input = '') => {
    const result = [ 
        'html', 'head', 'title', 'meta', 'link', 'style', 'script', 'base', 'body', 'h1',
        'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'a', 'img',
        'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'table', 'tr', 'td', 'th', 'caption',
        'form', 'input', 'textarea', 'button', 'select', 'option', 'label', 'fieldset', 'legend', 'iframe', 'audio',
        'video', 'canvas', 'svg', 'div', 'span', 'blockquote', 'q', 'cite', 'abbr', 'code', 'pre',
        'time', 'mark', 'del', 'ins', 'sup', 'sub', 'small', 'strong', 'em', 'dfn', 'samp',
        'kbd', 'var', 'progress', 'meter', 'details', 'summary', 'figure', 'figcaption', 'aside', 'nav', 'header',
        'footer', 'main', 'article', 'section', 'address', 'pre', 'wbr'
     ].filter(index => index.includes(Input));
    return 0 < result['length'] ? Input : ('#' + Input);
};

export const IndexExistenceChecker = (Input = {}) => {
    const result = Input['array'].filter(index => index.includes(Input['index']));
    return 0 < result['length'];
};

export const KeysAreSame = (Input = {}) => {
    const Proper = {
        objeto : 'objeto' in Input ? (Validator['Array'](Input['objeto']) ? Input['objeto'] : []) : [],
        key : 'key' in Input ? (Validator['String'](Input['key']) ? Input['key'] : []) : [],
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

export const PasswordBuilder = (Input = {}) => {
    const Proper = {
        amount : 'amount' in Input ? (Validator['Number'](Input['amount']) ? Input['amount'] : 10) : 10,
        number : 'number' in Input ? (Validator['Boolean'](Input['number']) ? Input['number'] : true) : true,
        special : 'special' in Input ? (Validator['Boolean'](Input['special']) ? Input['special'] : true) : true,
        uppercase : 'uppercase' in Input ? (Validator['Boolean'](Input['uppercase']) ? Input['uppercase'] : true) : true,
    };
    let Char = '', Password = '';
    Char += 'abcdefghijklmnopqrstuvwxyz';
    Char += Validator['Gene'](Proper['number']) ? '0123456789' : '';
    Char += Validator['Gene'](Proper['special']) ? '!@#$%^&*()_+[]{}|;:,.<>?' : '';
    Char += Validator['Gene'](Proper['uppercase']) ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
    for (let i = 0; i < Proper['amount']; i++) Password += Char[Math.floor(Math.random() * Char['length'])];
    return Password;
};

export const JustLetters = (Input = '') => {
    return Input
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

export const JustLowerLetters = (Input = '') => JustLetters(Input).toLowerCase();

export const FirstUpper = (Input = '') => ((Input).charAt(0).toUpperCase() + (Input).slice(1)).trim();

export const LinkedinWidget = (Input = {}) => {
    const Proper = {
        class : 'class' in Input ? (Validator['Array'](Input['class']) ? Input['class'] : [ 'badge-base', 'LI-profile-badge' ]) : [ 'badge-base', 'LI-profile-badge' ],
        father : 'father' in Input ? (Validator['String'](Input['father']) ? Input['father'] : 'body') : 'body',
        locale : 'data-locale' in Input ? (Validator['String'](Input['data-locale']) ? Input['data-locale'] : 'pt_BR') : 'pt_BR',
        size : 'data-size' in Input ? (Validator['String'](Input['data-size']) ? Input['data-size'] : 'medium') : 'medium',
        theme : 'data-theme' in Input ? (Validator['String'](Input['data-theme']) ? Input['data-theme'] : 'light') : 'light',
        type : 'data-type' in Input ? (Validator['String'](Input['data-type']) ? Input['data-type'] : 'VERTICAL') : 'VERTICAL',
        vanity : 'data-vanity' in Input ? (Validator['String'](Input['data-vanity']) ? Input['data-vanity'] : 'fabiodealmeidaribeiro') : 'fabiodealmeidaribeiro',
        version : 'data-version' in Input ? (Validator['String'](Input['data-version']) ? Input['data-version'] : 'v1') : 'v1',
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

export const IndexProper = Input => {
    return {
        'aria-label' : 'aria-label' in Input ? (Validator['String'](Input['aria-label']) ? Input['aria-label'].trim() : '') : '',
        bottom : 'bottom' in Input ? (Validator['Boolean'](Input['bottom']) ? Input['bottom'] : false) : false,
        classes : 'classes' in Input ? (Validator['Array'](Input['classes']) ? Input['classes'] : []) : [],
        'data-bs-target' : 'data-bs-target' in Input ? (Validator['String'](Input['data-bs-target']) ? SelectorOrID(Input['data-bs-target']) : '') : '',
        'data-bs-toggle' : 'data-bs-toggle' in Input ? (Validator['String'](Input['data-bs-toggle']) ? Input['data-bs-toggle'].trim() : '') : '',
        feedback : 'feedback' in Input ? (Validator['String'](Input['feedback']) ? Input['feedback'].trim() : '') : '',
        disabled : 'disabled' in Input ? (Validator['Boolean'](Input['disabled']) ? Input['disabled'] : false) : false,
        function : 'function' in Input ? (Validator['Function'](Input['function']) ? Input['function'] : {}) : {},
        id : 'id' in Input ? (Validator['String'](Input['id']) ? Input['id'].trim() : JustLetters(PasswordBuilder())) : JustLetters(PasswordBuilder()),
        label : 'label' in Input ? (Validator['String'](Input['label']) ? Input['label'].trim() : '') : '',
        maxlength : 'maxlength' in Input ? (Validator['Number'](Input['maxlength']) ? Input['maxlength'].toString() : '') : '',
        minlength : 'minlength' in Input ? (Validator['Number'](Input['minlength']) ? Input['minlength'].toString() : '') : '',
        multiple : 'multiple' in Input ? (Validator['Boolean'](Input['multiple']) ? Input['multiple'] : false) : false,
        option : 'option' in Input ? (Validator['Array'](Input['option']) ? Input['option'] : []) : [],
        rows : 'rows' in Input ? (Validator['Number'](Input['rows']) ? Input['rows'].toString() : '') : '',
        size : 'size' in Input ? (Validator['Number'](Input['size']) ? Input['size'].toString() : '') : '',
        placeholder : 'placeholder' in Input ? (Validator['String'](Input['placeholder']) ? Input['placeholder'].trim() : '') : '',
        selector : 'selector' in Input ? (Validator['String'](Input['selector']) ? Input['selector'] : 'input') : 'input',
        style : 'style' in Input ? (Validator['Object'](Input['style']) ? Input['style'] : {}) : {},
        title : 'title' in Input ? (Validator['String'](Input['title']) ? Input['title'] : '') : '',
        type : 'type' in Input ? (Validator['String'](Input['type']) ? Input['type'] : 'text') : 'text',
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

export const ButtonColorChange = (Input = {}) => {
    const Proper = {
        id : 'id' in Input ? (Validator['String'](Input['id']) ? Input['id'] : '') : '',
        status : 'status' in Input ? (Validator['String'](Input['status']) ? Input['status'] : 'invalid') : 'invalid',
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

export const NoUnit = Input => parseFloat(Input.replace('px', '').replace('rem', ''));

export const TransitionRunning = (Input) => getComputedStyle(Input)['transition'] === 'running';

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