import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./Body.css"
import { Companies } from '../companies/Companies';
import { Filter } from '../filter/Filter';
import { QuestionInput } from '../questionInput/QuestionInput';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { getBaseQAs, baseQAs, isLoadingState } from './bodySlice';
import { selectedCompanies } from '../filter/filterSlice';
import { selectQuestion, setQuestion } from '../questionInput/questionSlice';

export function Body() {
    const dispatch = useAppDispatch();
    const [tab, setTab] = React.useState(0);

    const companies = useAppSelector(selectedCompanies)
    const question = useAppSelector(selectQuestion)

    function getAnswers() {
        dispatch(getBaseQAs({question, companies}));
    }

    const baseCompanyQAs = useAppSelector(baseQAs);

    const isLoading = useAppSelector(isLoadingState);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
    <div className="body">

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} aria-label="tabsf" centered>
                <Tab label="My Companies" />
                <Tab label="Coming Soon..." disabled={true}/>
            </Tabs>
        </Box>
        {(tab === 0) ? 
            <div>
                <div className='overlay-box'>
                    {isLoading ? <CircularProgress /> : null}
                </div>
                <div className="section">
                    <div className="filter">
                        <Filter />
                    </div>
                </div>
                <div className="section adjustments">
                    <div className="question">
                        <QuestionInput />
                    </div>
                    <Button onClick={getAnswers}>Generate Answers</Button>
                </div>
                
                <div className="section">
                    <Companies companies={baseCompanyQAs} />      
                </div>          
            </div>
        : 
            <div>
                <h1>Other Tab</h1>
            </div>
        
        }
        
    </div>
    );
}
  
