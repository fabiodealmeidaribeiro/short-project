import { SocialNetwork } from './network.js';

SocialNetwork();

const ReadJSONFile = async (Input = '') => {
    const Response = await fetch(Input);
    const Result = await Response.json();
    return Result;
};

const Database = await ReadJSONFile('database.json');

if (Database) {
    if (Database['length']) {
        for (let i = 0; i < Database['length']; i++) {
            if (Database[i]) {
                if (Database[i]['length']) {
                    for (let j = 0; j < Database[i]['length']; j++) {
                        if (Database[i][j]['container'] && Database[i][j]['selector'] === 'button') {
                            document.querySelector(('button#' + Database[i][j]['id']).toLowerCase()).addEventListener('click', Event => {
                                document.querySelector(('button#container-' + Database[i][j]['id']).toLowerCase()).click();
                                Event.stopPropagation();
                                Event.preventDefault();
                            });
                        };
                    };
                };
            };
        };
    };
};

window.addEventListener('DOMContentLoaded', () => {
});