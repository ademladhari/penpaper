import React, { useEffect, useRef, useState } from 'react'

function Inventory() {
    const [items,setItems] =useState( [
        {
          name: 'Item 1',
          lvl: 5,
          damage: 30,
          amount:34,
          scaling: 0.5,
          scalingType: 'Physical',
          requirements: 'Strength 20, Dexterity 15',
          effect: 'Increases attack power.',
        },

        {
          name: 'Item 1',
          lvl: 5,
          damage: 30,
          amount:34,
          scaling: 0.5,
          scalingType: 'Physical',
          requirements: 'Strength 20, Dexterity 15',
          effect: 'Increases attack power.',
        },
        {
          name: 'Item 1',
          lvl: 5,
          damage: 30,
          scaling: 0.5,
          amount:34,
          scalingType: 'Physical',
          requirements: 'Strength 20, Dexterity 15',
          effect: 'Increases attack power.',
        },
        {
          name: 'Item 2',
          lvl: 8,
          damage: 50,
          scaling: 1.2,
          amount:34,
          scalingType: 'Magical',
          requirements: 'Intelligence 25',
          effect: 'Boosts magical abilities.',
        },
      
      ]);
      const [amount1, setAmount1] = useState(1215);
      const [amount2, setAmount2] = useState(1215);
      const [amount3, setAmount3] = useState(1215);
      const [inputMode, setInputMode] = useState(false);
      const [inputMode1, setInputMode1] = useState(false);
      const [inputMode2, setInputMode2] = useState(false);
      const [inputMode3, setInputMode3] = useState(false);
      const handleAmountClick = () => {
       
        setInputMode((prevInputMode) => !prevInputMode);
      };
      const handleAmountClick1 = () => {
       
        setInputMode1((prevInputMode) => !prevInputMode);
      };
      const handleAmountClick2 = () => {
       
        setInputMode2((prevInputMode) => !prevInputMode);
      };
      const handleAmountClick3 = () => {
       
        setInputMode3((prevInputMode) => !prevInputMode);
      };
      const handleInputChange1 = (event) => {
        const newValue = parseInt(event.target.value);
        setAmount1(isNaN(newValue) ? 0 : newValue);
        
      };
      const handleInputChange2 = (event) => {
        const newValue = parseInt(event.target.value);
        setAmount2(isNaN(newValue) ? 0 : newValue);
        
      };
      const handleInputChange3 = (event) => {
        const newValue = parseInt(event.target.value);
        setAmount3(isNaN(newValue) ? 0 : newValue);
        
      };
      const handleAmountChange = (index, newAmount) => {
        setItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[index].amount = newAmount;
          return updatedItems;
        });
      };
      
    
      return (
        <div className=" h-auto bg-[#D6E6F6] flex">
   <div className=' bg-[#263895] m-auto w-[85%] mt-[2%] rounded-[2%] mb-[5%]   h-[1700px]'>
   <div className='bg-[#798EC8] m-[2%] h-[93%] rounded-[2%]   '>
    <div className='flex h-[8%] justify-between'>
   <h1 className=" text-7xl p-[1%]">Inventory </h1>
   <input
      type="search "
      className=' rounded-3xl h-[30%] w-[23%] m-[2%] pl-[1%] text-xl bg-[#D6E6F6] text-[black] placeholder:text-[black] font-semibold  '
      placeholder="Search .."
     />
 
      </div>
      <div className=' flex h-[5%] gap-3 ml-[2%]'>
      <div className='dot2 h-[50%]'></div>
      {inputMode1 ? (
     
              <input
                type="text"
                className=" text-3xl h-1/2 w-[170px]  inputNoStyles   "
                value={amount1}
               
                onChange={handleInputChange1}
                onBlur={handleAmountClick1}
              />
            ) : (
              <div className="text-3xl w-[170px] overflow-hidden    cursor-pointer" onClick={()=>setAmount1(amount1-1)}  onDoubleClick={handleAmountClick1}>
               
                {amount1}
              </div>
            )}
      <div className='dot2 h-[40%]'></div>
      {inputMode2 ? (
     
     <input
       type="text"
       className=" text-3xl h-[40%] w-[170px] inputNoStyles   "
       value={amount2}
       onChange={handleInputChange2}
       onBlur={handleAmountClick2}
     />
   ) : (
     <div className="text-3xl h-[40%] w-[170px] overflow-hidden  cursor-pointer" onClick={()=>setAmount2(amount2-1)} onDoubleClick={handleAmountClick2}>
       {amount2}
     </div>
   )}
      <div className='dot2 h-[50%]'></div>
      {inputMode3 ? (
     
     <input
       type="text"
       className=" text-3xl h-[50%] w-[170px]   inputNoStyles   "
       value={amount3}
       onChange={handleInputChange3}
       onBlur={handleAmountClick3}
     />
   ) : (
     <div className="text-3xl h-[50%] w-[170px]  overflow-hidden  cursor-pointer" onClick={()=>setAmount3(amount3-1)} onDoubleClick={handleAmountClick3}>
      
       {amount3}
     </div>
   )}
      </div>
      
      <div class="inventory pl-[3%]">
  <div class="px-4 py-2 text-xl">Name</div>
  <div class=" px-4 py-2 text-xl">Amount</div>
  <div class=" px-4 py-2 text-xl">Effect</div>
  
</div>
<div className="overflow-scroll h-[75%] overflow-x-hidden scrollbar">
{items.map((item, index) => (
            <div key={index} className="inventory  pl-[3%]  ">
              <div className="px-4 py-2 text-xl">{item.name}</div>
             
             
              {inputMode ? (
            <input
              type="text"
              className="text-xl h-[55%] w-[170px]   inputNoStyles   "
              value={item.amount}
              onChange={(event) => handleAmountChange(index, event.target.value)}
              onBlur={handleAmountClick}
            />
          ) : (
            <div
              className="text-xl  w-[170px]  overflow-hidden  cursor-pointer"
              
              onDoubleClick={handleAmountClick}
            >
              {item.amount}
            </div>
          )}
              
              <div className="px-4 py-2 text-xl">{item.damage}</div>
              
            </div>
          ))}
        
        </div>
   </div>
   </div>
    </div>
      );
    }
  


export default Inventory