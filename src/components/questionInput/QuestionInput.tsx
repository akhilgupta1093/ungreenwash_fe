import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { selectQuestion, setQuestion } from './questionSlice';
import { selectedCompanies } from '../filter/filterSlice';
import { getBaseQAs } from '../body/bodySlice';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';


export function QuestionInput() {
    const dispatch = useAppDispatch();

    const companies = useAppSelector(selectedCompanies)
    const question = useAppSelector(selectQuestion)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setQuestion(event.target.value));
    }
    
    function getAnswers() {
        dispatch(getBaseQAs({question, companies}));
    } 

    function keyPress(e: any) {
        const enterKey = 13;
        if (e.keyCode == enterKey) {
            getAnswers();
        }
    }

    return (
    <div style={{display: 'flex'}}>
        {/* <TextField label="Ask a Question" variant="outlined" onChange={handleChange} sx={{width: "100%", backgroundColor: "white"}} onKeyDown={keyPress} /> */}
        <Autocomplete
            id="free-solo-demo"
            sx={{width: "100%", backgroundColor: "white"}}
            options={["hello", "world"]}
            renderInput={(params) => <TextField {...params} label="Ask a Question" />}
        />
        <IconButton style={{marginLeft: "10px"}} onClick={getAnswers}>
            <SendIcon color="primary"/>
        </IconButton>
    </div>
    );
}
