"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavbarVisibilityContextType {
  isFindDriveAgencyVisible: boolean;
  setIsFindDriveAgencyVisible: (visible: boolean) => void;
}

const NavbarVisibilityContext = createContext<NavbarVisibilityContextType | undefined>(undefined);

export const NavbarVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [isFindDriveAgencyVisible, setIsFindDriveAgencyVisible] = useState(false);

  return (
    <NavbarVisibilityContext.Provider
      value={{ isFindDriveAgencyVisible, setIsFindDriveAgencyVisible }}
    >
      {children}
    </NavbarVisibilityContext.Provider>
  );
};

export const useNavbarVisibility = () => {
  const context = useContext(NavbarVisibilityContext);
  if (context === undefined) {
    throw new Error("useNavbarVisibility must be used within a NavbarVisibilityProvider");
  }
  return context;
};

