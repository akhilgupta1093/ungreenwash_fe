import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getURL } from '../../apis/routes';

// same object, but with updated typings.
const axios = setupCache(Axios);

export function apiGetFullText(company: string, filename: string) {
    try {
        const text = axios.get(getURL(`/api/file/${company}/${filename}`));
        let ret = {
            'filename': filename,
            'fullText': text,
        }
        return ret;
    } catch (error) {
        console.error(error);
    }
}
