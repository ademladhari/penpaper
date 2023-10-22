import React, { useEffect, useState } from 'react';
import CharacterDetails from '../util/GetData';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';
import Stats2 from './Stats2'
import { useCurrentPlayer } from '../util/Context';
function Stats() {
  let dataFetched = false;
  const [inputMode, setInputMode] = useState(false);
  const [data, setStatsData] = useState([]);
  const { currentPlayer } = useCurrentPlayer();

  async function handleAmountChange(valueIndex, value, itemKey) {
    const userRef = doc(
      db,
      'database',
    currentPlayer,
      'character',
      'character',
      'details',
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

  ///////////////////////////////////get into database
  if (!dataFetched) {
    dataFetched = true;
    const fetchCharacterDataIfNeeded = async () => {
      const result = await CharacterDetails({
        database: 'database',
        user: currentPlayer,
        collection: 'stats',
        setCharacterData: setStatsData,
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
  newData = replaceEmptyWithZero(newData);

  const handleAmountClick = () => {
    setInputMode((prevInputMode) => !prevInputMode);
  };

  newData.sort((a, b) => a.key.localeCompare(b.key));

  return (
    <>
      <div className='bg-[#798EC8] w-[90%]  h-[65%] ml-[5%]  rounded-3xl p-[2%]'>
        <h1 className='text-2xl text-center mb-[1%]'>Stats</h1>
        <div className='flex gap-3.5 pl-[18%]'>
          <h1 className='text-[60%]'>Stat1</h1>
          <h1 className='text-[60%]'>Stat2</h1>
          <h1 className='text-[60%]'>Stat3</h1>
          <h1 className='text-[60%]'>Stat4</h1>
          <h1 className='text-[60%]'>Stat5</h1>
          <h1 className='text-[60%]'>Stat6</h1>
          <h1 className='text-[60%]'>Stat7</h1>
        </div>
        <div className='bg-[#798EC8] h-[8%] mb-[2%] rounded-3xl'>
          {dataFetched && (
            newData.map((item, sectionIndex) => (
              <div key={sectionIndex} className='flex h-[80%]'>
                <h1 className='text-xl w-[15%]'>{item.key}</h1>
                {item.value.map((value, valueIndex) => (
                  <div
                    key={valueIndex}
                    className='bg-yellow-400 m-[1%] h-[60%] w-[12%]'
                  >
                    {!inputMode ? (
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
                    ) : (
                      <div
                        className='text-[70%] h-[100%] text-center w-[90%] cursor-pointer'
                        onDoubleClick={handleAmountClick}
                        style={{
                          fontSize: `${Math.max(65 - value.length, 30)}%`,
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
        <Stats2></Stats2>
        
        
      </div>
      
    </>
  );
}

export default Stats;
