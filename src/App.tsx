import React from 'react';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import { CompanyProfile } from './components/companyProfile/CompanyProfile';
import { LandingPage } from 'components/landingPage/LandingPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { NewsScraper } from 'components/newsScraper/NewsScraper';
import './App.css';
import { isLoadingState } from 'components/body//bodySlice';
import { useAppSelector } from './app/hooks';
import { Loading } from 'components/loading/Loading';

function App() {
  const isLoading = useAppSelector(isLoadingState);

  return (
    <HashRouter basename='/'>
      <Loading isLoading={isLoading} />
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/lookup" element={<Body />} />
            <Route path="/news" element={<NewsScraper />} />
            <Route path="/company_profile/:company" element={<CompanyProfile />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
