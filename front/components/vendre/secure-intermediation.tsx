"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";

const SecureIntermediation = () => {
  const [content, setContent] = useState<any>(null);
  const [carImageUrl, setCarImageUrl] = useState<string>("/images/main/car.svg");
  const [features, setFeatures] = useState<string[]>([
    "Estimation basée sur ventes réelles locales.",
    "Check visuel guidé en 5 photos.",
    "Mise en avant réseau + acheteurs qualifiés.",
    "Acompte Stripe pour bloquer l'acheteur.",
    "Essai encadré en agence.",
    "Fonds virés avant remise des clés.",
  ]);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/secure-intermediation?populate[0]=carImage`,
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

        // Handle car image
        if (attributes?.carImage) {
          const imageData = attributes.carImage;
          let imageUrl = null;
          
          if (imageData.data?.attributes?.url) {
            const url = imageData.data.attributes.url;
            imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          } else if (imageData.attributes?.url) {
            const url = imageData.attributes.url;
            imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          } else if (imageData.url) {
            const url = imageData.url;
            imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          } else if (imageData.data?.url) {
            const url = imageData.data.url;
            imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          }
          
          if (imageUrl && imageUrl.trim() !== "") {
            setCarImageUrl(imageUrl);
          }
        }

        // Handle features
        if (attributes?.features && Array.isArray(attributes.features)) {
          setFeatures(attributes.features);
        }
      } catch (_err) {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full min-h-screen select-none flex pr-4 md:pr-16 xl:pr-28 py-24 h-full !max-w-screen-2xl mx-auto max-md:flex-col-reverse">
      <div className="flex flex-col gap-4 items-end md:hidden">
        <Container delay={0.4}>
          <p className="text-lg font-regular">
            {content?.infoTitle ?? "Besoin de plus d'infos ?"}
          </p>
        </Container>
        <Container delay={0.4}>
          <LiquidGlassButton 
            showTooltips={true}
            onClick={() => {
              if (content?.whatsappButtonLink) {
                window.open(content.whatsappButtonLink, '_blank');
              }
            }}
          >
            <span>{content?.whatsappButtonText ?? "Whatsapp Business"}</span>
            <Image
              src="/icons/whatsapp.svg"
              alt="Whatsapp Icon"
              width={18}
              height={18}
              className="cursor-pointer"
            />
          </LiquidGlassButton>
        </Container>
      </div>

      <Container
        animation="scaleUp"
        delay={0.2}
        className="relative mb-8 flex-1 w-full"
      >
        <div className="relative w-full h-[319px] md:h-[557px]">
          <Image
            src={carImageUrl}
            alt="Blue car"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-left"
            style={{ transform: "scaleX(-1)" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/main/car.svg";
            }}
            priority={false}
            loading="lazy"
            unoptimized={carImageUrl.startsWith("http")}
          />
        </div>
      </Container>

      <div className="flex-1 w-full text-right flex flex-col justify-between items-end grow">
        <div className="flex flex-col gap-3 md:gap-5">
          <Container delay={0.2}>
            <h2 className="text-2xl lg:text-4xl text-white font-medium lg:whitespace-nowrap">
              {content?.mainTitle ?? "Intermédiation sécurisée, pas Leboncoin."}
            </h2>
          </Container>
          <Container delay={0.4}>
            <h3 className="text-lg md:text-2xl text-white font-medium">
              {content?.subtitle ?? 
                "On ne poste pas une annonce, on orchestre la vente. Tu gardes le contrôle, nous on accélère."}
            </h3>
          </Container>

          <div className="flex flex-col gap-1">
            {features.map((feature, index) => (
              <Container key={index} delay={0.6 + index * 0.1}>
                <p className="text-sm md:text-lg">
                  {feature}
                </p>
              </Container>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-end max-md:hidden">
          <Container delay={0.4}>
            <p className="text-lg font-regular">
              {content?.infoTitle ?? "Besoin de plus d'infos ?"}
            </p>
          </Container>
          <Container delay={0.4}>
            <LiquidGlassButton 
              showTooltips={true}
              onClick={() => {
                if (content?.whatsappButtonLink) {
                  window.open(content.whatsappButtonLink, '_blank');
                }
              }}
            >
              <span>{content?.whatsappButtonText ?? "Whatsapp Business"}</span>
              <Image
                src="/icons/whatsapp.svg"
                alt="Whatsapp Icon"
                width={18}
                height={18}
                className="cursor-pointer"
              />
            </LiquidGlassButton>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SecureIntermediation;
