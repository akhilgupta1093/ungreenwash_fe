
import './CompanyResults.css';
import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CompaniesProps }  from '../companies/Companies';
import { ResponseSidebar } from '../responseSidebar/ResponseSidebar';

import { fileTexts, getFileTexts } from '../company/companySlice';
import { CompanyProps, Response, getFileText } from '../company/Company';

const tabsStyling = {
    "& button": { borderRadius: 2, padding: 2, backgroundColor: 'white', border: '1px solid rgb(236, 71, 85)', color: 'black'},
    "& button:hover": { backgroundColor: "black", color: "white" },
    "& button.Mui-selected": { backgroundColor: "rgb(236, 71, 85, 0.9)", color: "white" },
    ".css-1aquho2-MuiTabs-indicator": { backgroundColor: "rgb(236, 71, 85)" },
};

const companyTabsStyling = {
    "& button": { marginBottom: 2},
}


export function CompanyResults({ companies }: CompaniesProps) {
    const dispatch = useAppDispatch();
    const [fileArray, setFileArray] = useState<string[]>([]);
    const [tab, setTab] = React.useState(0);
    const [fileTab, setFileTab] = React.useState(0);
    const [scrollId, setScrollId] = useState<string>("");
    const [returnedFullText, setReturnedFullText] = useState<string>("");
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    const handleFileChange = (event: React.SyntheticEvent, newValue: number) => {
        setFileTab(newValue);
    };
    const returnedFileTexts = useAppSelector(fileTexts);

    // Every time the tab or data changes, update the fileArray 
    useEffect(() => {
        if (companies[tab]) {
            setFilesFromCompany(companies[tab]);
        }
    }, [tab, companies])

    const setFilesFromCompany = (company: CompanyProps) => {
        // Get unique filenames
        let filenames = new Set<string>();
        for (let i = 0; i < company.responses.length; i++) {
            filenames.add(company.responses[i].filename);
        }
        let filenamesArray = Array.from(filenames);
        setFileArray(filenamesArray);
    }

    // When the data, company tab, file array, or file tab changes, get the text of the file
    useEffect(() => {
        if (!companies[tab] || !fileArray[fileTab]) {
            return;
        }

        dispatch(getFileTexts({'company': companies[tab].company, 'filename': fileArray[fileTab]}));
        setReturnedFullText(getFileText(fileArray[fileTab], returnedFileTexts));
    }, [tab, fileTab, companies, fileArray])

    // When the file text changes, update the returned full text
    useEffect(() => {
        setReturnedFullText(getFileText(fileArray[fileTab], returnedFileTexts));
    }, [returnedFileTexts])

    // When the scroll id changes, scroll to that id
    useEffect(() => {
        scrollToId(scrollId);
    }, [scrollId, returnedFullText, fileTab, tab])

    // Given a full text and a list of responses, return a list of spans with the responses highlighted
    const highlightResponses = (fullText: string, responses: Response[]) => {
        // For all responses, find the indices of the answer in the full text. The answers are not necessarily in order
        let indices: {start: number, end: number, id: string}[] = [];
        for (let i = 0; i < responses.length; i++) {
            let response = responses[i];
            if (response.filename != fileArray[fileTab]) {
                continue;
            }
            let start = fullText.indexOf(response.answer);
            let end = start + response.answer.length;
            // if (start == -1 || end == -1) {
            //     console.log("Could not find answer in full text: " + response.answer)
            // }
            indices.push({start: start, end: end, id: response.id});
        }

        // Sort the indices by start
        indices.sort((a, b) => a.start - b.start);

        // Create a list of spans with the responses highlighted, the indices may be overlapping
        let spans: JSX.Element[] = [];
        let prevEnd = 0;
        for (let i = 0; i < indices.length; i++) {
            let index = indices[i];
            if (index.start > prevEnd) {
                spans.push(<span key={i}>{fullText.substring(prevEnd, index.start)}</span>);
            }
            spans.push(<span key={index.id} id={index.id} className="highlight">{fullText.substring(index.start, index.end)}</span>);
            prevEnd = index.end;
        }
        if (prevEnd < fullText.length) {
            spans.push(<span key={indices.length}>{fullText.substring(prevEnd, fullText.length)}</span>);
        }

        // Scroll to the highlighted response if it exists
        if (scrollId != "") {
            scrollToId(scrollId);
        }

        return spans;
    }

    const scrollToId = (id: string) => {
        let element = document.getElementById(id);
        if (element) {
            // give that element the .current-highlight class
            element.classList.add("current-highlight");
            // Remove .current-highlight class from all other elements
            let elements = document.getElementsByClassName("current-highlight");
            for (let i = 0; i < elements.length; i++) {
                if (elements[i] != element) {
                    elements[i].classList.remove("current-highlight");
                }
            }
            // Scroll to the element
            element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
        }
    }

    return (
        <>
            <Box sx={{ borderColor: 'divider', marginBottom: '10vh' }}>
                <div className='company-results-summary'>
                    {companies.length > 0 && companies[tab] && companies[tab].summary !== "" && <h2>Summary: {companies[tab].summary}</h2>}
                </div>
                <Tabs 
                    value={tab} 
                    onChange={handleChange} 
                    aria-label="tabsf" 
                    sx={[tabsStyling, companyTabsStyling]}
                    centered
                >
                    {companies.map((company, index) => {
                        return (
                            <Tab key={index} label={company.company} />
                        )
                    })}
                </Tabs>
                <div className='whole-company-result-wrapper'>
                    <div className='response-sidebar-wrapper'>
                        {companies.length > 0 && <ResponseSidebar responses={companies[tab] ? companies[tab].responses : []} setFileTab={setFileTab} fileArray={fileArray} setScrollId={setScrollId}/>}
                    </div>
                    <div className='company-result-display'>
                        <div className="company-result-tabs">
                            <Tabs 
                                value={fileTab} 
                                onChange={handleFileChange} 
                                aria-label="tabsf" 
                                centered
                                sx={tabsStyling}
                            >
                            {fileArray.map((filename, index) => {
                                return (
                                    <Tab key={index} label={filename} />
                                )
                            })}
                            </Tabs>
                        </div>
                        {companies[tab] && <div className="company-result">
                            {highlightResponses(returnedFullText, companies[tab].responses)}
                        </div>}
                    </div>
                </div>
            </Box>
        </>
    )
}