import React, { useEffect, useState } from 'react';
// Import your CSS file containing the provided styles
/* eslint-disable no-unused-vars */

const Description = ({data,spirit}) => {
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(()=>{
    if (data !==undefined){
      setIsLoading(true);
 }
   },[data])

  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div>
      
      {isLoading &&(
      data.map((item, index) => (
        <div
          key={index}
          className={`flex ml-[3%] h-[6vh]  z-50    `}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={()=>setHoveredIndex(-1)}
        >
      
          <div className='fa fa-star text-yellow-500 text-4xl '></div>
          <div className=' w-[100%]'>
          <h1 className='pl-[3%]  text-3xl my-auto'>{item.name}
          {hoveredIndex === index && (
            <div className={`h-[40vh]   bg-yellow-300    w-[15%] absolute right-[50%] rounded-2xl  ${spirit ? "right-[6%]":"right-[40%]"}  `}>
              <h1 className='text-3xl text-center pb-[5%]'>Description</h1>
              <p className='ml-[6%] '>{item.description}</p>
        
            </div>
          )}
          </h1>
           </div>
        </div>
      )))}
    </div>
  );
};

export default Description;