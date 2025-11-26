"use client";

import React from "react";
import { Toaster } from "sonner";
import { NavbarVisibilityProvider } from "@/contexts/navbar-visibility-context";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <NavbarVisibilityProvider>
      <Toaster richColors theme="dark" position="bottom-center" />
      <div className="flex flex-col">{children}</div>
    </NavbarVisibilityProvider>
  );
};

export default Providers;
