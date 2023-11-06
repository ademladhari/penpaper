
import '../App.css';
// useHistory needed or it won't work 
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as   useHistory ,useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Roleplay from '../Mainpage/Roleplay';
import VitalStats from '../Mainpage/VitalStats';
import TraitsAnd from '../Mainpage/TraitsAnd';
import Stats from '../Mainpage/Stats';
import HobbiesAnd from '../Mainpage/HobbiesAnd';
import NameInfo from '../Mainpage/NameInfo';
import CharacterDetails from '../util/GetData'; 
import SpiritsComponent from '../Mainpage/Spirit';

import WeaponTalents from '../Mainpage/WeaponTalents';
import { useCurrentPlayer } from '../util/Context';
function Home() {
  
  const navigate = useNavigate(); 
   const location = useLocation();
  useEffect(() => {
   
    
  }, [location.pathname]);
  const [characterData,setCharacterData]=useState({})
  const [data,setData]=useState({hobbies:'.'})
  const [isLoading, setIsLoading] = useState(true); // Add loading state


  const { currentPlayer, setCurrentPlayer } = useCurrentPlayer();
          
    
        CharacterDetails({ database: 'database', user: currentPlayer,collection:'details',setCharacterData:setCharacterData });

      
            // If characterData is available, fetch hobbiesData
         
            useEffect(()=>{
              if (characterData.details !==undefined){
              setIsLoading(false) 
              setData(characterData.details)
             }
              },[characterData])
     
     
          
        // eslint-disable-next-line react-hooks/exhaustive-deps
    
       
        

    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    

 
  return (
<>

    <div className=" bg-[#D6E6F6] w-[100%] flex h-[100%] ">
    <div onClick={()=>{setCurrentPlayer('player1')}} className=' h-[7%] w-[15%] mt-[2.5%] bg-[#263895] rounded-2xl  absolute left-[9%]'>azd</div>
    <div onClick={()=>{setCurrentPlayer('player2')}}className=' h-[5%] w-[15%] mt-[3.5%] bg-[#263895] rounded-2xl  absolute left-[24.5%]'>zad</div>
    <div onClick={()=>{setCurrentPlayer('player3')}} className=' h-[5%] w-[15%] mt-[3.5%] bg-[#263895] rounded-2xl  absolute left-[40%]'>azd</div>
    <div onClick={()=>{setCurrentPlayer('player4')}}  className=' h-[5%] w-[15%] mt-[3.5%] bg-[#263895] rounded-2xl  absolute left-[55.5%]'>azd</div>
    <div onClick={()=>{setCurrentPlayer('player5')}} className=' h-[5%] w-[15%] mt-[3.5%] bg-[#263895] rounded-2xl  absolute left-[71%]'>azd</div>
    
    <div className='bg-[#263895] m-auto  w-[85%] mt-[5%] rounded-[2%] mb-[5%] pb-[3%]  xl:h-[2200px] lg:h-[1300px]  '>
       <div className='section1 w-[50%]   h-[50%] flex flex-col flex-wrap  '>
        <NameInfo />
      
<section className='sectio flex h-[70%] '>
  <div className='  w-[50%]  ml-[2%]     '>
<div className=' bg-[#798EC8] h-[30%] my-[2%]  rounded-3xl '>
{isLoading ? (
                  <div>Loading ... </div>
                 
                ) : (
                  <>
              
                 
                 
<h1 className=' text-xl pl-[2%] pt-[2%]  '>Alter: {data.alter}</h1>
<h1 className=' text-xl pl-[2%]  '>Geburtstag: {data.geburtstag}</h1>
<h1 className=' text-xl pl-[2%] '>Rasse: {data.rasse}</h1>
<h1 className=' text-xl pl-[2%]  '>ursprunglsas: {data.ursprungisas}</h1>
<h1 className=' text-xl pl-[2%]  '>sprachen : {data.sprachen}</h1>
<h1 className=' text-xl pl-[2%]  '>blossom rank : {data.blossomRank}</h1>
</>
                )}
</div>
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
       <div className=' bg-[#798EC8] h-[45%] m-auto mt-[5%] mb-[2%]  w-[95%] rounded-3xl  '>
       
       <img className='w-[95%] h-[95%] m-auto pt-[4%] object-fit object-center   '  src='https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x900.jpg' alt='picturee' ></img>
       </div>
       <div className=' bg-[#798EC8] h-[65%] m-auto overflow-scroll overflow-x-hidden scrollbar  w-[95%] rounded-3xl  '>
       <h1 className=' text-4xl pl-[2%] pt-[2%]  '>Backstroy:</h1>
       {isLoading ?  (<div>loading ...</div>
       ):(
        <p className='text-xl px-[2%] pt-[3%]'>{data.backstory}</p> 
        )}
       </div>
     
       <div className=' w-[100%] pt-[6%]  h-[100%]'>
      
       <div className=' bg-[#798EC8] h-[91%]  m-auto mt-[2%]  w-[95%] rounded-3xl  '>
       <WeaponTalents></WeaponTalents>
       </div>
       </div>  
       </div>
       </div>
       <div className=' w-[55%] pt-[6.5%]  h-[50%]'>
      <SpiritsComponent></SpiritsComponent>
      <div >
      <div className="dotChar2 ml-[10%] mt-[5%]" >
      <button onClick={() => navigate("/skills-and-spells") }>
        Skills and Spells
      </button>
    </div>
    <div className="dotChar2 ml-[10%] mt-[5%]">
      <button onClick={() => navigate("/weapons")}>
        Weapons
      </button>
    </div>
    <div className="dotChar2 ml-[10%] mt-[5%]">
      <button onClick={() => navigate("/card-spirits")}>
        Card Spirits
      </button>
    </div>
    <div className="dotChar2 ml-[10%] ">
      <button onClick={() => navigate("/inventory")}>
        Inventory
      </button>
    </div>
        </div>
       </div> 
    </div>
   
    
  </div>
  
 
        </>
    )
}

export default Home;
