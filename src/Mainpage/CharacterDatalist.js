/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import TraitAndForm from './TraitAndForm';
import CharacterDetails from '../util/GetData';
import { useCurrentPlayer } from '../util/Context';

function CharacterDataList({ optionselected }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentPlayer } = useCurrentPlayer();
    // Fetch data based on the selected option
    const fetchData = async () => {
      let collection = '';
      switch (optionselected) {
        case 'traits':
          collection = 'traits';
          break;
        case 'weakness':
          collection = 'weakness';
          break;
        case 'strength':
          collection = 'strength';
          break;
        default:
          break;
      }

      if (collection) {
        const characterData = await CharacterDetails({
          database: 'database',
          user: currentPlayer,
          collection: collection,
          setCharacterData:setData
        });
      
      
      }
    };

    
      fetchData();
      useEffect(()=>{
        if (data.data!==undefined){
          setIsLoading(false);
     }
       },[data.data])

 
 return (
  <div className='h-[80%] overflow-scroll overflow-x-hidden scrollbar relative'>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      data.data.map((item, index) => (
      
        <div key={index} className='flex ml-[3%]'>
           
          <div className={`fa fa-star ${item.color} text-lg`}></div>
          <h1 className='pl-[2%] text-lg my-auto'>{item.name}</h1>
        </div>
      ))
    )}

    {/* Button to show/hide the popup */}
    <button
      className='absolute bottom-2 right-0 p-2 text-black bg-yellow-400 w-[10%] rounded-full z-0'
      onClick={() => setPopupVisible(!popupVisible)}
    >
      +
    </button>

    {/* Popup */}
    {popupVisible && (
  <TraitAndForm
    visible={popupVisible}
    data={data}
    optionselected={optionselected}
    onClose={() => setPopupVisible(false)}
  />
)}
  </div>
);
}

export default CharacterDataList;
