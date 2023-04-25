import React from 'react';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import { CompanyProfile } from './components/companyProfile/CompanyProfile';
import { LandingPage } from 'components/landingPage/LandingPage';
import { Faq } from 'components/faq/Faq';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { NewsScraper } from 'components/newsScraper/NewsScraper';
import './App.css';
import { isLoadingState } from 'components/body//bodySlice';
import { useAppSelector } from './app/hooks';
import { Loading } from 'components/loading/Loading';
import foliage from './foliage.jpeg';


function App() {
  const isLoading = useAppSelector(isLoadingState);

  return (
    <HashRouter basename='/'>
      <Loading isLoading={isLoading} />
      <div className="App">
        <img src={foliage} alt="foliage" style={{objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}} />
        {/* make text white and bold */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold', fontSize: '50px' }}>
          Under Construction...
        </div>
        {/* <div className="App-header">
          <Header />
        </div>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/lookup" element={<Body />} />
            <Route path="/news" element={<NewsScraper />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/company_profile/:company" element={<CompanyProfile />} />
          </Routes>
        </div> */}
      </div>
    </HashRouter>
  );
}

export default App;
