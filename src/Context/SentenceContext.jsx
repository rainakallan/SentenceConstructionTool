import React, { Children, createContext, useContext, useState } from "react";

const SentenceContext = createContext();

export const useSentence = () => useContext(SentenceContext);

export const SentenceProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  

  return (
    <SentenceContext.Provider value={{ results, setResults }}>
      {children}
    </SentenceContext.Provider>
  );
};
