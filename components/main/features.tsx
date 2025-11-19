"use client";

import Image from "next/image";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import { StarIcon } from "lucide-react";
import { getImageUrl } from "@/lib/strapi";

type FeatureRecord = {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
};

interface StrapiFeatureItem {
  id?: number | string;
  title?: string;
  description?: string;
  image?: string | unknown;
  alt?: string;
  attributes?: {
    title?: string;
    description?: string;
    image?: string | unknown;
    alt?: string;
  };
}

interface FeaturesProps {
  features?: StrapiFeatureItem[]; // Accept Strapi format or plain array
  error?: string | null;
}

const normalizeFeatures = (items: StrapiFeatureItem[] = []): FeatureRecord[] => {
  return items.map((item, idx) => {
    const id = item.id ?? idx;
    const attributes = item.attributes ?? item;

    const imageField = attributes.image ?? item.image;
    const image = typeof imageField === "string" ? imageField : getImageUrl(imageField);

    return {
      id,
      title: attributes.title,
      description: attributes.description,
      image: image || "/images/main/features/feature-1.jpg",
      alt: attributes.alt || attributes.title || "Feature",
    } as FeatureRecord;
  });
};

const Features = ({ features = [], error = null }: FeaturesProps) => {
  const records = normalizeFeatures(features);

  // Fallback static content if no data from Strapi
  const fallback: FeatureRecord[] = [
    {
      id: 1,
      title: "24h",
      description: "Délai moyen entre dépôt\net première offre.",
      image: "/images/main/features/feature-1.jpg",
      alt: "Feature 1",
    },
    {
      id: 2,
      title: "97%",
      description: "de transactions conclues.",
      image: "/images/main/features/feature-2.jpg",
      alt: "Feature 2",
    },
    {
      id: 3,
      title: "4.9/5",
      description: "d'avis sur Trustpilot",
      image: "/images/main/features/feature-3.jpg",
      alt: "Feature 3",
    },
  ];

  const list = records.length > 0 ? records : fallback;

  return (
    <div className="flex flex-col items-center justify-center w-full py-8 md:py-16 lg:py-24 min-h-screen">
      <Wrapper className="px-2.5 lg:px-4 xl:!px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.map((feature, index) => (
            <Container
              key={feature.id}
              animation="fadeUp"
              delay={0.6 + index * 0.5}
            >
              <div
                className={`relative overflow-hidden rounded-4xl flex flex-col justify-end h-[247px] md:h-[550px]`}
              >
                {feature.image && (
                  <Image
                    src={feature.image as string}
                    alt={feature.alt || "Feature image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-[1]" />

                <div className="z-10 text-white absolute inset-0 flex justify-end flex-col p-6 md:p-8">
                  <h3 className="text-[28px] font-medium mb-1 leading-tight flex items-center gap-3">
                    {feature.title}{" "}
                    {index === 2 && <StarIcon className="size-6 fill-white" />}
                  </h3>
                  <p className="text-base md:text-lg font-medium whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Container>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Features;
