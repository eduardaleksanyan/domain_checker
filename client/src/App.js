import React from 'react';
import { Header } from './components/Header/Header'
import Upload from './components/Upload/Upload';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import Domains from './components/Domains/Domains';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Route path="/" exact render={ () => <Upload />}></Route> 
        <Route path="/domains" render={ () => <Domains />}></Route> 
      </div>
    </BrowserRouter>
  );
}

export default App;
