import React, { useState, useRef, useEffect } from 'react';
import './Company.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import * as fs from 'fs';
import { fullText, getFullText, setFullText } from './companySlice';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'

import { useAppSelector, useAppDispatch } from '../../app/hooks';

const max_answer_length = 200;

export interface CompanyProps {
    company: string,
    question: string,
    responses: Response[],
}

export interface Response {
    answer: string,
    score: number,
    filename: string,
    id: string,
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '50vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function Company({ company, question, responses }: CompanyProps) {
    let response = responses[0];
    let answer = response.answer;
    let score = response.score;
    let filename = response.filename;

    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        dispatch(setFullText(""));
        setModalSubtext("");
    }
    const [modalSubext, setModalSubtext] = useState("")

    const returnedFullText = useAppSelector(fullText)

    // cut off the answer if it's too long, and add a "..." at the end
    let display_answer = answer;
    if (answer.length > max_answer_length) {
        display_answer = answer.substring(0, max_answer_length) + "...";
    } 

    function handleClickAnswer() {
        setOpen(true);
        dispatch(getFullText({company, filename}));
        setModalSubtext(answer);
    }

    useEffect(() => {
        executeScroll();
    }, [returnedFullText])

    const myRef = useRef<null | HTMLDivElement>(null)
    const executeScroll = () => {
        // Do scrollTo, but with an offset of 10
        myRef.current?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' })
    }

    // Given a long string and a substring, return a tsx element with the substring highlighted
    function highlightSubtext(text: string, subtext: string) {
        let subtext_index = text.indexOf(subtext);
        let subtext_length = subtext.length;
        let before_subtext = text.substring(0, subtext_index);
        let after_subtext = text.substring(subtext_index + subtext_length);
        return (
            <div className="full-text">
                {before_subtext}
                <span ref={myRef} className="highlighted">{text != "" && subtext}</span>
                {after_subtext}
            </div>
        );
    }

    return (
        <div className="company">
            <Card sx={{maxWidth: 250, maxHeight: 250, height: 250, width: 250, padding: 3}}>
                <CardContent>
                    <Link href={"/ungreenwash_fe/#/company_profile/" + company} variant="h5" sx={{color: "black"}}>
                        {company}
                    </Link>
                </CardContent>
                <Typography>
                    {question}
                </Typography>
                <CardActions>
                    <Link component="button" variant="body2" sx={{fontSize: 12, color: "black"}} onClick={handleClickAnswer}>
                        {display_answer}
                    </Link>
                </CardActions>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight="bold">
                        {filename}
                    </Typography>
                    {highlightSubtext(returnedFullText, modalSubext)}                
                </Box>
            </Modal>
        </div>
    );
}
