// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LayeredSquaresResume from './components/LayeredSquaresResume';
import StackedResumeMobile from './components/StackedResumeMobile';
import About from './pages/About';
import Echo from './pages/Echo';
import Game from './pages/Game';
import useIsMobile from './hooks/useIsMobile';
import './App.css';

function App() {
  const isMobile = useIsMobile();
  
  // Resume component with route path as prop
  const ResumeComponent = ({ path }) => {
    return isMobile ? 
      <StackedResumeMobile initialPath={path} /> : 
      <LayeredSquaresResume initialPath={path} />;
  };
  
  return (
    <BrowserRouter>
      <div className="App w-full h-full">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<ResumeComponent path="/" />} />
          
          {/* Resume section routes */}
          <Route path="/experience" element={<ResumeComponent path="/experience" />} />
          <Route path="/projects" element={<ResumeComponent path="/projects" />} />
          <Route path="/skills" element={<ResumeComponent path="/skills" />} />
          <Route path="/education" element={<ResumeComponent path="/education" />} />
          
          {/* Other pages */}
          <Route path="/about" element={<About />} />
          <Route path="/echo" element={<Echo />} />
          <Route path="/game" element={<Game />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;