import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getURL } from '../../apis/routes';

const axios = setupCache(Axios);

export function apiGetAllTexts(company: string) {
    try {
        const response = axios.get(getURL(`/api/files/${company}`), { cache: false });
        return response;
    } catch (error) {
        console.error(error);
    }
}