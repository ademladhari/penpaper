import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../util/FireBase';

function DetailsForm() {
    const [option, setoption] = useState("")
    const [group, setGroup] = useState("")
    const [details, setDetails] = useState({
    alter: '',
    backstory: '',
    blossomRank: '',
    geburstatg: '',
    gender: '',
    lvl: '',
    maxxp: '',
    name: '',
    rasse: '',
    sprachen: '',
    ursprungisas: '',
    xp: '',
  });
 
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Here, you can do something with the submitted data, such as sending it to a server
    console.log(option);
   
        async function setdata(){
       try{ const userRef = doc(
            db,
            'database',
            'groups',
            group,
            
            option,
            'character',
            'details',
          );
        
          const userSnap =await getDoc(userRef);
        
         
          await setDoc(
            userRef,
            {
              ...userSnap.data(),
              details,
            },
            { merge: true }
          )
          console.log('here')
          const sometihng=userSnap.data()
          console.log(sometihng)
    }
    
    catch(error){
      console.log(error)
    }
  }
    console.log('here')
    setdata()
   // For demonstration purposes, log the details to the console
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleSelectChange = (e) => {
    setoption(e.target.value);
};
const handleSelectChangegroup = (e) => {
  setGroup(e.target.value);
};

  return (
    <div className='w-[50%]'>
         <h1 className="text-6xl text-center text-[#D6E6F6]">Details Form</h1>
          <form onSubmit={handleSubmit} >
            <div className="mb-4  w-[200px]  a">
              <label className="text-[#D6E6F6] ml-[5%] w-[200px]">Alter:</label>
              <input
                value={details.alter}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%]  p-2 rounded"
                name="alter"
                reuired
              />
            </div>
            <div className="mb-4 w-[200px] ">
              <label className="text-[#D6E6F6] ml-[5%]">Backstory:</label>
              <input
                value={details.backstory}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%]  p-2 rounded"
                name="backstory"
                required></input>
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">Blossom Rank:</label>
              <input
                value={details.blossomRank}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%]  p-2 rounded"
                name="blossomRank"
                required/>
            </div>
            {/* Repeat this pattern for the other fields */}
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">Geburstatg:</label>
              <input
                value={details.geburstatg}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
                name="geburstatg"
                required />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">Gender:</label>
              <input
                value={details.gender}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%]   p-2 rounded"
                name="gender"
                required />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">Level (lvl):</label>
              <input
                value={details.lvl}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%]  p-2 rounded"
                name="lvl"
                required />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">Maximum XP (maxxp):</label>
              <input
                value={details.maxxp}
                onChange={handleInputChange}
                className="bg-[#8a9ac6]  ml-[10%] p-2 rounded"
                name="maxxp"
                required />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">Name:</label>
              <input
                value={details.name}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%]   p-2 rounded"
                name="name"
                required  />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">Rasse:</label>
              <input
                value={details.rasse}
                onChange={handleInputChange}
                className="bg-[#8a9ac6]  ml-[10%]  p-2 rounded"
                name="rasse"
                required />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">Sprachen:</label>
              <input
                value={details.sprachen}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
                name="sprachen"
                required />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">Ursprungisas:</label>
              <input
                value={details.ursprungisas}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%]   p-2 rounded"
                name="ursprungisas"
                required />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">XP:</label>
              <input
                value={details.xp}
                onChange={handleInputChange}
                className="bg-[#8a9ac6] ml-[10%]   p-2 rounded"
                name="xp"
                required  />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">player:</label>
              <input
                value={option}
                onChange={handleSelectChange}
                className="bg-[#8a9ac6] ml-[10%]   p-2 rounded"
                name="player"
                required  />
            </div>
            <div className="mb-4 w-[200px]">
              <label className="text-[#D6E6F6] ml-[5%]">group:</label>
              <input
                value={group}
                onChange={handleSelectChangegroup}
                className="bg-[#8a9ac6] ml-[10%]   p-2 rounded"
                name="group"
                required  />
            </div>
           <button type="submit" className="bg-[#5757cb] text-[#D6E6F6] ml-[1%] p-2 rounded mt-4">
          Submit
        </button>
          </form>
        </div>
 
  )
}

export default DetailsForm