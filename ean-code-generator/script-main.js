export const Period = (new Date().getHours()) > 6 && (new Date().getHours()) < (6 + 24 / 2);

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

export const Titleize = (Input) => Input.replace(/\b\w/g, Match => Match.toUpperCase());

export const Mask = {
    camelcase : (Input = '') => {
        Input['value'] = Input['value'].match(/\d+/g) ? Input['value'].replace(/\d+/g, '') : Input['value'];
        var Term = Input['value'].split(' ');
        for (var i = 0; i < Term['length']; i++) {
            Term[i] = Term[i]['length'] > 2 ? Term[i].charAt(0).toUpperCase() + Term[i].slice(1).toLowerCase() : Term[i];
        };
        Input['value'] = Term.join(' ');
    },
    cep : (Input = '') => {
        let Value = Input['value'].replace(/\D/g, '');
        return Input['value'] = Value['length'] === '05109-200'.replace(/[^0-9]/g, '')['length']
        ? Value.replace(/(\d{5})(\d{3})/, '$1-$2') : Value;
    },
    cpf : (Input = '') => {
        let Value = Input['value'].replace(/\D/g, '');
        return Input['value'] = Value['length'] === '123.456.789-10'.replace(/[^0-9]/g, '')['length']
        ? Value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : Value;
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
        return Proper['format'].replace(/mm|dd|aaaa/gi, Matched => Map[Matched]);
    },
    phone : (Input = '') => {
        const Value = Input['value'].replace(/\D/g, '');
        return Input['value'] = Value['length'] === '+55 (11) 9 9163-3880'.replace(/[^0-9]/g, '')['length']
        ? Value.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/, '+$1 ($2) $3 $4-$5')
        : Value;
    },
    cnpj : (Input = '') => {
        const Value = Input['value'].replace(/\D/g, '');
        return Input['value'] = Value['length'] === '12.345.678/0001-45'.replace(/[^0-9]/g, '')['length']
        ? Value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : Value;
    },
};

export const JSONFetch = async (Input = '') => {
    const Response = await fetch(Input);
    const Result = await Response.json();
    return Result;
};

export const Check = {
    email : (Input = '') => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(Input);
    },
    cpf : (Input = '') => {
        Input = Input.replace(/[^\d]/g, '');
        if (Input['length'] !== 11 || /^(.)\1+$/.test(Input)) return false;
        let Sum = 0;
        for (let i = 0; i < 9; i++) Sum += parseInt(Input.charAt(i)) * (10 - i);
        let Rest = Sum % 11;
        let ni = Rest < 2 ? 0 : 11 - Rest;
        Sum = 0;
        for (let i = 0; i < 10; i++) Sum += parseInt(Input.charAt(i)) * (11 - i);
        Rest = Sum % 11;
        let nii = Rest < 2 ? 0 : 11 - Rest;
        return (parseInt(Input.charAt(9)) === ni && parseInt(Input.charAt(10)) === nii);
    },
    minimum : (Input = '', Number = 2) => {
        return Number < Input.trim().split(' ')['length'];
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
    adulthood : (Input = {}) => {
        const Proper = {
            date : 'date' in Input ? (Input['date'] ? Input['date'] : Date.now()) : Date.now(),
            year : 'year' in Input ? (Input['year'] ? Input['year'] : 18) : 18,
        };
        if (!Proper['date']) return false;
        let CurrentDate = new Date();
        return !((CurrentDate.setDate(CurrentDate.getDate() + 1) - new Date(Proper['date'])) / (1000 * 60 * 60 * 24 * 365.25) < Proper['year']);
    },
    cpnj : (Input = '') => {
        Input = Input.replace(/\.|\-/g, '');
        if (Input['length'] !== 14) return false;
        let FirstDigit = 0;
        for (let i = 0; i < 12; i++) FirstDigit += (i + 1) * Input[i];
        FirstDigit = FirstDigit % 11;
        FirstDigit = (11 - FirstDigit) % 10;
        if (FirstDigit !== Input[12]) return false;
        let SecondDigit = 0;
        for (let i = 0; i < 13; i++) SecondDigit += (i + 2) * Input[i];
        SecondDigit = SecondDigit % 11;
        SecondDigit = (11 - SecondDigit) % 10;
        if (SecondDigit !== Input[13]) return false;
        return true;
    },
};
