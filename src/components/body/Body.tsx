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
import Backdrop from '@mui/material/Backdrop';
import { Loading } from '../loading/Loading';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { getBaseQAs, baseQAs, isLoadingState } from './bodySlice';



export function Body() {
    const dispatch = useAppDispatch();
    const [tab, setTab] = React.useState(0);

    const baseCompanyQAs = useAppSelector(baseQAs);

    const isLoading = useAppSelector(isLoadingState);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
    <div className="body">
        <Loading isLoading={isLoading} />
        <div className="section">
            <div className="filter">
                <Filter />
            </div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} aria-label="tabsf" centered>
                <Tab label="Free Search" />
                <Tab label="Disclosure Frameworks" disabled={true}/>
            </Tabs>
        </Box>
        {(tab === 0) ? 
            <div>
                <div className="section adjustments">
                    <div className="question">
                        <QuestionInput />
                    </div>
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
  
