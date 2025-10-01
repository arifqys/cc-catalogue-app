import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CardList from './pages/CardList';
import CardDetail from './pages/CardDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CardList />} />
            <Route path="/card/:id" element={<CardDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;