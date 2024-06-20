import React from 'react';
import Weather from './components/Weather';
import './App.css';

function App() {
  return (
    <div className="flex justify-center items-center h-screen backdrop-blur-lg bg-gradient-to-r bg-indigo-950 from-indigo-950 to-indigo-800 text-white">
    <Weather />
  </div>
  );
}

export default App;
