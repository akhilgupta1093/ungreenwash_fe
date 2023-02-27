import './Companies.css';
import React from 'react';
import { Company } from '../company/Company';
import { CompanyProps }  from '../company/Company';

export interface CompaniesProps {
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
                    responses={company.responses}
                    summary={company.summary}
                />
            ))}
        </div>
    );
}