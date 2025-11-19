"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { useEffect, useState } from "react";

interface HeroContent {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: unknown;
}

const Hero = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [bgUrl, setBgUrl] = useState<string>("/images/open-agency/hero.webp");

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/open-agency-hero?populate[0]=backgroundImage`,
          {
            headers: {
              ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Hero API Error:", response.status, response.statusText);
          return;
        }

        const result = await response.json();
        console.log("Hero API Response:", result); // Debug log
        const node = result?.data;
        const attributes = node ? node.attributes ?? node : null;
        console.log("Hero Attributes:", attributes); // Debug log

        if (!isMounted) return;

        setContent(attributes);

        // Handle backgroundImage - Strapi can return it in different formats
        let imageUrl = null;
        if (attributes?.backgroundImage) {
          const bgImage = attributes.backgroundImage;
          
          // Try different formats
          if (bgImage.data?.attributes?.url) {
            // Standard format: { data: { attributes: { url: ... } } }
            const url = bgImage.data.attributes.url;
            imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          } else if (bgImage.attributes?.url) {
            // Alternative format: { attributes: { url: ... } }
            const url = bgImage.attributes.url;
            imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          } else if (bgImage.url) {
            // Direct URL format
            const url = bgImage.url;
            imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          } else if (bgImage.data?.url) {
            // Nested data format
            const url = bgImage.data.url;
            imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          }
        }
        
        console.log("Hero Image URL:", imageUrl); // Debug log
        if (imageUrl && imageUrl.trim() !== "") {
          setBgUrl(imageUrl);
        }
      } catch (err) {
        console.error("Hero fetch error:", err);
        // Fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const title = content?.title ?? "Ouvrez votre agence <br /> DRIVE en 90 jours";
  const subtitle = content?.subtitle ?? "Méthode clé en main, réseau premium, retour sur investissement rapide.";
  const primaryButtonText = content?.primaryButtonText ?? "Je candidate";
  const primaryButtonLink = content?.primaryButtonLink ?? "#application-form";
  const secondaryButtonText = content?.secondaryButtonText ?? "Télécharger le dossier PDF";
  const secondaryButtonLink = content?.secondaryButtonLink ?? "#";

  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 h-screen">
      <Container
        animation="scaleUp"
        delay={0.1}
        className="w-full h-screen relative"
      >
        <Image
          src={bgUrl}
          alt="Hero Image"
          fill
          sizes="100vw"
          className="object-cover object-center top-0 z-10 rounded-3xl w-full h-screen"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/open-agency/hero.webp";
          }}
          priority={true}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-black/40 rounded-3xl" />
      </Container>

      <Wrapper className="py-16 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit z-10 !px-6 md:!px-16 lg:!px-24">
        <div className="flex flex-col justify-center max-md:items-center max-md:text-center w-full z-10">
          <Container delay={0.1}>
            <h2 
              className="text-balance !leading-[1.25] text-[28px] md:text-[48px] font-medium w-full"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </Container>

          <Container delay={0.2}>
            <p className="text-lg md:text-xl font-medium text-white max-w-md mt-4">
              {subtitle.split(" <br /> ").map((part: string, idx: number, arr: string[]) => (
                <span key={idx}>
                  {part}
                  {idx < arr.length - 1 && <br className="max-md:hidden" />}
                </span>
              ))}
            </p>
          </Container>

          <Container delay={0.3}>
            <div className="mt-6 flex max-md:flex-col md:items-center gap-3">
              <LiquidGlassButton 
                className="px-8 max-md:w-full"
                onClick={() => {
                  if (primaryButtonLink.startsWith("#")) {
                    document.querySelector(primaryButtonLink)?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = primaryButtonLink;
                  }
                }}
              >
                <span>{primaryButtonText}</span>
                <ArrowRight size={16} />
              </LiquidGlassButton>
              <LiquidGlassButton 
                className="px-8"
                onClick={() => {
                  if (secondaryButtonLink.startsWith("#")) {
                    document.querySelector(secondaryButtonLink)?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = secondaryButtonLink;
                  }
                }}
              >
                <span>{secondaryButtonText}</span>
              </LiquidGlassButton>
            </div>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
