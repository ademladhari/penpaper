import React, { useEffect, useState } from 'react';
import female from '../icons/female.png';
import CharacterDetails from '../util/GetData';
import { useCurrentPlayer } from '../util/Context';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';

function NameInfo(){
  const { currentPlayer } = useCurrentPlayer();
  const [inputMode, setInputMode] = useState(true);
  const [inputMode2, setInputMode2] = useState(true);
  const [currentValue,setcurrentValue]=useState()
  const [maxValue,setmaxValue]=useState()
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [data, setData] = useState('');

  // German: "Ladezeit" (Loading time)
  const handleAmountClick = () => {
    setInputMode((prevInputMode) => !prevInputMode);
  };
  const handleAmountClick2 = () => {
    setInputMode2((prevInputMode) => !prevInputMode);
  };
  const userRef = doc(db, 'database', 'player1', 'character', 'character', 'details', 'details');
  // German: "AktualisiereMenge" (Update amount)
  const handleAmountChange = (amount) => {
    setData((prevData) => ({
  
      details: {
        ...prevData.details,
        lvl: amount,
      },
     
    }));
  }
    const handleAmountChange2 = (amount) => {

     console.log(data.details)
      // Update the data with the new value entered by the user
      setData((prevData) => ({
    
        details: {
          ...prevData.details,
          xp: amount,
        },
       
      }));
  
    // Now, you can update the document in Firestore with the updated data
    updateDoc(userRef, { details: { 
      ...data.details,
      xp: amount
     } });
  };

  // Fetch character details
  CharacterDetails({ database: 'database', user: 'player1', collection: 'details', setCharacterData: setData });

  useEffect(() => {
    if (data.length !== 0 ) {   
        setmaxValue(data.details.maxxp)
        setcurrentValue(data.details.xp)
      setLoading(true);
    }
  }, [data]);
  function calculatePercentage(value, total) {
   
   const percentage = (value / total) * 100;
    const roundedPercentage = Math.max(10, Math.min(100, Math.round(percentage)));
  
    return roundedPercentage;
  }


  useEffect(() => {
  setPercentage(calculatePercentage(currentValue, maxValue));

  },[currentValue,maxValue]);
 
  const progressBarClassName = ` h-[100%] bg-yellow-500 rounded-full dark:bg-blue-500`;

  return (
    <>
      {loading && (
        <>
          <div className='w-[100%] flex h-[9%] mt-[3%]'>
            <div className='bg-[#798EC8] h-[80%] w-[10%] pt-[0.2%] mt-[1.5%] ml-[2%] rounded-[30%]'>
              <img className='h-[80%] m-auto mt-[10%] w-[80%]' src={female} alt="Female Icon" />
            </div>
            <div className='w-[80%] rounded-3xl h-[80%] ml-[2%] bg-[#798EC8] mt-[1.5%]'>
              <h1 className='text-5xl p-[1%]'>{data.details.name}</h1>
            </div>
          </div>
          <section className='w-[100%] h-[12%] flex'>
            {inputMode ? (
              <div className='bg-[#798EC8] w-[18%] h-[50%] mt-[3%] ml-[2%] rounded-3xl'>
                <h1 onClick={handleAmountClick} className='text-4xl text-center pt-[5%]'>
                  LV.{data.details.lvl}
                </h1>
              </div>
            ) : (
              <div className='bg-[#798EC8] w-[18%] h-[50%] mt-[3%] ml-[2%] rounded-3xl'>
                <input
                  type="text"
                  className="text-4xl text-center pt-[5%] w-[170px]  inputNoStyles"
                  value={data.details.lvl}
                  onChange={(event) => handleAmountChange(event.target.value)}
                  onBlur={handleAmountClick}
                />
              </div>
            )}

            <div class="w-[70%] h-[45%] m-auto bg-[#798EC8] rounded-full dark:bg-gray-700">
              {inputMode2 ?(
              <h1 onClick={handleAmountClick2} class="text-2xl absolute right-[53%] p-[0.5%]">{data.details.xp}</h1>
):(
<input
  type="text"
  className="text-2xl absolute right-[53%] p-[0.5%]  inputNoStyles"
  value={data.details.xp}
  onChange={(event) => handleAmountChange2(event.target.value)}
  onBlur={handleAmountClick2}
/>
)
}
              <div class={progressBarClassName} style={{ width: `${percentage}%` }}></div>
              <div className='bg-[#798EC8] h-[60%] w-[33%] ml-[63%] rounded-b-3xl'>
                <h1 className='text-xl text-center '>
                  {currentValue}/{maxValue}
                </h1>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default NameInfo;
