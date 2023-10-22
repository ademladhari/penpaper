import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../util/FireBase';
import DetailsForm from './DetailsForm';
import InventoryForm from './InventoryForm';
import WeaponForm from './WeaponForm'
import WeaponTalentsForm from './WeaponTalentsForm'
import SpiritForm from './SpiritForm'
import CardSpiritsForm from './CardSpiritsForm'
import SkillsAndSpellsForm from './SkillsAndSpellsForm'

function SetForm() {
    
  return (
    <div>
      <div className="h-auto bg-[#D6E6F6] flex">
        <div className="bg-[#263895] m-auto w-[85%] mt-[2%] rounded-[2%] mb-[5%] pb-[5%] pt-[3%] flex-col  h-fit">
          <div className=' h-[50%] w-[100%] flex'>
             <DetailsForm></DetailsForm>  
              <InventoryForm></InventoryForm>
              </div>
              <div className='h-[50%]  w-[100%] flex'>
            <WeaponForm></WeaponForm>
            <WeaponTalentsForm></WeaponTalentsForm>
              </div>
              <div className='h-[50%]  w-[100%] flex'>
            <CardSpiritsForm/>
           <SpiritForm></SpiritForm>
              </div>
              <div className='h-[50%]  w-[100%] flex'>
              <SkillsAndSpellsForm />
              </div>
         </div>
      </div>
    </div>
  );
}

export default SetForm;
