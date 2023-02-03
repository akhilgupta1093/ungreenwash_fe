import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getURL } from '../../apis/routes';

const axiosCache = setupCache(axios);

export function apiGetBaseQAs(question: string, companies: string[]) {
    var ret: any = []
    if (companies.length === 0 || question === "") {
        return ret;
    }

    try {
        const response = axiosCache.post(getURL('/api/query/batch'), {
            companies: companies,
            questions: [question],
        });
        return response
    } catch (error) {
        console.error(error);
    }
}