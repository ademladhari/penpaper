import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Signin({ show, setShow,showLogin,setShowLogin }) {
  const {signup } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email,
        password,
  
      };
      await signup(userData);
      navigate('/');
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };
  const handleLogin=()=>{
     
     setShowLogin(true)
  }

  return (
    <>
    
 {!showLogin&&(show && (
        <div class="flex-1 xl:ml-[78.6%] ml-[10%] h-[100%] mt-[2.0%]  w-80 fixed  z-50 overflow-scroll hm   ">
          <div class="px-6 pt-6 py-10 lg:px-8 rounded-3xl bg-gradient-to-b from-50% from-[#e2e4e7] to-[#D1D5DB]  backdrop-blur-xl drop-shadow-lg dark:from-[#171717] dark:to-[#515050] ">
            <h3 class="mx-11 pb-6 text-xl font-medium text-center text-gray-900 dark:text-white">Sign in to our platform</h3>
            <form class="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@mail.com"
                  required
                />
              </div>
              <div>
                <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
             
              <div class="text-center">
                <span class="text-sm font-medium text-gray-500 dark:text-gray-300 cursor-pointer" onClick={handleToggleAdditionalInfo}>
                  {showAdditionalInfo ? 'Less Information' : 'Additional Informations'}
                </span>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
               Sign up
              </button>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have an account?{' '}
                <button onClick={handleLogin} class="text-blue-700 hover:underline dark:text-blue-500">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      ))}
    </>
  );
}

export default Signin;
