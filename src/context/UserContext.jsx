// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

const useUser = () => useContext(UserContext);
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //  check for user data in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Set the user if found in localStorage
    }
  }, []);

  // update the user state and save it to localStorage
  const updateUser = (userId) => {
    const newUser = { uid: userId };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser)); // Save the user to localStorage
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider,useUser};
