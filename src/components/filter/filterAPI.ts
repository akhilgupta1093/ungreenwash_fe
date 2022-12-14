import axios from 'axios';

export function apiGetCompanies() {
    try {
        const response = axios.get(`http://localhost:8000/api/companies/`);
        //const response = {"data": ["Ford", "Fisker", "General Mills", "Pepsi"]}
        return response;
    } catch (error) {
        console.error(error);
    }
}
  