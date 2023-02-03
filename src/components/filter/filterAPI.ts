import axios from 'axios';
import { getURL } from '../../apis/routes';

export function apiGetCompanies() {
    console.log("apiGetCompanies")
    try {
        const response = axios.get(getURL('/api/companies/'));
        return response;
    } catch (error) {
        console.error(error);
    }
}
  