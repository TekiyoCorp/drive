"use client";

import { cn } from "@/lib/utils";
import { LiquidGlass } from "@liquidglass/react";
import { useState, useEffect } from "react";
import { useSafariDetection } from "@/lib/browser-detection";

interface LiquidGlassBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const LiquidGlassBadge = ({ children, className }: LiquidGlassBadgeProps) => {
  const { isSafari, isSafariIOS, isSafariMacOS } = useSafariDetection();
  const elasticity = 0.2;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={cn(
        "border border-white/50 max-md:border-none border-r-0 border-l-0 rounded-[40px] whitespace-nowrap relative flex items-center justify-center",
        className
      )}
      style={{
        backdropFilter:
          isClient && (isSafari || isSafariIOS || isSafariMacOS)
            ? "blur(12px)"
            : "none",
      }}
    >
      <LiquidGlass
        borderRadius={40}
        blur={1}
        contrast={1}
        brightness={1.1}
        saturation={1.1}
        shadowIntensity={0}
        displacementScale={2}
        elasticity={elasticity}
      >
        <span
          className={cn(
            "flex-center px-4 py-2 rounded-full border border-white/50 md:border-gray-600/5 md:border-t-0 md:border-b-0 border-l-0 border-r-0 text-white text-base font-medium select-none flex items-center justify-center",
            className
          )}
        >
          {children}
        </span>
      </LiquidGlass>
    </div>
  );
};

export default LiquidGlassBadge;
