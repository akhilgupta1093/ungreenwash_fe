import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { selectQuestion, setQuestion, selectSearchHistory, addToSearchHistory } from './questionSlice';
import { selectedCompanies, selectSummarize } from '../filter/filterSlice';
import { getBaseQAs } from '../body/bodySlice';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';


export function QuestionInput() {
    const dispatch = useAppDispatch();

    const companies = useAppSelector(selectedCompanies)
    const summarize = useAppSelector(selectSummarize)
    const question = useAppSelector(selectQuestion)
    const searchHistory = useAppSelector(selectSearchHistory)

    function handleChange(event: any, value: any) {
        dispatch(setQuestion(value));
    }
    
    function getAnswers() {
        dispatch(addToSearchHistory(question));
        console.log("get answers with summarize: " + summarize)
        dispatch(getBaseQAs({question, companies, summarize}));
    }

    function keyPress(e: any) {
        const enterKey = 13;
        if (e.keyCode == enterKey) {
            getAnswers();
        }
    }

    return (
    <div style={{display: 'flex'}}>
        <Autocomplete
            sx={{width: "100%", backgroundColor: "white"}}
            options={searchHistory}
            value={question}
            onChange={handleChange}
            onInputChange={handleChange}
            onKeyDown={keyPress}
            clearOnBlur={false}
            renderInput={(params) => <TextField {...params} label="Ask a Question" />}
        />
        <IconButton style={{marginLeft: "10px"}} onClick={getAnswers} sx={{".css-ci5apu-MuiSvgIcon-root": {color: "rgb(236, 71, 85)"}}}>
            <SendIcon color="primary"/>
        </IconButton>
    </div>
    );
}
