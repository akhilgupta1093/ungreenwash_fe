
import './CompanyResults.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CompaniesProps }  from '../companies/Companies';
import { ResponseSidebar } from '../responseSidebar/ResponseSidebar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EmailIcon from '@mui/icons-material/Email';

import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { fileTexts, getFileTexts } from '../company/companySlice';
import { selectPdfView } from '../filter/filterSlice';
import { CompanyProps, Response, getFileText } from '../company/Company';
import { getURL } from '../../apis/routes';
import { fullText } from 'components/companyProfile/companyProfileSlice';
import { Tooltip } from '@mui/material';
import { CoPresentOutlined } from '@mui/icons-material';

import { selectSubject, selectBody, getEmailDraft } from './companyResultsSlice';

const tabsStyling = {
    "& button": { backgroundColor: 'white', border: '1px solid rgb(236, 71, 85)', color: 'black', height: '100%'},
    "& button:hover": { backgroundColor: "black", color: "white" },
    "& button.Mui-selected": { backgroundColor: "rgb(236, 71, 85, 0.9)", color: "white" },
    ".css-1aquho2-MuiTabs-indicator": { backgroundColor: "rgb(236, 71, 85)" },
};

const getPdfUrl = (company: string, filename: string) => {
    return getURL(`/api/pdf/${company}/${filename}`);
}

export function CompanyResults({ companies }: CompaniesProps) {
    const dispatch = useAppDispatch();
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const viewerRef = useRef<HTMLDivElement>(null);
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const [fileArray, setFileArray] = useState<string[]>([]);
    const [tab, setTab] = React.useState(0);
    const [fileTab, setFileTab] = React.useState(0);
    const [scrollId, setScrollId] = useState<string>("");
    const [isPDFLoading, setIsPDFLoading] = useState(true);

    const subject = useAppSelector(selectSubject);
    const body = useAppSelector(selectBody);

    const [returnedFullText, setReturnedFullText] = useState<string>("");
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    const handleFileChange = (event: React.SyntheticEvent, newValue: number) => {
        setFileTab(newValue);
    };
    const returnedFileTexts = useAppSelector(fileTexts);
    const pdfView = useAppSelector(selectPdfView);

    const getListOfSources = () => {
        let sources = new Set<string>();
        for (let i = 0; i < companies[tab].responses.length; i++) {
            sources.add(companies[tab].responses[i].filename);
        }
        return Array.from(sources);
    }

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, []);

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
        setPdfUrl(getPdfUrl(companies[tab].company, fileArray[fileTab]));
        setIsPDFLoading(true);
    }, [tab, fileTab, companies, fileArray])

    // When the file text changes, update the returned full text
    useEffect(() => {
        setReturnedFullText(getFileText(fileArray[fileTab], returnedFileTexts));
    }, [returnedFileTexts])

    // When the scroll id changes, scroll to that id
    useEffect(() => {
        if (pdfView) {
            scrollToPage(pageNumber);
        } else {
            scrollToId(scrollId);
        }
    }, [scrollId, returnedFullText, fileTab, tab, pageNumber])

    // When isPDFLoading changes, scroll to page
    useEffect(() => {
        if (pdfView) {
            scrollToPage(pageNumber);
        } else {
            scrollToId(scrollId);
        }
    }, [isPDFLoading])

    const handleSidebarClick = () => {
        if (pdfView) {
            scrollToPage(pageNumber);
        } else {
            scrollToId(scrollId);
        }
    }


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

    function onLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
        setNumPages(nextNumPages);
        setIsPDFLoading(false);
    }

    const scrollToPage = (givenPageNumber: number | undefined) => {
        if (givenPageNumber === undefined) {
            return;
        }
        if (viewerRef.current) {
            const viewerNode = viewerRef.current;
            const pageNode = viewerNode.querySelector(`div[data-page-number="${givenPageNumber}"]`) as HTMLElement;
            if (pageNode) {
                viewerNode.scrollTop = pageNode.offsetTop;
            }
        }
    };
    
    const handleScroll = () => {
        if (viewerRef.current) {
            const viewerNode = viewerRef.current;
            const currentPageNumber = Math.ceil(viewerNode.scrollTop / window.innerHeight);
            //setPageNumber(currentPageNumber);
        }
    };

    useEffect(() => {
        if (companies[tab] && companies[tab].summary !== "") {
            const subjectEncoded = encodeURIComponent(subject);
            const bodyEncoded = encodeURIComponent(body);
            const mailtoUrl = `mailto:?subject=${subjectEncoded}&body=${bodyEncoded}`;
            window.open(mailtoUrl, '_blank');
        }
    }, [subject, body])
      
    const email = async () => {
        dispatch(getEmailDraft({ 'company': companies[tab].company, 'summary': companies[tab].summary }))
    };

    return (
        <>
            <Box sx={{ borderColor: 'divider', marginBottom: '10vh' }}>
                <div className='company-results-summary'>
                    {companies.length > 0 && companies[tab] && companies[tab].summary !== "" && 
                        <Card>
                            <CardContent sx={{backgroundColor: "rgb(236, 71, 85, 0.8)", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Typography variant="h5" component="div" sx={{color: 'white'}}>
                                    Quick Answer (In Beta)
                                </Typography>
                                <div>
                                    <Tooltip title="This feature is still being tested" placement="right-start" arrow sx={{marginRight: '10px'}}>
                                        <ErrorOutlineIcon/>
                                    </Tooltip>
                                    <Tooltip title={"Contact " + companies[tab].company + " about this answer"} placement="right-start" arrow>
                                        <EmailIcon onClick={email}/>
                                    </Tooltip>
                                </div>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2">
                                    {companies[tab].summary}
                                </Typography>
                                <Typography variant="body2" sx={{marginTop: '20px'}}>
                                    Sources:
                                    {getListOfSources().map((source, index) => {
                                        return (
                                            <div key={index}>
                                                {source}
                                            </div>
                                        )
                                    })}

                                </Typography>
                            </CardContent>
                        </Card>
                    }
                </div>
                <Tabs 
                    value={tab} 
                    onChange={handleChange} 
                    aria-label="tabsf" 
                    sx={tabsStyling}
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
                        {companies.length > 0 && <ResponseSidebar responses={companies[tab] ? companies[tab].responses : []} setFileTab={setFileTab} fileArray={fileArray} setScrollId={setScrollId} setPageNumber={setPageNumber} handleClickParent={handleSidebarClick}/>}
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
                                var filenameShortened = filename
                                if (filename.length > 35) {
                                    filenameShortened = filename.substring(0, 35) + "...";
                                }
                                return (
                                    <Tab key={index} label={filenameShortened} />
                                )
                            })}
                            </Tabs>
                        </div>
                        {companies[tab] && pdfView ? <div className="company-result" ref={viewerRef} onScroll={handleScroll}>
                            <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false}/>
                                ))}
                            </Document>
                        </div> 
                        : companies[tab] && <div className="company-result">
                            {highlightResponses(returnedFullText, companies[tab].responses)}
                        </div>} 
                    </div>
                </div>
            </Box>
        </>
    )
}