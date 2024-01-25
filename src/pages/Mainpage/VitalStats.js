
/* eslint-disable no-unused-vars */

import React, {  useEffect, useState } from 'react';
import {GetCharacterDetails} from '../../getdata/GetData';
import { doc, getDoc, setDoc} from 'firebase/firestore';
import { db } from '../../getdata/FireBase';
import { useCurrentPlayer } from '../../context/Context';

function VitalStats() {
  const [inputMode, setInputMode] = useState(false);
  const [data, setVitalStatsData] = useState( {
    t2: ['', '','','','','','' ],
    t3: ['', '','','','', '','' ],
    t1: ['', '','','','', '','' ]
  })
  const [dataFetched, setDataFetched] = useState(false)
  const statNames = ["Lebenspunkte ","Ausweichen ","Kontern "]

  const { currentPlayer,currentGroup } = useCurrentPlayer();

  async function handleAmountChange(valueIndex, value, itemKey) {
    const userRef = doc(
      db,
      'database',
      'groups',currentGroup,
      currentPlayer,
      'character',
      'VitalStats'
    ); // Create a copy of the data
    const updatedData = { ...data};
    updatedData[itemKey][valueIndex] = value;
  
    // Update the state with the new data
    setVitalStatsData(updatedData);

    // Update the Firestore document
    await setDoc(userRef, updatedData, { merge: true });
  }
  ///////////////////////////////////get into database
 useEffect(() => {
GetCharacterDetails({
    user: currentPlayer,
    collection: 'VitalStats',
    group:currentGroup
  }).then(result=>{
    setDataFetched(true)
    if(result){
    setVitalStatsData(result)
  }}
  )
 }, [currentPlayer,currentGroup])
 

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
    <div className=' bg-[#798EC8] w-[100%] mb-[2%]   h-[20%] rounded-3xl p-[2%]  '>
<h1 className=' text-2xl  mb-[1%] text-center '>Vitalstats</h1>

<div className='flex gap-5 pl-[25%] '>
        <h1 className='text-[60%] w-[20%]'>Base</h1>
          <h1 className='text-[60%] w-[20%]'>Rasse</h1>
          <h1 className='text-[60%] w-[10%]'>Erstellung</h1>
          <h1 className='text-[60%] w-[20%]'>Level.Up</h1>
          <h1 className='text-[60%] w-[20%]'>Spirit</h1>
          <h1 className='text-[60%] w-[20%]'>Buff</h1>
          <h1 className='text-[60%] w-[30%]'>Gesamt</h1>
        </div>
    <div className=' bg-[#798EC8]  h-[27%] mb-[2%]  rounded-3xl '>
    { dataFetched && (
     
    newData.map((item, sectionIndex) => (
        <div key={sectionIndex} className='flex h-[80%]'>
      
      <h1 className='text-base w-[25%]'>{statNames[sectionIndex]}</h1>
                 
          {item.value.map((value, valueIndex) => (
  <div
    key={valueIndex}
    className={`bg-yellow-400 m-[1%] w-[12%] ${valueIndex === item.value.length - 1 ? 'pointer-events-none' : ''}`}
  >
    {valueIndex === item.value.length - 1 ? (
      <div
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
      )))}
    </div>
    </div>
   </>
  )
}

export default VitalStats