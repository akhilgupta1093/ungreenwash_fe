import React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { getBaseQAs } from '../body/bodySlice';
import { Autocomplete, TextField, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { companyOptions, getCompanies } from '../filter//filterSlice';
import { getNews, selectNews, downloadNews } from './newsScraperSlice';

export interface NewsItem {
    description: string;
    publishedDate: string;
    publishedDateStr: string;
    publisher: {
        href: string;
        title: string;
    };
    href: string;
    title: string;
    url: string;
    articleText: string;
}

export function NewsScraper() {
    const dispatch = useAppDispatch();

    useEffect(() => {
            dispatch(getCompanies());
    }, []);

    const [keyword, setKeyword] = React.useState("");
    const [country, setCountry] = React.useState("US");
    const [smartFilter, setSmartFilter] = React.useState(false);
    const [maxResults, setMaxResults] = React.useState(30);
    const [downloadWithSummaries, setDownloadWithSummaries] = React.useState(false);

    const [startDate, setStartDate] = React.useState<Dayjs | null>(
        dayjs().subtract(30, 'day'),
    );
    const [endDate, setEndDate] = React.useState<Dayjs | null>(
        dayjs(),
    );

    const companies = useAppSelector(companyOptions);
    const news = useAppSelector(selectNews);
    
    function getAnswers() {
        const [startDateString, endDateString] = getDateStrings();
        dispatch(getNews({keyword, startDateString, endDateString, country, maxResults, smartFilter}));
    }

    function keyPress(e: any) {
        const enterKey = 13;
        if (e.keyCode == enterKey) {
            const [startDateString, endDateString] = getDateStrings();
            dispatch(getNews({keyword, startDateString, endDateString, country, maxResults, smartFilter}));
        }
    }

    function getDateStrings() {
        const start = startDate ? startDate.toISOString() : "";
        const end = endDate ? endDate.toISOString() : "";
        return [start, end];
    }

    function startDownloadNews() {
        const [startDateString, endDateString] = getDateStrings();
        dispatch(downloadNews({keyword, startDateString, endDateString, country, maxResults, smartFilter, downloadWithSummaries}))
    }

    return (
    <div>
        <div style={{display: 'flex', width: '70%', margin: '20px'}}>
            <Autocomplete
                sx={{width: "50%", backgroundColor: "white", marginRight: "20px"}}
                options={["US", "IN"]}
                value={country}
                onChange={(event, value) => setCountry(value || "")}
                onInputChange={(event, value) => setCountry(value || "")}
                onKeyDown={keyPress}
                clearOnBlur={false}
                renderInput={(params) => <TextField {...params} label="Choose a country" />}
            />
            <TextField
                sx={{backgroundColor: "white", marginRight: "20px"}}
                id="outlined-number"
                label="Max Results"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                onKeyDown={keyPress}
                defaultValue={maxResults}
                onChange={(event) => setMaxResults(parseInt(event.target.value))}
            />
            <Tooltip title="Longer processing time -> More relevant results" placement="bottom">
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={(event) => setSmartFilter(event.target.checked)} />} label="Smart Filter" />
                </FormGroup>
            </Tooltip>
        </div>
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
            <IconButton style={{marginLeft: "10px"}} onClick={getAnswers} sx={{".css-ci5apu-MuiSvgIcon-root": {color: "rgb(236, 71, 85)"}}}>
                <SendIcon color="primary"/>
            </IconButton>
        </div>
        {news && news.length > 0 &&
            <div style={{display: 'flex', width: '70%', margin: '20px', alignItems: 'center'}}>
                <IconButton style={{marginLeft: "10px"}} onClick={startDownloadNews} sx={{".css-ci5apu-MuiSvgIcon-root": {color: "rgb(236, 71, 85)"}}}>
                    <DownloadIcon color="primary"/>
                </IconButton>
                <div>Download Results - </div>
                <FormGroup style={{marginLeft: "10px"}}>
                    <FormControlLabel control={<Checkbox onChange={(event) => setDownloadWithSummaries(event.target.checked)} />} label="With Summaries" />
                </FormGroup>
            </div>
        }
        {/* <div style={{display: 'flex', width: '50%', margin: '20px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/DD/YYYY"
                    value={startDate}
                    onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    disabled
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="End Date"
                    inputFormat="MM/DD/YYYY"
                    value={endDate}
                    onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    disabled
                />
            </LocalizationProvider>
        </div> */}
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            {news.map((item: NewsItem) => (
                <div key={item.title} className="response-sidebar-item">
                    <button id={item.title} className="response-sidebar-button" onClick={() => window.open(item.url)}>
                        <div className="response-sidebar-score" style={{marginBottom: "10px"}}>
                            {item.publisher.title} | {item.publishedDateStr}
                        </div>
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