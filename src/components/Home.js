
import '../App.css';
// useHistory needed or it won't work 
// eslint-disable-next-line no-unused-vars
import { Link, BrowserRouter as   useHistory ,useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Roleplay from '../Mainpage/Roleplay';
import VitalStats from '../Mainpage/VitalStats';
import TraitsAnd from '../Mainpage/TraitsAnd';
import Stats from '../Mainpage/Stats';
import HobbiesAnd from '../Mainpage/HobbiesAnd';
import NameInfo from '../Mainpage/NameInfo';
import { GetCharacterDetails } from '../util/GetData'; 
import SpiritsComponent from '../Mainpage/Spirit';

import WeaponTalents from '../Mainpage/WeaponTalents';
import { useCurrentPlayer } from '../util/Context';

function Home() {
  
   const location = useLocation();
  useEffect(() => {
   
    
  }, [location.pathname]);
  const [data,setData]=useState({hobbies:'.'})
  const [isLoading, setIsLoading] = useState(true); // Add loading state
   

  const { currentPlayer, setCurrentPlayer,currentGroup,playerDivs} = useCurrentPlayer();
          

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
    {renderPlayers()}
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
       <div className=' w-[50%] pt-[6.5%]  h-[50%]'>
      <SpiritsComponent></SpiritsComponent>
      <div >    
    <div className=' mt-[5%]  w-[100%] flex ml-[1%]  '>
        
         
        <Link className="links  " to="/skills-and-spells">Skillsandspells</Link>
     
      
        <Link className="links  " to="/weapons">Weapons</Link>
     
  
        <Link className="links  " to="/card-spirits">Card Spirits</Link>
 
 
        <Link className="links  " to="/inventory">Inventory</Link>
      
      </div>
    
        </div>
       </div> 
    </div>
   
    
  </div>
  
 
        </>
    )
}

export default Home;
