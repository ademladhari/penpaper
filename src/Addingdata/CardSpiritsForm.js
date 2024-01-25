import React, { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../getdata/FireBase';

function InventoryForm() {


  const [data, setDetails] = useState( [
    { counter: '', lvl: '',amount:'', name: '',hitchance:'',maxamount:'',effect:'',damage:'',type:'',element:'' },
  
  ]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const userRef = doc(db, 'database', 'all', 'Spirits', 'CardSpirits');
  const userSnap = await getDoc(userRef);

  const newDataEntry = {
    damage:data[0].damage,
    amount:data[0].amount,
    name:data[0].name,
    lvl:data[0].lvl,
    maxamount:data[0].maxamount,
    type:data[0].type,
    hitchance:data[0].hitchance,
    element:data[0].element,
    counter:data[0].counter,
    effect:data[0].effect

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
      <h1 className="text-6xl text-center text-[#D6E6F6]">CardSpirits</h1>
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
          <label className="text-[#D6E6F6] ml-[5%] ">amount</label>
          <input
            value={data.amount}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="amount"

            required
          />
        </div>

        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">maxamount</label>
          <input
            value={data.maxamount}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="maxamount"
            required
          />
        </div>
        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">element</label>
          <input
            value={data.element}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="element"
            required
          />
        </div>
        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">counter</label>
          <input
            value={data.counter}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="counter"
            required
          />
        </div>
        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">hitchance</label>
          <input
            value={data.hitchance}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="hitchance"
            required
          />
        </div>
        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">type</label>
          <input
            value={data.type}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="type"
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
