import React, { createContext, useContext } from 'react';
import { useGetData } from '../helpers/useGetData';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const { data, loading, refetch } = useGetData();

  return (
    <NotesContext.Provider value={{ data, loading, refetch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
