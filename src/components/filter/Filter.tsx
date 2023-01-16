import React, { useState } from 'react';
import './Filter.css'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { getCompanies, companyOptions, changeSelectedCompanies } from './filterSlice';
import Select, { StylesConfig } from 'react-select'
import Button from '@mui/material/Button';

const selectStyles = {
    container: (base: any) => ({
      ...base,
      zIndex: 100
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: "#000000",
        color: "#ffffff",
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: "#ffffff",
    }),
  };

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
    <div className="filter-parent">
        <div className="company-dropdown">
            <Select 
                styles={selectStyles}
                closeMenuOnSelect={false}
                options={display_companies} 
                onChange={handleChange}
                isMulti
                menuPlacement="auto"
                menuPosition="fixed"
                placeholder={"Select Companies..."}
            />
        </div>

        <div className="more-settings">
            <Button>
                More Settings
            </Button>
        </div>
    </div>
    );
}
