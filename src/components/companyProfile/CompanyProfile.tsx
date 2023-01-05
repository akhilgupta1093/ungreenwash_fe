import './CompanyProfile.css';
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllTexts, fullText } from './companyProfileSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function CompanyProfile() {
    const dispatch = useAppDispatch();
    const [tab, setTab] = React.useState(0);
    const { company = "" } = useParams<{ company: string }>();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => {
        dispatch(getAllTexts(company));
    }, [])

    const texts = useAppSelector(fullText);

    // For each value in texts, render a tab with the filename
    // If the tab is clicked, render the text
    function renderTexts() {
        console.log(texts)
        return (
            <>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={handleChange} aria-label="tabsf" centered>
                        {texts.map((text, index) => {
                            return (
                                <Tab key={index} label={text.filename} />
                            )
                        })}
                    </Tabs>
                    <div className="file-text">
                        {texts[tab] && texts[tab].text}
                    </div>
                </Box>
            </>
        )
    }

    // Render the company name, and the map of filename to text
    return ( 
        <div>
            <h3>{company}</h3>
            {renderTexts()}
        </div>
    )
}