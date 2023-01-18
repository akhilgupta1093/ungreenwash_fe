
import './CompanyResults.css';
import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CompaniesProps }  from '../companies/Companies';
import { ResponseSidebar } from 'components/responseSidebar/ResponseSidebar';

import { fullText, getFullText, setFullText } from '../company/companySlice';
import { CompanyProps, Response } from 'components/company/Company';


export function CompanyResults({ companies }: CompaniesProps) {
    const dispatch = useAppDispatch();
    const [fileArray, setFileArray] = useState<string[]>([]);
    const [tab, setTab] = React.useState(0);
    const [fileTab, setFileTab] = React.useState(0);
    const [scrollId, setScrollId] = useState<string>("");
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    const handleFileChange = (event: React.SyntheticEvent, newValue: number) => {
        setFileTab(newValue);
    };
    const returnedFullText = useAppSelector(fullText);

    useEffect(() => {
        if (companies[tab] && fileArray[fileTab]) {
            dispatch(getFullText({'company': companies[tab].company, 'filename': fileArray[fileTab]}));
            setFilesFromCompany(companies[tab]);
        }
    }, [])

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

    useEffect(() => {
        if (companies[tab] && fileArray[fileTab]) {
            dispatch(getFullText({'company': companies[tab].company, 'filename': fileArray[fileTab]}));

            // iterate through companies[tab].responses and find the first response with the correct filename
            for (let i = 0; i < companies[tab].responses.length; i++) {
                if (companies[tab].responses[i].filename == fileArray[fileTab]) {
                    setScrollId(companies[tab].responses[i].id);
                    break;
                }
            }
        }
    }, [tab, fileTab, companies, fileArray])


    useEffect(() => {
        scrollToId(scrollId);
    }, [scrollId])

    // Given a full text and a list of responses, return a list of spans with the responses highlighted
    const highlightResponses = (fullText: string, responses: Response[]) => {
        // For all responses, find the indices of the answer in the full text. The answers are not necessarily in order
        let indices = [];
        for (let i = 0; i < responses.length; i++) {
            let response = responses[i];
            if (response.filename != fileArray[fileTab]) {
                continue;
            }
            let start = fullText.indexOf(response.answer);
            let end = start + response.answer.length;
            if (start == -1 || end == -1) {
                console.log("Could not find answer in full text: " + response.answer)
            }
            indices.push({start: start, end: end, id: response.id});
        }

        // Sort the indices by start
        indices.sort((a, b) => a.start - b.start);

        // Create a list of spans with the responses highlighted, the indices may be overlapping
        let spans = [];
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChange} aria-label="tabsf" centered>
                    {companies.map((company, index) => {
                        return (
                            <Tab key={index} label={company.company} />
                        )
                    })}
                </Tabs>
                <div style={{width: '100vw', display: 'flex'}}>
                    <div style={{width: '30vw'}}>
                        {companies.length > 0 && <ResponseSidebar responses={companies[tab] ? companies[tab].responses : []} setFileTab={setFileTab} fileArray={fileArray} setScrollId={setScrollId}/>}
                    </div>
                    <div style={{width: '70vw'}}>
                        <Tabs value={fileTab} onChange={handleFileChange} aria-label="tabsf" centered>
                        {fileArray.map((filename, index) => {
                            return (
                                <Tab key={index} label={filename} />
                            )
                        })}
                        </Tabs>
                        {companies[tab] && <div className="company-result">
                            {highlightResponses(returnedFullText, companies[tab].responses)}
                        </div>}
                    </div>
                </div>
            </Box>
        </>
    )
}