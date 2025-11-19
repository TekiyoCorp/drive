"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/lib/strapi";

const VehicleFeatures = () => {
  const defaultFeatures = [
    {
      id: 1,
      title: "Candidature",
      description: "Remplissez le formulaire en ligne.",
      icon: "/images/main/sell-my-car/1.svg",
    },
    {
      id: 2,
      title: "Validation dossier",
      description: "Vérifiez l'état de votre dossier.",
      icon: "/images/main/sell-my-car/2.svg",
    },
    {
      id: 3,
      title: "Formation",
      description: "Suivez la formation en ligne.",
      icon: "/images/main/sell-my-car/3.svg",
    },
    {
      id: 4,
      title: "Lancement marketing",
      description: "Préparez le lancement de votre véhicule.",
      icon: "/images/main/sell-my-car/4.svg",
    },
    {
      id: 5,
      title: "1ʳᵉ vente",
      description: "Finalisez la première vente de votre véhicule.",
      icon: "/images/main/sell-my-car/4.svg",
    },
  ];

  interface StrapiFeature {
    title?: string;
    description?: string;
    icon?: {
      data?: unknown;
    } | unknown;
  }
  
  interface VehicleFeaturesContent {
    features?: StrapiFeature[];
    bannerImage?: unknown;
  }
  
  const [content, setContent] = useState<VehicleFeaturesContent | null>(null);
  const [features, setFeatures] = useState(defaultFeatures);
  const [bannerUrl, setBannerUrl] = useState<string>("/images/open-agency/banner.webp");

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/open-agency-features?populate[0]=features.icon&populate[1]=bannerImage`,
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

        // Process features
        if (attributes?.features && Array.isArray(attributes.features)) {
          const processedFeatures = attributes.features.map((feature: StrapiFeature, index: number) => {
            const iconData = feature.icon?.data || feature.icon;
            let iconUrl = iconData ? getImageUrl({ data: iconData }) : null;
            
            // Fallback to default icon if URL is empty or invalid
            if (!iconUrl || iconUrl.trim() === "") {
              iconUrl = defaultFeatures[index]?.icon || "/images/main/sell-my-car/1.svg";
            }
            
            return {
              id: feature.id || index + 1,
              title: feature.title || defaultFeatures[index]?.title || "",
              description: feature.description || defaultFeatures[index]?.description || "",
              icon: iconUrl,
            };
          });

          if (processedFeatures.length > 0) {
            setFeatures(processedFeatures);
          }
        }

        // Process banner image
        const bannerData = attributes?.bannerImage || attributes?.bannerImage?.data ? attributes.bannerImage : null;
        const bannerComputedUrl = bannerData ? getImageUrl(bannerData) : null;
        if (bannerComputedUrl) setBannerUrl(bannerComputedUrl);
      } catch (_err) {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, [defaultFeatures]);

  const title = content?.title ?? "Vehicle Features";

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24 !pb-0 text-white">
      <Wrapper>
        <div className="flex flex-col items-center justify-center text-center space-y-16 max-w-6xl mx-auto px-0 w-full">
          <Container
            animation="fadeUp"
            delay={0.1}
            className="w-fit mr-auto md:mx-auto"
          >
            <h2 className="text-3xl md:text-4xl text-white font-medium max-md:text-left mr-auto">
              {title}
            </h2>
          </Container>

          <div className="max-lg:flex max-md:flex-col max-md:items-start max-lg:items-center max-lg:justify-between lg:grid lg:grid-cols-5 mx-auto lg:w-fit gap-8 md:gap-3 lg:gap-10 xl:gap-16 lg:max-w-6xl lg:pl-32 whitespace-nowrap w-full">
            {features.map((feature, index) => (
              <Container
                key={feature.id}
                animation="fadeUp"
                delay={0.6 + index * 0.5}
              >
                <div className="flex flex-col items-start justify-between text-left space-y-8 relative max-md:h-full border-white/40">
                  <div
                    className={cn(
                      "md:w-12 md:h-12 rounded-full border flex items-center justify-center",
                      index === 0
                        ? "border-transparent md:border-blue-400/70"
                        : "border-transparent"
                    )}
                  >
                    {feature.icon && feature.icon.trim() !== "" ? (
                      <Image
                        src={feature.icon}
                        alt=""
                        width={25}
                        height={25}
                        style={{ height: 25 }}
                        className="w-fit h-fit object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = defaultFeatures[index]?.icon || "/images/main/sell-my-car/1.svg";
                        }}
                      />
                    ) : (
                      <Image
                        src={defaultFeatures[index]?.icon || "/images/main/sell-my-car/1.svg"}
                        alt=""
                        width={25}
                        height={25}
                        style={{ height: 25 }}
                        className="w-fit h-fit object-contain"
                      />
                    )}
                  </div>
                  {index !== features?.length - 1 && (
                    <div className="absolute top-6 left-20 rounded-lg h-[1px] w-[70%] lg:w-[65%] bg-white/40 border-gray-600 pointer-events-none max-md:hidden" />
                  )}
                  <div>
                    <h4 className="font-medium text-lg text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-xs md:hidden">{feature.description}</p>
                  </div>
                </div>
              </Container>
            ))}
          </div>

          <Container animation="fadeUp" delay={4} className="md:mt-5">
            {bannerUrl && bannerUrl.trim() !== "" && (
              <Image
                src={bannerUrl}
                alt="Banner"
                width={1024}
                height={1024}
                className="h-full object-cover rounded-3xl max-h-[290px]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/open-agency/banner.webp";
                }}
              />
            )}
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default VehicleFeatures;
