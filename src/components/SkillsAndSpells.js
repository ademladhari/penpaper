import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../util/FireBase';
import { FaPlus } from 'react-icons/fa';

import OtherCharacterDetails from '../util/GetAlldata';
import { useCurrentPlayer } from '../util/Context';
function SkillsAndSpells() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryCard, setSearchQueryCard] = useState('');
  const { currentPlayer,currentGroup } = useCurrentPlayer();

  const [hide,setHide]= useState(false)
  const [SearchData,setSearchData]=useState([])
  const [items, setItems] = useState([]);
const filteredItems = items.filter((item) => {
  
  // You can customize the search criteria here.
  const itemText = `${item.name} ${item.type} ${item.element} ${item.explanation}`.toLowerCase();
  return itemText.includes(searchQuery.toLowerCase());
});

const filteredItemsCard = Object.keys(SearchData).length >0
  ?
   SearchData.data.filter((item) => {
 
      // You can customize the search criteria here.
      const itemText = `${item.name} `.toLowerCase();
      return itemText.includes(searchQueryCard.toLowerCase());
    })
  : [];
  
const userRef = doc(db, 'database','groups',currentGroup, currentPlayer, 'skillsandspells', 'skillsandspells');
OtherCharacterDetails({setCharacterData:setSearchData,collection:'SkillsAndSpells',collection2:'SkillsAndSpells'})
   

    const fetchData = async () => {
  try {
  
    const userSnap = await getDoc(userRef);
 
    if (userSnap.exists()) {
      const newData = userSnap.data();
      setItems(newData.data);
      
    } else {
      setItems([]);

      console.log('Document does not exist');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
useEffect(() => {

fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[ currentPlayer,currentGroup])


  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Scroll to the top of the page whenever the route changes  
  }, [location.pathname,hide]);



  const resetUsages = (resetType) => {
    const updatedItems = items.map((item) => {
      const usages = item.usages.split(' ')[2]; // Extract "per" or "week", "day" or "fight"
      if (resetType === usages) {
        const total = parseInt(item.usages.split('/')[1].trim());
        item.usages = `${total}/${total} per ${resetType}`;
      }
      return item;
    });
    setItems(updatedItems);
    setDoc(userRef, { data: updatedItems },{merge:true});

  };
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  ;
 
  const handleUsagesClick = (index) => {
    const updatedItems = [...items];

    const usages = updatedItems[index].usages; 
    const [used] = usages.split('/')[0].split(' ').map((value) => parseInt(value));
    if (used > 0) {
      updatedItems[index].usages = `${used - 1}`+updatedItems[index].usages.slice(1);
      setItems(updatedItems);
      setDoc(userRef, { data: updatedItems },{merge:true});


    }
  };
  
  const [sorting, setSorting] = useState({ key: '', direction: 'asc' });

  const toggleSorting = (key) => {
  
    if (sorting.key === key) {
      setSorting((prevState) => ({
        ...prevState,
        direction: prevState.direction === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setSorting({ key, direction: 'asc' });
    }
  };
  filteredItems.sort((a, b) => {
  console.log(filteredItems)
    const key = sorting.key;
    const direction = sorting.direction === 'asc' ? 1 : -1;
    if (key === 'LV'  || key === 'Usages') {
     
      return (a[key] - b[key]) * direction;
     }else {
      return a[key] < b[key] ? -1 * direction : 1 * direction;
    }
  });
   
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchChangeCard = (event) => {
    setSearchQueryCard(event.target.value);
  };
 const handleAddData=(item)=>{
  const updatedItems = [...items, item];
  setItems(updatedItems);
  setDoc(userRef, { data: updatedItems })
  console.log(updatedItems)
 }



  return (

    <div className="h-auto bg-[#D6E6F6] flex">
      <div className="bg-[#263895] m-auto w-[87%] mt-[2%] rounded-[2%] mb-[3%] h-[1800px] ">
        <div className="bg-[#798EC8] m-[2%] h-[96%] rounded-[2%] pb-[2%] ">
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
            <h1 className="text-7xl p-[2%]   ">Skills and Spells</h1>
            <input
              type="search"
              className="rounded-3xl h-[25%] w-[23%] m-[2%] pl-[1%] text-xl bg-[#D6E6F6] text-[black] placeholder:text-[black] font-semibold"
              placeholder="Search .."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <details class="dropdown absolute left-[90%]">
        <summary role="button">
          <div class=" pt-[6%] pl-[8%] ">reset</div>
        </summary>
        <ul className="">
          <li
            className="border-2 p-[13%] pr-3 rounded-2xl border-[#798EC8]  cursor-pointer "
            onClick={() => resetUsages('fight')}
          >
            fight
          </li>
          <li
            className="border-2 p-[13%] rounded-2xl border-[#798EC8] cursor-pointer"
            onClick={() => resetUsages('day')}
          >
            day
          </li>
          <li
            className="border-2 p-[13%] rounded-2xl border-[#798EC8] cursor-pointer"
            onClick={() => resetUsages('week')}
          >
            week
          </li>
        </ul>
      </details>
          <div className="skillsandspells pl-[3%] pr-[1.5%] pb-[1%] ">
          <div className="text-xl font-semibold">Name</div>
          <div className="text-xl font-semibold">Base damage</div>
          <div className="text-xl font-semibold">Scaling damage  </div>
          <div className="text-xl font-semibold">Sum</div>
          <div className="text-xl font-semibold">Alternate damage</div>
          <div className="text-xl font-semibold">Alternate damage2</div>
        <div  
          className="text-xl font-semibold cursor-pointer"
          onClick={() => toggleSorting('LV')}
          title="Click to sort by LV"
        >
          LV {sorting.key === 'LV' && sorting.direction ==="asc" ? "▲": "▼" }
         
        </div>
        <div className="text-xl font-semibold">Amount</div>
        <div
          className="text-xl font-semibold cursor-pointer"
          onClick={() => toggleSorting('Type')}
          title="Click to sort by Type"
        >
          Type {sorting.key === 'Type' && sorting.direction ==="asc" ? "▲": "▼" }
        </div>
        <div className="text-xl font-semibold">Scaling</div>
        <div className="text-xl font-semibold">%-Chance</div>
        <div
          className="text-[1.10rem] font-semibold cursor-pointer"
          onClick={() => toggleSorting('Element')}
          title="Click to sort by Element"
        >
          Element {sorting.key === 'Element' && sorting.direction ==="asc" ? "▲": "▼" }
        </div>
        <div
          className="text-xl font-semibold cursor-pointer"
          onClick={() => toggleSorting('Usages')}
          title="Click to sort by Usages"
        >
          Usages {sorting.key === 'Usages' && sorting.direction ==="asc" ? "▲": "▼" }
        </div>
       
        <div className="text-xl font-semibold">Explanation</div>
      </div>

          <div className="overflow-scroll h-[75%] overflow-x-hidden scrollbar z-10">
            {filteredItems.map((item, index) => (
              <div key={index} className="skillsandspells pl-[3%]">
                <div className="text-xl">{item.name}</div>
                <div className="text-xl">{item.basedamage}</div>
                <div className="text-xl">{item.scalingdamage}</div>
                <div className="text-xl">{item.sum}</div>
                <div className="text-xl">{item.alternatedamage}</div>
                <div className="text-xl">{item.alternatedamage2}</div>
                <div className="text-xl">{item.lvl}</div>
                <div className="text-xl">{item.amount}</div>
                <div className="text-xl">{item.type}</div>
                <div className="text-xl">{item.scaling}</div>
                <div className="text-xl">{item.hitchance}</div>
                <div className="text-xl">{item.element}</div>
                <div className="text-xl cursor-pointer"
                 onClick={() => handleUsagesClick(index)}
                 title={`Click to reduce Usages for ${item.name}`}>{item.usages}</div>
                <div className="text-xl w-[100%] h-[100%] overflow-hidden"  
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={()=>setHoveredIndex(-1)}>
            {item.effect}
                {hoveredIndex === index && (
            <div className='h-[30vh] pt-[2%] overflow-scroll overflow-x-hidden   bg-yellow-300 ml-[55%] rounded-[5%] fixed top-[20%] right-0   w-[25%]  '>
              <h1 className='text-3xl text-center pb-[5%]'>Description</h1>
              <p className='ml-[6%]'>{item.effect}</p>
            </div>
          )}</div>
                
              </div>
            ))}
          </div>
          <div className='   w-[100%] flex ml-[1%]  '>
        
         
        <Link className="links  " to="/weapons">Weapons</Link>
     
      
        <Link className="links  " to="/character">Home</Link>
     
  
        <Link className="links  " to="/card-spirits">Card Spirits</Link>
 
 
        <Link className="links  " to="/inventory">Inventory</Link>
      
      <div onClick={()=>{setHide(true)}} className=' plus-sign'><FaPlus></FaPlus></div>
    
      
      </div>
        </div>
       
        
      </div>
    </div>
  );
}

export default SkillsAndSpells;
