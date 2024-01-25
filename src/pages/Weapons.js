import React, { useEffect,  useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../getdata/FireBase';
import { FaPlus } from 'react-icons/fa';
import OtherCharacterDetails from '../getdata/GetAlldata';
import { useCurrentPlayer } from '../context/Context';
import CustomComponent from './components/Addingdata';
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
        <CustomComponent
        hide={hide}
        setHide={setHide}
        searchQueryCard={searchQueryCard}
        filteredItemsCard={filteredItemsCard}
        handleSearchChangeCard={handleSearchChangeCard}
        handleAddData={handleAddData}
      />
   
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
