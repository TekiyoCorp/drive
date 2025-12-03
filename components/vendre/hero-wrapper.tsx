"use client";

import { VendreFormProvider } from "@/contexts/vendre-form-context";
import Hero from "./hero";

const HeroWrapper = () => {
  return (
    <VendreFormProvider>
      <Hero />
    </VendreFormProvider>
  );
};

export default HeroWrapper;

