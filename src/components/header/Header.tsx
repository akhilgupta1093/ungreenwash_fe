import React, { useState } from 'react';
import './Header.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router } from "react-router-dom";

export function Header() {
    return (
    <header className="header">
        <AppBar>
            <Toolbar className="toolbar">
                <div className="logo">
                    Climate Data Lookup
                </div>

                <div className="links">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </div>
            </Toolbar>
        </AppBar>
    </header>
    );
}
