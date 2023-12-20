"use client"
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(false);

  const value = {
    selectedUser,
    setSelectedUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useEditUser = () => {
  return useContext(UserContext);
};
