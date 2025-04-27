// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LayeredSquaresResume from './components/LayeredSquaresResume';
import StackedResumeMobile from './components/StackedResumeMobile';
import About from './pages/About';
import Echo from './pages/Echo';
import Game from './pages/Game';
import useIsMobile from './hooks/useIsMobile';

import './App.css';

function App() {
  const isMobile = useIsMobile();

  return (
    <BrowserRouter>
      <div className="App w-full h-full">
        <Routes>
          <Route
            path="/"
            element={isMobile ? <StackedResumeMobile /> : <LayeredSquaresResume />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/echo" element={<Echo />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;