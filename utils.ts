import axios from 'axios';

export const API_URL = process.env.API_URL || 'https://i.fod.fujitv.co.jp/'
export const BASE_URL = 'https://fod.fujitv.co.jp/'

const parseCookie = (cookie: string[]): { [key: string]: string } => {
    const result: { [key: string]: string } = {};
    for (const c of cookie) {
        const [key, value] = c.split('=');
        result[key] = value.split(';')[0];
    }
    return result;
}

export const getTokenHeader = async () => {
    const token = parseCookie((await axios.head(BASE_URL)).headers['set-cookie']).CT
    return {
        headers: {
            'x-authorization': 'Bearer ' + token
        }
    }
}