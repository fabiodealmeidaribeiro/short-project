import {
    BootstrapParams
} from './script-bootstrap.js';

import {
    FormFieldParams
} from './script-formfield.js';

import {
    FrontpageParams
} from './script-frontpage.js';

import {
    BlockParams
} from './script-block.js';

import {
    AddRemoveClass,
    Apply,
    ButtonColorChange,
    CreateElement,
    GetElementContent,
    InvalidElements,
    Is,
    LinkedinWidget,
    SelectorOrID,
    SetAttribute,
    SetTextNode,
    Validator,
} from './script-main.js';

import {
    Classes,
    FormatDate,
    FormFieldArray,
    FrontpageArray,
    TextTemplate,
} from './script-variables.js';

window.addEventListener('DOMContentLoaded', () => {
    
    BlockParams({ archive : 'settings.json', classes : [ 'mt-5' ], father : 'header' });

    FormFieldParams({ array : FormFieldArray, father : 'main' });
    
    FrontpageParams(FrontpageArray);

    let GoogleAdsense = '';

    // GoogleAdsense += '<ins';
    //     GoogleAdsense += ' class=\'adsbygoogle\'';
    //     GoogleAdsense += ' data-ad-client=\'ca-pub-3915625735347184\'';
    //     GoogleAdsense += ' data-ad-format=\'auto\'';
    //     GoogleAdsense += ' data-ad-slot=\'6762257078\'';
    //     GoogleAdsense += ' data-full-width-responsive=\'true\'';
    //     GoogleAdsense += ' style=\'display:block\'';
    // GoogleAdsense += '></ins>';
    // GoogleAdsense += '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';

    BlockParams({ body : GoogleAdsense, father : 'main' });

    LinkedinWidget({ father : 'footer' });

    const BTNGroupFixed = CreateElement();
    SetAttribute({ element : BTNGroupFixed, attribute : 'id', value : 'btn-group-fixed' });
    SetAttribute({ element : BTNGroupFixed, attribute : 'class', value : [ 'btn-group-vertical', 'd-none', 'd-lg-block', 'position-fixed' ] });
    SetAttribute({ element : BTNGroupFixed, attribute : 'style', value : { top : '1rem', right : '1rem' } });
    document.querySelector('body').appendChild(BTNGroupFixed);

    const BTNGroupFooter = CreateElement();
    SetAttribute({ element : BTNGroupFooter, attribute : 'id', value : 'btn-group-footer' });
    SetAttribute({ element : BTNGroupFooter, attribute : 'class', value : [ 'btn-group' ] });
    document.querySelector('footer').appendChild(BTNGroupFooter);

    const BTNAttribute = [
        {
            title : 'DownArrow',
            classes : {
                hover : [
                    'bg-danger',
                ],
                background : [
                    'bg-secondary',
                ],
                ico : [
                    'bi',
                    'bi-arrow-down-circle',
                ],
            },
            function : (output = {}) => {
                // const Width = window['innerWidth'] || document['documentElement']['clientWidth'] || document['body']['clientWidth'];
                // const Height = window['innerHeight'] || document['documentElement']['clientHeight'] || document['body']['clientHeight'];
                // (document['documentElement'] || document['body'])['scrollTop'] += Height;
                window.scrollTo(0, document['body']['scrollHeight']);
            },
        },
        {
            title : 'UpArrow',
            classes : {
                hover : [
                    'bg-warning',
                ],
                background : [
                    'bg-secondary',
                ],
                ico : [
                    'bi',
                    'bi-arrow-up-circle',
                ],
            },
            function : (output = {}) => {
                (document['documentElement'] || document['body'])['scrollTop'] = 0;
            },
        },
        {
            title : 'WhatsApp',
            classes : {
                hover : [
                    'bg-success',
                ],
                background : [
                    'bg-secondary',
                ],
                ico : [
                    'bi',
                    'bi-whatsapp',
                ],
            },
            function : (output = {}) => {
                const Proper = {
                    phone : 'phone' in output ? (Validator['String'](output['phone']) ? output['phone'] : '') : '',
                    message : 'message' in output ? (Validator['String'](output['message']) ? output['message'] : '') : '',
                };
                let WhatsAppURL = '';
                if (Validator['String'](Proper['phone'])) {
                    WhatsAppURL += 'https://api.whatsapp.com/send?phone=';
                    WhatsAppURL += Proper['phone'].replace(/[^a-zA-Z0-9]/g, '');
                    if (Validator['String'](Proper['message'])) {
                        WhatsAppURL += '&text=';
                        WhatsAppURL += Proper['message'].trim().replace(/' '/, '%20');
                    };
                    window.open(WhatsAppURL, '_blank');
                };
            },
        },
    ];

    const BTNArray = [];

    for (let i = 0; i < BTNAttribute['length']; i++) {
        const Size = 50;
        BTNArray[i] = CreateElement();
        SetAttribute({ element : BTNArray[i], attribute : 'id', value : BTNAttribute[i]['title'] });
        SetAttribute({ element : BTNArray[i], attribute : 'class', value : [
                ...BTNAttribute[i]['classes']['background'],
            ]
        });
        SetAttribute({ element : BTNArray[i], attribute : 'style', value : {
                'align-items' : 'center',
                'border-radius' : '50%',
                bottom : 'calc(1rem + ' + (i * .5) + 'rem + ' + (i * Size) + 'px)',
                display : 'flex',
                height : Size + 'px',
                'justify-content' : 'center',
                position : 'fixed',
                right : '1rem',
                width : Size + 'px',
                'z-index' : 1,
            }
        });
        const Icon = CreateElement({ element : 'i' });
        SetAttribute({ element : Icon, attribute : 'class', value : BTNAttribute[i]['classes']['ico'] });
        SetAttribute({ element : Icon, attribute : 'style', value : { color : 'white', 'font-size' : (Size / 100 * 50) + 'px' } });
        document.querySelector('body').appendChild(BTNArray[i]).appendChild(Icon);
        BTNArray[i].addEventListener('mouseenter', () => {
            BTNArray[i]['classList'].add(...BTNAttribute[i]['classes']['hover']);
            BTNArray[i]['classList'].remove(...BTNAttribute[i]['classes']['background']);
            BTNArray[i]['style']['cursor'] = 'pointer';
        });
        BTNArray[i].addEventListener('mouseleave', () => {
            BTNArray[i]['classList'].add(...BTNAttribute[i]['classes']['background']);
            BTNArray[i]['classList'].remove(...BTNAttribute[i]['classes']['hover']);
            BTNArray[i]['style']['cursor'] = 'default';
        });
        BTNArray[i].addEventListener('click', () => {
            let BtnObject = {};
            switch (BTNAttribute[i]['title']) {
                case 'DownArrow' : break;
                case 'UpArrow' : break;
                case 'WhatsApp' :
                    BtnObject = {
                        phone : '+55 (11) 9 9163-3880',
                        message : TextTemplate,
                    };
                break;
                default : break;
            };
            BTNAttribute[i]['function'](BtnObject);
        });
    };

    let Header = [];

    for (let i = 1; i <= 6; i++) Header.push(('h' + i).toString());
    AddRemoveClass({ element : [ 'body' ], classes : Classes['body'] });
    AddRemoveClass({ element : [ 'button' ], classes : Classes['button'] });
    AddRemoveClass({ element : [ 'footer' ], classes : Classes['footer'] });
    AddRemoveClass({ element : [ 'form' ], classes : Classes['form'] });
    AddRemoveClass({ element : [ 'header' ], classes : Classes['header'] });
    AddRemoveClass({ element : [ 'input' ], classes : [ 'p-2' ] });
    AddRemoveClass({ element : [ 'input[disabled]' ], classes : Classes['disabled'] });
    AddRemoveClass({ element : [ 'label', 'p', ...Header ], classes : Classes['p'] });
    AddRemoveClass({ element : [ 'main' ], classes : Classes['main'] });

    let CharCount = () => {
        document.querySelector('.feedback-message')['textContent'] = '';
        document.querySelector('.feedback-message')['textContent'] += document.querySelector('.content-message')['value']['length'];
        document.querySelector('.feedback-message')['textContent'] += '/' + TextTemplate.trim()['length'] + '.';
    };
    document.querySelector('.content-message').addEventListener('keyup', CharCount);
    CharCount();

    [ 'blur', 'focus' ].map(event => {
        if (document.querySelector(SelectorOrID('cep'))) {
            document.querySelector(SelectorOrID('cep')).addEventListener(event, () => {
                fetch(`https://viacep.com.br/ws/${ document.querySelector(SelectorOrID('cep'))['value'].replace('-', '') }/json`, {
                    method : 'GET',
                    mode : 'cors',
                    cache : 'default'
                }).then(response => {
                    if (!response['ok'])
                        throw new Error(response['status']);
                    return response.json();
                }).then(result => {
                    const GetElement = (output = '') => {
                        const Object = {
                            content : document.querySelector(SelectorOrID(output)),
                        };
                        [ ...[ 'title', 'label', 'content', 'feedback' ].filter(index => index !== 'content') ].map(index => {
                            Object[index] = document.querySelector('.' + index + '-' + output);
                        })
                        return Object;
                    };
                    const ZIPCode = [ 'bairro', 'cep', 'complemento', 'ddd', 'gia', 'ibge', 'localidade', 'logradouro', 'siafi', 'uf' ];
                    if (result['erro']) {
                        for (let i = 0; i < ZIPCode['length']; i++) {
                            const Element = GetElement(ZIPCode[i]);
                            [ 'title', 'label', 'content', 'feedback' ].map(index => {
                                if (Element[index]) {
                                    Element[index]['classList'][ ZIPCode[i] === 'cep' ? 'add' : 'remove' ](...Classes['disapproved']);
                                    Element[index]['classList'].remove(...Classes['approved']);
                                };
                            });
                            if (Element['content']) SetTextNode(Element['content'], '');
                            if (Element['feedback']) SetTextNode(Element['feedback'], (ZIPCode[i] === 'cep' ? 'Número invalido!' : ''));
                        };
                    };
                    if (!result['erro']) {
                        for (const ID in result) {
                            const Element = GetElement(ID);
                            [ 'title', 'label', 'content', 'feedback' ].map(index => {
                                if (Element[index]) {
                                    Element[index]['classList'].add(...Classes['approved']);
                                    Element[index]['classList'].remove(...Classes['disapproved']);
                                };
                            });
                            if (Element['content']) SetTextNode(Element['content'], result[ID]);
                            if (Element['feedback']) SetTextNode(Element['feedback'], 'Completo!');
                        };
                    };
                }).catch(error => {
                    console.error(error['message']);
                });
            });
        };
    });

    const TableArray = GetElementContent({
        path : document.querySelector('body').querySelector('main').querySelector('form'),
        slave : [ 'title', 'label', 'content', 'feedback' ],
    });
    
    const ElementAlert = () => {
        [ 'title', 'label', 'content', 'feedback' ].map(index => {
            document.querySelectorAll('.' + index).forEach((element, i) => {
                if (element) {
                    if (!element['classList'].contains('is-valid')) {
                        element['classList'].add(...Classes['disapproved']);
                        if (index !== 'content') SetTextNode(element, TableArray[i][index]);
                        if (index === 'content') element['value'] = '';
                    };
                };
            });
        });  
    };

    if (document.querySelector(SelectorOrID('button-cleaner'))) {
        document.querySelector(SelectorOrID('button-cleaner')).addEventListener('click', () => {
            SetTextNode(document.querySelector(SelectorOrID('birth-date')), FormatDate({ format : 'aaaa-mm-dd' }));
            ButtonColorChange({ status : 'valid' });
            [ 'title', 'label', 'content', 'feedback' ].map(index => {
                document.querySelectorAll('.' + index).forEach((element, i) => {
                    if (element) {
                        element['classList'].remove(...[ ...Classes['approved'], ...Classes['disapproved'] ]);
                        if (index !== 'content') SetTextNode(element, TableArray[i][index]);
                        if (index === 'content') element['value'] = '';
                    };
                });
            });
        });
    };

    if (document.querySelector(SelectorOrID('button-sender'))) {
        document.querySelector(SelectorOrID('button-sender')).addEventListener('click', () => {
            if (InvalidElements()) {
                ButtonColorChange({ id : 'button-sender', status : 'invalid' });
                ElementAlert();
            } else {
                ButtonColorChange({ id : 'button-sender', status : 'valid' });
            };
        });
    };

    BootstrapParams['ModalComponent']({ id : 'container-result', title : 'Resultado.', danger : true, });

    if (document.querySelector(SelectorOrID('button-result'))) {
        document.querySelector(SelectorOrID('button-result')).addEventListener('click', () => {
            if (InvalidElements()) {
                ButtonColorChange({ id : 'button-result', status : 'invalid' });
                ElementAlert();
            } else {
                ButtonColorChange({ id : 'button-result', status : 'valid' });
                const TableArray = GetElementContent({
                    path : document.querySelector('body').querySelector('main').querySelector('form'),
                    slave : [ 'title', 'label', 'content', 'feedback' ],
                });
                if (document.querySelector(SelectorOrID('container-result'))) {
                    let InnerHTML = '';
                    if (TableArray['length']) {
                        InnerHTML += '<table class=\'' + [ 'border', 'border-1', 'm-0', 'p-0', 'table', 'table-striped', 'table-hover' ].join(' ') + '\'>';
                            InnerHTML += '<thead>';
                                InnerHTML += '<tr>';
                                    InnerHTML += '<th class=\'m-0 p-2 col-6\' scope=\'col\'>';
                                        InnerHTML += '<p class=\'m-0 p-0 text-end\'>' + 'Título' + '</p>';
                                    InnerHTML += '</th>';
                                    InnerHTML += '<th class=\'m-0 p-2 col-6\' scope=\'col\'>';
                                        InnerHTML += '<p class=\'m-0 p-0 text-start\'>' + 'Conteúdo' + '</p>';
                                    InnerHTML += '</th>';
                                InnerHTML += '</tr>';
                            InnerHTML += '</thead>';
                            InnerHTML += '<tbody>';
                                for (let i = 0; i < TableArray['length']; i++) {
                                    InnerHTML += '<tr>';
                                        InnerHTML += '<th class=\'m-0 p-2\' scope=\'row\'>';
                                            if (TableArray[i]['label']) {
                                                InnerHTML += '<p class=\'m-0 p-0 text-end ' + (!TableArray[i]['content'] ? [ 'text-danger', 'text-decoration-line-through' ].join(' ') : '') + '\'>';
                                                    InnerHTML += TableArray[i]['label'] + ':';
                                                InnerHTML += '</p>';
                                            };
                                        InnerHTML += '</th>';
                                        InnerHTML += '<td class=\'m-0 p-2\'>';
                                            if (TableArray[i]['content']) {
                                                InnerHTML += '<p class=\'fst-italic m-0 p-0 text-start\'>';
                                                    InnerHTML += Is['email'](TableArray[i]['content']) ? '<a href=\'mailto:' + TableArray[i]['content'] + '\' target=\'_blank\'>' : '';
                                                    InnerHTML += Is['phone'](TableArray[i]['content']) ? '<a href=\'https://api.whatsapp.com/send?phone=' + TableArray[i]['content'].replace(/[^a-zA-Z0-9]/g, '') + '\' target=\'_blank\'>' : '';
                                                    InnerHTML += Is['date'](TableArray[i]['content']) ? Apply['date']({ date : TableArray[i]['content'] }) : TableArray[i]['content'];
                                                    InnerHTML += Is['email'](TableArray[i]['content']) || Is['phone'](TableArray[i]['content']) ? '</a>' : '';
                                                InnerHTML += '</p>';
                                            };
                                            if (!TableArray[i]['content']) {
                                                InnerHTML += '<p class=\'fst-italic m-0 p-0 text-danger text-start\'>';
                                                    InnerHTML += TableArray[i]['feedback'] ? TableArray[i]['feedback'] : '';
                                                InnerHTML += '</p>';
                                            };
                                        InnerHTML += '</td>';
                                    InnerHTML += '</tr>';
                                };
                            InnerHTML += '</tbody>';
                        InnerHTML += '</table>';
                    };
                    document.querySelector(SelectorOrID('container-result'))
                    .querySelector('.modal-dialog').querySelector('.modal-content')
                    .querySelector('.modal-body')['innerHTML'] = InnerHTML;
                    document.querySelector(SelectorOrID('container-result')).querySelector('button').click();
                };
            };
        });
    };
});