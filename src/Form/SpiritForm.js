import React, { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../util/FireBase';

function InventoryForm() {
  const [data, setDetails] = useState( [
    { description: '', icon: '', name: ''},
  ]);
  const handleSubmit = async (e) => {
  e.preventDefault();

  const userRef = doc(db, 'database', 'all', 'Spirits', 'Spirits');
  const userSnap = await getDoc(userRef);
  const newDataEntry = {
    damage:data[0].description,
    effect:data[0].icon,
    name:data[0].name,
  };
  

  // Create a new array that includes the existing data and the new data entry
  const updatedData = [...data,newDataEntry];
  
  // Debugging: Log the data and updatedData to check for undefined values
  
  // Update the state with the new data
  setDetails(updatedData);
  
  // Update the Firestore document with the merged data
  await setDoc(
    userRef,
    {
      ...userSnap.data(),
     
      data: updatedData, 
    },
    { merge: true }
  );

  // Clear the form fields
  
};

 const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Create a new data object by spreading the previous data
  const updatedData = [...data];
 
  // Update the relevant field in the data object based on the input name
  updatedData[0] = {
    ...updatedData[0],
    [name]: value,
  };

  // Set the updated data as the new state
  setDetails(updatedData);
 
};
  
  return (
    <div className="w-[50%]">
      <h1 className="text-6xl text-center text-[#D6E6F6]">Spirits</h1>
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
          <label className="text-[#D6E6F6] ml-[5%]">icon</label>
          <input
            value={data.icon}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="icon"
            required
          />
        </div>

        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">description</label>
          <input
            value={data.description}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="description"
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
