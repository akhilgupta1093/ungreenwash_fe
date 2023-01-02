import axios from 'axios';
import { getURL } from '../../apis/routes';

export function apiGetCompanies() {
    try {
        const response = axios.get(getURL('/api/companies/'));
        //const response = {"data": ["Ford", "Fisker", "General Mills", "Pepsi"]}
        return response;
    } catch (error) {
        console.error(error);
    }
}
  