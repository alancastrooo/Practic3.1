// src/context/LanguageContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

type Language = "es" | "en";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

const defaultValue: LanguageContextType = {
  language: "es",
  toggleLanguage: () => {},
};

export const LanguageContext = createContext<LanguageContextType>(defaultValue);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook práctico para usar en las pantallas
export const useLanguage = () => {
  return useContext(LanguageContext);
};
