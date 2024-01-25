import React, {  useEffect, useState } from 'react';
import Navbar from './Navbar'
import background from '../../icons/dnd-movie-dungeons-dragons-honor-among-thieves-character-stat-blocks.avif';
import { useCurrentPlayer } from '../../context/Context';
import { UserAuth } from '../../context/AuthContext';


export default function Landingpage() {
  const { currentPlayer,setCurrentGroup } = useCurrentPlayer();
  const [group, setGroup] = useState(""); // State for email
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const correctPassword = "hehe"; // Replace with your actual password
  const correctEmail="hehe@gmail.com"
  const {  login,user,logOut } = UserAuth();
  const {  setUser } = UserAuth();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleGroupChange = (event) => {
    console.log(group)
    setGroup(event.target.value);
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    try {
       // Log out the user
       logOut()
       await login(email, password); // Login the user
  
      // Now that the user is logged in, set the current group
      setCurrentGroup(group);
  
      window.location.href = '/home';

      // Red irect to the Character Creation page after successful login
     
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle any authentication errors here
      // For example, display an error message to the user
    }
   
  };
  

  return (
    <>
      <div className='h-screen w-full relative'>
      <div className='absolute inset-0 bg-cover bg-center blur-sm' style={{ backgroundImage: `url(${background})` }}></div>
  <div className='absolute inset-0 bg-black bg-opacity-70'></div>
  <Navbar />  
         <p className='ml-[17%] top-52 absolute text-white  text-4xl '>Creators Campaign</p>
         <div className='  bg-yellow-600 w-[20%] h-[40%] top-64 ml-[15%]   absolute border-2 border-[black]' >
             <h1 className='  text-black text-3xl ml-[10%] mt-4 font-semibold' >Player</h1>
             <h1 className='  text-black text-2xl ml-[10%] mt-5 font-semibold' >Group Name</h1>
             <input
          className='ml-[9%] mt-2 w-[80%] h-[7%]'
          type="email"
          value={group} 
          onChange={handleGroupChange} 
        />
             <h1 className='  text-black text-2xl ml-[10%] mt-4 font-semibold '>E-Mail-Adresse</h1>

             <input
          className='ml-[9%] mt-2 w-[80%] h-[7%]'
          type="email"
          value={email} // Connect value to email state
          onChange={handleEmailChange} // Handle email input changes
        />
        <h1 className='  text-black text-2xl ml-[10%] mt-4 font-semibold '>Password</h1>
        <input
          className='ml-[9%] mt-2 w-[80%] h-[7%]'
          type="password"
          value={password} // Connect value to password state
          onChange={handlePasswordChange} // Handle password input changes
        />
        <button onClick={handleFormSubmit}>Submit</button>
    
             

        </div>
        <p className='ml-[63%] top-52 absolute text-white  text-4xl '>Privately Hosted Campaign</p>

        <div className='  bg-yellow-600 w-[15.5%] h-[40%] top-64 ml-[60%]   absolute border-2 border-[black]' >
             <h1 className='  text-black text-3xl ml-[10%] mt-6 font-semibold' >Player</h1>
             <h1 className='  text-black text-2xl ml-[10%] mt-5 font-semibold' >Group Name</h1>
             <input className='ml-[9%] mt-1 w-[85%] h-[7%]'></input>
             <h1 className='  text-black text-2xl ml-[10%] mt-6 font-semibold '  >E-Mail-Adresse</h1>
             <input className='ml-[9%] mt-1 w-[85%] h-[7%]'></input>
             <h1 className='  text-black text-2xl ml-[10%] mt-6 font-semibold ' >Password</h1>
             <input className='ml-[9%] mt-1 w-[85%] h-[7%]'></input>
             
        </div>

        <div className='  bg-yellow-600 w-[15.5%] h-[40%] top-64 ml-[76%]   absolute border-2 border-[black]' >
             <h1 className='  text-black text-3xl ml-[10%] mt-6 font-semibold' >Host</h1>
             <h1 className='  text-black text-2xl ml-[10%] mt-5 font-semibold' >Group Name</h1>
             <input className='ml-[9%] mt-1 w-[85%] h-[7%]'></input>
             <h1 className='  text-black text-2xl ml-[10%] mt-6 font-semibold '  >E-Mail-Adresse</h1>
             <input className='ml-[9%] mt-1 w-[85%] h-[7%]'></input>
             <h1 className='  text-black text-2xl ml-[10%] mt-6 font-semibold ' >Password</h1>
             <input className='ml-[9%] mt-1 w-[85%] h-[7%]'></input>
             
        </div>
      </div>
    </>
  );
}
