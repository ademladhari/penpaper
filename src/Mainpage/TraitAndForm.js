import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../util/FireBase';
import { useCurrentPlayer } from '../util/Context';

function CharacterDataPopup({ visible, onClose,data,  optionselected }) {
  const [selectedOption, setSelectedOption] = useState(''); // State for selected option
  const [traitName, setTraitName] = useState(''); // State for the name of the trait
  const { currentPlayer,currentGroup } = useCurrentPlayer();
  const options = ['fire', 'ice', 'water']; // Your list of options

  async function setTraits() {
    const userRef = doc(
      db,
      'database',
      'groups',currentGroup,
      currentPlayer,
      'character',
      
      optionselected 
    );


   
    const newTrait = {
      name: traitName,
      option: selectedOption,
    };
    const updatedData = [...data.data, newTrait];

    await setDoc(
      userRef,
      {
        data: updatedData,
      },
      { merge: true }
    );

    // Clear the input fields after submission
    setSelectedOption('');
    setTraitName('');
 

    // Close the popup
   
  }

  return (
    visible && (
      <div className="bg-yellow-300 shadow-md rounded-[5%] w-[20%] h-[25%] fixed left-[9%] top-[24%] transform translate(-50%, -50%) pt-6 pb-8 mb-4 flex flex-col">        <div className="mb-4 h-[20%]">
          <label className="block text-grey-darker  text-sm font-bold mb-2  ml-[5%] ">
            {optionselected}
          </label>
          <input
            className="shadow appearance-none border rounded ml-[10%] bg-[#8a9ac6] text-[#000] placeholder:text-[#000]  py-2 px-3 text-grey-darker h-[100%] w-[75%]"
            id="username"
            type="text"
            placeholder={optionselected}
            value={traitName}
            onChange={(e) => setTraitName(e.target.value)}
          />
        </div>
        <label className="block text-grey-darker  text-sm font-bold mb-2 h-[20%] pt-[4%] ml-[5%] " for="username">
          Element
        </label>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="bg-[#8a9ac6] h-[15%] mb-[5%]   w-[75%] ml-[10%]"
          required
        >
          <option value="">Select an element</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="flex items-center justify-between mr-[8%]">
          <button
            className="bg-blue hover:bg-blue-dark ml-[10%] text-black font-bold text-center w-[40%] bg-[#8a9ac6]  px-4 rounded"
            type="button"
            onClick={setTraits}
          >
            Add
          </button>
          <button
            className="bg-red hover:bg-red-dark ml-[5%] text-black font-bold text-center w-[40%] bg-[#8a9ac6]  px-4 rounded"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
}

export default CharacterDataPopup;
