export const BoxShadow = {
    'box-shadow' : '0 1px 2px 0 rgba(48, 48, 48, .3), 0 1px 3px 1px rgba(48, 48, 48, .15)',
};

export const TextShadow = {
    'text-shadow' : 'rgba(0, 0, 0, .5) 1px 1px 1px',
};

export const SetStyle = {
    class : {
        background : [
            'align-items-center',
            'bg-secondary',
            'h-100',
            'justify-content-center',
            'position-fixed',
            'w-100',
        ],
        border : [
            'align-items-center',
            'bg-light',
            'd-flex',
            'justify-content-center',
            'overflow-hidden',
            'position-relative',
        ],
        container : [
            'align-items-center',
            'bg-white',
            'd-flex',
            'justify-content-center',
            'overflow-hidden',
            'position-relative',
        ],
        inner : [
            'align-self-center',
            'h-100',
            'overflow-hidden',
        ],
        content : [
            'align-items-center',
            'd-flex',
            'h-100',
            'justify-content-start',
            'position-relative',
        ],
        picture : [
            'align-items-lg-start',
            'align-items-center',
            'd-flex',
            'flex-column',
            'h-100',
            'justify-content-start',
        ],
        title : [
            'text-lg-start',
            'text-center',
            'text-white',
        ],
        subtitle : [
            'fs-3',
            'text-lg-start',
            'text-center',
            'text-white',
        ],
        description : [
            'fst-italic',
            'text-lg-start',
            'text-center',
            'text-white',
        ],
        button : [
            'align-items-center',
            'bg-secondary',
            'd-flex',
            'justify-content-center',
            'position-fixed',
            'rounded-circle',
        ],
        ico : [
            'text-white',
        ],
    },
    style : {
        background : {
            display : 'none',
            left : 0,
            opacity : 0,
            top : 0,
            'z-index' : - 1,
        },
        border : {
            border : '1px solid rgba(0, 0, 0, .125)',
            'border-radius' : '3.5rem',
            ...BoxShadow,
        },
        container : {
            'border-radius' : '2.5rem',
        },
        inner : {
            top : 0,
        },
        content : {
            top : 0,
        },
        picture : {
            'background-position' : 'center',
            'background-size' : 'cover',
            'padding' : '2.5rem',
        },
        title : {
            ...TextShadow,
        },
        subtitle : {
            ...TextShadow,
        },
        description : {
            ...TextShadow,
        },
        button : {
            height : '3rem',
            width : '3rem',
            ...BoxShadow,
        },
        ico : {
            'font-size' : 'calc(3rem / 2)',
        },
    },
};