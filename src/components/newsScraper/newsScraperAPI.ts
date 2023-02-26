import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getURL } from '../../apis/routes';

const axios = setupCache(Axios);

export function apiGetNews(keyword: string, startDateString: string, endDateString: string, country: string, maxResults: number, smartFilter: boolean) {
    try {
        const response = axios.post(getURL('/api/news'), {
            keyword: keyword,
            startDate: startDateString,
            endDate: endDateString,
            country: country,
            maxResults: maxResults,
            smartFilter: smartFilter
        });
        return response
    } catch (error) {
        console.error(error);
    }
}