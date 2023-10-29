import {
    Apply,
    Is,
} from './script-main.js';

export const FormatDate = (output = {}) => {
    const Proper = {
        date : 'date' in output ? (output['date'] ? output['date'] : Date.now()) : Date.now(),
        format : 'format' in output ? (output['format'] ? output['format'] : 'dd/mm/aaaa') : 'dd/mm/aaaa',
        year : 'year' in output ? (output['year'] ? output['year'] : - 18) : - 18,
    };
    const Map = {
        dd : (new Date(Proper['date']).getDate()).toString().padStart(2, '0'),
        mm : (new Date(Proper['date']).getMonth() + 1).toString().padStart(2, '0'),
        aaaa : (new Date(Proper['date']).getFullYear() + Proper['year']),
    };
    return Proper['format'].replace(/mm|dd|aaaa/gi, matched => Map[matched]);
};

export const ClassesContainer = [
    'align-items-center', 'd-flex', 'flex-column', 'justify-content-center', 'mb-5',
];

export const ClassesContent = [
    'bg-white', 'border', 'border-1', 'cursor-pointer', 'mb-3', 'rounded-3', 'shadow-sm',
];

export const ClassesDimension = [
    'col-12', 'col-lg-8', 'mx-auto',
];

export const ClassesText = [
    'text-secondary', 'm-0', 'p-0', 'w-100',
];

export const Classes = {
    a : [ 'fst-italic', 'fw-bold', 'm-0', 'p-0', 'text-danger', 'text-decoration-none', 'w-100' ],
    body : [ 'bg-light', 'px-3' ],
    button : [ 'btn', 'btn-outline-secondary', 'cursor-pointer', 'm-0', 'p-2' ],
    disabled : [ 'bg-light', 'text-success' ],
    figure : [ ...ClassesContent, 'p-2', ],
    footer : [ ...ClassesContainer ],
    form : [ ...ClassesDimension, ...ClassesContent, 'p-3' ],
    h : [ ...ClassesText ],
    header : [ ...ClassesContainer ],
    hr : [ 'my-3' ],
    label : [ ...ClassesText, 'form-label' ],
    main : [ ...ClassesContainer ],
    p : [ ...ClassesText ],
    strong : [ 'fst-italic', 'fw-bold', 'text-danger' ],
    ul : [ 'list-unstyled', 'mb-3', 'ms-3', 'ps-3' ],
    /* ---/--- */ 
    title : [ ...ClassesText, 'fw-semibold' ],
    content : [ ...ClassesContent, 'p-3' ],
    feedback : [ ...ClassesText, 'fst-italic' ],
    bottom : [ 'w-100' ],
    approved : [ 'text-success', 'is-valid' ],
    disapproved : [ 'text-danger', 'is-invalid' ],
};

for (let i = 1; i <= 6; i++) Classes['h' + i] = [ 'fs-' + i, ...ClassesText ];

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
                Mask : (output = '') => {
                    return Apply['camelcase'](output);
                },
                Validator : (output = '') => {
                    return Is['minimum'](output, 2);
                },

            },
            id : 'name',
            type : 'text',
        },
        {
            label : 'gênero',
            function : {
                Mask : (output = '') => {
                    return Apply['camelcase'](output);
                },
                Validator : (output = '') => {
                    return Is['noempty'](output);
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
                Mask : (output = '') => {
                },
                Validator : (output = '') => {
                    return Is['more']({ date : output });
                },
            },
            id : 'birth-date',
            type : 'date',
        },
        {
            label : 'cpf',
            feedback : 'Número de CPF. correspondente ao documento oficial.',
            function : {
                Mask : (output = '') => {
                    return Apply['cpf'](output);
                },
                Validator : (output = '') => {
                    return Is['cpf'](output);
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
                Mask : output => {
                },
                Validator : (output = '') => {
                    return Is['email'](output);
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
                Mask : (output = '') => {
                    return Apply['phone'](output);
                },
                Validator : (output = '') => {
                    return Is['phone'](output);
                },
            },
            id : 'tel',
            maxlength : '+55 (11) 9 9163-3880'['length'],
            minlength : '+55 (11) 9 9163-3880'['length'],
            placeholder : '+55 (11) 9 9163-3880',
            type : 'tel',
        },
    ],
    [
        {
            label : 'Cep',
            function : {
                Mask : output => {
                    return Apply['cep'](output);
                },
                Validator : output => {
                },
            },
            id : 'cep',
            maxlength : '05109-200'.replace(/[^a-zA-Z0-9]/g, '')['length'],
            minlength : '05109-200'.replace(/[^a-zA-Z0-9]/g, '')['length'],
            placeholder : '12345-678',
            type : 'text',
        },
        {
            label : 'Logradouro',
            disabled : true,
            function : {
                Mask : output => {
                    return Apply['camelcase'](output);
                },
                Validator : output => {
                    return Is['minimum'](output, 2);
                },
            },
            id : 'logradouro',
            type : 'text',
        },
        {
            label : 'Número',
            function : {
                Mask : output => {
                },
                Validator : output => {
                    return Is['noempty'](output);
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
                Mask : output => {
                },
                Validator : output => {
                },
            },
            id : 'bairro',
            type : 'text',
        },
        {
            label : 'Localidade',
            disabled : true,
            function : {
                Mask : output => {
                },
                Validator : output => {
                },
            },
            id : 'localidade',
            type : 'text',
        },
        {
            label : 'uf',
            disabled : true,
            function : {
                Mask : output => {
                },
                Validator : output => {
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
            Mask : output => {
            },
            Validator : output => {
                return Is['minimum'](output, 2);
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