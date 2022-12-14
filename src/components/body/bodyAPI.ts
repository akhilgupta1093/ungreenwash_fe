import axios from 'axios';

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
        const response = axios.get(`http://localhost:8000/api/companies/`);
        //const response = {"data": ["Ford", "Fisker", "General Mills", "Pepsi"]}
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
        const response = axios.post(`http://localhost:8000/api/query/batch`, {
            companies: companies,
            questions: [question],
        });
        return response
    } catch (error) {
        console.error(error);
    }

    // var ret: any = {"data": [
    //     {
    //         "filename": "F_0000037996-22-000013_pooled.txt",
    //         "company": "Ford",
    //         "question": "What does this company do?",
    //         "answer": "The corporate governance information on our website includes our Corporate Governance Principles, Code of Ethics for Senior Financial Personnel, Code of Ethics for the Board of Directors, Code of Corporate Conduct for all employees, and the Charters for each of the Committees of our Board of Directors.",
    //         "score": 0.56
    //     },
    //     {
    //         "filename": "F_0000037996-22-000013_pooled.txt",
    //         "company": "Ford",
    //         "question": "What does this company do?",
    //         "answer": "The corporate governance information on our website includes our Corporate Governance Principles, Code of Ethics for Senior Financial Personnel, Code of Ethics for the Board of Directors, Code of Corporate Conduct for all employees, and the Charters for each of the Committees of our Board of Directors.",
    //         "score": 0.56
    //     },
    //     {
    //         "filename": "F_0000037996-22-000013_pooled.txt",
    //         "company": "Ford",
    //         "question": "What does this company do?",
    //         "answer": "The corporate governance information on our website includes our Corporate Governance Principles, Code of Ethics for Senior Financial Personnel, Code of Ethics for the Board of Directors, Code of Corporate Conduct for all employees, and the Charters for each of the Committees of our Board of Directors.",
    //         "score": 0.56
    //     }
    // ]}

    // return ret;
}

/*
export interface CompanyProps {
    filename: string,
    id: string,
    company: string,
    question: string,
    answer: string,
    score: number,
}
*/
  