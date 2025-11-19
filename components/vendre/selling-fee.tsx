"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { PhoneIcon, VideoIcon } from "lucide-react";

interface SellingFeeContent {
  title?: string;
  subtitle?: string;
  carImage?: {
    data?: {
      attributes?: {
        url?: string;
      };
    };
    attributes?: {
      url?: string;
    };
    url?: string;
  };
}

const SellingFee = () => {
  const [content, setContent] = useState<SellingFeeContent | null>(null);
  const [carImageUrl, setCarImageUrl] = useState<string>("/images/vendre/car.webp");

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/selling-fee?populate[0]=carImage`,
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
      } catch {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Wrapper className="w-full flex-col min-h-screen flex items-center justify-center gap-5 md:pt-24">
        <Container animation="fadeUp" delay={0.2}>
          <h2 className="text-center text-2xl md:text-4xl font-medium w-full">
            {content?.title ?? "La vente sereine, zéro frais."}
          </h2>
        </Container>

        <Container animation="fadeUp" delay={0.4}>
          <p className="md:text-lg font-normal text-center text-white">
            {content?.subtitle ?? "97 % de ventes conclues · 0 € frais cachés · 12 agences actives"}
          </p>
        </Container>

        <Container
          animation="scaleUp"
          delay={0.6}
          className="flex sm:items-center gap-5 max-sm:flex-col"
        >
          <Container animation="fadeLeft" delay={0.8}>
            <Button 
              className="rounded-full h-[45px] w-full font-medium text-base !px-6"
              onClick={() => {
                if (content?.appointmentButtonLink) {
                  window.location.href = content.appointmentButtonLink;
                }
              }}
            >
              {content?.appointmentButtonText ?? "Prendre rendez-vous"} <VideoIcon className="fill-black size-5" />
            </Button>
          </Container>
          <Container animation="fadeRight" delay={1.0}>
            <Button 
              className="rounded-full h-[45px] font-medium text-base !px-6"
              onClick={() => {
                if (content?.callbackButtonLink) {
                  window.location.href = content.callbackButtonLink;
                }
              }}
            >
              {content?.callbackButtonText ?? "Être rappelé dans 30 min"}{" "}
              <PhoneIcon className="fill-black size-5" />
            </Button>
          </Container>
        </Container>

        <Container animation="fadeUp" delay={1.5} className="mt-5">
          <Image
            src={carImageUrl}
            alt="Car"
            width={500}
            height={500}
            className="w-full md:min-h-[550px] h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/vendre/car.webp";
            }}
            priority={false}
            loading="lazy"
            unoptimized={carImageUrl.startsWith("http")}
          />
        </Container>
      </Wrapper>
    </div>
  );
};

export default SellingFee;
