"use client";

import { cn } from "@/lib/utils";
import { HeartIcon, SearchIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, startTransition } from "react";
import LiquidGlass from "../common/liquid-glass";
import LiquidGlassButton from "../common/liquid-glass-button";
import SpotlightSearch from "../common/spotlight-search";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { NAV_LINKS } from "@/constants/links";

const Navbar = () => {
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
    openAgencyButtonText?: string;
    openAgencyButtonLink?: string;
    appointmentButtonText?: string;
  }

  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
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

  // Prevent hydration mismatch by ensuring consistent rendering
  const isHomePage = isClient ? pathname === "/" : true;

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

  const openAgencyButtonText = content?.openAgencyButtonText ?? "Ouvrir une agence";
  const openAgencyButtonLink = content?.openAgencyButtonLink ?? "/open-agency";
  const appointmentButtonText = content?.appointmentButtonText ?? "Prendre rendez-vous";

  return (
    <header className="relative top-24 inset-x-0 z-50 w-full h-16 hidden xl:block pointer-events-none">
      <Wrapper
        className={cn(
          "flex items-center justify-between gap-2 pointer-events-auto",
          isHomePage ? "px-8 lg:px-16" : "px-8 lg:px-24"
        )}
      >
        <div>
          <LiquidGlass
            blur={1}
            elasticity={0.8}
            className="border border-white/50 max-md:border-none border-r-0 border-l-0 rounded-[40px] !w-fit !h-fit"
          >
            <div className="flex flex-row items-center justify-center gap-x-6 xl:gap-x-10 text-sm font-medium px-8 py-3">
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
                  style={{
                    height: "24px",
                    width: "46.8px",
                    minHeight: "24px",
                    maxHeight: "24px",
                  }}
                  className="!h-6 !w-auto force-logo-height"
                  loading="eager"
                  fetchPriority="high"
                />
              </Link>
              {/* </motion.div> */}

              {navigationLinks.map((link: { name: string; link: string }, index: number) => (
                // <Container animation="fadeDown" delay={0.1 * index}>
                <Link
                  key={index}
                  href={link.link}
                  className="transition-all duration-500 text-white"
                >
                  {link.name}
                </Link>
                // </Container>
              ))}
            </div>
          </LiquidGlass>
        </div>

        <div>
          <div
            className={cn(
              "flex items-center gap-3 fixed top-12",
              isHomePage ? "right-8 lg:right-16" : "right-8 lg:right-24"
            )}
          >
            {isClient && pathname === "/vendre" && (
              <Button className="rounded-full h-[45px] font-medium text-base !px-6 max-xl:hidden bg-white text-black">
                {appointmentButtonText} <VideoIcon className="fill-black size-5" />
              </Button>
            )}

            <LiquidGlassButton className="aspect-square flex items-center justify-center h-[45px] w-[47px] p-0">
              <HeartIcon className="size-5 fill-white" />
            </LiquidGlassButton>
            <LiquidGlassButton
              onClick={() => setOpen(true)}
              className="aspect-square flex items-center justify-center h-[45px] w-[47px] p-0"
            >
              <SearchIcon className="size-5" />
            </LiquidGlassButton>
            <SpotlightSearch open={open} setOpen={setOpen} />
            <Link href={openAgencyButtonLink}>
              <LiquidGlassButton className="px-8 text-base h-[45px]">
                <span>{openAgencyButtonText}</span>
              </LiquidGlassButton>
            </Link>
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;
