/* eslint-disable no-unused-vars */

import React, {  useEffect, useState } from 'react';
import CharacterDetails, { GetCharacterDetails } from '../../getdata/GetData';
import { doc,  setDoc } from 'firebase/firestore';
import { db } from '../../getdata/FireBase';
import { useCurrentPlayer } from '../../context/Context';
import Langklingen  from '../../icons/Symbols/Damagestats/Langklingen.png'
import Schusswaffenkunst from '../../icons/Symbols/Damagestats/Schusswaffen.png'
import SchwereWaffen from  '../../icons/Symbols/Damagestats/SchwereWaffen.png'
import Kurzklingen from '../../icons/Symbols/Damagestats/Kurzklingen.png'
import Magie from '../../icons/Symbols/Damagestats/Magic.png'
import Spezial from '../../icons/Symbols/Damagestats/Spezial.png'

function Stats2() {
  const [inputMode, setInputMode] = useState(false);
  const [data, setStatsData] = useState([]);
  const [dataFetched, setIsDataFetched] = useState(false);
  const statNames = ["Langklingen ","Schusswaffenkunst","Schwere Waffen","Kurzklingen","Magie","Spezial"]
  const statIcons= [Langklingen,Schusswaffenkunst,SchwereWaffen,Kurzklingen,Magie,Spezial]
  const { currentPlayer,currentGroup } = useCurrentPlayer();

  async function handleAmountChange(valueIndex, value, itemKey) {
    const userRef = doc(
      db,
      'database',
      'groups',
      currentGroup,
      currentPlayer,
      'character',
      'stats2' // Change this to match your data structure
    );

    // Create a copy of the data
    const updatedData = { ...data };
    updatedData[itemKey][valueIndex] = value;

    // Update the state with the new data
    setStatsData(updatedData);

    // Update the Firestore document
    await setDoc(userRef, updatedData, { merge: true });
  }

  ///////////////////////////////////get into database

  useEffect(() => {
    GetCharacterDetails({
        user: currentPlayer,
        collection: 'stats2',
        group:currentGroup
      }).then(result=>{
        if(result){
        setStatsData(result)
        setIsDataFetched(true)
      }else{
        setStatsData( {
          t2: [ '', '', '', '', '', '', '' ],
          t1:  [ '', '', '', '', '', '', '' ],
          t5: [ '', '', '', '', '', '', '' ],
          t4:  [ '', '', '', '', '', '', '' ],
          t6:  [ '', '', '', '', '', '', '' ],
          t3: [ '', '', '', '', '', '', '' ]
        })
        setIsDataFetched(true)
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
  newData = replaceEmptyWithZero(newData);

  const handleAmountClick = () => {
    setInputMode((prevInputMode) => !prevInputMode);
  };

  newData.sort((a, b) => a.key.localeCompare(b.key));

  return (
    <>
      <div className='bg-[#798EC8] w-[100%] mb-[2%] h-[55%]  max-h-[50%]  rounded-3xl'>
        <h1 className='text-2xl text-center mb-[1%]'>Schadenstats</h1>
        {console.log("stats2")}

        <div className='flex   gap-5 pl-[30%]'>
          {/* Modify this section to match your stat titles */}
          <h1 className='text-[60%] w-[20%]'>Base</h1>
          <h1 className='text-[60%] w-[20%]'>Rasse</h1>
          <h1 className='text-[60%] w-[10%]'>Erstellung</h1>
          <h1 className='text-[60%] w-[20%]'>Level.Up</h1>
          <h1 className='text-[60%] w-[20%]'>Spirit</h1>
          <h1 className='text-[60%] w-[20%]'>Buff</h1>
          <h1 className='text-[60%] w-[30%]'>Gesamt</h1>
        </div>
        <div className='bg-[#798EC8] h-[30%] mb-[2%] rounded-3xl'>
          {dataFetched && (
            newData.map((item, sectionIndex) => (
              <div key={sectionIndex} className='flex h-[35%]'>
              <h1 className='text-base w-[45%]'>{statNames[sectionIndex]}</h1>
              <img src={statIcons[sectionIndex]} alt={item} />
            
              {item.value.map((value, valueIndex) => (
  <div
    key={valueIndex}
    className={`bg-yellow-400 m-[1%] w-[12%] text-center pb-4 ${valueIndex === item.value.length - 1 ? 'pointer-events-none' : ''}`}
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
              
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Stats2;
