import React, { useState } from 'react';
import './Header.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router } from "react-router-dom";
import config from '../landingPage/config/index.json';

export function Header() {
    const { navigation, company, callToAction } = config;
    const { logo } = company;

    return (
    <header className="header">
        <div className="toolbar">
            <a href="/#/">
                <img alt="logo" className="h-16 w-auto sm:h-16" src={logo} />
            </a>
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              {navigation.map((item) => {return !item.scroll && (
                <a 
                  key={item.name} 
                  href={item.href}
                  className="font-medium text-gray-500 hover:text-gray-900"
                > 
                  {item.name}
                </a>
              )
            }
            )}
            </div>
        </div>
    </header>
    );
}
