/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, } from 'react';

import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Signin({ show, setShow, showLogin, setShowLogin }) {
  const {  login } = UserAuth();
  const navigate = useNavigate();
 console.log('here')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    // Restore rememberMe state from local storage
    const rememberMeState = localStorage.getItem('rememberMe');
    setRememberMe(rememberMeState === 'true');
  }, []);
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    // Store rememberMe state in local storage
    localStorage.setItem('rememberMe', e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      await login(email, password,rememberMe);
      navigate('/');
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAccount = () => {
    setShowLogin(false);
  };


 

  return (
    <>
      {showLogin && show && (
      
          <div className="flex-1 xl:ml-[78.6%] ml-[10%] h-[10%] mt-[2.2%]  w-80   fixed z-50">
            <div className="px-6 pt-6 py-11 lg:px-8 rounded-3xl   bg-gradient-to-b from-50% from-[#e2e4e7] to-[#D1D5DB]  drop-shadow-lg dark:from-[#171717] dark:to-[#515050]">
              <h3 className="mx-11 pb-6 text-xl font-medium text-center text-gray-900 dark:text-white">
                Login  to our platform
              </h3>

              <form className="space-y-5 " onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Your Email address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                        className=" border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
              
                  <a
                    href="#"
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
              </form>

              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 pt-3">
                Not registered?{' '}
                <button
                  onClick={handleCreateAccount}
                  className="text-blue-700 pt-1.5 hover:underline dark:text-blue-500"
                >
                  Create account
                </button>
              </div>
            </div>
          
        </div>
      )}
    </>
  );
}

export default Signin;
