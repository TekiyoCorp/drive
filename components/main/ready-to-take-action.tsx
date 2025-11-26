"use client";

import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { useEffect, useState } from "react";

interface ReadyToTakeActionContent {
  title?: string;
  subtitle?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  leftButtonLink?: string;
  rightButtonLink?: string;
  backgroundImage?: unknown;
}

const ReadyToTakeAction = () => {
  const [content, setContent] = useState<ReadyToTakeActionContent | null>(null);
  const [bgUrl, setBgUrl] = useState<string>("/images/main/footer-bg.webp");

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL =
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/ready-to-take-action?populate[0]=backgroundImage`,
          {
            headers: {
              ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // Silently keep fallbacks on failure
          return;
        }

        const result = await response.json();
        const node = result?.data;
        const attributes = node ? node.attributes ?? node : null;

        if (!isMounted) return;

        setContent(attributes);

        const bgImage = attributes?.backgroundImage;
        let url: string | undefined;

        if (bgImage && typeof bgImage === "object") {
          // Standard Strapi format: { data: { attributes: { url } } }
          if ("data" in bgImage && bgImage.data) {
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
        }

        if (url && url.trim() !== "") {
          const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`;
          setBgUrl(fullUrl);
        }
      } catch {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const title = content?.title ?? "Prêt à passer à l'action ?";
  const subtitle = content?.subtitle ?? "Aucuns frais cachés. Réponse sous 24 h.";
  const leftButtonText = content?.leftButtonText ?? "Voir le catalogue";
  const leftButtonLink = content?.leftButtonLink ?? "/catalogue";
  const rightButtonText = content?.rightButtonText ?? "Estimer mon véhicule";
  const rightButtonLink = content?.rightButtonLink ?? "/vendre";

  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 h-screen bg-[#181818]">
      <Container
        animation="scaleUp"
        delay={0.4}
        className="relative w-full h-full min-h-screen"
      >
        <Image
          src={bgUrl}
          alt="Footer Background"
          fill
          sizes="100vw"
          className="object-cover object-center min-h-screen -z-10 rounded-3xl"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/main/footer-bg.webp";
          }}
          priority={false}
          loading="lazy"
        />
      </Container>

      <Wrapper className="py-40 absolute top-0 left-1/2 -translate-x-1/2 h-fit">
        <div className="flex flex-col items-center justify-center w-full z-10">
          <Container delay={0.8}>
            <h2 className="text-balance !leading-[1.25] text-center text-[28px] md:text-[48px] font-medium tracking-tight mt-6 w-full">
              {title}
            </h2>
          </Container>

          <Container delay={0.8}>
            <p className="text-lg font-medium text-center text-balance mx-auto mt-4">
              {subtitle}
            </p>
          </Container>

          <Container delay={0.8}>
            <div className="mt-6 flex max-md:flex-col md:items-center gap-3">
              <LiquidGlassButton
                className="px-8 w-full"
                ariaLabel="View the vehicle catalogue"
                onClick={() => (window.location.href = leftButtonLink)}
              >
                <span>{leftButtonText}</span>
              </LiquidGlassButton>
              <LiquidGlassButton
                className="px-8"
                ariaLabel="Estimate my vehicle value"
                onClick={() => (window.location.href = rightButtonLink)}
              >
                <span>{rightButtonText}</span>
              </LiquidGlassButton>
            </div>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default ReadyToTakeAction;
