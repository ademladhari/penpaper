// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import the correct components
import Home from './pages/Home'; // Import your Home component here
import SkillsAndSpells from './pages/SkillsAndSpells';
import Inventory from './pages/Inventory/Inventory';
import Weapons from './pages/Weapons';
import CardSpirits from './pages/CardSpirits';
import {  CurrentPlayerContext } from './context/Context'; // Import from the separate module
import Players from './players';
import FormPage from './Addingdata/FormPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import { AuthContextProvider } from './context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import {  db } from './getdata/FireBase';
import Landingpage from './pages/landingpage/Landingpage';
function App() {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
 

  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const storedPlayer = localStorage.getItem('currentPlayer');
    return storedPlayer || 'player1';
  });

  const [currentGroup, setCurrentGroup] = useState(() => {
    const storedGroup = localStorage.getItem('currentGroup');
    return storedGroup || 'group1';
  });
  async function  players(){
    
    const  querySnapshot = await getDocs(collection(db, 'database','groups',currentGroup ?currentGroup:'group1'));
    const array=[]
    console.log(querySnapshot.docs)
    querySnapshot.docs.forEach((doc) => (  
     
        // eslint-disable-next-line no-sequences
        array.push(doc.id) 
       
     
        
    ));
   setPlayerDivs(array)
  }
  useEffect(()=>{
    players()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentGroup])

  const [playerDivs, setPlayerDivs] = useState(() => {
    try {
      const storedDivs = JSON.parse(localStorage.getItem('playerDivs'));
      return Array.isArray(storedDivs) ? storedDivs : [];
    } catch (error) {
      console.error('Error parsing playerDivs:', error);
      return []; // If error, return an empty array
    }
  });

  const updatePlayer = (newPlayer) => {
    setCurrentPlayer(newPlayer);
    localStorage.setItem('currentPlayer', newPlayer);
  };

  const updatePlayerDivs = (newDivs) => {
    try {
      const divsString = JSON.stringify(newDivs);
      localStorage.setItem('playerDivs', divsString);
      setPlayerDivs(newDivs);
      localStorage.removeItem('playerDivs', divsString);
    } catch (error) {
      console.error('Error storing playerDivs:', error);
    }
  };

  const updateGroup = (newGroup) => {
    setCurrentGroup(newGroup);
    localStorage.setItem('currentGroup', newGroup);
  };

  return (
    <CurrentPlayerContext.Provider
    value={{
      currentPlayer,
      setCurrentPlayer: updatePlayer,
      currentGroup,
      setCurrentGroup: updateGroup,
      playerDivs,
      setPlayerDivs: updatePlayerDivs,
      show,setShow,showLogin,setShowLogin
    }}>
  
   
    <Router>
    <AuthContextProvider>

      <div className="App"> 
      <Players />
      <SignUp/>
         <Login/>
        <Routes>
          <Route  exact  path ="/" element={<Landingpage></Landingpage>} ></Route>
          <Route path="/home" element={<Home />} />
      <Route path="/skills-and-spells" element={<SkillsAndSpells  />} />

      <Route path="/character-creation" element={< FormPage />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/card-spirits" element={<CardSpirits />} />
        <Route path="/inventory" element={<Inventory />} />
          </Routes>
      </div>
      </AuthContextProvider>
    </Router>
  
    </CurrentPlayerContext.Provider>
   
  );
}

export default App;
