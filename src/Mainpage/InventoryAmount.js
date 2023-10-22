import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../util/FireBase';
import { useCurrentPlayer } from '../util/Context';

function YourComponent() {
  const [amounts, setAmounts] = useState([1,5,51]);
  const [inputModes, setInputModes] = useState([false, false, false]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentPlayer } = useCurrentPlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, 'database', currentPlayer, 'inventory', 'inventory');
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const weaponData = userSnap.data();
          setAmounts(weaponData.amount);
          setIsLoading(true);
        } else {
          console.log('Weapons document does not exist');
        }
      } catch (error) {
        console.error('Error fetching weapons data:', error);
      }
    };

    fetchData();
  }, []);




  
  const handleKeyPress = async (e,index) => {
    if (e.key === 'Enter') {
      const inputValue = parseFloat(e.target.value);
      if (!isNaN(inputValue)) {
        // Check if the input is a valid number
        // You can change this to add or subtract by a different number
        e.target.value = ''; // Clear the input fiel
        const updatedAmounts = [...amounts];
        updatedAmounts[index] = Math.max(0, updatedAmounts[index] + inputValue);
        setAmounts(updatedAmounts)
        handleAmountClick(index)
 // Update the corresponding data in Firebase Firestore
  try {
    const userRef = doc(db, 'database', currentPlayer, 'inventory', 'inventory');
    await updateDoc(userRef, { amount: updatedAmounts });
  } catch (error) {
    console.error('Error updating data in Firestore:', error);
  }
      }
   
  }}
 
  
  
  const handleAmountClick = async (index) => {
    const updatedInputModes = [...inputModes];  // Update the corresponding data in Firebase Firestore
    updatedInputModes[index] = !inputModes[index];
    setInputModes(updatedInputModes);

  };

  return (
    <div className='flex h-[5%] gap-3 ml-[2%]'>
 
 {amounts.map((amount, index) => (
  <div key={index} className='flex items-center '>
    <div className='dot2 h-[50%]'></div>
    {inputModes[index] ? (
      <input
        type="text"
        className="text-3xl pl-[5%] w-[170px] inputNoStyles"
        onKeyDown={(e)=>handleKeyPress(e,index)}  
        onBlur={() => handleAmountClick(index)}/>
    ) : (
      <>
          <div
        className="text-3xl pl-[5%] w-[170px] overflow-hidden cursor-pointer"
        onClick={(e)=>handleKeyPress(e,index)}
        onDoubleClick={() => handleAmountClick(index)}
      >{amount}</div>
        
      </>
    )}
  </div>
))}
    </div>
  );
}

export default YourComponent;
