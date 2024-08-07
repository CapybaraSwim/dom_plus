import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    houseSize: null,
    placeForConstruction: null,
    paymentMethod: null,
    discount: 0,
  });

  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  const resetState = () => {
    setState({
      houseSize: null,
      placeForConstruction: null,
      paymentMethod: null,
      discount: 0,
    });
  };

  return (
    <AppContext.Provider value={{ state, updateState, resetState }}>
      {children}
    </AppContext.Provider>
  );
};