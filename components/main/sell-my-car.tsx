"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon?: string;
  iconImage?: unknown;
}

// Liste des noms d'icônes disponibles (correspond aux fichiers SVG dans /images/main/sell-my-car/)
const AVAILABLE_ICONS = ["1", "2", "3", "4"];

// Fonction pour obtenir le chemin de l'icône locale basée sur le nom depuis Strapi
const getLocalIconPath = (iconName: string | null | undefined, fallbackIndex: number): string => {
  // Si un nom d'icône est fourni et qu'il existe dans la liste, l'utiliser
  if (iconName && AVAILABLE_ICONS.includes(iconName)) {
    return `/images/main/sell-my-car/${iconName}.svg`;
  }
  // Sinon utiliser l'index comme fallback
  const fallbackIcon = AVAILABLE_ICONS[fallbackIndex % AVAILABLE_ICONS.length];
  return `/images/main/sell-my-car/${fallbackIcon}.svg`;
};

interface SellMyCarContent {
  carImage?: unknown;
  features?: Array<{
    title?: string;
    icon?: string;
    description?: string;
  }>;
}

const SellMyCar = () => {
  const [content, setContent] = useState<SellMyCarContent | null>(null);
  const [carImageUrl, setCarImageUrl] = useState<string>("/images/main/car.svg");
  const defaultFeatures: Feature[] = [
    {
      id: 1,
      title: "Estimation instantanée",
      description: "Recevez un prix précis en < 2 min.",
      icon: getLocalIconPath("1", 0),
    },
    {
      id: 2,
      title: "Inspection photo",
      description: "5 clichés suffisant pour valider l'état.",
      icon: getLocalIconPath("2", 1),
    },
    {
      id: 3,
      title: "Acompte sécurisé",
      description: "Strict bloqué l'acheteur sous 24 h.",
      icon: getLocalIconPath("3", 2),
    },
    {
      id: 4,
      title: "Paiement garanti",
      description: "Fonds viré avant remise des clés.",
      icon: getLocalIconPath("4", 3),
    },
  ];

  const [features, setFeatures] = useState<Feature[]>(defaultFeatures);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/sell-my-car?populate[0]=carImage&populate[1]=features`,
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

        // Handle car image - Strapi can return it in different formats
        let carImageUrl = null;
        if (attributes?.carImage) {
          const carImage = attributes.carImage;
          
          // Try different formats
          if (carImage.data?.attributes?.url) {
            // Standard format: { data: { attributes: { url: ... } } }
            const url = carImage.data.attributes.url;
            carImageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          } else if (carImage.attributes?.url) {
            // Alternative format: { attributes: { url: ... } }
            const url = carImage.attributes.url;
            carImageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          } else if (carImage.url) {
            // Direct URL format
            const url = carImage.url;
            carImageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          } else if (carImage.data?.url) {
            // Nested data format
            const url = carImage.data.url;
            carImageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
          }
        }
        
        if (carImageUrl && carImageUrl.trim() !== "") {
          setCarImageUrl(carImageUrl);
        }

        // Handle features
        if (attributes?.features && Array.isArray(attributes.features) && attributes.features.length > 0) {
          interface StrapiFeature {
            title?: string;
            icon?: string;
            description?: string;
          }
          
          const mappedFeatures = attributes.features.map((feature: StrapiFeature, index: number) => {
            const featureTitle = feature.title || defaultFeatures[index]?.title || "";
            
            // Récupérer le nom de l'icône depuis Strapi (string)
            const iconName = feature.icon || null;
            
            // Mapper le nom de l'icône vers le chemin local
            const iconPath = getLocalIconPath(iconName, index);
            
            return {
              id: feature.id || index + 1,
              title: featureTitle,
              description: feature.description || defaultFeatures[index]?.description || "",
              icon: iconPath,
              iconImage: null,
            };
          });
          setFeatures(mappedFeatures);
        }
      } catch (_err) {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, [defaultFeatures]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24 text-white">
      <Wrapper className="lg:!px-24">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Header */}
          <Container animation="fadeUp" delay={0.1}>
            <div className="space-y-6">
              <div className="text-blue-400 text-base">
                {content?.badgeText ?? "Vendre ma voiture →"}
              </div>
              <h1 className="text-4xl font-medium max-w-4xl">
                {content?.title ? (
                  content.title.split("\n").map((line: string, index: number) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < content.title.split("\n").length - 1 && (
                        <br className="max-md:hidden" />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    Nous estimons la valeur de votre voiture,
                    <br className="max-md:hidden" />
                    puis nous sécurisons l&apos;acheteur pour vous.
                  </>
                )}
              </h1>
            </div>
          </Container>

          {/* Car Image */}
          <Container animation="fadeUp" delay={0.3}>
            <div className="my-12">
              <Image
                src={carImageUrl}
                alt="Blue car"
                width={600}
                height={300}
                className="w-full max-w-lg h-auto min-h-[150px] sm:min-h-[300px]"
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

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 w-full max-w-6xl">
            {features.map((feature, index) => (
              <Container
                key={feature.id}
                animation="fadeUp"
                delay={0.6 + index * 0.5}
              >
                <div className="flex flex-col items-start justify-between text-left space-y-8 relative max-lg:border max-lg:p-4 rounded-xl max-lg:h-full border-white/40">
                  <div
                    className={cn(
                      "lg:w-12 lg:h-12 rounded-full border flex items-center justify-center",
                      index === 0
                        ? "border-transparent lg:border-blue-400/70"
                        : "border-transparent"
                    )}
                  >
                    <Image
                      src={feature.icon || getLocalIconPath(null, index)}
                      alt=""
                      width={25}
                      height={25}
                      style={{ height: 25 }}
                      className="w-fit h-fit object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Fallback vers l'icône locale par index si l'image échoue
                        target.src = getLocalIconPath(null, index);
                      }}
                    />
                  </div>
                  {index !== features?.length - 1 && (
                    <div className="absolute top-6 left-20 rounded-lg h-[1px] w-[65%] bg-white/40 border-gray-600 pointer-events-none max-lg:hidden" />
                  )}

                  <div>
                    <h2 className="font-medium text-lg text-white mb-2">
                      {feature.title}
                    </h2>
                    <p className="text-xs">{feature.description}</p>
                  </div>
                </div>
              </Container>
            ))}
          </div>

          {/* Bottom Text */}
          <Container animation="fadeUp" delay={2.6}>
            <div className="text-center space-y-2 max-w-2xl mt-12 text-base">
              <p className="text-white font-medium">
                {content?.bottomText ? (
                  content.bottomText.split("\n").map((line: string, index: number) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < content.bottomText.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    Nous gérons chaque étape : <br /> évaluation, visibilité,
                    réservation et transfert d&apos;argent sans frais cachés, sans
                    stress.
                  </>
                )}
              </p>
            </div>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default SellMyCar;
