import React from 'react';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import { About } from './components/about/About';
import { CompanyProfile } from './components/companyProfile/CompanyProfile';
import { LandingPage } from 'components/landingPage/LandingPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { selectPassword } from 'components/landingPage/landingPageSlice';
import { useAppSelector } from 'app/hooks';
import './App.css';


function App() {
  const validPasswords = ["akhil", "christina", "bryan", "simon", "coleman", "juan"];

  const password = useAppSelector(selectPassword);
  const valid = validPasswords.includes(password);

  return (
    <HashRouter basename='/'>
      {valid ? 
      
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/company_profile/:company" element={<CompanyProfile />} />
          </Routes>
        </div>
      </div>

    : <LandingPage />}
    </HashRouter>
  );
}

export default App;
