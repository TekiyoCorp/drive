"use client";

import { NAV_LINKS } from "@/constants/links";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, startTransition } from "react";
import LiquidGlass from "../common/liquid-glass";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

interface NavigationLink {
  name?: string;
  link?: string;
  attributes?: {
    name?: string;
    link?: string;
  };
}

interface HeaderContent {
  navigationLinks?: NavigationLink[];
}

const MobileNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [content, setContent] = useState<HeaderContent | null>(null);
  const pathname = usePathname();

  // Handle hydration mismatch for pathname-based styling
  useEffect(() => {
    startTransition(() => {
      setIsClient(true);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/header?populate=*`,
          {
            headers: {
              ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const result = await response.json();
        const node = result?.data;
        const attributes = node ? node.attributes ?? node : null;

        if (!isMounted) return;

        setContent(attributes);
      } catch {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  // Close menu when navigating to a new page
  useEffect(() => {
    startTransition(() => {
      setToggleMenu(false);
    });
  }, [pathname]);

  const isHomePage = isClient ? pathname === "/" : false;

  // Parse navigation links - handle different Strapi data structures
  let navigationLinks: { name: string; link: string }[] = NAV_LINKS;
  if (content?.navigationLinks) {
    if (Array.isArray(content.navigationLinks) && content.navigationLinks.length > 0) {
      const mappedLinks = content.navigationLinks
        .map((link: NavigationLink) => {
          if (link.name && link.link) {
            return { name: link.name, link: link.link };
          }
          if (link.attributes?.name && link.attributes?.link) {
            return { name: link.attributes.name, link: link.attributes.link };
          }
          return null;
        })
        .filter((link): link is { name: string; link: string } => link !== null && typeof link.name === "string" && typeof link.link === "string");
      
      if (mappedLinks.length > 0) {
        navigationLinks = mappedLinks;
      }
    }
  }

  return (
    <header
      className={cn(
        "absolute inset-x-0 z-50 w-full xl:hidden select-none",
        toggleMenu ? "top-6" : isHomePage ? "top-6" : "top-6"
      )}
    >
      <Wrapper
        className={cn(
          "flex items-center justify-between",
          isHomePage ? "px-8 md:px-10 lg:px-16" : "!px-5 md:!px-7 lg:px-24"
        )}
      >
        <LiquidGlass
          blur={toggleMenu ? 8 : 2}
          elasticity={0.8}
          className={cn(
            "border border-white/40 border-r-0 border-l-0 rounded-[30px] !w-full overflow-hidden transition-all duration-500",
            toggleMenu ? "!h-[325px] bg-black/20" : "!h-12 bg-transparent"
          )}
          parentClassName="w-full"
        >
          <div className="flex flex-col w-full gap-8 px-5 py-3 h-full">
            <div className="flex items-center justify-between gap-x-6 xl:gap-x-10 text-sm text-muted-foreground font-medium w-full">
              {/* <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              > */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo-small.svg"
                  alt="logo"
                  width={47}
                  height={24}
                  style={{ height: "24px", width: "46.8px" }}
                  className="h-6 w-auto"
                  fetchPriority="high"
                  loading="eager"
                />
              </Link>
              {/* </motion.div> */}

              <MenuIcon
                onClick={() => setToggleMenu(!toggleMenu)}
                className="size-5 cursor-pointer text-white"
              />
            </div>

            <div
              className={cn(
                "w-full pb-2",
                toggleMenu ? "flex flex-col gap-5" : "hidden"
              )}
            >
              <AnimatePresence>
                {navigationLinks.map((link: { name: string; link: string }, index: number) => (
                  <Container
                    key={index}
                    animation="fadeDown"
                    delay={0.1 * index}
                  >
                    <div className="relative">
                      <Link
                        href={link.link}
                        // onClick={() => setToggleMenu(false)}
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
