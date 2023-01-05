import React from 'react';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import { About } from './components/about/About';
import { CompanyProfile } from './components/companyProfile/CompanyProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />

          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/ungreenwash_fe" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/company_profile/:company" element={<CompanyProfile />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
