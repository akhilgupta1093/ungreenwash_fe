import axios from 'axios';
import { getURL } from '../../apis/routes';

const questions = [
    "What does this company do?", 
    "What are the risks this company faces",
    "What are the environmental risks this company faces",
    "What are the climate-related risks and opportunities the organization has identified over the short, medium and long ",
    "Environmental laws, environmental risks, environmental regulations",
]

const mockQuestions = [
    "What does this company do?",
]

export function apiGetCompanies() {
    try {
        const response = axios.get(getURL('/api/companies/'));
        return response;
    } catch (error) {
        console.error(error);
    }
}

export function apiGetBaseQAs(question: string, companies: string[]) {
    var ret: any = []
    if (companies.length === 0 || question === "") {
        return ret;
    }

    try {
        const response = axios.post(getURL('/api/query/batch'), {
            companies: companies,
            questions: [question],
        });
        return response
    } catch (error) {
        console.error(error);
    }
}