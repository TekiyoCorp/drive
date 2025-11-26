"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Déterminer le nombre de thumbs nécessaires
  const valueLength = props.value?.length || props.defaultValue?.length || 1;
  
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/10">
        <SliderPrimitive.Range className="absolute h-full bg-white" />
      </SliderPrimitive.Track>
      {/* Radix UI nécessite un Thumb pour chaque valeur dans le tableau */}
      {Array.from({ length: valueLength }).map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-5 w-5 rounded-full border-2 border-white bg-white ring-offset-background transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing"
        />
      ))}
    </SliderPrimitive.Root>
  );
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

