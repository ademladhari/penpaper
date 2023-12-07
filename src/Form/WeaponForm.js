import React, { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';

function InventoryForm() {


  const [data, setDetails] = useState( [
    { },
  
  ]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const userRef = doc(db, 'database', 'all', 'weapons', 'weapeons');
  const userSnap = await getDoc(userRef);

  const newDataEntry = {
    damage:data[0].damage,
    effect:data[0].effect,
    name:data[0].name,
    lvl:data[0].lvl,
    scaling:data[0].scaling,
    scalingType:data[0].scalingType,
    requirements:data[0].requirements,
    finaldamage:data[0].finaldamage,
    specialscaling:data[0].specialscaling
  };

  // Create a new array that includes the existing data and the new data entry
  const updatedData = [...data,newDataEntry];
  
  // Debugging: Log the data and updatedData to check for undefined values
  
  // Update the state with the new data
  setDetails(updatedData);
  console.log(updatedData)
  // Update the Firestore document with the merged data
  await setDoc(
    userRef,
    {
      ...userSnap.data(),
     
      data: updatedData, // Update the 'data' field in the Firestore document
    },
    { merge: true }
  );

  // Clear the form fields
  
};

 const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Create a new data object by spreading the previous data
  const updatedData = [...data];
  console.log(data)
  // Update the relevant field in the data object based on the input name
  updatedData[0] = {
    ...updatedData[0],
    [name]: value,
  };

  // Set the updated data as the new state
  setDetails(updatedData);
  console.log(updatedData)
};
  
  return (
    <div className="w-[50%]">
      <h1 className="text-6xl text-center text-[#D6E6F6]">weapons</h1>
      <form onSubmit={handleSubmit}>

        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">name:</label>
          <input
            value={data.name}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="name"
            required
          />
        </div>
        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">Special Scaling:</label>
          <input
            value={data.specialscaling}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="specialscaling"
            required
          />
        </div>
        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">FinalDamage</label>
          <input
            value={data.finaldamage}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="finaldamage"
            required
          />
        </div>

        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">lvl</label>
          <input
            value={data.lvl}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="lvl"
            required
          />
        </div>

        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">effect</label>
          <input
            value={data.effect}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="effect"
            required
          />
        </div>
        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">damage</label>
          <input
            value={data.damage}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="damage"
            required
          />
        </div>

        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">scaling</label>
          <input
            value={data.scaling}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="scaling"
            required
          />
        </div>

        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">scalingType</label>
          <input
            value={data.scalingType}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="scalingType"
            required
          />
        </div>
        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">Requirements</label>
          <input
            value={data.requirements}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="requirements"
            required
          />
        </div>


       

        <button
          type="submit"
          className="bg-[#5757cb] text-[#D6E6F6] ml-[1%] p-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default InventoryForm;
