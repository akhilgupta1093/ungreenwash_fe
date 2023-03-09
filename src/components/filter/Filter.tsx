import React, { useState } from 'react';
import './Filter.css'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { getCompanies, companyOptions, changeSelectedCompanies, selectedCompanies, changeSummarize, selectSummarize, selectPdfView, changePdfView } from './filterSlice';
import { setModal } from '../settings/settingsSlice';
import { Settings } from '../settings/Settings';
import Select, { StylesConfig } from 'react-select'
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Switch from '@mui/material/Switch';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const selectStyles = {
    container: (base: any) => ({
      ...base,
      zIndex: 100
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: "rgb(236, 71, 85)",
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
    const chosenCompanies = useAppSelector(selectedCompanies);
    const summarize = useAppSelector(selectSummarize);
    const pdfView = useAppSelector(selectPdfView);

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
                value={chosenCompanies.map((company) => {return {label: company, value: company}})}
                onChange={handleChange}
                isMulti
                menuPlacement="auto"
                menuPosition="fixed"
                placeholder={"Select Companies..."}
            />
        </div>

        <FormGroup style={{marginLeft: "10px"}}>
            <FormControlLabel control={<Checkbox disabled checked={summarize} onChange={(event) => dispatch(changeSummarize(event.target.checked))} name="Summarize Results" />} label="Summarize" />
        </FormGroup>

        <FormGroup>
            <FormControlLabel label="View PDFs" control={<Switch checked={pdfView} onChange={(event) => dispatch(changePdfView(event.target.checked))} />} />
        </FormGroup>

        {/* <div className="more-settings">
            <IconButton onClick={() => {dispatch(setModal(true))}} sx={{".css-ci5apu-MuiSvgIcon-root": {color: "rgb(236, 71, 85)"}}}>
                <SettingsIcon color="primary"/>
            </IconButton>
        </div> */}
        <Settings />
    </div>
    );
}
