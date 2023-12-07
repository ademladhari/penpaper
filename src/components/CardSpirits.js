import { doc, getDoc, setDoc,  } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../util/FireBase';
import { FaPlus } from 'react-icons/fa';
import OtherCharacterDetails from '../util/GetAlldata';
import {  useCurrentPlayer } from '../util/Context';

function SkillsAndSpells() {
  const [isLoading, setIsLoading] = useState(false);
  const [SearchData,setSearchData]=useState([])
  const [hide,setHide]= useState(false)
  const [searchQueryCard, setSearchQueryCard] = useState('');
  const [cardSpirits, setcardSpirits] = useState([])
  const [sorting, setSorting] = useState({ key: '', direction: 'asc' });
  const { currentPlayer,currentGroup } = useCurrentPlayer();

  const location = useLocation();
  useEffect(() => {
    // Scroll to the top of the page whenever the route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);
  /////////////////////////////////get data
  OtherCharacterDetails({setCharacterData:setSearchData,collection:'Spirits',collection2:'CardSpirits'})
  const userRef = doc(db, 'database','groups',currentGroup, currentPlayer, 'spirits', 'cardSpirits');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const newData = userSnap.data();
          setcardSpirits(newData.data);
        } else {
          console.log('Document does not exist');
          setcardSpirits([]);

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ currentPlayer,currentGroup])

useEffect(()=>{
  if (cardSpirits!==undefined){

  setIsLoading(true)
  }
},[cardSpirits])


  
//////////////////////////////////////////end of fetch

const handleUsagesClick = async (index) => {
  try {
    const userSnap = await getDoc(userRef);

    const updatedCardSpirits = [...userSnap.data().data];
    const updatedItem = { ...updatedCardSpirits[index] }; // Create a shallow copy

    // Update the "amount" property of the selected item
    updatedItem.amount = Math.max(0, updatedItem.amount - 1); // You can adjust the logic here as needed
  
    // Update the state with the new data
    const newCardSpirits = [...updatedCardSpirits];
    newCardSpirits[index] = updatedItem;
    setcardSpirits(newCardSpirits);
    console.log(newCardSpirits)

    // Update the data in Firestore

    await setDoc(userRef, { data: newCardSpirits },{merge:true});

    // Now the "amount" value in the database has been update
  } catch (error) {
    console.error('Error updating data:', error);
  }
};
const filteredItemsCard = Object.keys(SearchData).length >0
  ?
   SearchData.data.filter((item) => {
 
      // You can customize the search criteria here.
      const itemText = `${item.name} `.toLowerCase();
      return itemText.includes(searchQueryCard.toLowerCase());
    })
  : [];



  const toggleSorting = (key) => {
    console.log(key)
    if (sorting.key === key) {
      setSorting((prevState) => ({
        ...prevState,
        direction: prevState.direction === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setSorting({ key, direction: 'asc' });
    }
  }
  const resetUsages = async () => {
    if (!isLoading) return;

    try {
      const resetData = cardSpirits.map((item) => {
        // Reset the "amount" property of each item to its original value (e.g., item.maxamount)
        return { ...item, amount: item.maxamount };
      });

      // Update the state with the new data
      setcardSpirits(resetData);
    
      // Update the data in Firestore
      await setDoc(userRef, { data: resetData },{merge:true});

      // Now all "amount" values in the database have been reset
    } catch (error) {
      console.error('Error resetting usages:', error);
    }
  };

  
  const handleSearchChangeCard = (event) => {
    setSearchQueryCard(event.target.value);
  };
 const handleAddData=(item)=>{
  const updatedItems = [...cardSpirits, item];
  setcardSpirits(updatedItems)
  setDoc(userRef, { data: updatedItems },{merge:true})
 }
  return (
    <div className="h-auto bg-[#D6E6F6] flex">
      <div className="bg-[#263895] m-auto w-[85%] mt-[2%] rounded-[2%] mb-[3%] h-[1800px]">
      <div className="bg-[#798EC8] m-[2%] h-[96%] rounded-[2%] pb-[2%]    ">
      {hide && (
            <div className="absolute top-1/4  left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-yellow-400 rounded-lg   shadow-xl  md:w-2/3 lg:w-1/2"  >
                <div className='w-[100%] h-[100%] p-4 border-8 rounded-lg border-[white]' style={{ boxSizing: 'border-box'  }}>
              <div className="flex justify-end">
                <button
                  onClick={() => setHide(false)}
                  className="bg-[#263895] hover:bg-red-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center"
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
          <div className="flex h-[10%] justify-between">
            <h1 className="text-7xl p-[2%]   ">Card Spirits</h1>
            <input
              type="search"
              className="rounded-3xl h-[25%] w-[23%] m-[2%] pl-[1%] text-xl bg-[#D6E6F6] text-[black] placeholder:text-[black] font-semibold"
              placeholder="Search .."
            />
          </div>
          <div class="dropdown absolute pt-[50%] left-[90%]" 
          onClick={resetUsages}> 
Reset
      </div>
      <div className="skillsandspells pl-[3%] pr-[1.5%] pb-[1%] ">
  <div className="text-xl font-semibold">Name</div>
  <div  
    className="text-xl font-semibold cursor-pointer"
    onClick={() => toggleSorting('lvl')}
    title="Click to sort by LV"
  >
    Lv {sorting.key === 'lvl' && sorting.direction === "asc" ? "▲" : "▼" }     
  </div>
  <div className="text-xl font-semibold">Amount</div>
  <div
    className="text-xl font-semibold cursor-pointer"
    onClick={() => toggleSorting('type')}
    title="Click to sort by Type"
  >
    Type {sorting.key === 'type' && sorting.direction === "asc" ? "▲" : "▼" }
  </div>


  <div
    className="text-[1.10rem] font-semibold cursor-pointer"
    onClick={() => toggleSorting('element')}
    title="Click to sort by Element"
  >
    Element {sorting.key === 'element' && sorting.direction === "asc" ? "▲" : "▼" }
  </div>
  <div
    className="text-[1.10rem] font-semibold cursor-pointer"
    onClick={() => toggleSorting('damage')}
    title="Click to sort by Element"
  >
    Damage {sorting.key === 'damage' && sorting.direction === "asc" ? "▲" : "▼" }
  </div>
  <div className="text-xl font-semibold">HitChance</div>
  <div className="text-xl font-semibold">Counter</div>
  <div className="text-xl font-semibold">Effect</div>
</div>

<div className="overflow-scroll h-[75%] overflow-x-hidden scrollbar">
{isLoading ? 

(cardSpirits.map((item, index) => (
  
  <div key={index} className="skillsandspells pl-[3%]">
  
   
    <div className="text-xl"> {item.name}</div>
    <div className="text-xl"> {item.lvl}</div>
    <div className="text-xl cursor-pointer"
                 onClick={() => handleUsagesClick(index)}
                 title={`Click to reduce Usages for ${item.amount}`}>{item.amount}/{item.maxamount}</div>
    <div className="text-xl"> {item.type}</div>
    <div className="text-xl"> {item.element}</div>
    <div className="text-xl"> {item.damage}</div>
    <div className="text-xl"> {item.hitchance}</div>
    <div className="text-xl cursor-pointer"
      onClick={() => handleUsagesClick(index)}
      title={`Click to reduce Usages for ${item.name}`}
    >
       {item.counter}
    </div>
    <div className="text-xl">{item.effect}</div>
  </div>
))):(<div>isloading...</div>)}
</div>  
<div className=' w-[100%] flex ml-[1%]  '>
        
         
        <Link className="links  " to="/skills-and-spells">Skillsandspells</Link>
     
      
        <Link className="links  " to="/character">Home</Link>
     
  
        <Link className="links  " to="/weapons">Weapons</Link>
 
 
        <Link className="links  " to="/inventory">Inventory</Link>
      
      <div onClick={()=>{setHide(true)}} className=' plus-sign'><FaPlus></FaPlus></div>
    
      
      </div>
</div>


      </div>
      
    </div>
  );
}

export default SkillsAndSpells;
