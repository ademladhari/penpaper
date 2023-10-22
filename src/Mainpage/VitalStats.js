
import React, { useEffect, useState } from 'react';
import CharacterDetails from '../util/GetData';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';
import { useCurrentPlayer } from '../util/Context';

function VitalStats() {
  let dataFetched = false;
  const [inputMode, setInputMode] = useState(false);
  const [data, setVitalStatsData] = useState([
  ])
  const { currentPlayer } = useCurrentPlayer();

  async function handleAmountChange(valueIndex, value, itemKey) {
    const userRef = doc(
      db,
      'database',
      currentPlayer,
      'character',
      'character',
      'details',
      'VitalStats'
    );
    
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    // Create a copy of the data
    const updatedData = { ...userData};
    updatedData[itemKey][valueIndex] = value;
  
    // Update the state with the new data
    setVitalStatsData(updatedData);

    // Update the Firestore document
    await setDoc(userRef, updatedData, { merge: true });
  }
  ///////////////////////////////////get into database
  if (!dataFetched) {
    dataFetched = true;
    const fetchCharacterDataIfNeeded = async () => {
      const result = await CharacterDetails({
        database: 'database',
        user: currentPlayer,
        collection: 'VitalStats',
        setCharacterData: setVitalStatsData,
      });
    };
    fetchCharacterDataIfNeeded();
  }

  function replaceEmptyWithZero(data) {
    return data.map((item) => ({
      key: item.key,
      value: item.value.map((value) => (value === '' ? 0 : value)),
    }));
  }
  let newData = Object.keys(data).map((key) => {
    return { key, value: data[key] };
  });
  newData=replaceEmptyWithZero(newData)
  const handleAmountClick = () => {
    setInputMode((prevInputMode) => !prevInputMode);
  };
  newData.sort((a, b) => a.key.localeCompare(b.key));
  
  return (
    <>
    <div className=' bg-[#798EC8] w-[90%] mb-[2%]   h-[20%] rounded-3xl p-[2%]  '>
<h1 className=' text-2xl pl-[3%] mb-[1%] '>Vitalstats</h1>
<div className='flex gap-3.5 pl-[18%]'>
<h1 className=' text-[60%] '>Vitqsd</h1>
<h1 className=' text-[60%] '>Vitqsd</h1>
<h1 className=' text-[60%] '>Vitqsd</h1>
<h1 className=' text-[60%] '>Vitqsd</h1>
<h1 className=' text-[60%] '>Vitqsd</h1>
<h1 className=' text-[60%] '>Vitqsd</h1>
<h1 className=' text-[60%] '>Vitqsd</h1>
</div>
    <div className=' bg-[#798EC8]  h-[27%] mb-[2%]  rounded-3xl '>
  
    { dataFetched && (
     
    newData.map((item, sectionIndex) => (
        <div key={sectionIndex} className='flex h-[80%]'>
      
          <h1 className='text-xl w-[15%]'>{item.key}</h1>
          {item.value.map((value, valueIndex) => (
              <div
              key={valueIndex}
              className='bg-yellow-400   m-[1%] h-[60%] w-[12%] '
            >
             {!inputMode ? (
              <input
              
style={{
fontSize: `${Math.max(65 - value.length, 30)}%`,
// Adjust the range (70 and 30) as needed
}}
                type='text'
                className='text-[70%] align-text-top   text-center w-[90%] inputNoStyles'
                value={item.value[valueIndex]}
                onChange={(event) =>
                  handleAmountChange(valueIndex, event.target.value, item.key)
                }
                onBlur={handleAmountClick}
              />
            ) : (
              <div
                className='text-[70%] h-[100%]   text-center w-[90%] cursor-pointer'
                onDoubleClick={handleAmountClick}
                
style={{
fontSize: `${Math.max(65 - value.length, 30)}%`,
// Adjust the range (70 and 30) as needed
}}
              >
                {value}
              </div>
            )
 } </div>
          ))}
        </div>
      )))}
    </div>
    </div>
   </>
  )
}

export default VitalStats