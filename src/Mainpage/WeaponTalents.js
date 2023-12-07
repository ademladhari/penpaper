/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import Description from './Description';


import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';
import { useCurrentPlayer } from '../util/Context';
import OtherCharacterDetails from '../util/GetAlldata';
import { GetWeaponsData } from '../util/GetData';

const WeaponTalents = () => {
    const [weaponData, setWeaponData] = useState([''])
    const [hide, setHide] = useState(false);
    const { currentPlayer,currentGroup } = useCurrentPlayer();
    const [SearchData,setSearchData]=useState([])
    const [searchQueryCard, setSearchQueryCard] = useState('');
    const handleSearchChangeCard = (event) => {
      setSearchQueryCard(event.target.value);
    };
    OtherCharacterDetails({setCharacterData:setSearchData,collection:'weapons',collection2:'weapeons'})

    const filteredItemsCard = Object.keys(SearchData).length >0
  ?
   SearchData.data.filter((item) => {
 
      // You can customize the search criteria here.
      const itemText = `${item.name} `.toLowerCase();
      return itemText.includes(searchQueryCard.toLowerCase());
    })
  : [];
  const userRef = doc(db, 'database','groups',currentGroup, currentPlayer, 'weapons', 'weaponTalent');

  useEffect(() => {
    GetWeaponsData({
        user: currentPlayer,
        collection: 'weaponTalent',
        group:currentGroup
      }).then(result=>{
        if(result){
        setWeaponData(result)
      }else{
        setWeaponData({
          data:[
            { name: '', description: '', icon: '' }]})
      }}
      )
     }, [currentPlayer])
        const handleAddData=(item)=>{
          const updatedItems = [...weaponData.data, item];
          setWeaponData({ data: updatedItems });
          setDoc(userRef, { data: updatedItems })
          console.log(updatedItems)
         }
        
      

  return (
        <div className='bg-[#798EC8] h-[87%] m-auto w-[100%] rounded-3xl'>
            <div className='flex flex-row h-[10%]'>
          <h1 className='text-5xl text-center w-[90%] mb-[5%] p-[3%]'>Weapon Talents</h1>
          <div
          onClick={() => {
            setHide(!hide)
          }}
          className=' mt-[3%] text-black bg-yellow-400 w-[5.5%] h-[56%] pt-[1%] text-center rounded-full z-10'
        >
          +
        </div>
        {hide && (
            <div className="absolute mt-[25%]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-yellow-400 rounded-lg   shadow-xl  md:w-2/3 lg:w-1/2"  >
                <div className='w-[100%] h-[100%] p-4 border-8 rounded-lg border-[white]' style={{ boxSizing: 'border-box'  }}>
              <div className="flex justify-between">
              <div className='ml-[40%] text-3xl'> All Spirits</div>
                <button
                  onClick={() => setHide(false)}
                  className="bg-[#263895] hover:bg-[#252f61] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center"
                >
                  X
                </button>
               
              </div>
              

              <div className="mt-4">
                <input
                  type="search"
                  className="w-full px-4 py-2 text-xl bg-[#D6E6F6] text-black placeholder-text-black font-semibold rounded-3xl"
                  placeholder="Search ..."
                  value={searchQueryCard}
                  onChange={   
                    handleSearchChangeCard }
                />
              </div>

              <div className="mt-4 h-60 overflow-y-auto scrollbar scrollbar-thumb-yellow scrollbar-track-gray-300">

              {filteredItemsCard.map((item) => (
        <div
        key={item}
        onClick={() => {
          handleAddData(item);
        }}

        className={`max-h-[48%] flex  overflow-hidden   cursor-pointer hover:bg-gray-100 rounded-lg ${
          item.effect.length > 200 ? 'large-padding' : 'normal-padding'
        }`}
      >


        <div className="w-1/6 h-12 flex items-center pl-[1%]  rounded-md bg-[#263895] text-white mr-[2%] overflow-hidden">
          {item.name}
        </div>
        <div
          className={`w-5/6 h-[10%] break-words scrollbar    ${
            item.effect.length > 200 ? 'large-padding-content' : 'normal-padding-content'
          }`}
        > 
        {item.effect}
        
          </div>
        </div>
      ))}
              </div>
            </div>
            </div>
          )}
        </div>
          <div className='h-[80%] overflow-y-scroll mt-[5%] scrollbar'>
            {weaponData && Object.keys(weaponData).length > 0 ? (
              <Description data={weaponData.data}></Description>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      );
            } 

export default WeaponTalents;
