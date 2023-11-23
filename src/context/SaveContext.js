import React, { createContext, useContext, useEffect, useState } from 'react';

const SaveContext = createContext();

export const useSaveItems = () => {
  return useContext(SaveContext);
};

export const SaveProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const storedSavedItems = JSON.parse(localStorage.getItem('savedItems'));
    if (storedSavedItems) {
      setSavedItems(storedSavedItems);
    }
  }, []);

  const addSavedItem = (item) => {
    setSavedItems((prevSavedItems) => {
      const isItemLiked = prevSavedItems.some((savedItem) => savedItem.id === item.id);

      let updatedSavedItems;
      if (isItemLiked) {
        updatedSavedItems = prevSavedItems.filter((savedItem) => savedItem.id !== item.id);
      } else {
        updatedSavedItems = [...prevSavedItems, item];
      }

      localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
      return updatedSavedItems;
    });
  };

  const removeSavedItem = (itemId) => {
    setSavedItems((prevSavedItems) => {
      const updatedSavedItems = prevSavedItems.filter(
        (item) => item.id !== itemId
      );
      localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
      return updatedSavedItems;
    });
  };

  const clearSavedItems = () => {
    setSavedItems([]);
    localStorage.removeItem('savedItems');
  };

  return (
    <SaveContext.Provider
      value={{
        savedItems,
        addSavedItem,
        removeSavedItem,
        clearSavedItems,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};
