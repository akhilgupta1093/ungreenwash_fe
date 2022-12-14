import React from 'react';
import { Header } from './components/header/Header';
import { Body } from './components/body/Body';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Body />
      </header>
    </div>
  );
}

export default App;
