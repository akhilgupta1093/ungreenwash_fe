import axios from 'axios';
import { getURL } from '../../apis/routes';

export function apiGetAllTexts(company: string) {
    try {
        const response = axios.get(getURL(`/api/files/${company}`));
        return response;
    } catch (error) {
        console.error(error);
    }
}