/* eslint-disable no-unused-vars */

import React, {  useEffect, useState } from 'react';
import  { GetCharacterDetails } from '../../getdata/GetData';
import { doc, setDoc} from 'firebase/firestore';
import { db } from '../../getdata/FireBase';
import Stats2 from './Stats2'
import { useCurrentPlayer } from '../../context/Context';
import Accuracy from '../../icons/Symbols/Trefferstats/Accuracy.png'
import Agility from '../../icons/Symbols/Trefferstats/Agility.png'
import Concentration from  '../../icons/Symbols/Trefferstats/Concentration.png'
import Dexterity from '../../icons/Symbols/Trefferstats/Dexterity.png'
import Strength from '../../icons/Symbols/Trefferstats/Strength.png'
import Talent from '../../icons/Symbols/Trefferstats/Talent.png'




function Stats() {
  const [inputMode, setInputMode] = useState(false);
  const [data, setStatsData] = useState([]);
  const [dataFetched, setIsDataFetched] = useState(false);
   const statNames = ["Geschicklichkeit","Genauigkeit","Körperkraft","Agilität","Konzentration","Talent"]
   const statIcons= [Dexterity,Accuracy,Strength,Agility,Concentration,Talent]
  const { currentPlayer,currentGroup } = useCurrentPlayer();

  async function handleAmountChange(valueIndex, value, itemKey) {
    const userRef = doc(
      db,
      'database',
      'groups',
      currentGroup,
    currentPlayer,
      'character',

      'stats'
    );

   

    // Create a copy of the data
    const updatedData = { ...data};
    updatedData[itemKey][valueIndex] = value;

    // Update the state with the new data
    setStatsData(updatedData);

    // Update the Firestore document
    await setDoc(userRef, updatedData, { merge: true });
  }

  ///////////////////////////////////get from database

  useEffect(() => {
    GetCharacterDetails({
        user: currentPlayer,
        collection: 'stats',
        group:currentGroup
      }).then(result=>{
        if(result){
        setStatsData(result)
        setIsDataFetched(true)
        console.log(result)
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
      }
    }
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
      <div className='bg-[#798EC8] w-[90%]  h-[65%] ml-[5%]  rounded-3xl p-[2%]'>
        <div className='h-[50%]'>
        <h1 className='text-2xl text-center mb-[1%]'>Trefferstats </h1>

        <div className='flex gap-5 pl-[30%] '>
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
                <h1 className='text-base w-[35%]'>{statNames[sectionIndex]}</h1>
                 <img src={statIcons[sectionIndex]} alt={item}></img>
                 {item.value.map((value, valueIndex) => (
  <div
    key={valueIndex}
    className={`bg-yellow-400 m-[1%] w-[12%] pb-4 ${valueIndex === item.value.length - 1 ? 'pointer-events-none' : ''}`}
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
     
      <Stats2></Stats2>
      
     </div>
    </>
  );
}

export default Stats;
