import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getURL } from '../../apis/routes';

const axios = setupCache(Axios);

export function apiGetFullText(company: string, filename: string) {
    try {
        const response = axios.get(getURL(`/api/file/${company}/${filename}`));
        return response;
    } catch (error) {
        console.error(error);
    }
}
