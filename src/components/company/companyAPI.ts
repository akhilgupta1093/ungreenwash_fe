import axios from 'axios';

export function apiGetFullText(company: string, filename: string) {
    try {
        const response = axios.get(`http://localhost:8000/api/file/${company}/${filename}`);
        return response;
    } catch (error) {
        console.error(error);
    }
    //return {"data": "The Company is pursuing leadership positions in electrification, connected vehicle services, and mobility solutions, including self-driving technology, and provides financial services through Ford Motor Credit Company LLC (“Ford Credit”). In addition to the information about Ford and our subsidiaries contained in this Annual Report on Form 10-K for the year ended December 31, 2021 (“2021 Form 10-K Report” or “Report”), extensive information about our Company can be found at http://corporate.ford.com, including information about our management team, brands, products, services, and corporate governance principles. The corporate governance information on our website includes our Corporate Governance Principles, Code of Ethics for Senior Financial Personnel, Code of Ethics for the Board of Directors, Code of Corporate Conduct for all employees, and the Charters for each of the Committees of our Board of Directors. In addition, any amendments to our Code of Ethics or waivers granted to our directors and executive officers will be posted on our corporate website. All of these documents may be accessed by going to our corporate website, or may be obtained free of charge by writing to our Shareholder Relations Department, Ford Motor Company, One American Road, P.O. Box 1899, Dearborn, Michigan 48126-1899. Our recent periodic reports filed with the Securities and Exchange Commission (“SEC”) pursuant to Section 13(a) or 15(d) of the Securities Exchange Act of 1934, as amended, are available free of charge at http://shareholder.ford.com."}
}