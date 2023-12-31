import React, { useEffect,  useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';
import { FaPlus } from 'react-icons/fa';
import OtherCharacterDetails from '../util/GetAlldata';
import { useCurrentPlayer } from '../util/Context';
function Weapons() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQueryCard, setSearchQueryCard] = useState('');
  const [weapons, setWeapons] = useState([]);
  const [SearchData,setSearchData]=useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [hide,setHide]= useState(false)
  const { currentPlayer,currentGroup } = useCurrentPlayer();
  const location = useLocation();
  const userRef = doc(db,'database','groups',currentGroup, currentPlayer, 'weapons', 'weapons');
  const filteredItemsCard = Object.keys(SearchData).length >0
  ?
   SearchData.data.filter((item) => {
 
      // You can customize the search criteria here.
      const itemText = `${item.name} `.toLowerCase();
      return itemText.includes(searchQueryCard.toLowerCase());
    })
  : [];
  useEffect(() => {

  }, [location.pathname]);
  OtherCharacterDetails({setCharacterData:setSearchData,collection:'weapons',collection2:'weapeons'})
  const handleAddData=(item)=>{
  
    const updatedItems = [...weapons, item];
setWeapons(updatedItems)   
 setDoc(userRef, { data: updatedItems })
   }
 
  
    const fetchData = async () => {
      try {
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const weaponData = userSnap.data();
          setWeapons(weaponData.data);
           console.log('here')
          setIsLoading(true);
        } else {
          setWeapons([]);

          console.log('Weapons document does not exist');
        }
      } catch (error) {
        console.error('Error fetching weapons data:', error);
      }
    };
    useEffect(() => {

    fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentPlayer,currentGroup]);
  useEffect(() => {
    console.log(weapons.length)
    if  (weapons.length !== 0) {
      setIsLoading(true);
      // Initialize filtered items with fetched data
    }
  }, [weapons]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
 
  const handleSearchChangeCard = (event) => {
    setSearchQueryCard(event.target.value);
  };
 
  ;

  return (
    <div className="h-auto bg-[#D6E6F6] flex">
      <div className="bg-[#263895] m-auto w-[85%] mt-[2%] rounded-[2%] mb-[3%] h-[1800px]">
        <div className="bg-[#798EC8] m-[2%] h-[96%] rounded-[2%] pb-0    ">
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
          {console.log(item)}
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
            <h1 className="text-7xl p-[1%]   ">Weapons</h1>
            <input
              type="search"
              className="rounded-3xl h-[25%] w-[23%] m-[2%] pl-[1%] text-xl bg-[#D6E6F6] text-[black] placeholder:text-[black] font-semibold"
              placeholder="Search .."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="equipment pl-[3%] pr-[24px]  ">
            <div className="px-4 py-2 text-xl">Name</div>
            <div className="px-4 py-2 text-xl">LV</div>
            <div className="px-4 py-2  overflow-hidden text-xl">Damage</div>
            <div className="px-4 py-2 overflow-hidden text-xl">Final Damage</div>
            <div className="px-4 py-2  overflow-hidden text-xl">Scaling</div>
            <div className="px-4 py-2  overflow-hidden text-xl">Special Scaling</div>
            <div className="px-4 py-2  overflow-hidden text-xl">Scaling Type</div>
            <div className="px-4 py-2  overflow-hidden text-xl">Requirements</div>
            <div className="px-4 py-2 text-xl">Effect</div>
          </div>

          <div className="overflow-y-scroll h-[75%]  pl-[3%] scrollbar">
            {isLoading ? (
              weapons.map((weapon, index) => (
                
                <div key={index} className="equipment    ">
             
                  <div className="px-4 py-2 text-xl">{weapon.name}</div>
                  <div className="px-4 py-2 text-xl">{weapon.lvl}</div>
                  <div className="px-4 py-2 text-xl">{weapon.damage}</div>
                  <div className="px-4 py-2 text-xl">{weapon.finaldamage}</div>
                  <div className="px-4 py-2 text-xl">{weapon.scaling}</div>
                  <div className="px-4 py-2 text-xl">{weapon.specialscaling}</div>
                  <div className="px-4 py-2 text-xl">{weapon.scalingType}</div>
                  <div className="px-4 py-2 text-xl">{weapon.requirements}</div>
                  <div className="px-4 py-2 text-xl">{weapon.effect}</div>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
     

        <div className=' mt-[3%]  w-[100%] flex ml-[1%]  '>
        
         
          <Link className="links  " to="/skills-and-spells">Skillsandspells</Link>
       
        
          <Link className="links  " to="/">Home</Link>
       
    
          <Link className="links  " to="/card-spirits">Card Spirits</Link>
   
   
          <Link className="links  " to="/inventory">Inventory</Link>
        
        <div onClick={()=>{setHide(true)}} className=' plus-sign'><FaPlus></FaPlus></div>
      
        
        </div>
        </div>
      </div>
    </div>
  );
}

export default Weapons;
