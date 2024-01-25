import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { UserAuth } from "../../context/AuthContext";
import { useCurrentPlayer } from "../../context/Context";

function Navbar() {
  const [ setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const { show,setShow} = useCurrentPlayer();

  const {user,logOut}  =UserAuth()
 const handleSignOut = async () => {
  try {
    await logOut();
  } catch (error) {
    console.log(error);
  }
};

  const correctPassword = "hehe"; // Replace with your actual password

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password === correctPassword) {
      // Redirect to the Character Creation page if the password is correct
      window.location.href = '/character-creation';
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCharacterCreationClick = () => {
    setShowPasswordInput(true); // Show the password input when Character Creation is clicked
  };

  return (
    <div className='m-auto fixed w-[100%] rounded-[2%] z-50 text-white'>
      <div className="flex justify-end py-3 w-[100%]">
        <div className="xl:text-2xl font-bold mr-[35%] md:mr-[70%] xl:mr-[65%] 2xl:mr-[90%] text-2xl" onClick={handleCharacterCreationClick}>
          Nazrudin
        </div>

     
        {user.email ? (
  <button
    className="ml-auto px-4 py-2 bg-red-500 text-white dark:text-gray-300 rounded-md"
    onClick={handleSignOut}
  >
    Log Out
  </button>
) : (
  <>
  <button
      className="flex align-middle xl:mt-1 xl:mb-1 xl:py-2 xl:text-lg lg:text-base md:mt-[8%] md:p-2 sm:p-2 sm:mt-3 mt-[25%]    mr-1 lg:mt-[10%] py-0.5 px-2 xl:px-4 text-xs font-medium bg-blue-500 text-white rounded-md"
      onClick={() => setShow(!show)}
    >
      {!show ? (
        <>
          <FaArrowDown color="white" className="xl:mr-3 mr-1 xl:pt-0.5 xl:pb-0 pb-0.5 mt-1 dark:text-gray-300   text-gray-800" />
          Login
        </>
      ) : (
        <>
          <FaArrowUp color="white" className="xl:mr-3 mr-1 xl:pt-0.5 pb-0.5 xl:pb-0 mt-1 dark:text-gray-300 text-gray-800" />
          Login
        </>
      )}
    </button>
  
  </>
)}
   
   
       
      </div>
    </div>
  );
}

export default Navbar;
