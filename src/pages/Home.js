
import '../App.css';
// useHistory needed or it won't work 
// eslint-disable-next-line no-unused-vars
import { Link, BrowserRouter as   useHistory ,useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Roleplay from '../pages/Mainpage/Roleplay';
import VitalStats from '../pages/Mainpage/VitalStats';
import TraitsAnd from '../pages/Mainpage/TraitsAnd';
import Stats from '../pages/Mainpage/Stats';

import HobbiesAnd from '../pages/Mainpage/Hobbies';
import NameInfo from '../pages/Mainpage/NameInfo';
import { GetCharacterDetails } from '../getdata/GetData'; 
import SpiritsComponent from '../pages/Mainpage/items/Spirit';
import WeaponTalents from '../pages/Mainpage/items/WeaponTalents';
import { useCurrentPlayer } from '../context/Context';
import { UserAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../getdata/FireBase';
import CharacterData from '../pages/Mainpage/characterData';
import { signOut } from 'firebase/auth';

function Home() {
   const location = useLocation();

  useEffect(() => {
   
    
  }, [location.pathname]);
  const [data,setData]=useState({hobbies:'.'})
  const [isLoading, setIsLoading] = useState(true); // Add loading state
   const {logOut} = UserAuth()

  const { currentPlayer, setCurrentPlayer,currentGroup,playerDivs} = useCurrentPlayer();
  console.log(currentGroup)

 console.log('here')
  useEffect(() => {
    GetCharacterDetails({
        user: currentPlayer,
        collection: 'details',
        group:currentGroup
      }).then(result=>{
        if(result){
          setIsLoading(false)
        setData(result.details)
      }}
      )
     }, [currentPlayer,currentGroup])
  
     function SignOut(){
      logOut()
      window.location.href = '/';         

    } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
       
        
       
  console.log(playerDivs)
        
         const renderPlayers = () => {
          const totalPlayers = playerDivs.length;
          const gapPercentage = 1; // Adjust the gap as needed
          const totalGapWidth = (totalPlayers - 1) * gapPercentage;
          const widthPercentage = totalPlayers > 0 ? (80 - totalGapWidth) / totalPlayers : 0;
        
          return (
            <div 
            >
              {playerDivs.map((player, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentPlayer(player)}
                  className={` ml-[9%] h-[5%] mt-[3.5%] bg-[#263895] rounded-2xl absolute text-center text-xl`}
                  style={{
                    left: `${(index * widthPercentage) + (index * gapPercentage)}%`,
                    width: `${widthPercentage}%`,
                    marginRight: `${gapPercentage}%`,
                  }}
                >
                  {player}
                </div>
              ))}
            </div>
          );
        };
      
    
 
  return (
<>
    <div className=" bg-[#D6E6F6] w-[100%] flex h-[100%] ">
    {renderPlayers()
    
}

    <div className='bg-[#263895] m-auto  w-[85%] mt-[5%] rounded-[2%] mb-[3%] pb-[7%]  xl:h-[2200px] lg:h-[1300px]  '>
    
    
    
       <div className='section1 w-[70%]   h-[50%] flex flex-col flex-wrap  '>
        <NameInfo />
      
<section className='sectio flex h-[70%] '>
  <div className='  w-[50%]  ml-[2%]     '>
<CharacterData data={data} isLoading={isLoading}></CharacterData>
<TraitsAnd></TraitsAnd>
<VitalStats />
<Roleplay/>
  </div>
  <div className='  w-[50%]     '>
   <HobbiesAnd ></HobbiesAnd>
 <Stats/>
  </div>
</section>

<div className=' w-[100%]  h-[90%]'>
<div className='bg-[#798EC8] h-[45%] mt-[5%] mb-[2%] w-[40%] rounded-3xl'>
    <img className='w-[95%] h-[95%] m-auto pt-[4%] object-fit object-center' src='https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x900.jpg' alt='picturee' />
  </div>
  <div className='bg-[#798EC8] h-[65%] overflow-scroll overflow-x-hidden scrollbar w-[40%] rounded-3xl'>
    <h1 className='text-4xl pl-[2%] pt-[2%]'>Backstroy:</h1>
    {isLoading ? <div>Loading...</div> : <p className='text-xl px-[2%] pt-[3%]'>{data.backstory}</p>}
  </div>
   
      
       </div>
       </div>
       <div className=' w-[100%] pt-[6.5%]  h-[50%] flex '>
       <WeaponTalents></WeaponTalents>
      <SpiritsComponent></SpiritsComponent>
      </div>
      <div >    
    <div className='   w-[100%] flex ml-[1%]   '>
        
         
        <Link className="links  " to="/skills-and-spells">Skillsandspells</Link>
     
      
        <Link className="links  " to="/weapons">Weapons</Link>
     
  
        <Link className="links  " to="/card-spirits">Card Spirits</Link>
 
 
        <Link className="links  " to="/inventory">Inventory</Link>
        
      </div>
    
        </div>
    
    
    </div>
    <button onClick={()=>SignOut()} className='h-[60px] w-[60px] bg-[#263895] rounded-[100%] top-6 fixed right-16 flex items-center justify-center text-[#facc15] font-medium '>Log out</button>
    
  </div>

        </>
    )
}

export default Home;
