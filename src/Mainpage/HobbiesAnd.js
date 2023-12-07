
import React, { useEffect,  useState } from 'react';

import  { GetCharacterDetails } from '../util/GetData';
import { useCurrentPlayer } from '../util/Context';
import { db } from '../util/FireBase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


function HobbiesAnd() {
  const [hide, setHide] = useState(false);
  const [hobby, setHobby] = useState('');
  const [newData, setNewData] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  
  const { currentPlayer,currentGroup } = useCurrentPlayer();
    // Fetch data when the component mounts
  
  
 
   useEffect(() => {
    GetCharacterDetails({
        user: currentPlayer,
        collection: 'hobbies',
        group:currentGroup
      }).then(result=>{
        if(result){
          setIsLoading(false)
        setNewData(result)
      }}
      )
     }, [currentGroup, currentPlayer,hobby])
 
  async function setHobbies() {
    const userRef = doc(
      db,
      'database',
      'groups',
      currentGroup,
      currentPlayer,
      'character',
      'hobbies',
    );

    const userSnap = await getDoc(userRef);
    const currentHobbies = userSnap.exists() ? userSnap.data().hobbies || [] : [];
    const updatedHobbies = [...currentHobbies, hobby];
  
 
    await setDoc(
      userRef,
      {
        ...userSnap.data(),
        hobbies: updatedHobbies,
      },
      { merge: true }
    );
    
    setNewData( {hobbies:updatedHobbies} );
      
    // Update the local state with the new list of hobbies
 
  }

  return (
    <div className='bg-[#798EC8] h-[50%] m-[4%] mr-[0px] rounded-3xl overflow-y-scroll scrollbar w-[92%] break-words overflow-x-hidden relative'>
      <div
        onClick={() => {
          setHide(!hide);
        }}
        className='absolute top-3 right-2 p-2 text-black bg-yellow-400 w-[10.5%] text-center rounded-full z-10'
      >
        +
      </div>
      <h1 className='text-xl text-center pt-[2%] mb-[9%] '>Hobbies and ..</h1>
      {isLoading ? (
        // Render a loading indicator while data is being fetched
        <div className='text-center'>Loading...</div>
      ) : (
        // Render the hobby items when data is available
        <>
    
          {newData.hobbies.map((item, index) => (
            <div key={index} className='flex ml-[3% ] w-[100%]'>
              <div className={`fa fa-star ml-[3%] text-yellow-500 text-xl`}></div>
              <h1 className='pl-[2%] text-lg my-auto w-[100%] overflow-x-auto'>{item}</h1>
            </div>
          ))}
        </>
      )}
      {hide && (
        // Add your code for the "Add a hobby" section here

  

          <div
            className='h-[40%] w-[80%] m-auto bg-yellow-400 rounded-[5%] pt-[10%] absolute top-0 right-0 left-0 bottom-0 mx-auto z-10'
            style={{ maxWidth: '80%' }}
          >
            <div className='absolute top-0 right-0 p-2 text-black z-20'>
              <button
                onClick={() => setHide(false)}
                className='bg-red hover:bg-red-dark text-black font-bold rounded-full p-2'
              >
                X
              </button>
            </div>
            <h1 className='text-2xl text-center'>Add a hobby</h1>
            <input
              value={hobby}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setHobbies();
                  setHobby('');
                }
              }}
              onChange={(e) => setHobby(e.target.value)}
              className='bg-[#8a9ac6] m-[15%] mt-[5%]'
              required
            ></input>
          </div>
        )}
      </div>
    );
            }

export default HobbiesAnd;
