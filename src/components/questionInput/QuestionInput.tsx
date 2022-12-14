import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { setQuestion } from './questionSlice';
import TextField from '@mui/material/TextField';


export function QuestionInput() {
    const dispatch = useAppDispatch();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setQuestion(event.target.value));
    }

    return (
    <div>
        <TextField label="Ask a Question" variant="outlined" onChange={handleChange} sx={{width: "100%"}} />
    </div>
    );
}
