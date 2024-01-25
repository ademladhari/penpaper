import { useContext, createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, } from "firebase/auth";
import { auth, db } from '../getdata/FireBase';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRef } from "react";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const exercisesSectionRef = useRef();
  const aboutSectionRef = useRef();
  const contactSectionRef = useRef();


  const login = async (email, password) => {
    try {
      console.log('here');
      const authResult = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = authResult.user;
      console.log('Successfully logged in with email and password');
      
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
      setUser(loggedInUser);
    } catch (error) {
      setError('Error logging in with email and password');
      console.log(error.code);
    }
  };
 

  const signup = async (userData) => {
    try {
      const { email, password,  } = userData;
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      setUser(user);
      const userRef = doc(db, 'data', email);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          savedshow: [{
       
          }]
        });
      } else {
        await updateDoc(userRef, {
          savedshow: [
            ...userSnap.data().savedshow,
            {
          
            }
          ]
        });
      }
      console.log('Successfully signed up:', email);
    } catch (error) {
      setError('Error signing up');
      console.log(error);
    }
  };

  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('user');
      // Any additional cleanup or actions after logging out can be added here
    }).catch((error) => {
      console.error('Error signing out:', error);
    })
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser({ currentUser });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{  signup, login, logOut, user,setUser, error}}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
