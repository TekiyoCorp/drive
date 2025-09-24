"use client";

import { cn } from "@/lib/utils";
import { LiquidGlass } from "@liquidglass/react";
import { useScreenSize, getResponsiveElasticity } from "@/lib/liquidGlassUtils";
import { useState } from "react";
import React from "react";

interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  btnClassName?: string;
  showTooltips?: boolean;
}

const LiquidGlassButton = ({
  children,
  className,
  btnClassName,
  showTooltips = false,
  ...props
}: LiquidGlassButtonProps) => {
  const screenSize = useScreenSize();
  const elasticity = getResponsiveElasticity(screenSize, 0.2);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      {...props}
      className={cn(
        "cursor-pointer border border-white/50 max-md:border-none border-r-0 border-l-0 rounded-[40px] whitespace-nowrap relative flex items-center justify-center",
        btnClassName
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            "flex-center px-4 py-2 rounded-full border border-white/50 md:border-gray-600/5 md:border-t-0 md:border-b-0 border-l-0 border-r-0 text-white text-base font-medium cursor-pointer select-none transition-all duration-300 flex items-center justify-center",
            isHovered ? "gap-4" : "gap-2.5",
            className
          )}
        >
          {children}
        </span>
      </LiquidGlass>

      {/* Tooltips for social media icons */}
      {showTooltips &&
        isHovered &&
        React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === "img") {
            const alt = (child.props as { alt?: string }).alt || "";
            const iconName = alt.replace(" Icon", "");

            return (
              <div
                key={index}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-50 pointer-events-none opacity-0 animate-in fade-in duration-200"
                style={{
                  left: `${
                    (index + 1) * (100 / React.Children.count(children))
                  }%`,
                  transform: "translateX(-50%)",
                }}
              >
                {iconName}
              </div>
            );
          }
          return null;
        })}
    </button>
  );
};

export default LiquidGlassButton;
