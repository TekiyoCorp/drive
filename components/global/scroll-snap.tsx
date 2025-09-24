"use client";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";

export const ScrollSnap = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="snap-parent-y-mandatory">
      {children}
    </div>
  );
};

interface SnapElementProps {
  triggerOnce?: boolean;
  children: React.ReactNode;
}

export const SnapElement = ({
  triggerOnce = false,
  children,
}: SnapElementProps) => {
  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: triggerOnce,
  });
  return (
    <div
      className="snap-child-center w-full flex flex-col justify-center items-center z-50"
      ref={ref}
    >
      <motion.div
        className="w-full"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
          hidden: { opacity: 1, scale: 0.95 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const SnapScrollContentBox = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="snap-child-start snap-child-stop w-full"
      style={{
        width: "100%",
        display: "flex",
        justifyItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
