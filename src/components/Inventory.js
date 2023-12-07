import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InventoryAmounts from '../Mainpage/InventoryAmount';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';
import { FaPlus } from 'react-icons/fa';
import OtherCharacterDetails from '../util/GetAlldata';
import { useCurrentPlayer } from '../util/Context';


function Inventory() {
  const [items, setItems] = useState({ data: [] });
  const [hide,setHide]= useState(false)
  const [searchQueryCard, setSearchQueryCard] = useState('');
  const [SearchData,setSearchData]=useState([])
  const [inputMode, setInputMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentPlayer,currentGroup } = useCurrentPlayer();

  const [filteredItems, setFilteredItems] = useState([
  ]); // State for filtered items
  const userRef = doc(db, 'database','groups',currentGroup, currentPlayer, 'inventory', 'inventory');

  OtherCharacterDetails({setCharacterData:setSearchData,collection:'inventory',collection2:'inventory'})
useEffect(()=>{
setIsLoading(false)
},[currentPlayer])

  useEffect(() => {
    const fetchData = async () => {
      try {

        const userSnap = await getDoc(userRef);

        if (userSnap.data().data) {
          console.log('here')
          const newData = userSnap.data();
          setItems(newData);
          setFilteredItems(newData.data)
          console.log(newData.data)

        } else {
          console.log('Document does not exist');
          setFilteredItems([])
          setItems({ data: [] })
        }
      } catch (error) {
      

        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, currentGroup]);

  useEffect(() => {
    console.log(filteredItems)
    if (filteredItems.length!==0) {
      setIsLoading(true);
    }else{
      setIsLoading(false)
    }
  }, [filteredItems,currentPlayer]);

  const location = useLocation();
  useEffect(() => {
    // Scroll to the top of the page whenever the route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);


  const handleAmountClick = () => {
    setInputMode((prevInputMode) => !prevInputMode);
  };

  const handleAmountChange = async ( newAmountInput) => {
   
    const newAmount =  toString(newAmountInput);
   console.log(typeof(newAmount))
    // Check if newAmount is a valid number
  
      //const userRef = doc(db, 'database', 'player1', 'inventory', 'inventory');
  
      // Update the Firebase document with the new data
       const updatedData= newAmount.replace('+', 0);
      setItems({ data: updatedData });
 
    
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterItems(event.target.value); // Update filtered items when search query changes
  };

  // Function to filter items based on the search query
  const filterItems = (query) => {
 
    const filtered = items.data.filter((item) => {
      // You can customize the search criteria here.
      const itemText = `${item.name} ${item.effect}`.toLowerCase();
      return itemText.includes(query.toLowerCase());
    });
    setFilteredItems(filtered); // Update filtered items state
  };
  const handleSearchChangeCard = (event) => {
    setSearchQueryCard(event.target.value);
  };
  const handleAddData=(item)=>{
    
    if (items.data.length===0){
      const updatedItems = [item];
      setFilteredItems(updatedItems)
      setItems({data:updatedItems})

      setDoc(userRef, { data: item },{merge:true})
   
    }
    else{
     
      const updatedItems = [...items.data, item];
      setFilteredItems(updatedItems)
      setItems({data:updatedItems})
          setDoc(userRef, { data: updatedItems },{merge:true})
         }
        
    }
   const filteredItemsCard = Object.keys(SearchData).length >0
   ?
    SearchData.data.filter((item) => {
  
       // You can customize the search criteria here.
       const itemText = `${item.name} `.toLowerCase();
       return itemText.includes(searchQueryCard.toLowerCase());
     })
   : [];



   
 
  
  return (
    <div className="h-auto bg-[#D6E6F6] flex">
      <div className="bg-[#263895] m-auto w-[85%] mt-[2%] rounded-[2%] mb-[5%] pb-[2%] h-[1800px]">
        <div className="bg-[#798EC8] m-[2%] h-[97%] pb-[2%] rounded-[2%]">
        {hide && (
            <div className="absolute top-1/4  left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-yellow-400 rounded-lg   shadow-xl  md:w-2/3 lg:w-1/2"  >
                <div className='w-[100%] h-[100%] p-4 border-8 rounded-lg border-[white]' style={{ boxSizing: 'border-box'  }}>
              <div className="flex justify-end">
                <button
                  onClick={() => setHide(false)}
                  className="bg-[#263895] hover:bg-[#26389549] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center"
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
            <h1 className="text-7xl p-[1%]">Inventory</h1>
            <input
              type="search"
              className="rounded-3xl h-[25%] w-[23%] m-[2%] pl-[1%] text-xl bg-[#D6E6F6] text-[black] placeholder:text-[black] font-semibold"
              placeholder="Search .."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <InventoryAmounts></InventoryAmounts>

          <div className="inventory pl-[3%]">
            <div className="px-4 py-2 text-xl">Name</div>
            <div className="px-4 py-2 text-xl">Amount</div>
            <div className="px-4 py-2 text-xl">Effect</div>
          </div>

          <div className="overflow-scroll h-[75%] overflow-x-hidden scrollbar">
            {isLoading && filteredItems.length>0&& 

            
              filteredItems.map((item, index) => (
                
                <div key={index+1} className="inventory pl-[3%]">
                  <div className="px-4 py-2 text-xl">{item.name}</div>
                  {inputMode ? (
                    <input
                      type="text"
                      className="text-xl w-[170px] px-4 py-2 inputNoStyles"
                      value={item.amount}
                      onclick={(event) =>
                        handleAmountChange(index, event.target.value)
                      }
                      onBlur={handleAmountClick}
                    />
                  ) : (
                    <div
                      className="text-xl w-[170px] px-4 py-2 overflow-hidden cursor-pointer"
                      onDoubleClick={handleAmountClick}
                    >
                      {item.amount}
                    </div>
                  )}
                  <div className="px-4 py-2 text-xl">{item.effect}</div>
                </div>
              ))}
          </div>
          <div className='  w-[100%] flex ml-[1%]  '>
        
         
          <Link className="links  " to="/skills-and-spells">Skillsandspells</Link>
       
        
          <Link className="links  " to="/character">Home</Link>
       
    
          <Link className="links  " to="/card-spirits">Card Spirits</Link>
   
   
          <Link className="links  " to="/Weapons">Weapons</Link>
        
        <div onClick={()=>{setHide(true)}} className=' plus-sign'><FaPlus></FaPlus></div>
      
        
        </div>
        </div>

      
      </div>
    </div>
  );
}

export default Inventory;
