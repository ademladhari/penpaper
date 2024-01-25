import React, { useState } from 'react';

const CustomComponent = ({ hide, setHide, searchQueryCard, handleSearchChangeCard, filteredItemsCard, handleAddData }) => {
  return (
    <>
      {hide && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-yellow-400 rounded-lg shadow-xl md:w-2/3 lg:w-1/2">
          <div className='w-[100%] h-[100%] p-4 border-8 rounded-lg border-[white]' style={{ boxSizing: 'border-box' }}>
            <div className="flex justify-end">
              <button
                onClick={() => setHide(false)}
                className="bg-[#263895] hover:bg-red-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center"
              >
                X
              </button>
            </div>

            <div className="mt-4">
              <input
                type="search"
                className="w-full px-4 py-2 text-xl bg-[#D6E6F6] text-black placeholder-text-black font-semibold rounded-3xl"
                placeholder="Search ..."
                value={searchQueryCard}
                onChange={handleSearchChangeCard}
              />
            </div>

            <div className="mt-4 h-60 overflow-y-auto scrollbar scrollbar-thumb-yellow scrollbar-track-gray-300">
              {filteredItemsCard.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    handleAddData(item);
                  }}
                  className={`max-h-[48%] flex  overflow-hidden   cursor-pointer hover:bg-gray-100 rounded-lg ${
                    item.effect.length > 200 ? 'large-padding' : 'normal-padding'
                  }`}
                >
                  <div className="w-1/6 h-12 flex items-center pl-[1%]  rounded-md bg-[#263895] text-white mr-[2%] overflow-hidden">
                    {item.name}
                  </div>
                  <div
                    className={`w-5/6 h-[10%] break-words scrollbar ${
                      item.effect.length > 200 ? 'large-padding-content' : 'normal-padding-content'
                    }`}
                  >
                    {item.effect}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomComponent;