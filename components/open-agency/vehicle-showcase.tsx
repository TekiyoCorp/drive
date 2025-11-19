"use client";

import { StarIcon } from "lucide-react";
import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/lib/strapi";

interface Stat {
  label: string;
  value: string;
  showStar?: boolean;
}

interface VehicleShowcaseContent {
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  carImage?: unknown;
  stats?: Stat[];
}

const VehicleShowcase = () => {
  const [content, setContent] = useState<VehicleShowcaseContent | null>(null);
  const [carImageUrl, setCarImageUrl] = useState<string>("/images/main/car.svg");

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/open-agency-showcase?populate[0]=carImage&populate[1]=stats`,
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

        const imageData = attributes?.carImage || attributes?.carImage?.data ? attributes.carImage : null;
        const computedUrl = imageData ? getImageUrl(imageData) : null;
        if (computedUrl) setCarImageUrl(computedUrl);
      } catch {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const description = content?.description ?? "En rejoignant le réseau DRIVE, vous profitez d'un business model déjà éprouvé : plateforme catalogue connectée, paiement Stripe sécurisé et flux de leads qualifiés générés en continu. Nous vous accompagnons dès la signature, 10 jours d'onboarding intensif, kit marketing complet, hotline dédiée 6 j/7, puis nous suivons vos indicateurs en temps réel pour optimiser vos performances. Investissement maîtrisé, marge moyenne 18 %, retour sur investissement estimé à moins de douze mois.";
  const buttonText = content?.buttonText ?? "Commençons ensemble.";
  const buttonLink = content?.buttonLink ?? "#application-form";

  // Stats with fallbacks
  const stats = content?.stats || [
    { label: "Agences actives", value: "12" },
    { label: "satisfaction franchisés", value: "97%" },
    { label: "Trustpilot", value: "4.8/5", showStar: true },
  ];

  return (
    <section className="relative overflow-hidden h-full min-h-screen flex items-center justify-center">
      <Wrapper className="py-16 lg:py-0 h-fit">
        <div className="relative z-10">
          <Container
            animation="fadeDown"
            delay={0.2}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <Container animation="fadeUp" delay={0.4}>
              <p className="text-white text-lg font-medium mb-6">
                {description}
              </p>
            </Container>

            <Container animation="scaleUp" delay={0.6}>
              <Button
                size="lg"
                className="rounded-full text-lg px-8 h-12 font-medium"
                onClick={() => {
                  if (buttonLink.startsWith("#")) {
                    document.querySelector(buttonLink)?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = buttonLink;
                  }
                }}
              >
                {buttonText}
              </Button>
            </Container>
          </Container>

          <Container animation="scaleUp" delay={0.8} className="my-16">
            <Image
              src={carImageUrl}
              alt="Car"
              width={500}
              height={500}
              className="w-full max-h-[380px] h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/main/car.svg";
              }}
            />
          </Container>

          <div className="flex flex-wrap sm:justify-center sm:items-center gap-8 mb-8">
            {stats.map((stat: Stat, index: number) => (
              <Container 
                key={index}
                animation={index === 0 ? "fadeLeft" : index === 1 ? "fadeUp" : "fadeRight"} 
                delay={1.0 + index * 0.2}
              >
                <div className="text-left">
                  {stat.showStar ? (
                    <h3 className="text-2xl font-medium mb-1 leading-tight flex items-center gap-3">
                      {stat.value}
                      <StarIcon className="size-6 fill-white" />
                    </h3>
                  ) : (
                    <div className="text-white text-2xl font-medium mb-1">{stat.value}</div>
                  )}
                  <div className="text-white text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
              </Container>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default VehicleShowcase;
