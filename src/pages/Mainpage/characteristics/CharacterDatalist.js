/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import TraitAndForm from './TraitAndForm';
import  { GetCharacterDetails } from '../../../getdata/GetData';
import { useCurrentPlayer } from '../../../context/Context';

function CharacterDataList({ optionselected }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentPlayer,currentGroup } = useCurrentPlayer();
    // Fetch data based on the selected option
  
   
       console.log(data)
       useEffect(() => {
        GetCharacterDetails({
            user: currentPlayer,
            group:currentGroup,
            collection: optionselected,
          }).then(result=>{
            if(result){
            setData(result)
            setIsLoading(false)
          }else{
            setData({data: [
              { name: '', option: '' }]})
              setIsLoading(false)

          }}
          )
         }, [currentGroup, currentPlayer, optionselected,popupVisible])
 
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
