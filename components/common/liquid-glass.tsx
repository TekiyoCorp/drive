"use client";

import { useSafariDetection } from "@/lib/browser-detection";
import { cn } from "@/lib/utils";
import { LiquidGlass as LiquidGlassDisplay } from "@liquidglass/react";
import { useEffect, useState } from "react";

interface LiquidGlassProps {
  children: React.ReactNode;
  borderRadius?: number;
  blur?: number;
  contrast?: number;
  brightness?: number;
  saturation?: number;
  shadowIntensity?: number;
  displacementScale?: number;
  elasticity?: number;
  className?: string;
  parentClassName?: string;
}

const LiquidGlass = ({
  children,
  borderRadius = 30,
  blur = 1,
  contrast = 1,
  brightness = 1.2,
  saturation = 1,
  shadowIntensity = 0,
  displacementScale = 2.3,
  elasticity = 0.6,
  className,
  parentClassName,
}: LiquidGlassProps) => {
  const [isClient, setIsClient] = useState(false);
  // const responsiveElasticity = getResponsiveElasticity(screenSize, elasticity);
  const responsiveElasticity = elasticity;
  const { isSafari, isSafariIOS, isSafariMacOS } = useSafariDetection();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      style={{
        backdropFilter:
          isClient && (isSafari || isSafariIOS || isSafariMacOS)
            ? "blur(12px)"
            : "none",
      }}
      className={cn("rounded-[30px]", parentClassName)}
    >
      <LiquidGlassDisplay
        borderRadius={borderRadius}
        blur={blur}
        contrast={contrast}
        brightness={brightness}
        saturation={saturation}
        shadowIntensity={shadowIntensity}
        displacementScale={displacementScale}
        elasticity={responsiveElasticity}
        className={className}
      >
        {children}
      </LiquidGlassDisplay>
    </div>
  );
};

export default LiquidGlass;
