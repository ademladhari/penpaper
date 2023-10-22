import React, { useState } from 'react';
import CharacterDetails from '../util/GetData';
import CharacterDataList from './CharacterDatalist';
import { useCurrentPlayer } from '../util/Context';

function TraitsAnd() {
  const [selectedOption, setSelectedOption] = useState('strength');



 
  const handleOptionClick = (option) => {
    setSelectedOption(option);
 
  };


  const renderContent = () => {

    switch (selectedOption) {
      case 'traits':
        return <CharacterDataList  optionselected='traits' />;
      case 'strength':
        return <CharacterDataList  optionselected='strength'  />;
        case 'weakness':
          return <CharacterDataList  optionselected='weakness'  />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='bg-[#798EC8] h-[24%] mb-[2%] rounded-3xl'>
        <div className='flex justify-around '>
          <h1
            className={`pl-[2%] text-xl my-auto${
              selectedOption === 'traits' ? 'text-yellow-400' : ''
            }`}
            onClick={() => handleOptionClick('traits')}
          >
            Traits
          </h1>
          <h1
            className={`pl-[2%] text-xl my-auto ${
              selectedOption === 'weakness' ? 'text-yellow-400' : ''
            }`}
            onClick={() => handleOptionClick('weakness')}
          >
            Weakness
          </h1>
          <h1
            className={`pl-[2%]  text-xl my-auto ${
              selectedOption === 'strength' ? ' text-yellow-400' : ''
            }`}
            onClick={() => handleOptionClick('strength')}
          >
            Strength
          </h1>
        </div>
        
        {renderContent()}
   
      </div>
    </>
  );
}

export default TraitsAnd;
