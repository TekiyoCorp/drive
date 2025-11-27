"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface VendreFormContextType {
  // CarFilters
  brand: string;
  model: string;
  year: string;
  kilometers: string;
  registration: string;
  
  // UserInfo
  fullName: string;
  email: string;
  phone: string;
  city: string;
  
  // ImageUpload
  imageCount: number;
  
  // Setters
  setBrand: (value: string) => void;
  setModel: (value: string) => void;
  setYear: (value: string) => void;
  setKilometers: (value: string) => void;
  setRegistration: (value: string) => void;
  setFullName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setCity: (value: string) => void;
  setImageCount: (value: number) => void;
  
  // Calculated progress
  progress: number;
}

const VendreFormContext = createContext<VendreFormContextType | undefined>(undefined);

export const VendreFormProvider = ({ children }: { children: ReactNode }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [registration, setRegistration] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [imageCount, setImageCount] = useState(0);

  // Calculate progress: 10 fields total (9 form fields + 1 for 4 images)
  const filledFields = [
    brand,
    model,
    year,
    kilometers,
    registration,
    fullName,
    email,
    phone,
    city,
  ].filter((field) => field.trim() !== "").length;
  
  // Images count as 1 field only if exactly 4 images are uploaded
  const hasAllImages = imageCount === 4;
  const totalFilled = filledFields + (hasAllImages ? 1 : 0);
  const progress = Math.round((totalFilled / 10) * 100);

  return (
    <VendreFormContext.Provider
      value={{
        brand,
        model,
        year,
        kilometers,
        registration,
        fullName,
        email,
        phone,
        city,
        imageCount,
        setBrand,
        setModel,
        setYear,
        setKilometers,
        setRegistration,
        setFullName,
        setEmail,
        setPhone,
        setCity,
        setImageCount,
        progress,
      }}
    >
      {children}
    </VendreFormContext.Provider>
  );
};

export const useVendreForm = () => {
  const context = useContext(VendreFormContext);
  if (context === undefined) {
    throw new Error("useVendreForm must be used within a VendreFormProvider");
  }
  return context;
};

