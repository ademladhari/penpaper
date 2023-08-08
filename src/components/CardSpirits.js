import React, { useState } from 'react';

function SkillsAndSpells() {
  const [items, setItems] = useState([
    {
      name: 'Item 1',
      lvl: 5,
      amount: 2+"/5",
      type: 'bhyl',
      element: 'fire',
      damage: 0.5,
      'hit chance': '20%',
      counter: '2/5 per week',
      effect:
        'IncrwerIncrease powerIncreases attack powerIncreases attack powerIncreases attack powerIncreases attack power.',
    },
    {
      name: 'Item 2',
      lvl: 8,
      amount: 3+"/6",
      type: 'adzad',
      element: 'ace',
      damage: 1.2,
      'hit chance': '15%',
      counter: '1/5 per fight',
      effect: 'Boosts magical abilities.',
    },
    {
      name: 'Item 3',
      lvl: 4,
      amount: 2+"/4",
      type: 'gical',
      element: 'kce',
      damage: 0.2,
      'hit chance': '1%',
      counter: '4/5 per day ',
      effect: 'Boosts magical abilities.',
    },
    {
      name: 'Item 4',
      lvl: 3,
      amount: 1+"/3",
      type: 'cgical',
      element: 'fce',
      damage: 1.4,
      'hit chance': '1%',
      counter: '4/5 per week',
      effect: 'Boosts magical abilities.',
    },
    {
      name: 'Item 5',
      lvl: 1,
      amount: 1+"/5",
      type: 'cgical',
      element: 'dcccc',
      damage: 2,
      'hit chance': '6%',
      counter: '3/5 per day',
      effect: 'Boosts magical abilities.',
    },
  ]);
  




  ;
  const handleUsagesClick = (index) => {
    const updatedItems = [...items];
    const usages = updatedItems[index].amount; 
    const [used] = usages.split('/')[0].split(' ').map((value) => parseInt(value));
    if (used > 0) {
      updatedItems[index].amount = `${used - 1}`+updatedItems[index].amount.slice(1);
      setItems(updatedItems);
    }
  };
  
  const [sorting, setSorting] = useState({ key: '', direction: 'asc' });

  const toggleSorting = (key) => {
    console.log(key)
    if (sorting.key === key) {
      setSorting((prevState) => ({
        ...prevState,
        direction: prevState.direction === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setSorting({ key, direction: 'asc' });
    }
  }
  const resetUsages = () => {
    const updatedItems = items.map((item) => {
        const total = parseInt(item.amount.split('/')[1].trim());
        item.amount = `${total}/${total}`;
 
      return item;
    });
    setItems(updatedItems);
  };
  const sortedItems = [...items].sort((a, b) => {
    const key = sorting.key;
    const direction = sorting.direction === 'asc' ? 1 : -1;
    if (key === 'lvl' || key=== "damage" ) {
      
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
            <h1 className="text-7xl p-[2%]   ">Card Spirits</h1>
            <input
              type="search"
              className="rounded-3xl h-[25%] w-[23%] m-[2%] pl-[1%] text-xl bg-[#D6E6F6] text-[black] placeholder:text-[black] font-semibold"
              placeholder="Search .."
            />
          </div>
          <details class="dropdown absolute left-[80%]" 
          onClick={resetUsages}> 
  
      </details>
      <div className="skillsandspells pl-[3%] pr-[1.5%] pb-[1%] ">
  <div className="text-xl font-semibold">Name</div>
  <div  
    className="text-xl font-semibold cursor-pointer"
    onClick={() => toggleSorting('lvl')}
    title="Click to sort by LV"
  >
    Lv {sorting.key === 'lvl' && sorting.direction === "asc" ? "▲" : "▼" }     
  </div>
  <div className="text-xl font-semibold">Amount</div>
  <div
    className="text-xl font-semibold cursor-pointer"
    onClick={() => toggleSorting('type')}
    title="Click to sort by Type"
  >
    Type {sorting.key === 'type' && sorting.direction === "asc" ? "▲" : "▼" }
  </div>


  <div
    className="text-[1.10rem] font-semibold cursor-pointer"
    onClick={() => toggleSorting('element')}
    title="Click to sort by Element"
  >
    Element {sorting.key === 'element' && sorting.direction === "asc" ? "▲" : "▼" }
  </div>
  <div
    className="text-[1.10rem] font-semibold cursor-pointer"
    onClick={() => toggleSorting('damage')}
    title="Click to sort by Element"
  >
    Damage {sorting.key === 'damage' && sorting.direction === "asc" ? "▲" : "▼" }
  </div>
  <div className="text-xl font-semibold">HitChance</div>
  <div className="text-xl font-semibold">Counter</div>
  <div className="text-xl font-semibold">Effect</div>
</div>

<div className="overflow-scroll h-[75%] overflow-x-hidden scrollbar">
{sortedItems.map((item, index) => (
  <div key={index} className="skillsandspells pl-[3%]">
    <div className="text-xl"> {item.name}</div>
    <div className="text-xl"> {item.lvl}</div>
    <div className="text-xl cursor-pointer"
                 onClick={() => handleUsagesClick(index)}
                 title={`Click to reduce Usages for ${item.amount}`}>{item.amount}</div>
    <div className="text-xl"> {item.type}</div>
    <div className="text-xl"> {item.element}</div>
    <div className="text-xl"> {item.damage}</div>
    <div className="text-xl"> {item['hit chance']}</div>
    <div className="text-xl cursor-pointer"
      onClick={() => handleUsagesClick(index)}
      title={`Click to reduce Usages for ${item.name}`}
    >
       {item.counter}
    </div>
    <div className="text-xl">{item.effect}</div>
  </div>
))}
</div>  </div>
      </div>
    </div>
  );
}

export default SkillsAndSpells;
