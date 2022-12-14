import React, { useState } from 'react';
import './Header.css';
import { AppBar, Toolbar, Typography } from '@mui/material';

export function Header() {
    return (
    <header className="header">
        <AppBar>
            <Toolbar className="toolbar">
                <div className="logo">
                    Ungreenwash
                </div>
            </Toolbar>
        </AppBar>
    </header>
    );
}
