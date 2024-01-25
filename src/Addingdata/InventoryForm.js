import React, { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../getdata/FireBase';

function InventoryForm() {

  const [amount, setAmount] = useState([ ]);
  const [data, setDetails] = useState( [
    { amount: '12', effect: 'zerf', name: 'aze' },
    { amount: '12', effect: 'aze', name: 'zef' }
  ]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const userRef = doc(db, 'database', 'all', 'inventory', 'inventory');
  const userSnap = await getDoc(userRef);

  const newDataEntry = {
    amount: data[0].amount,
    effect: data[0].effect,
    name: data[0].name,
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
      amount,
      data: updatedData, // Update the 'data' field in the Firestore document
    },
    { merge: true }
  );

  // Clear the form fields
  setAmount(["", "", ""]);
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
      <h1 className="text-6xl text-center text-[#D6E6F6]">Inventory</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-[200px] a">
          <label className="text-[#D6E6F6] ml-[5%] w-[200px]">money1:</label>
          <input
            value={amount[0]}
            onChange={(e) => setAmount([e.target.value, amount[1], amount[2]])}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="alter"
            required
          />
        </div>

        <div className="mb-4 w-[200px] a">
          <label className="text-[#D6E6F6] ml-[5%] w-[200px]">money2:</label>
          <input
            value={amount[1]}
            onChange={(e) => setAmount([amount[0], e.target.value, amount[2]])}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="alter"
            required
          />
        </div>

        <div className="mb-4 w-[200px] a">
          <label className="text-[#D6E6F6] ml-[5%] w-[200px]">money3:</label>
          <input
            value={amount[2]}
            onChange={(e) => setAmount([amount[0], amount[1], e.target.value])}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="alter"
            required
          />
        </div>

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
          <label className="text-[#D6E6F6] ml-[5%]">effect:</label>
          <input
            value={data.effect}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="effect"
            required
          />
        </div>

        <div className="mb-4 w-[200px]">
          <label className="text-[#D6E6F6] ml-[5%]">amount:</label>
          <input
            value={data.amount}
            onChange={handleInputChange}
            className="bg-[#8a9ac6] ml-[10%] p-2 rounded"
            name="amount"
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
