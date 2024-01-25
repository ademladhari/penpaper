import React, { useState } from 'react'
import { FaFacebook, FaWhatsapp, FaTwitter, FaReddit, FaLinkedin } from 'react-icons/fa';
import { useCurrentPlayer } from './context/Context';
import { Link } from 'react-router-dom';

function Players() {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentPlayer } = useCurrentPlayer();

    const marginBottomValues = [0, 0, 0, 0, 0,0]
  const iconsData = [
    { Icon: FaFacebook, color: '#1877f2',},
    { Icon: FaWhatsapp, color: '#25d366',  },
    { Icon: FaTwitter, color: '#1da1f2',  },
    { Icon: FaReddit, color: '#FF5733' , },
    { Icon: FaLinkedin, color: '#0a66c2',  },
    { Icon: FaLinkedin, color: '#0a66c2',  },
    
  ];

  // eslint-disable-next-line no-unused-vars
  let leng=iconsData.length

 
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  return (
    <div className={`menu ${isOpen ? 'active' : ''}`}>
           <div className="toggle" >
           <button onClick={toggleMenu}>Players</button>              </div>
            <ul>
             {iconsData.map((icon, index) => (
              
   
    <li key={index}   style={{
      transform: `rotate(calc(-4deg + (160deg / ${iconsData.length} * ${index}))) `,
      transitionDelay: `calc(0.05s * ${index})`,
      marginBottom: `${marginBottomValues[index]}px`  ,
      
      
        }}>
  
      <div     style={{
          transform: `rotate(calc(4deg - (160deg / ${iconsData.length} * ${index}))) `, // Updated transformation logic for anchors
          color: 'rgb(250 204 21)',
          backgroundColor:'#263895',
          scale: `${leng = 6 ? '0.8' : '1'}`
          
        }}
        onClick={()=>setCurrentPlayer(`player${index+1}`)}>
        
      heh
    
      </div>
  
    </li>
  ))}
            </ul>
          </div>
  )
}

export default Players