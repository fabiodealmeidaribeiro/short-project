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
    AddRemoveClass,
    ToMask,
    ButtonColorChange,
    CreateElement,
    GetElementContent,
    InvalidElements,
    ToValidator,
    LinkedinWidget,
    SelectorOrID,
    SetAttribute,
    SetTextNode,
} from './script-main.js';

import {
    SocialNetwork,
} from './script-network.js';

import {
    Classes,
    FormatDate,
    FormFieldArray,
    FrontpageArray,
    TextTemplate,
} from './script-variable.js';

window.addEventListener('DOMContentLoaded', () => {
    SocialNetwork();

    FormFieldParams({ array : FormFieldArray, father : 'main' });
    
    FrontpageParams(FrontpageArray);

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
                }).then(Response => {
                    if (!Response['ok'])
                        throw new Error(Response['status']);
                    return Response.json();
                }).then(result => {
                    const GetElement = (Input = '') => {
                        const Object = {
                            content : document.querySelector(SelectorOrID(Input)),
                        };
                        [ ...[ 'title', 'label', 'content', 'feedback' ].filter(Index => Index !== 'content') ].map(Index => {
                            Object[Index] = document.querySelector('.' + Index + '-' + Input);
                        })
                        return Object;
                    };
                    const ZIPCode = [ 'bairro', 'cep', 'complemento', 'ddd', 'gia', 'ibge', 'localidade', 'logradouro', 'siafi', 'uf' ];
                    if (result['erro']) {
                        for (let i = 0; i < ZIPCode['length']; i++) {
                            const Element = GetElement(ZIPCode[i]);
                            [ 'title', 'label', 'content', 'feedback' ].map(Index => {
                                if (Element[Index]) {
                                    Element[Index]['classList'][ ZIPCode[i] === 'cep' ? 'add' : 'remove' ](...Classes['disapproved']);
                                    Element[Index]['classList'].remove(...Classes['approved']);
                                };
                            });
                            if (Element['content']) SetTextNode(Element['content'], '');
                            if (Element['feedback']) SetTextNode(Element['feedback'], (ZIPCode[i] === 'cep' ? 'Número invalido!' : ''));
                        };
                    };
                    if (!result['erro']) {
                        for (const ID in result) {
                            const Element = GetElement(ID);
                            [ 'title', 'label', 'content', 'feedback' ].map(Index => {
                                if (Element[Index]) {
                                    Element[Index]['classList'].add(...Classes['approved']);
                                    Element[Index]['classList'].remove(...Classes['disapproved']);
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
        [ 'title', 'label', 'content', 'feedback' ].map(Index => {
            document.querySelectorAll('.' + Index).forEach((element, i) => {
                if (element) {
                    if (!element['classList'].contains('is-valid')) {
                        element['classList'].add(...Classes['disapproved']);
                        if (Index !== 'content') SetTextNode(element, TableArray[i][Index]);
                        if (Index === 'content') element['value'] = '';
                    };
                };
            });
        });  
    };

    if (document.querySelector(SelectorOrID('button-cleaner'))) {
        document.querySelector(SelectorOrID('button-cleaner')).addEventListener('click', () => {
            SetTextNode(document.querySelector(SelectorOrID('birth-date')), FormatDate({ format : 'aaaa-mm-dd' }));
            ButtonColorChange({ status : 'valid' });
            [ 'title', 'label', 'content', 'feedback' ].map(Index => {
                document.querySelectorAll('.' + Index).forEach((element, i) => {
                    if (element) {
                        element['classList'].remove(...[ ...Classes['approved'], ...Classes['disapproved'] ]);
                        if (Index !== 'content') SetTextNode(element, TableArray[i][Index]);
                        if (Index === 'content') element['value'] = '';
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
                                                    InnerHTML += ToValidator['email'](TableArray[i]['content']) ? '<a href=\'mailto:' + TableArray[i]['content'] + '\' target=\'_blank\'>' : '';
                                                    InnerHTML += ToValidator['phone'](TableArray[i]['content']) ? '<a href=\'https://api.whatsapp.com/send?phone=' + TableArray[i]['content'].replace(/[^a-zA-Z0-9]/g, '') + '\' target=\'_blank\'>' : '';
                                                    InnerHTML += ToValidator['date'](TableArray[i]['content']) ? ToMask['date']({ date : TableArray[i]['content'] }) : TableArray[i]['content'];
                                                    InnerHTML += ToValidator['email'](TableArray[i]['content']) || ToValidator['phone'](TableArray[i]['content']) ? '</a>' : '';
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