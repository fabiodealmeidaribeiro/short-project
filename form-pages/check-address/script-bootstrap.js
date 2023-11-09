import {
    CreateElement,
    FirstUpper,
    IndexExistenceChecker,
    IsHTMLFormat,
    JustLetters,
    JustLowerLetters,
    PasswordBuilder,
    SelectorOrID,
    SetAttribute,
    Validator,
} from './script-main.js';

import {
    Classes,
} from './script-variable.js';

export const BootstrapParams = {
    ModalComponent : (Input = {}) => {
        const Proper = {
            body : 'body' in Input ? (Validator['String'](Input['body']) ? Input['body'] : [ undefined ]) : [ undefined ],
            danger : 'danger' in Input ? (Validator['Boolean'](Input['danger']) ? Input['danger'] : false) : false,
            father : 'father' in Input ? (Validator['String'](Input['father']) ? Input['father'] : 'body') : 'body',
            screen : 'screen' in Input ? (Validator['String'](Input['screen']) ? (IndexExistenceChecker({ array : [ 'extra', 'full' ], index : Input['screen'] }) ? Input['screen'] : false) : false) : false,
            id : 'id' in Input ? (Validator['String'](Input['id']) ? Input['id'] : JustLetters(PasswordBuilder())) : JustLetters(PasswordBuilder()),
            title : 'title' in Input ? (Validator['String'](Input['title']) ? FirstUpper(Input['title']) : '') : '',
        };
        const Container = CreateElement();
        SetAttribute({ element : Container, attribute : 'class', value : [ 'modal', 'fade' ] });
        SetAttribute({ element : Container, attribute : 'id', value : Proper['id'] });
        SetAttribute({ element : Container, attribute : 'data-bs-backdrop', value : 'static' });
        SetAttribute({ element : Container, attribute : 'data-bs-keyboard', value : 'false' });
        SetAttribute({ element : Container, attribute : 'tabindex', value : '-1' });
        SetAttribute({ element : Container, attribute : 'aria-Labelledby', value : Proper['id'] + '-label' });
        SetAttribute({ element : Container, attribute : 'aria-hidden', value : 'true' });
            const Button = CreateElement({ element : 'button', textnode : 'Btn' });
            SetAttribute({ element : Button, attribute : 'type', value : 'button' });
            SetAttribute({ element : Button, attribute : 'data-bs-toggle', value : 'modal' });
            SetAttribute({ element : Button, attribute : 'data-bs-target', value : SelectorOrID(Proper['id']) });
            SetAttribute({ element : Button, attribute : 'class', value : [ 'd-none' ] });
            const Dialog = CreateElement();
            SetAttribute({ element : Dialog, attribute : 'class', value : [
                ...Proper['screen'] === 'extra' ? [ 'modal-fullscreen-xl-down', 'modal-xl' ] : [],
                ...Proper['screen'] === 'full' ? [ 'modal-fullscreen' ] : [],
                ...!(Proper['screen'] === 'full' || Proper['screen'] === 'extra') ? [ 'modal-fullscreen-md-down' ] : [],
                'modal-dialog-scrollable',
                'modal-dialog-centered',
                'modal-dialog',
            ] });
                const Content = CreateElement();
                SetAttribute({ element : Content, attribute : 'class', value : [ 'modal-content' ] });
                    const Padding = [ 'p-3' ];
                    const Header = CreateElement();
                    SetAttribute({ element : Header, attribute : 'class', value : [ 'modal-header', ...Padding, ...Validator['Gene'](Proper['danger']) ? [ 'bg-danger' ] : [] ] });
                        const HeaderTitle = CreateElement({ element : 'h5', textnode : Proper['title'] });
                        SetAttribute({ element : HeaderTitle, attribute : 'class', value : [ 'modal-title', ...Classes['h5'], ...Validator['Gene'](Proper['danger']) ? [ 'text-white' ] : [] ] });
                        SetAttribute({ element : HeaderTitle, attribute : 'id', value : Proper['id'] + '-label' });
                        const HeaderButton = CreateElement();
                        SetAttribute({ element : HeaderButton, attribute : 'type', value : 'button' });
                        SetAttribute({ element : HeaderButton, attribute : 'class', value : [ 'btn-close', ...Validator['Gene'](Proper['danger']) ? [ 'btn-close-white' ] : [] ] });
                        SetAttribute({ element : HeaderButton, attribute : 'data-bs-dismiss', value : 'modal' });
                        SetAttribute({ element : HeaderButton, attribute : 'aria-Label', value : 'Close' });
                    const Body = CreateElement();
                    SetAttribute({ element : Body, attribute : 'class', value : [ 'modal-body', 'bg-light', ...Padding ] });
                        const BodyContent = CreateElement({ element : 'p', textnode : Proper['body'] });
                        SetAttribute({ element : BodyContent, attribute : 'class', value : [ ...Classes['p'] ] });
                    const Footer = CreateElement();
                    SetAttribute({ element : Footer, attribute : 'class', value : [ 'modal-footer', ...Padding ] });
                        const FooterContent = CreateElement();
                        SetAttribute({ element : FooterContent, attribute : 'class', value : 'btn-group' });
                        SetAttribute({ element : FooterContent, attribute : 'role', value : 'group' });
                            const FooterButton = CreateElement({ element : 'button', textnode : 'Fechar' });
                            SetAttribute({ element : FooterButton, attribute : 'class', value : [ ...Classes['button'], Validator['Gene'](Proper['danger']) ? 'btn-outline-danger' : 'btn-outline-danger' ] });
                            SetAttribute({ element : FooterButton, attribute : 'data-bs-dismiss', value : 'modal' });
                            SetAttribute({ element : FooterButton, attribute : 'type', value : 'button' });
        if (document.querySelector(Proper['father'])) {
            document.querySelector(Proper['father']).appendChild(Container).appendChild(Button);
            document.querySelector(Proper['father']).appendChild(Container).appendChild(Dialog).appendChild(Content).appendChild(Header);
            if (Validator['String'](Proper['title'])) IsHTMLFormat(Proper['title']) ? Header['innerHTML'] += Proper['title'] : Header.appendChild(HeaderTitle);
            document.querySelector(Proper['father']).appendChild(Container).appendChild(Dialog).appendChild(Content).appendChild(Header).appendChild(HeaderButton);
            document.querySelector(Proper['father']).appendChild(Container).appendChild(Dialog).appendChild(Content).appendChild(Body);
            if (Validator['String'](Proper['body'])) IsHTMLFormat(Proper['body']) ? Body['innerHTML'] += Proper['body'] : Body.appendChild(BodyContent);
            document.querySelector(Proper['father']).appendChild(Container).appendChild(Dialog).appendChild(Content).appendChild(Footer).appendChild(FooterContent);
        };
        const Wrappers = document.querySelector(SelectorOrID(Proper['id'])).querySelector('.modal-body').querySelectorAll('.wrapper');
        Wrappers.forEach((wrapper, i) => {
            if (wrapper) {
                const ButtonArray = [];
                const Selector = [];
                for (let i = 0; i < 6; i++) Selector.push('h' + (i + 1));
                const Wrapper = wrapper;
                const Content = Wrapper.querySelector('.content');
                Content.querySelectorAll(Selector.join(', ')).forEach((header, j) => {
                    if (header) {
                        if (header['textContent']) {
                            ButtonArray[j] = CreateElement({ element : 'button', textnode : FirstUpper(header['textContent']) });
                            SetAttribute({ element : ButtonArray[j], attribute : 'class', value : Classes['button']});
                            SetAttribute({ element : ButtonArray[j], attribute : 'id', value : JustLowerLetters(Proper['title'] + '-' + header['textContent']) });
                            SetAttribute({ element : ButtonArray[j], attribute : 'type', value : 'button' });
                            document.querySelector(SelectorOrID(Proper['id'])).querySelector('.modal-footer').querySelector('.btn-group').appendChild(ButtonArray[j]);
                        };
                    };
                });
                const CallbackMouseMove = (Input = '') => {
                    Selector.push(...[ 'p', 'strong' ]);
                    Content['classList'][Input](...[ 'bg-danger', 'bg-gradiente', 'border-danger' ]);
                    Content['classList'][(Input === 'add' ? 'remove' : 'add')](...[ 'bg-white' ]);
                    Content.querySelectorAll(Selector.join(', ')).forEach(header => header['classList'][Input](...[ 'text-white' ]));
                };
                Content.addEventListener('mouseover', () => CallbackMouseMove('add'));
                Content.addEventListener('mouseout', () => CallbackMouseMove('remove'));
            };
        });
        document.querySelector(SelectorOrID(Proper['id'])).querySelector('.modal-footer').querySelector('.btn-group').appendChild(FooterButton);
    },
    OffCanvasComponent : (Input = {}) => {
        const Proper = {
            body : 'body' in Input ? (Validator['String'](Input['body']) ? Input['body'] : '') : '',
            father : 'father' in Input ? (Validator['String'](Input['father']) ? Input['father'] : 'body') : 'body',
            id : 'id' in Input ? (Validator['String'](Input['id']) ? Input['id'].trim() : JustLetters(PasswordBuilder())) : JustLetters(PasswordBuilder()),
            title : 'title' in Input ? (Validator['String'](Input['title']) ? FirstUpper(Input['title']) : '') : '',
        };
        const Container = CreateElement();
        SetAttribute({ element : Container, attribute : 'aria-labelledby', value : Proper['id'] + '-label' });
        SetAttribute({ element : Container, attribute : 'class', value : [ 'offcanvas', 'offcanvas-start' ] });
        SetAttribute({ element : Container, attribute : 'id', value : Proper['id'] });
        SetAttribute({ element : Container, attribute : 'tabindex', value : '-1' });
            const Header = CreateElement();
            SetAttribute({ element : Header, attribute : 'class', value : [ 'offcanvas-header' ] });
                const HeaderTitle = CreateElement({ element : 'h5', textnode : Proper['title'] });
                SetAttribute({ element : HeaderTitle, attribute : 'class', value : [ ...Classes['h5'], 'offcanvas-title' ] });
                const HeaderButton = CreateElement({ element : 'button' });
                SetAttribute({ element : HeaderButton, attribute : 'aria-label', value : 'Close' });
                SetAttribute({ element : HeaderButton, attribute : 'class', value : 'btn-close' });
                SetAttribute({ element : HeaderButton, attribute : 'data-bs-dismiss', value : 'offcanvas' });
                SetAttribute({ element : HeaderButton, attribute : 'type', value : 'button' });
            const Body = CreateElement();
            SetAttribute({ element : Body, attribute : 'class', value : 'offcanvas-body' });
            Body['innerHTML'] += Validator['String'](Proper['body']) ? Proper['body'] : '';
        if (document.querySelector(Proper['father'])) {
            document.querySelector(Proper['father']).appendChild(Container).appendChild(Header);
            Validator['Gene'](Proper['title']) ? Header.appendChild(HeaderTitle) : [ undefined ];
            document.querySelector(Proper['father']).appendChild(Container).appendChild(Header).appendChild(HeaderButton);
            document.querySelector(Proper['father']).appendChild(Container).appendChild(Body);
        };
    },
};