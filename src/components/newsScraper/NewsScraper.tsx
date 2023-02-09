import React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { getBaseQAs } from '../body/bodySlice';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { companyOptions, getCompanies } from '../filter//filterSlice';
import { getNews, selectNews } from './newsScraperSlice';

export interface NewsItem {
    description: string;
    publishedDate: string;
    publisher: {
        href: string;
        title: string;
    };
    href: string;
    title: string;
    url: string;
}

export function NewsScraper() {
    const dispatch = useAppDispatch();

    useEffect(() => {
            dispatch(getCompanies());
    }, []);

    const [keyword, setKeyword] = React.useState("");
    const [period, setPeriod] = React.useState("");

    const companies = useAppSelector(companyOptions);
    const news = useAppSelector(selectNews);
    
    function getAnswers() {
        dispatch(getNews({keyword, period}));
    }

    function keyPress(e: any) {
        const enterKey = 13;
        if (e.keyCode == enterKey) {
            dispatch(getNews({keyword, period}));
        }
    }

    return (
    <div>
        <div style={{display: 'flex', width: '50%', margin: '20px'}}>
            <Autocomplete
                sx={{width: "100%", backgroundColor: "white"}}
                options={companies}
                value={keyword}
                onChange={(event, value) => setKeyword(value || "")}
                onInputChange={(event, value) => setKeyword(value || "")}
                onKeyDown={keyPress}
                clearOnBlur={false}
                renderInput={(params) => <TextField {...params} label="Input phrase to search" />}
            />
        </div>
        <div style={{display: 'flex', width: '50%', margin: '20px'}}>
            <Autocomplete
                sx={{width: "100%", backgroundColor: "white"}}
                options={['1d', '7d', '30d', '90d', '180d', '365d']}
                value={period}
                onChange={(event, value) => setPeriod(value || "")}
                onInputChange={(event, value) => setPeriod(value || "")}
                onKeyDown={keyPress}
                clearOnBlur={false}
                renderInput={(params) => <TextField {...params} label="Input a period of time (eg. '7d')" />}
            />
            <IconButton style={{marginLeft: "10px"}} onClick={getAnswers} sx={{".css-ci5apu-MuiSvgIcon-root": {color: "rgb(236, 71, 85)"}}}>
                <SendIcon color="primary"/>
            </IconButton>
        </div>
        {/* display news with item.title and item.description, linked to item.url neatly*/}
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            {news.map((item: NewsItem) => (
                <div key={item.title} className="response-sidebar-item">
                    <button id={item.title} className="response-sidebar-button" onClick={() => window.open(item.url)}>
                        <div className="response-sidebar-answer">
                            {item.title}
                        </div>
                        <div className="response-sidebar-score">
                            {item.description}
                        </div>
                    </button>
                </div>

            ))}
        </div>
    </div>

    );
}