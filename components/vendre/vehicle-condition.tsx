"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import Image from "next/image";

interface VehicleConditionContent {
  estimationTitle?: string;
  estimationDescription?: string;
  estimationImage?: {
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
  inspectionTitle?: string;
  inspectionDescription?: string;
  inspectionImage?: {
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
  offerTitle?: string;
  offerDescription?: string;
  offerImage?: {
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
  paymentTitle?: string;
  paymentDescription?: string;
  paymentImage?: {
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

const VehicleCondition = () => {
  const [content, setContent] = useState<VehicleConditionContent | null>(null);
  const [estimationImageUrl, setEstimationImageUrl] = useState<string>("/images/vendre/vehicle-condition/1.webp");
  const [inspectionImageUrl, setInspectionImageUrl] = useState<string>("/images/vendre/vehicle-condition/2.webp");
  const [offerImageUrl, setOfferImageUrl] = useState<string>("/images/vendre/vehicle-condition/3.png");
  const [paymentImageUrl, setPaymentImageUrl] = useState<string>("/images/vendre/vehicle-condition/4.svg");

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/vehicle-condition?populate[0]=estimationImage&populate[1]=inspectionImage&populate[2]=offerImage&populate[3]=paymentImage`,
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

        // Handle estimation image
        if (attributes?.estimationImage) {
          const imageData = attributes.estimationImage;
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
            setEstimationImageUrl(imageUrl);
          }
        }

        // Handle inspection image
        if (attributes?.inspectionImage) {
          const imageData = attributes.inspectionImage;
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
            setInspectionImageUrl(imageUrl);
          }
        }

        // Handle offer image
        if (attributes?.offerImage) {
          const imageData = attributes.offerImage;
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
            setOfferImageUrl(imageUrl);
          }
        }

        // Handle payment image
        if (attributes?.paymentImage) {
          const imageData = attributes.paymentImage;
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
            setPaymentImageUrl(imageUrl);
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
      <Wrapper className="pt-24 md:pt-32 w-full px-2.5 md:px-8 lg:px-24 flex-col gap-2 min-h-screen flex items-center justify-center">
        <Container
          animation="fadeUp"
          delay={0}
          className="h-full flex gap-2 w-full max-md:flex-col max-w-4xl mx-auto"
        >
          <Container
            animation="fadeLeft"
            delay={1}
            className="bg-[#212121] w-full rounded-4xl h-[285px] col-span-3 pt-6 pl-8 pr-0 overflow-hidden flex-[1]"
          >
            <Container animation="fadeUp" delay={2}>
              <h2 className="text-lg font-medium">
                {content?.estimationTitle ?? "Estimation"}
              </h2>
              <p className="text-white/60 text-sm font-medium max-w-72 mt-1">
                {content?.estimationDescription ?? 
                  "Entrez votre immatriculation et votre kilométrage : nous comparons des milliers de ventes récentes pour générer une fourchette fiable. Ajoutez 10 photos guidées pour affiner. Résultat immédiat, sans engagement."}
              </p>
            </Container>
            <Container
              animation="scaleUp"
              delay={3}
              className="relative min-h-[193px] ml-[50%] sm:ml-[60%] -mt-20 sm:-mt-36"
            >
              <Image
                src={estimationImageUrl}
                alt="Vehicle Condition 1"
                fill
                sizes="50vw"
                className="object-cover object-left"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/vendre/vehicle-condition/1.webp";
                }}
                priority={false}
                loading="lazy"
                unoptimized={estimationImageUrl.startsWith("http")}
              />
            </Container>
          </Container>

          <Container
            animation="fadeRight"
            delay={1}
            className="bg-[#212121] w-full rounded-4xl min-h-[285px] col-span-3 py-6 pl-8 pr-0 overflow-hidden flex-[0.8] flex"
          >
            <Container animation="fadeUp" delay={2} className="flex-1 w-full">
              <h2 className="text-lg font-medium">
                {content?.inspectionTitle ?? "Inspection"}
              </h2>
              <p className="text-white/60 text-sm font-medium max-w-72 mt-1">
                {content?.inspectionDescription ?? 
                  "30 minutes à l'agence ou chez vous. Contrôle de 100 points, vérification du VIN et des documents, mini-essai si nécessaire. Rapport photo horodaté envoyé avant décision."}
              </p>
            </Container>
            <Container
              animation="scaleUp"
              delay={3}
              className="relative flex-1 w-full mt-auto min-h-[193px]"
            >
              <Image
                src={inspectionImageUrl}
                alt="Vehicle Condition 2"
                fill
                sizes="50vw"
                className="object-cover object-left"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/vendre/vehicle-condition/2.webp";
                }}
                priority={false}
                loading="lazy"
                unoptimized={inspectionImageUrl.startsWith("http")}
              />
            </Container>
          </Container>
        </Container>

        <Container
          animation="fadeUp"
          delay={4}
          className="h-full flex gap-2 w-full max-md:flex-col max-w-4xl mx-auto"
        >
          <Container
            animation="fadeLeft"
            delay={5}
            className="bg-[#212121] w-full rounded-4xl min-h-[300px] col-span-3 pb-6 px-6 !pt-0 overflow-hidden flex-[0.3] flex flex-col justify-between"
          >
            <Container
              animation="scaleUp"
              delay={6}
              className="relative flex-1 w-full h-full -mt-[5%] max-sm:-mt-[20%] max-md:-mt-[35%] max-sm:min-h-[200px]"
            >
              <Image
                src={offerImageUrl}
                alt="Vehicle Condition 3"
                fill
                sizes="30vw"
                className="-rotate-90 object-left object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/vendre/vehicle-condition/3.png";
                }}
                priority={false}
                loading="lazy"
                unoptimized={offerImageUrl.startsWith("http")}
              />
            </Container>

            <Container
              animation="fadeUp"
              delay={7}
              className="text-center flex-[0.1] md:flex-[0.3] w-full"
            >
              <h2 className="text-lg font-medium">
                {content?.offerTitle ?? "Offre ferme"}
              </h2>
              <p className="text-white/60 text-sm font-medium max-w-72 mx-auto mt-1">
                {content?.offerDescription ?? "Prix garanti après inspection, valable 48 h."}
              </p>
            </Container>
          </Container>

          <Container
            animation="fadeRight"
            delay={5}
            className="bg-[#212121] w-full rounded-4xl min-h-[300px] col-span-3 pt-6 overflow-hidden flex-[1] flex flex-col justify-between"
          >
            <Container
              animation="fadeUp"
              delay={6}
              className="text-center flex-[0.3] w-full"
            >
              <h2 className="text-lg font-medium">
                {content?.paymentTitle ?? "Paiement & cession"}
              </h2>
              <p className="text-white/60 text-sm font-medium max-w-lg mx-auto mt-1">
                {content?.paymentDescription ?? 
                  "Virement instantané confirmé avant remise des clés. Nous gérons carte grise, certificat de cession et logistique d'enlèvement. Zéro avance, zéro paperasse, tout simplement."}
              </p>
            </Container>

            <Container
              animation="scaleUp"
              delay={7}
              className="flex-1 w-full h-full"
            >
              <Image
                src={paymentImageUrl}
                alt="Vehicle Condition 4"
                width={1024}
                height={1024}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/vendre/vehicle-condition/4.svg";
                }}
                priority={false}
                loading="lazy"
                unoptimized={paymentImageUrl.startsWith("http")}
              />
            </Container>
          </Container>
        </Container>
      </Wrapper>
    </div>
  );
};

export default VehicleCondition;
