import React from 'react';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import { About } from './components/about/About';
import { CompanyProfile } from './components/companyProfile/CompanyProfile';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <HashRouter basename='/'>
      <div className="App">
        <header className="App-header">
          <Header />

          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/company_profile/:company" element={<CompanyProfile />} />
          </Routes>
        </header>
      </div>
    </HashRouter>
  );
}

export default App;
