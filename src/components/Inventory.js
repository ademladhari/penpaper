import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InventoryAmounts from '../Mainpage/InventoryAmount';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';
import { FaPlus } from 'react-icons/fa';
import OtherCharacterDetails from '../util/GetAlldata';


function Inventory() {
  const [items, setItems] = useState([]);
  const [hide,setHide]= useState(false)
  const [searchQueryCard, setSearchQueryCard] = useState('');
  const [SearchData,setSearchData]=useState([])
  const [inputMode, setInputMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const userRef = doc(db, 'database', 'player1', 'inventory', 'inventory');
  OtherCharacterDetails({setCharacterData:setSearchData,collection:'inventory',collection2:'inventory'})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, 'database', 'player1', 'inventory', 'inventory');
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const newData = userSnap.data();
          setItems(newData);
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (items.data !== undefined) {
      setIsLoading(true);
      setFilteredItems(items.data); 
      // Initialize filtered items with fetched data
    }
  }, [items]);

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
    const updatedItems = [...items.data, item];
setFilteredItems(updatedItems)
    updateDoc(userRef, { data: updatedItems })
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
          
            {isLoading &&
              filteredItems.map((item, index) => (
                
                <div key={index+1} className="inventory pl-[3%]">
                  <div className="px-4 py-2 text-xl">{item.name}</div>
                  {inputMode ? (
                    <input
                      type="text"
                      className="text-xl w-[170px] px-4 py-2 inputNoStyles"
                      value={item.amount}
                      onlclick={(event) =>
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
          <div className=' h-[7%] w-[100%]  flex'>
         <div className=' w-[50%] '>
          <div className="dotChar1 ml-[10%] mt-[1%] ">
          <Link to="/skills-and-spells">Skillsandspells</Link>
        </div>
        <div className="dotChar1 ml-[10%]">
          <Link to="/weapons">Weapons</Link>
        </div>
        <div className="dotChar1 ml-[10%] ">
        <Link to="/card-spirits">Card Spirits</Link>
        </div>
        <div className="dotChar1 ml-[10%] ">
          <Link to="/">Home</Link>
        </div>
        </div>
        <div onClick={()=>{setHide(true)}} className=' h-[96%] text-3xl rounded-[50%] bg-[yellow] pt-[2.8%] pl-[3.5%] w-[9.2%] mt-[0.5%] ml-[37%]'><FaPlus></FaPlus></div>
        
        </div>
        </div>

      
      </div>
    </div>
  );
}

export default Inventory;
