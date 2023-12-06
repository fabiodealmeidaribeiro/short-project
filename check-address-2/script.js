import {
    SocialNetwork
} from './network.js';

export const ReadJSONFile = async (Input = '') => {
    const Response = await fetch(Input);
    const Result = await Response.json();
    return Result;
};

const Data = await ReadJSONFile('settings.json');

console.log(Data.title);

SocialNetwork();