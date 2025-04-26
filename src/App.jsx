// src/App.jsx
import React from 'react';
import LayeredSquaresResume from './components/LayeredSquaresResume';
import StackedResumeMobile from './components/StackedResumeMobile';
import useIsMobile from './hooks/useIsMobile';
import './App.css';

function App() {
  const isMobile = useIsMobile();

  return (
    <div className="App">
      {isMobile ? <StackedResumeMobile /> : <LayeredSquaresResume />}
    </div>
  );
}

export default App;