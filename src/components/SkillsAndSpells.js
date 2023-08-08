import React, { useState } from 'react';

function SkillsAndSpells() {
  const [items, setItems] = useState([
    {
      name: 'Item 1',
      LV: 5,
      Amount: 30,
      Type: 'physical',
      Scaling: 0.5,
      '%-Chance': '20%',
      Element: 'fire',
      Usages: "2/5 per week",
      Explanation:
        'IncrwerIncrease powerIncreases attack powerIncreases attack powerIncreases attack powerIncreases attack power.',
    },
    {
      name: 'Item 2',
      LV: 8,
      Amount: 50,
      Type: 'adzad',
      Scaling: 1.2,
      '%-Chance': '15%',
      Element: 'ace',
      Usages: '1/5 per fight',
      Explanation: 'Boosts magical abilities.',
    },
    {
      name: 'Item 2',
      LV: 4,
      Amount: 50,
      Type: 'gical',
      Scaling: 1.2,
      '%-Chance': '1%',
      Element: 'kce',
      Usages: '4/5 per day ',
      Explanation: 'Boosts magical abilities.',
    },
    {
      name: 'Item 2',
      LV: 3,
      Amount: 50,
      Type: 'cgical',
      Scaling: 1.2,
      '%-Chance': '1%',
      Element: 'fce',
      Usages: '4/5 per week',
      Explanation: 'Boosts magical abilities.',
    },
    {
      name: 'Item 2',
      LV: 1,
      Amount: 5,
      Type: 'cgical',
      Scaling: 1.2,
      '%-Chance': '6%',
      Element: 'dcccc',
      Usages: '3/5 per day',
      Explanation: 'Boosts magical abilities.',
    }
    
  


  ]);
  const resetUsages = (resetType) => {
    const updatedItems = items.map((item) => {
      const usages = item.Usages.split(' ')[2]; // Extract "per" or "week", "day" or "fight"
      if (resetType === usages) {
        const total = parseInt(item.Usages.split('/')[1].trim());
        item.Usages = `${total}/${total} per ${resetType}`;
      }
      return item;
    });
    setItems(updatedItems);
  };

  ;
 
  const handleUsagesClick = (index) => {
    const updatedItems = [...items];
    const usages = updatedItems[index].Usages; 
    const [used] = usages.split('/')[0].split(' ').map((value) => parseInt(value));
    if (used > 0) {
      updatedItems[index].Usages = `${used - 1}`+updatedItems[index].Usages.slice(1);
      setItems(updatedItems);
    }
  };
  
  const [sorting, setSorting] = useState({ key: '', direction: 'asc' });

  const toggleSorting = (key) => {
  
    if (sorting.key === key) {
      setSorting((prevState) => ({
        ...prevState,
        direction: prevState.direction === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setSorting({ key, direction: 'asc' });
    }
  };
  const sortedItems = [...items].sort((a, b) => {

    const key = sorting.key;
    const direction = sorting.direction === 'asc' ? 1 : -1;
    if (key === 'LV'  || key === 'Usages') {
     
      return (a[key] - b[key]) * direction;
     }else {
      return a[key] < b[key] ? -1 * direction : 1 * direction;
    }
  });
  return (
    <div className="h-auto bg-[#D6E6F6] flex">
      <div className="bg-[#263895] m-auto w-[85%] mt-[2%] rounded-[2%] mb-[5%]   h-[1700px]">
        <div className="bg-[#798EC8] m-[2%] h-[93%] rounded-[2%]   ">
          <div className="flex h-[10%] justify-between">
            <h1 className="text-7xl p-[2%]   ">Skills and Spells</h1>
            <input
              type="search"
              className="rounded-3xl h-[25%] w-[23%] m-[2%] pl-[1%] text-xl bg-[#D6E6F6] text-[black] placeholder:text-[black] font-semibold"
              placeholder="Search .."
            />
          </div>
          <details class="dropdown absolute left-[80%]">
        <summary role="button">
          <a class="button">Click on me!</a>
        </summary>
        <ul className="">
          <li
            className="border-2 p-[13%] pr-3 rounded-2xl border-[#798EC8]"
            onClick={() => resetUsages('fight')}
          >
            fight
          </li>
          <li
            className="border-2 p-[13%] rounded-2xl border-[#798EC8]"
            onClick={() => resetUsages('day')}
          >
            day
          </li>
          <li
            className="border-2 p-[13%] rounded-2xl border-[#798EC8]"
            onClick={() => resetUsages('week')}
          >
            week
          </li>
        </ul>
      </details>
          <div className="skillsandspells pl-[3%] pr-[1.5%] pb-[1%] ">
          <div className="text-xl font-semibold">Name</div>
        <div  
          className="text-xl font-semibold cursor-pointer"
          onClick={() => toggleSorting('LV')}
          title="Click to sort by LV"
        >
          LV {sorting.key === 'LV' && sorting.direction ==="asc" ? "▲": "▼" }
         
        </div>
        <div className="text-xl font-semibold">Amount</div>
        <div
          className="text-xl font-semibold cursor-pointer"
          onClick={() => toggleSorting('Type')}
          title="Click to sort by Type"
        >
          Type {sorting.key === 'Type' && sorting.direction ==="asc" ? "▲": "▼" }
        </div>
        <div className="text-xl font-semibold">Scaling</div>
        <div className="text-xl font-semibold">%-Chance</div>
        <div
          className="text-[1.10rem] font-semibold cursor-pointer"
          onClick={() => toggleSorting('Element')}
          title="Click to sort by Element"
        >
          Element {sorting.key === 'Element' && sorting.direction ==="asc" ? "▲": "▼" }
        </div>
        <div
          className="text-xl font-semibold cursor-pointer"
          onClick={() => toggleSorting('Usages')}
          title="Click to sort by Usages"
        >
          Usages {sorting.key === 'Usages' && sorting.direction ==="asc" ? "▲": "▼" }
        </div>
       
        <div className="text-xl font-semibold">Explanation</div>
      </div>

          <div className="overflow-scroll h-[75%] overflow-x-hidden scrollbar">
            {sortedItems.map((item, index) => (
              <div key={index} className="skillsandspells pl-[3%]">
                <div className="text-xl">{item.name}</div>
                <div className="text-xl">{item.LV}</div>
                <div className="text-xl">{item.Amount}</div>
                <div className="text-xl">{item.Type}</div>
                <div className="text-xl">{item.Scaling}</div>
                <div className="text-xl">{item['%-Chance']}</div>
                <div className="text-xl">{item.Element}</div>
                <div className="text-xl cursor-pointer"
                 onClick={() => handleUsagesClick(index)}
                 title={`Click to reduce Usages for ${item.name}`}>{item.Usages}</div>
                <div className="text-xl">{item.Explanation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsAndSpells;
