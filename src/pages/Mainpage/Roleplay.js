/* eslint-disable no-unused-vars */

import React, {  useEffect, useState } from 'react';
import CharacterDetails, { GetCharacterDetails } from '../../getdata/GetData';
import { doc,  setDoc } from 'firebase/firestore';
import { db } from '../../getdata/FireBase';
import { useCurrentPlayer } from '../../context/Context';

function Roleplay() {
  const [inputMode, setInputMode] = useState(false);
  const [data, setData] = useState([]);
  const [dataFetched, setIsDataFetched] = useState(false);
  const statNames = ["Wahrnehmung","Heimlichkeit","Überzeugen","Empathie","Herstellen","Elektronik"]

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
     }, [currentGroup, currentPlayer])
  

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
    <div className='bg-[#798EC8] h-[40%] rounded-3xl p-[1.5%]'>
      <h1 className='text-2xl text-center'>Roleplay stats</h1>
      <div className='flex gap-6 pl-[23%] '>
        <h1 className='text-[60%] w-[20%]'>Base</h1>
          <h1 className='text-[60%] w-[20%]'>Rasse</h1>
          <h1 className='text-[60%] w-[10%]'>Erstellung</h1>
          <h1 className='text-[60%] w-[20%]'>Level.Up</h1>
          <h1 className='text-[60%] w-[20%]'>Spirit</h1>
          <h1 className='text-[60%] w-[20%]'>Buff</h1>
          <h1 className='text-[60%] w-[30%]'>Gesamt</h1>
        </div>

      

      {dataFetched && (
        newData.map((item, itemIndex) => (
          <div key={item.key} className='flex h-[11%] '>
                <h1 className='text-base w-[25%]'>{statNames[itemIndex]}</h1>
                {item.value.map((value, valueIndex) => (
  <div
    key={valueIndex}
    className={`bg-yellow-400 m-[1%] w-[12%] ${valueIndex === item.value.length - 1 ? 'pointer-events-none' : ''}`}
  >
    {valueIndex === item.value.length - 1 ? (
      <div onClick={handleAmountClick}
        className='text-[70%] h-[100%] text-center w-[90%]'
        style={{
          fontSize: `${Math.max(65 - value.length, 30)}%`,
        }}
      >
        {/* Display the sum of other values */}
        {item.value.slice(0, -1).reduce((acc, val) => (acc += parseFloat(val) || 0), 0)}
      </div>
    ) : (
      <input
        style={{
          fontSize: `${Math.max(65 - value.length, 30)}%`,
        }}
        type='text'
        className='text-[70%] align-text-top text-center w-[90%] inputNoStyles'
        value={item.value[valueIndex]}
        onChange={(event) =>
          handleAmountChange(
            valueIndex,
            event.target.value,
            item.key
          )
        }
        onBlur={handleAmountClick}
      />
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
