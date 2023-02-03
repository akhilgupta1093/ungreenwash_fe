import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getURL } from '../../apis/routes';

const axios = setupCache(Axios);

export function apiGetCompanies() {
    try {
        const response = axios.get(getURL('/api/companies/'), { cache: false });
        return response;
    } catch (error) {
        console.error(error);
    }
}
  