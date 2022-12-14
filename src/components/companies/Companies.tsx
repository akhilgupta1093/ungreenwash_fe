import './Companies.css';
import { Company } from '../company/Company';
import { CompanyProps }  from '../company/Company';

interface CompaniesProps {
    companies: CompanyProps[],
}

export function Companies({ companies }: CompaniesProps) {
    return (
        // for each company in companies, render a Company component
        <div className="companies">
            {companies && companies.map((company, index) => (
                <Company 
                    key={index}
                    company={company.company} 
                    question={company.question} 
                    answer={company.answer}
                    filename={company.filename}
                    score={company.score}
                />
            ))}
        </div>
    );
}