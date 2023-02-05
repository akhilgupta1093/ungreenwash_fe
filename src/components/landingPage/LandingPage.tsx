import React from 'react';
import './LandingPage.css';
import photic from '../../assets/images/photic.jpg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectPassword, setPassword } from './landingPageSlice';

import { TextField } from '@mui/material';

export function LandingPage() {
    const dispatch = useAppDispatch();

    const password = useAppSelector(selectPassword);

    return (
        <div className="landing-page">
            <img src={photic} alt="photic" />
            <div className="landing-page-text">
                <h1 className="landing-page-text-block">Welcome to Photic</h1>
                <h2 className="landing-page-text-block">Coming Soon</h2>
            </div>
            <div className="landing-page-password">
                <TextField
                    id="outlined-password-input"
                    label="Internal Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    sx={{ backgroundColor: "#5A5A5A", marginTop: '20vh', width: '20vw'}}
                />
            </div>
        </div>
    )
}