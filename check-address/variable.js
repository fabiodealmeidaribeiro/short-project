import {
    Mask,
    Check,
} from './main.js';

export const FormatDate = (Input = {}) => {
    const Proper = {
        date : 'date' in Input ? (Input['date'] ? Input['date'] : Date.now()) : Date.now(),
        format : 'format' in Input ? (Input['format'] ? Input['format'] : 'dd/mm/aaaa') : 'dd/mm/aaaa',
        year : 'year' in Input ? (Input['year'] ? Input['year'] : - 18) : - 18,
    };
    const Map = {
        dd : (new Date(Proper['date']).getDate()).toString().padStart(2, '0'),
        mm : (new Date(Proper['date']).getMonth() + 1).toString().padStart(2, '0'),
        aaaa : (new Date(Proper['date']).getFullYear() + Proper['year']),
    };
    return Proper['format'].replace(/mm|dd|aaaa/gi, matched => Map[matched]);
};

export const ClassesArray = {
    container : [
        'align-items-center', 'd-flex', 'flex-column', 'justify-content-center', 'pb-5',
    ],
    content : [
        'bg-white', 'border', 'border-1', 'cursor-pointer', 'mb-3', 'rounded-3', 'shadow-sm',
    ],
    dimension : [
        'col-12', 'col-lg-8', 'mx-auto',
    ],
    text : [
        'text-secondary', 'm-0', 'p-0', 'w-100',
    ],
};

export const Classes = {
    a : [ 'fst-italic', 'fw-bold', 'm-0', 'p-0', 'text-danger', 'text-decoration-none', 'w-100' ],
    body : [ 'bg-light', 'px-3' ],
    button : [ 'btn', 'btn-outline-secondary', 'cursor-pointer', 'm-0', 'p-2' ],
    disabled : [ 'bg-light', 'text-success' ],
    figure : [ ...ClassesArray['content'], 'p-2', ],
    footer : [ ...ClassesArray['container'] ],
    form : [ ...ClassesArray['dimension'], ...ClassesArray['content'], 'p-3' ],
    h : [ ...ClassesArray['text'] ],
    header : [ ...ClassesArray['container'] ],
    hr : [ 'my-3' ],
    label : [ ...ClassesArray['text'], 'form-label' ],
    main : [ ...ClassesArray['container'] ],
    p : [ ...ClassesArray['text'] ],
    strong : [ 'fst-italic', 'fw-bold', 'text-danger' ],
    ul : [ 'list-unstyled', 'mb-3', 'ms-3', 'ps-3' ],
    /* ---/--- */ 
    title : [ ...ClassesArray['text'], 'fw-semibold' ],
    content : [ ...ClassesArray['content'], 'p-3' ],
    feedback : [ ...ClassesArray['text'], 'fst-italic' ],
    bottom : [ 'w-100' ],
    approved : [ 'text-success', 'is-valid' ],
    disapproved : [ 'text-danger', 'is-invalid' ],
};

for (let i = 1; i <= 6; i++) Classes['h' + i] = [ 'fs-' + i, ...ClassesArray['text'] ];

export const FrontpageArray = [
    {
        father : 'fixed',
        index  : [
            {
                archive : 'html/about.html',
                screen : 'full',
                title : 'Saiba +',
            },
        ],
    },
    {
        father : 'footer',
        index  : [
            {
                archive : 'html/README.html',
                screen : 'full',
                title : 'Autoria',
            },
        ],
    },
];

export let TextTemplate = '';
TextTemplate += ' Irure ut velit esse eiusmod eu occaecat officia reprehenderit dolore consequat ut anim culpa in. Sit aliqua ad eu minim. Do labore est proident amet reprehenderit cupidatat fugiat. Id nostrud aliquip dolore ad. Occaecat in ipsum ut irure aliqua qui adipisicing Lorem nostrud voluptate cupidatat.';
TextTemplate += ' Laborum mollit ut in ad fugiat sit sunt cillum in fugiat officia aute enim. Duis ad dolore laboris magna enim in amet culpa mollit cupidatat. Aliquip nostrud dolor esse et non. Commodo cillum laboris ullamco ut.';

export const FormFieldArray = [
    [
        {
            label : 'Nome',
            feedback : 'Nome completo correspondente ao documento oficial.',
            function : {
                Mask : (Input = '') => {
                    return Mask['camelcase'](Input);
                },
                Validator : (Input = '') => {
                    return Check['minimum'](Input, 2);
                },
            },
            id : 'name',
            type : 'text',
        },
        {
            label : 'gênero',
            function : {
                Mask : (Input = '') => {
                    return Mask['camelcase'](Input);
                },
                Validator : (Input = '') => {
                    return !Check['empty'](Input);
                },
            },
            id : 'gender',
            option : [
                '',
                'feminino',
                'masculino',
            ],
            selector : 'select',
        },
    ],
    [
        {
            label : 'data de nascimento',
            feedback : 'Data igual ou anterior ao dia ' + FormatDate() + '.',
            function : {
                Mask : (Input = '') => {
                },
                Validator : (Input = '') => {
                    return Check['more']({ date : Input });
                },
            },
            id : 'birth-date',
            type : 'date',
        },
        {
            label : 'cpf',
            feedback : 'Número de CPF. correspondente ao documento oficial.',
            function : {
                Mask : (Input = '') => {
                    return Mask['cpf'](Input);
                },
                Validator : (Input = '') => {
                    return Check['cpf'](Input);
                },
            },
            id : 'cpf',
            maxlength : '123.456.789-10'['length'],
            minlength : '123.456.789-10'['length'],
            placeholder : '123.456.789-10',
            type : 'text',
        },
    ],
    [
        {
            bottom : false,
            label : 'Email',
            function : {
                Mask : (Input = '') => {
                },
                Validator : (Input = '') => {
                    return Check['email'](Input);
                },
            },
            id : 'email',
            type : 'email',
        },
        {
            bottom : true,
            label : 'Tel',
            feedback : 'Número de telefone com DDI brasileiro.',
            function : {
                Mask : (Input = '') => {
                    return Mask['phone'](Input);
                },
                Validator : (Input = '') => {
                    return Check['phone'](Input);
                },
            },
            id : 'tel',
            maxlength : '+55 (11) 9 4005-8153'['length'],
            minlength : '+55 (11) 9 4005-8153'['length'],
            placeholder : '+55 (11) 9 4005-8153',
            type : 'tel',
        },
    ],
    [
        {
            label : 'Cep',
            function : {
                Mask : (Input) => {
                    return Mask['cep'](Input);
                },
                Validator : (Input) => {
                },
            },
            id : 'cep',
            maxlength : '12345-678'.replace(/[^a-zA-Z0-9]/g, '')['length'],
            minlength : '12345-678'.replace(/[^a-zA-Z0-9]/g, '')['length'],
            placeholder : '12345-678',
            type : 'text',
        },
        {
            label : 'Logradouro',
            disabled : true,
            function : {
                Mask : (Input) => {
                    return Mask['camelcase'](Input);
                },
                Validator : (Input) => {
                    return Check['minimum'](Input, 2);
                },
            },
            id : 'logradouro',
            type : 'text',
        },
        {
            label : 'Número',
            function : {
                Mask : (Input) => {
                },
                Validator : (Input) => {
                    return !Check['empty'](Input);
                },
            },
            id : 'numero',
            type : 'number',
        },
    ],
    [
        {
            label : 'Bairro',
            disabled : true,
            function : {
                Mask : (Input) => {
                },
                Validator : (Input) => {
                },
            },
            id : 'bairro',
            type : 'text',
        },
        {
            label : 'Localidade',
            disabled : true,
            function : {
                Mask : (Input) => {
                },
                Validator : (Input) => {
                },
            },
            id : 'localidade',
            type : 'text',
        },
        {
            label : 'uf',
            disabled : true,
            function : {
                Mask : (Input) => {
                },
                Validator : (Input) => {
                },
            },
            id : 'uf',
            maxlength : 2,
            minlength : 2,
            type : 'text',
        },
    ],
    {
        label : 'mensagem',
        function : {
            Mask : (Input) => {
            },
            Validator : (Input) => {
                return Check['minimum'](Input, 2);
            },
        },
        id : 'message',
        maxlength : TextTemplate.trim()['length'],
        minlength : TextTemplate.trim()['length'],
        rows : 3,
        selector : 'textarea',
    },
    [
        {
            label : 'Limpar',
            id : 'button-cleaner',
            selector : 'button',
            type : 'button',
        },
        {
            label : 'Resultado',
            id : 'button-result',
            selector : 'button',
            type : 'button',
        },
        {
            label : 'Enviar',
            id : 'button-sender',
            selector : 'button',
            type : 'button',
        },
    ],
];