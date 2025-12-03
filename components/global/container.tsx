"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleUp";
  delay?: number;
}

const getAnimationVariants = (animation?: string) => {
  if (!animation) {
    return { opacity: 0, y: 20 };
  }
  
  switch (animation) {
    case "fadeUp":
      return { opacity: 0, y: 20 };
    case "fadeDown":
      return { opacity: 0, y: -20 };
    case "fadeLeft":
      return { opacity: 0, x: -20 };
    case "fadeRight":
      return { opacity: 0, x: 20 };
    case "scaleUp":
      return { opacity: 0, scale: 0.95 };
    default:
      return { opacity: 0, y: 20 };
  }
};

const Container = ({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
}: Props) => {
  // Check if motion is available
  if (!motion || !motion.div) {
    console.warn("Framer Motion not available, rendering fallback");
    return <div className={className}>{children}</div>;
  }

  const animationVariants = getAnimationVariants(animation);
  const calculatedDelay = typeof delay === "number" && !isNaN(delay) ? delay * 0.2 : 0;

  return (
    <motion.div
      className={className}
      initial={animationVariants}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.2,
        delay: calculatedDelay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
