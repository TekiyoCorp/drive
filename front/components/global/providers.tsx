"use client";

import React from "react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <>
      <Toaster richColors theme="dark" position="bottom-center" />
      <div className="flex flex-col">{children}</div>
    </>
  );
};

export default Providers;
