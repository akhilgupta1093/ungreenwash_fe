import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { getCompanies, companyOptions, changeSelectedCompanies } from './filterSlice';
import Select, { StylesConfig } from 'react-select'


export function Filter() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCompanies());
    }, []);

    const companies = useAppSelector(companyOptions);

    type CompanyOption = { label: string; value: string; }
    // create an array of objects with label and value
    const display_companies = companies.map((company) => {
        return {label: company, value: company}
    })

    function handleChange(newValue: any, actionMeta: {action: string}) {
        if (newValue !== null) {
            dispatch(changeSelectedCompanies(newValue.map((company: CompanyOption) => company.value)));
        }
    }

    return (
    <div>
        <Select 
            closeMenuOnSelect={false}
            options={display_companies} 
            onChange={handleChange}
            isMulti
            menuPlacement="auto"
            menuPosition="fixed"
        />
    </div>
    );
}
