import React from 'react';
import './App.css'; // Your main CSS file

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';

function App() {
  return (
    <div className="container bg-black padding">
      <Sidebar />
      <MainContent />
      <Player />
    </div>
  );
}

export default App;