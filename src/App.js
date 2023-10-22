// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import the correct components
import Home from './components/Home'; // Import your Home component here
import SkillsAndSpells from './components/SkillsAndSpells';
import Inventory from './components/Inventory';
import Weapons from './components/Weapons';
import CardSpirits from './components/CardSpirits';
import {  CurrentPlayerContext } from './util/Context'; // Import from the separate module

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('player1')


  return (
    <CurrentPlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
      <Route path="/skills-and-spells" element={<SkillsAndSpells  />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/card-spirits" element={<CardSpirits />} />
        <Route path="/inventory" element={<Inventory />} />
          </Routes>
      </div>
    </Router>
    </CurrentPlayerContext.Provider>
  );
}

export default App;
