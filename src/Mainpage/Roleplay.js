/* eslint-disable no-unused-vars */

import React, {  useEffect, useState } from 'react';
import CharacterDetails, { GetCharacterDetails } from '../util/GetData';
import { doc,  setDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';
import { useCurrentPlayer } from '../util/Context';

function Roleplay() {
  const [inputMode, setInputMode] = useState(false);
  const [data, setData] = useState([]);
  const [dataFetched, setIsDataFetched] = useState(false);

 ///////////////////put into database
 const { currentPlayer,currentGroup } = useCurrentPlayer();

  async function handleAmountChange(valueIndex, value, itemKey) {
    const userRef = doc(
      db,
      'database',
      'groups',currentGroup,
     currentPlayer,
      'character',
      'roleplay'
    );
    
    // Create a copy of the data
    const updatedData = { ...data };
    updatedData[itemKey][valueIndex] = value;
  
    // Update the state with the new data
    setData(updatedData);

    // Update the Firestore document
    await setDoc(userRef, updatedData, { merge: true });
  }
 /////////////////// get from database
  useEffect(() => {
    GetCharacterDetails({
        user: currentPlayer,
        collection: 'roleplay',
        group:currentGroup
      }).then(result=>{
        if(result){
        setData(result)
        setIsDataFetched(true)
      }else{
        setData( {
          t2: [ '', '', '', '', '', '', '' ],
          t1:  [ '', '', '', '', '', '', '' ],
          t5: [ '', '', '', '', '', '', '' ],
          t4:  [ '', '', '', '', '', '', '' ],
          t6:  [ '', '', '', '', '', '', '' ],
          t3: [ '', '', '', '', '', '', '' ],
          t7: [ '', '', '', '', '', '', '' ]
        })
        setIsDataFetched(true)
      }}
      )
     }, [currentPlayer])
  

  let newData = Object.keys(data).map((key) => {
    return { key, value: data[key] };
  });
  function replaceEmptyWithZero(data) {
    return data.map((item) => ({
      key: item.key,
      value: item.value.map((value) => (value === '' ? 0 : value)),
    }));
  }
  newData=replaceEmptyWithZero(newData)
  const handleAmountClick = () => {
    setInputMode((prevInputMode) => !prevInputMode);
  };
  newData.sort((a, b) => a.key.localeCompare(b.key));

  return (
    <div className='bg-[#798EC8] h-[35%] rounded-3xl p-[1.5%]'>
      <h1 className='text-2xl text-center'>Roleplay stats</h1>
      <div className='flex gap-[6.6%] pl-[15%]'>
        <h1 className=' text-[60%] '>Vitqsd</h1>
        {console.log("role")}

        <h1 className=' text-[60%] '>Vitqsd</h1>
        <h1 className=' text-[60%] '>Vitqsd</h1>
        <h1 className=' text-[60%] '>Vitqsd</h1>
        <h1 className=' text-[60%] '>Vitqsd</h1>
        <h1 className=' text-[60%] '>Vitqsd</h1>
        <h1 className=' text-[60%] '>Vitqsd</h1>

      </div>

      

      {dataFetched && (
        newData.map((item, itemIndex) => (
          <div key={item.key} className='flex h-[12%] '>
            <h1 className='text-base pr-[8%] w-[15%]'>{item.key}</h1>
            {item.value.map((value, valueIndex) => (
              <div
                key={valueIndex}
                className='bg-yellow-400  m-[1%] h-[60%] w-[12%] '
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
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Roleplay;
