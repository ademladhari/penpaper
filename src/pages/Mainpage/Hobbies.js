
import React, { useEffect,  useState } from 'react';

import  { GetCharacterDetails } from '../../getdata/GetData';
import { useCurrentPlayer } from '../../context/Context';
import { db } from '../../getdata/FireBase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


function HobbiesAnd() {
  const [hide, setHide] = useState(false);
  const [hobby, setHobby] = useState({hobby:"",v1:0,v2:0});
  const [newData, setNewData] = useState([]);
  const [inputMode, setInputMode] = useState(false);

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  
  const { currentPlayer,currentGroup } = useCurrentPlayer();
    // Fetch data when the component mounts
  
  
 
   useEffect(() => {
    GetCharacterDetails({
        user: currentPlayer,
        collection: 'hobbies',
        group:currentGroup
      }).then(result=>{
        console.log(result)
        if(result){
          setIsLoading(false)
        setNewData(result.hobbies)
      }}
      )
     }, [currentGroup, currentPlayer,hobby])
    
     console.log(newData)

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
    console.log(currentHobbies)
    const updatedHobbies = [...currentHobbies, hobby];
    console.log(updatedHobbies)
  
    await setDoc(
      userRef,
      {
        
        hobbies: updatedHobbies,
      },
      { merge: true }
    );
 
    
    setNewData( updatedHobbies );
      
    // Update the local state with the new list of hobbies
  }
  async function handleAmountChange( value, index,v) {
    const userRef = doc(
      db,
      'database',
      'groups',currentGroup,
     currentPlayer,
      'character',
      'hobbies'
    );
   


    const updatedData =  [...newData] ;
    v==="v2"?updatedData[index].v2 = value : updatedData[index].v1 = value
    
  
    setNewData(updatedData);

    await setDoc(userRef, {hobbies:updatedData}, { merge: true });
  }
  const handleAmountClick = () => {
    setInputMode((prevInputMode) => !prevInputMode);
  };

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
        {newData.map((item, index) => (
  <div key={index} className='flex ml-[3%] w-[100%]'>
    <div className={`text-xl w-[70%]`}>{item.hobby}</div>
    {inputMode ? (
    <button onClick={()=>handleAmountClick()} key={item.key} className='bg-yellow-400 m-[1%] w-[8%] h-[25px] text-center overflow-hidden'>
      {item.v1}
    </button>):(
       <input   
       type='text'
       className='text-center w-[8%] h-[25px]  m-[1%] !bg-yellow-400 inputNoStyles overflow-hidden '
       value={item.v1}
       onChange={(event) =>
         handleAmountChange(
          event.target.value,
           index 
         )
       }
       onBlur={()=>handleAmountClick()}
     />
    )}
   {inputMode ? (
    <button onClick={()=>handleAmountClick()} key={item.key} className='bg-yellow-400 m-[1%] w-[8%] h-[25px]  text-center overflow-hidden '>
      {item.v2}
    </button>):(
       <input   
       type='text'
       className='text-center w-[8%] h-[25px]   m-[1%] !bg-yellow-400 inputNoStyles overflow-hidden  '
       value={item.v2}
       onChange={(event) =>
         handleAmountChange(
          event.target.value,
           index ,
           'v2'
         )
       }
       onBlur={()=>handleAmountClick()}
     />
    )}
     <button  key={item.key} className='bg-yellow-400 m-[1%] w-[9%] h-[25px] text-center cursor-default  overflow-hidden  '>
     {parseInt(item.v1) + parseInt(item.v2)}
    </button>

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
              value={hobby.hobby}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setHobbies();
                  setHobby({hobby:"",v1:0,v2:0});
                }
              }}
              onChange={(e) => setHobby({hobby:e.target.value,v1:0,v2:0})}
              className='bg-[#8a9ac6] m-[15%] mt-[5%]'
              required
            ></input>
          </div>
        )}
      </div>
    );
            }

export default HobbiesAnd;
