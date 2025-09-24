import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Wrapper = ({ className, children }: Props) => {
  return (
    <section
      className={cn(
        "h-full mx-auto w-full lg:max-w-screen-2xl px-2.5 md:px-4 lg:px-16",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Wrapper;
