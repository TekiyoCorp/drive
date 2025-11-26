"use client";

import { ArrowRight } from "lucide-react";
import LiquidGlassButton from "../common/liquid-glass-button";
import Wrapper from "../global/wrapper";

interface HeroData {
  id?: number;
  attributes?: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: unknown;
    ctaText?: string;
    ctaLink?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
  title?: string;
  subtitle?: string;
  backgroundImage?: unknown;
  ctaText?: string;
  ctaLink?: string;
  sellButtonText?: string;
  buyButtonText?: string;
}

interface HeroProps {
  heroData?: HeroData | null;
  error?: string | null;
}

const Hero = ({ heroData }: HeroProps) => {
  const baseURL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <div className="hero-container relative z-0 w-full !p-2.5 md:!p-4 min-h-screen h-full">
      {/* Critical LCP image - optimized for immediate loading */}
      <div className="-z-10 rounded-3xl overflow-hidden">
        <picture>
          <img
            src={(() => {
              const bgImage =
                heroData?.backgroundImage ||
                heroData?.attributes?.backgroundImage;

              if (!bgImage || typeof bgImage !== "object") {
                return "/images/main/hero.webp";
              }

              let url: string | undefined;

              // Standard Strapi format: { data: { attributes: { url } } }
              if (
                "data" in bgImage &&
                bgImage.data &&
                typeof bgImage.data === "object"
              ) {
                const data = bgImage.data as {
                  attributes?: { url?: string };
                  url?: string;
                };
                url = data.attributes?.url || data.url;
              }

              // Alternative format: { attributes: { url } }
              if (!url && "attributes" in bgImage && bgImage.attributes) {
                const attrs = bgImage.attributes as { url?: string };
                url = attrs.url;
              }

              // Direct URL format: { url }
              if (!url && "url" in bgImage && typeof bgImage.url === "string") {
                url = bgImage.url;
              }

              if (!url || url.trim() === "") {
                return "/images/main/hero.webp";
              }

              return url.startsWith("http") ? url : `${baseURL}${url}`;
            })()}
            alt={(() => {
              const bgImage = heroData?.backgroundImage || heroData?.attributes?.backgroundImage;
              if (bgImage && typeof bgImage === "object") {
                // Check for direct alternativeText
                if ("alternativeText" in bgImage && typeof bgImage.alternativeText === "string") {
                  return bgImage.alternativeText;
                }
                // Check for nested data.attributes.alternativeText
                if ("data" in bgImage && bgImage.data && typeof bgImage.data === "object") {
                  if ("attributes" in bgImage.data && bgImage.data.attributes && typeof bgImage.data.attributes === "object") {
                    const attrs = bgImage.data.attributes as { alternativeText?: string };
                    if (attrs.alternativeText) return attrs.alternativeText;
                  }
                }
                // Check for attributes.alternativeText (alternative structure)
                if ("attributes" in bgImage && bgImage.attributes && typeof bgImage.attributes === "object") {
                  const attrs = bgImage.attributes as { alternativeText?: string };
                  if (attrs.alternativeText) return attrs.alternativeText;
                }
              }
              return "Hero Image - Drive Premium Car Platform";
            })()}
            className="w-full object-cover h-full min-h-screen object-center rounded-3xl"
            style={{
              transform: "translateZ(0)",
              willChange: "auto",
              contain: "layout style paint",
            }}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            onLoad={(e) => {
              // Mark LCP element as loaded for performance tracking
              const target = e.target as HTMLImageElement;
              target.setAttribute("data-lcp-loaded", "true");
            }}
            onError={(e) => {
              // Fallback to default image if Strapi image fails
              const target = e.target as HTMLImageElement;
              target.src = "/images/main/hero.webp";
            }}
          />
        </picture>
      </div>

      <Wrapper className="hero-content py-12 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit">
        <div className="flex flex-col items-center justify-center w-full z-10">
          {/* Critical content - render immediately for LCP */}
          <h1
            className="hero-title text-balance !leading-[1.25] text-center text-[32px] font-semibold tracking-tight mt-3 w-full prevent-cls"
            style={{
              contain: "layout style",
              willChange: "auto",
            }}
          >
            {heroData?.title || heroData?.attributes?.title || "La confiance au volant."}
          </h1>

          {/* LCP supporting text - immediate render */}
          <p
            className="hero-description text-base font-normal text-center text-white/80 max-w-[23rem] mx-auto mt-2 leading-relaxed prevent-cls"
            style={{
              contain: "layout style",
              willChange: "auto",
              transform: "translateZ(0)",
            }}
          >
            {heroData?.subtitle || heroData?.attributes?.subtitle || "Simplifiez la vente ou l'achat de votre voiture premium grâce à notre réseau de courtiers certifiés."}
          </p>

          {/* Critical action buttons - defer animation for faster LCP */}
          <div className="mt-3 flex items-center gap-3 prevent-cls">
            <LiquidGlassButton
              className="btn-primary px-8 md:px-12"
              style={{ willChange: "auto" }}
              onClick={() => window.location.href = heroData?.ctaLink || heroData?.attributes?.ctaLink || "/vendre"}
            >
              <span>{heroData?.sellButtonText || heroData?.attributes?.ctaText || "Vendre"}</span>
            </LiquidGlassButton>
            <LiquidGlassButton
              className="btn-primary px-8 md:px-12"
              style={{ willChange: "auto" }}
              onClick={() => window.location.href = "/catalogue"}
            >
              <span>{heroData?.buyButtonText || "Acheter"}</span>
            </LiquidGlassButton>
          </div>

          {/* Secondary CTA - render without heavy animations initially */}
          <button
            className="mt-3 flex items-center gap-1 text-base font-medium group cursor-pointer prevent-cls"
            aria-label="Discover the DRIVE network"
            style={{
              contain: "layout style",
              willChange: "auto",
              transform: "translateZ(0)",
            }}
          >
            Découvrir le réseau DRIVE{" "}
            <ArrowRight
              className="size-5 ml-0 group-hover:ml-1 transition-all"
              style={{ willChange: "transform" }}
            />
          </button>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
