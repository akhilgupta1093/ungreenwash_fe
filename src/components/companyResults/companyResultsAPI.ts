import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getURL } from '../../apis/routes';

const axios = setupCache(Axios);

export function apiGetEmailDraft(company: string, summary: string) {
    try {
        const response = axios.post(getURL('/api/email/draft'), {
            company: company,
            summary: summary,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}