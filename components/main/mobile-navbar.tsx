"use client";

import { NAV_LINKS } from "@/constants/links";
import { useScreenSize, getResponsiveElasticity } from "@/lib/liquidGlassUtils";
import { LiquidGlass } from "@liquidglass/react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MobileNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const screenSize = useScreenSize();
  const elasticity = getResponsiveElasticity(screenSize, 0.6);
  const pathname = usePathname();

  // Handle hydration mismatch for pathname-based styling
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isHomePage = isClient ? pathname === "/" : false;

  return (
    <header
      className={cn(
        "absolute inset-x-0 z-50 w-full lg:hidden select-none",
        toggleMenu ? "top-[7.8rem]" : isHomePage ? "top-2" : "top-2"
      )}
    >
      <Wrapper
        className={cn(
          "flex items-center justify-between",
          isHomePage ? "px-8 md:px-10 lg:px-16" : "!px-5 md:!px-7 lg:px-24"
        )}
      >
        <LiquidGlass
          borderRadius={30}
          blur={1}
          contrast={1}
          brightness={1.2}
          saturation={1}
          shadowIntensity={0}
          displacementScale={2.3}
          elasticity={elasticity}
          className={cn(
            "border border-white/40 border-r-0 border-l-0 rounded-[30px] w-full overflow-hidden transition-all duration-500",
            toggleMenu ? "!h-[290px]" : "!h-12"
          )}
        >
          <div className="flex flex-col w-full gap-8 px-5 py-3">
            <div className="flex items-center justify-between gap-x-6 xl:gap-x-10 text-sm text-muted-foreground font-medium w-full">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/logo-small.svg"
                    alt="logo"
                    width={50}
                    height={50}
                    className="w-max h-6"
                  />
                </Link>
              </motion.div>

              <MenuIcon
                onClick={() => setToggleMenu(!toggleMenu)}
                className="size-5 cursor-pointer text-white"
              />
            </div>

            <div
              className={cn(
                "flex flex-col w-full gap-5",
                toggleMenu ? "flex" : "hidden"
              )}
            >
              <AnimatePresence>
                {NAV_LINKS.map((link, index) => (
                  <Container
                    key={index}
                    animation="fadeDown"
                    delay={0.1 * index}
                  >
                    <div className="relative">
                      <Link
                        href={link.link}
                        className="transition-all duration-500 text-white"
                      >
                        {link.name}
                      </Link>
                    </div>
                  </Container>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </LiquidGlass>
      </Wrapper>
    </header>
  );
};

export default MobileNavbar;
