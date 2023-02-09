import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getURL } from '../../apis/routes';

const axios = setupCache(Axios);

export function apiGetNews(keyword: string, period: string) {
    try {
        const response = axios.post(getURL('/api/news'), {
            keyword: keyword,
            period: period
        });
        return response
    } catch (error) {
        console.error(error);
    }
}