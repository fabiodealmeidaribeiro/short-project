
export let TextTemplate = '';
TextTemplate += ' Irure ut velit esse eiusmod eu occaecat officia reprehenderit dolore consequat ut anim culpa in. Sit aliqua ad eu minim. Do labore est proident amet reprehenderit cupidatat fugiat. Id nostrud aliquip dolore ad. Occaecat in ipsum ut irure aliqua qui adipisicing Lorem nostrud voluptate cupidatat.';
TextTemplate += ' Laborum mollit ut in ad fugiat sit sunt cillum in fugiat officia aute enim. Duis ad dolore laboris magna enim in amet culpa mollit cupidatat. Aliquip nostrud dolor esse et non. Commodo cillum laboris ullamco ut.';
TextTemplate += ' Culpa incididunt fugiat tempor non id commodo. Officia irure exercitation dolor sunt ullamco anim excepteur. Mollit nisi velit ut mollit. Quis tempor reprehenderit duis id id esse dolore commodo sint labore.';
TextTemplate += ' Aliquip Lorem Lorem Lorem ad occaecat nostrud occaecat Lorem aliqua deserunt occaecat sit irure do. Deserunt ad commodo laborum eu. Irure amet ea in consectetur ad aute. Enim do amet incididunt labore eiusmod eu tempor. Quis consequat deserunt commodo reprehenderit ut nostrud qui id eiusmod mollit nulla in proident. Aliquip nostrud in reprehenderit adipisicing ullamco incididunt nisi eiusmod qui aute magna reprehenderit.';
TextTemplate += ' Excepteur non nulla Lorem duis minim occaecat officia. Lorem aliqua consectetur do velit velit nulla proident tempor adipisicing est consequat minim enim. Aliquip aliquip adipisicing sint voluptate. Enim tempor cupidatat magna nulla elit velit. Deserunt culpa nulla reprehenderit do commodo amet labore ullamco irure aliquip adipisicing aliqua cupidatat voluptate. Do dolore ipsum fugiat est voluptate nulla ipsum dolor sunt dolore deserunt veniam aute. Qui pariatur sint culpa culpa ea deserunt duis.';

const BoxShadow = {
    'box-shadow' : '0 1px 2px 0 rgba(48, 48, 48, .3), 0 1px 3px 1px rgba(48, 48, 48, .15)',
};

const TextShadow = {
    'text-shadow' : 'rgba(0, 0, 0, .5) 1px 1px 1px',
};

const Button = 3;

const Margin = 1;

export const SetElement = {
    background : {
        class : [
            'align-items-center',
            'bg-secondary',
            'h-100',
            'justify-content-center',
            'position-fixed',
            'w-100',
        ],
        style : {
            display : 'none',
            left : 0,
            opacity : 0,
            top : 0,
            'z-index' : - 1,
        },
    },
    border : {
        class : [
            'align-items-center',
            'bg-light',
            'd-flex',
            'justify-content-center',
            'overflow-hidden',
            'position-relative',
        ],
        style : {
            border : '1px solid rgba(0, 0, 0, .125)',
            'border-radius' : (Button + Margin / 2) + 'rem',
            ...BoxShadow,
        },
        margin : (Margin) + 'rem',
    },
    container : {
        class : [
            'align-items-center',
            'bg-white',
            'd-flex',
            'justify-content-center',
            'overflow-hidden',
            'position-relative',
        ],
        style : {
            'border-radius' : (Button - Margin + Margin / 2) + 'rem',
        },
        margin : (Margin) + 'rem',
    },
    inner : {
        class : [
            'align-self-center',
            'h-100',
            'overflow-hidden',
        ],
        style : {
            top : 0,
        }
    },
    content : {
        class : [
            'align-items-center',
            'd-flex',
            'h-100',
            'justify-content-start',
            'position-relative',
        ],
        style : {
            top : 0,
        },
    },
    picture : {
        class : [
            'align-items-start',
            'd-flex',
            'flex-column',
            'h-100',
            'justify-content-start',
        ],
        style : {
            'background-position' : 'center',
            'background-size' : 'cover',
            'padding' : (Button - Margin + Margin / 2) + 'rem',
        },
    },
    title : {
        class : [
            'text-white',
        ],
        style : {
            ...TextShadow,
        },
    },
    description : {
        class : [
            'text-white',
        ],
        style : {
            ...TextShadow,
        },
    },
    button : {
        class : [
            'align-items-center',
            'bg-secondary',
            'justify-content-center',
            'position-fixed',
            'rounded-circle',
        ],
        style : {
            height : (Button) + 'rem',
            width : (Button) + 'rem',
            ...BoxShadow,
        },
        margin : (Margin) + 'rem',
    },
    ico : {
        class : [
            'text-white',
        ],
        style : {
            'font-size' : (Button / 2) + 'rem',
        },
    },
};