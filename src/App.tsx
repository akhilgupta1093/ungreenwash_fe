import React from 'react';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import { CompanyProfile } from './components/companyProfile/CompanyProfile';
import { LandingPage } from 'components/landingPage/LandingPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {

  return (
    <HashRouter basename='/'>
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/lookup" element={<Body />} />
            <Route path="/company_profile/:company" element={<CompanyProfile />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
