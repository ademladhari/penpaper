
import './App.css';
import SkillsAndSpells from './components/SkillsAndSpells';
import Equipment from './components/Equipment';
import CardSpirits from './components/CardSpirits';
import Inventory from './components/Inventory';
import { useEffect, useState } from 'react';
function App() {
 
  const [percentage, setPercentage] = useState(0);
  const currentValue=90
  const maxValue=60000
  useEffect(() => {
    const calculatedPercentage = (currentValue / maxValue)*100 ;
   
    setPercentage(calculatedPercentage);
  }, [currentValue, maxValue]);
  const progressBarClassName = `progress-bar w-[${percentage}%] text-end rounded-3xl `;

  return (
    <div className="h-auto bg-[#D6E6F6] flex">
    
    <div className=' h-16 w-[15%] mt-[2.5%] bg-[#263895] rounded-2xl  absolute left-[9%]'></div>
    <div className=' h-11 w-[15%] mt-[3.5%] bg-[#263895] rounded-2xl  absolute left-[24.5%]'></div>
    <div className=' h-11 w-[15%] mt-[3.5%] bg-[#263895] rounded-2xl  absolute left-[40%]'></div>
    <div className=' h-11 w-[15%] mt-[3.5%] bg-[#263895] rounded-2xl  absolute left-[55.5%]'></div>
    <div className=' h-11 w-[15%] mt-[3.5%] bg-[#263895] rounded-2xl  absolute left-[71%]'></div>
    
    <div className='bg-[#263895] m-auto w-[85%] mt-[5%] rounded-[2%] mb-[5%] h-[1700px] '>
       <div className='section1 w-[50%] bg-[#414e8d]  h-[50%] flex flex-col  '>
        <div className='w-[100%] flex h-[9%] mt-[3%]'>
       
       <div className=' bg-[#798EC8] h-[100%] w-[10%] pt-[0.2%] mt-[1.5%] ml-[2%] rounded-[30%]'>
        <div className='star   '></div>
       </div>
       <div className=' w-[80%] rounded-3xl h-[100%] ml-[2%] bg-[#798EC8] mt-[1.5%] '>
        <h1 className=' text-5xl p-[1%]'>Random name</h1>
       </div>
       </div>
       <div className='w-[100%] h-[12%] flex'>
       <div className=' bg-[#798EC8]  w-[18%] h-[60%]  mt-[3%] ml-[2%] rounded-3xl '>
       <h1 className=' text-4xl text-center pt-[5%]'>LV.150</h1>
        </div>
        <div class="progress-container h-[60%] w-[70%] ml-[2%] mt-[3%] relative rounded-3xl ">
          {console.log(`${percentage}`)}
  <div  class={progressBarClassName} style={{ width: `${percentage}%` }}>
  </div>
  <h1 class="absolute bottom-1 text-2xl right-0 p-[10px] m-0">{currentValue}</h1>
  <div className=' bg-[#798EC8] h-[50%] w-[33%]  ml-[64%] rounded-b-3xl    '>
  <h1 className=' text-xl text-center '>{currentValue}/{maxValue}</h1>
  </div>
</div>

</div>








       </div>
       <div className=' w-[50%] h-[50%]'></div>
 

   
    </div>
  </div>
  
  
    )
}

export default App;
