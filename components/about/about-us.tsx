"use client";

import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/lib/strapi";

const AboutUs = () => {
  const [contentHtml, setContentHtml] = useState<string>("");
  const [bgUrl, setBgUrl] = useState<string>("/images/about/about-us-banner.webp");

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/about-us?populate[0]=backgroundImage`,
          {
            headers: {
              ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) return; // fallback to defaults

        const result = await response.json();
        const node = result?.data;
        const attributes = node ? node.attributes ?? node : null;
        if (!isMounted) return;

        if (typeof attributes?.content === "string") {
          setContentHtml(attributes.content);
        }

        const imageData = attributes?.backgroundImage || attributes?.backgroundImage?.data ? attributes.backgroundImage : null;
        const computedUrl = imageData ? getImageUrl(imageData) : null;
        if (computedUrl) setBgUrl(computedUrl);
      } catch {
        // ignore errors, keep defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full md:py-4 min-h-screen">
      <Wrapper className="grid lg:grid-cols-2 gap-10 h-full">
        <Container animation="fadeUp" delay={0.4} className="w-full pt-12">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            {contentHtml ? (
              contentHtml.includes("<p") || contentHtml.includes("<br") ? (
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              ) : (
                contentHtml
                  .split(/\n\n+/)
                  .map((para, index) => (
                    <Container
                      key={index}
                      animation="fadeUp"
                      delay={index * 0.6 + 0.3}
                    >
                      <p className="text-white text-base font-medium whitespace-pre-line">{para.trim()}</p>
                    </Container>
                  ))
              )
            ) : (
              [
                "Je suis Qassim ROUAHI, un entrepreneur passionné par l'automobile, animé par une ambition claire : devenir le numéro un dans ce domaine. J'ai débuté mon parcours en intégrant un réseau de licence où j'ai acquis une solide expérience. Mais très vite, j'ai compris que pour atteindre l'excellence, il fallait construire quelque chose de plus grand, un modèle pensé pour ceux qui veulent vraiment réussir.",
                "Mon chemin n'a pas toujours été linéaire. Comme beaucoup d'entrepreneurs, j'ai connu des moments difficiles, des décisions risquées, des échecs qui auraient pu tout arrêter. Mais chaque épreuve m'a permis de m'améliorer, d'affiner ma vision et de bâtir un projet encore plus solide.",
                "C'est ainsi qu'est née mon ambition d'aller plus loin, non seulement en créant l'Université Automobile, destinée à former les futurs experts du secteur, mais aussi en lançant Drive, un réseau de franchise puissant et innovant qui va révolutionner l'intermédiation automobile.",
                "Un objectif clair : devenir le numéro un.",
                "Aujourd'hui, mon but est simple prendre la tête du marché, surpasser les modèles traditionnels et offrir aux entrepreneurs une véritable opportunité de succès. Drive n'est pas qu'une franchise, c'est un réseau où chaque franchisé est accompagné, soutenu et guidé vers la réussite.",
                "Si vous êtes animé par la même volonté de réussir, si vous cherchez un modèle rentable, un accompagnement de qualité et une vision d'avenir, alors vous êtes au bon endroit. Rejoignez l'aventure Drive et construisons ensemble le réseau numéro un de demain.",
              ].map((text, index) => (
                <Container
                  key={index}
                  animation="fadeUp"
                  delay={index * 0.6 + 0.3}
                >
                  <p className="text-white text-base font-medium">{text}</p>
                </Container>
              ))
            )}
          </div>
        </Container>

        <Container
          delay={0.4}
          className="relative max-sm:aspect-square lg:min-h-screen"
        >
          <div className="absolute top-0 left-0 w-full bg-black/20 rounded-3xl lg:min-h-screen h-full z-10" />
          <Image
            src={bgUrl}
            alt="About Us Banner"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center rounded-3xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/about/about-us-banner.webp";
            }}
          />
        </Container>
      </Wrapper>
    </div>
  );
};

export default AboutUs;
