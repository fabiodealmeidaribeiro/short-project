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
        let Value = Input['value'].replace(/\D/g, '');
        return Input['value'] = Value['length'] === '12.345.678/0001-00'.replace(/[^0-9]/g, '')['length']
        ? Value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : Value;
    },
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
    more : (Input = {}) => {
        const Proper = {
            date : 'date' in Input ? (Input['date'] ? Input['date'] : Date.now()) : Date.now(),
            year : 'year' in Input ? (Input['year'] ? Input['year'] : 18) : 18,
        };
        if (!Proper['date']) return false;
        let CurrentDate = new Date();
        return !((CurrentDate.setDate(CurrentDate.getDate() + 1) - new Date(Proper['date'])) / (1000 * 60 * 60 * 24 * 365.25) < Proper['year']);
    },
    cpnj : (Input = '') => {
        // Remove os pontos e traços do CNPJ.
        Input = Input.replace(/\.|\-/g, '');
        // Verifica se o Input tem 14 dígitos.
        if (Input['length'] !== 14) return false;
        // Calcula o primeiro dígito verificador.
        let FirstDigit = 0;
        for (let i = 0; i < 12; i++) FirstDigit += (i + 1) * Input[i];
        FirstDigit = FirstDigit % 11;
        FirstDigit = (11 - FirstDigit) % 10;
        // Verifica se o primeiro dígito verificador é o correto.
        if (FirstDigit !== Input[12]) return false;
        // Calcula o segundo dígito verificador.
        let SecondDigit = 0;
        for (let i = 0; i < 13; i++) SecondDigit += (i + 2) * Input[i];
        SecondDigit = SecondDigit % 11;
        SecondDigit = (11 - SecondDigit) % 10;
        // Verifica se o segundo dígito verificador é o correto.
        if (SecondDigit !== Input[13]) return false;
        // O CNPJ é válido.
        return true;
    },
};