import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../util/FireBase';

function DetailsForm() {
    const [option, setoption] = useState("player1")
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
        const userRef = doc(
            db,
            'database',
            option,
            'character',
            'character',
            'details',
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
    }
    setdata()
    
    setDetails({
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
      }) // For demonstration purposes, log the details to the console
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
            <select
                            value={option}
                            onChange={handleSelectChange}
                            className="w-[10%] p-[0.3%] ml-[1%] bg-[#8a9ac6]"
                        >
                            <option value="player1">Player 1</option>
                            <option value="player2">Player 2</option>
                            <option value="player3">Player 3</option>
                            <option value="player4">Player 4</option>
                            <option value="player5">Player 5</option>
                        </select>
           <button type="submit" className="bg-[#5757cb] text-[#D6E6F6] ml-[1%] p-2 rounded mt-4">
          Submit
        </button>
          </form>
        </div>
 
  )
}

export default DetailsForm