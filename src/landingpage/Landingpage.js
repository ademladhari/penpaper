import React, {  useState } from 'react';
import Navbar from './Navbar'
import background from '../icons/dnd-movie-dungeons-dragons-honor-among-thieves-character-stat-blocks.avif';


export default function Landingpage() {
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [password, setPassword] = useState("");
  const correctPassword = "hehe"; // Replace with your actual password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  
  const handlePasswordSubmit = (event) => {
    event.preventDefault();
  console.log('here')
  console.log(password)
  console.log(correctPassword)
  if (password.trim() === correctPassword.trim()) {      // Redirect to the Character Creation page if the password is correct
      window.location.href = '/character';
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

 

  return (
    <>
      <div className='h-screen w-full relative'>
      <div className='absolute inset-0 bg-cover bg-center blur-sm' style={{ backgroundImage: `url(${background})` }}></div>
  <div className='absolute inset-0 bg-black bg-opacity-70'></div>
  <Navbar />  
        <div className='absolute inset-0 flex flex-col items-center justify-center z-20 text-3xl text-white'>
          <div className='w-3/4 h-1/5 p-4'>
            <h2 className='text-5xl mb-5'>Welcome to Nazrudin</h2>
            <div className='flex flex-col md:flex-row' >

            <details class=" inline-block w-[150px] h-[80px] align-middle text-center py-5 mb-9  text-3xl ">
       <summary>Explore</summary>
        <ul className="">
          <li
            className=" p-[13%] pr-3 rounded-2xl mb-5   cursor-pointer "
           
          >
            Maps
          </li>
          <li
            className=" p-[13%] rounded-2xl  cursor-pointer"
          
          >
            Lore
          </li>
         
        </ul>
      </details>

           
              {!showPasswordInput && (
<>
     
<button onClick={()=>{setShowPasswordInput(!showPasswordInput)}} 
               
                className=' text-4xl  w-[150px] h-[80px]  text-white py-4 p-10 rounded-xl  md:ml-2'
              >
               Play!
              </button>
        </>
        )}
        {showPasswordInput && (
         <form onSubmit={handlePasswordSubmit}>
         <input
           type="password"
           placeholder="Password"
           value={password}
           onChange={handlePasswordChange}
           className="xl:text-2xl text-base font-bold xl:mx-4 mx-2 text-black"
         />
         <button type="submit" className="xl:text-2xl text-base font-bold xl:mx-4 mx-2">
           Enter
         </button>
       </form>
        )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
