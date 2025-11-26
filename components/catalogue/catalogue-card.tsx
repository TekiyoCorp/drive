"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LiquidGlassBadge from "../common/liquid-glass-badge";
import Container from "../global/container";
import { Vehicle } from "@/lib/strapi";
import { getImageUrls } from "@/lib/strapi";

export type CatalogueCardData = {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  km: string;
  year: string;
  fuel: string;
  trans: string;
  img: string;
  description?: string;
};

interface CatalogueCardProps {
  data: CatalogueCardData | Vehicle;
  className?: string;
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "none";
  delay?: number;
  priority?: boolean;
  onClick?: () => void;
}

const CatalogueCard = ({
  data,
  className,
  animation = "fadeUp",
  delay = 0,
  priority = false,
  onClick,
}: CatalogueCardProps) => {
  // Helper function to check if data is Vehicle type
  const isVehicle = (data: CatalogueCardData | Vehicle): data is Vehicle => {
    return 'attributes' in data;
  };

  // Extract data based on type
  const getCardData = () => {
    if (isVehicle(data)) {
      const images = data.attributes.images ? getImageUrls(data.attributes.images) : [];
      return {
        id: data.id,
        title: data.attributes.title,
        subtitle: data.attributes.subtitle,
        price: data.attributes.price,
        km: data.attributes.km,
        year: data.attributes.year,
        fuel: data.attributes.fuel,
        trans: data.attributes.trans,
        img: images[0] || '/images/placeholder-car.jpg',
        description: data.attributes.description,
      };
    }
    return data;
  };

  const cardData = getCardData();

  const cardContent = (
    <Link
      href={`/catalogue/${cardData.id}`}
      className={cn(
        "w-full max-w-[346px] h-[450px] relative rounded-[28px] overflow-hidden border-2 border-white/20 cursor-pointer transition-transform block",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <Image
          src={cardData.img}
          alt={`${cardData.title} ${cardData.subtitle} image`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-car.jpg';
          }}
        />
      </div>

      {/* Gradient noir du haut vers la moitié de la card */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ height: "50%" }} />

      <div className="absolute top-6 left-6 right-6 text-white z-10">
        <h3 className="font-medium leading-tight">
          <span className="text-[28px]">{cardData.title}</span>
          <br />
          <span className="text-[24px] text-white/70">{cardData.subtitle}</span>
        </h3>

        <p className="mt-2 text-base font-medium max-w-[80%] text-white" style={{ lineHeight: "1.3" }}>
          {cardData.description ||
            "Lorem ipsum is a dummy text for Tekiyo presentation"}
        </p>

        <div className="flex gap-3 mt-2 flex-wrap">
          <LiquidGlassBadge className="flex items-center justify-center !h-[20px] w-fit !p-0">
            <span className="text-xs px-2">• {cardData.year}</span>
          </LiquidGlassBadge>
          <LiquidGlassBadge className="flex items-center justify-center !h-[20px] w-fit !p-0">
            <span className="text-xs px-2">• {cardData.fuel}</span>
          </LiquidGlassBadge>
          <LiquidGlassBadge className="flex items-center justify-center !h-[20px] w-fit !p-0">
            <span className="text-xs px-2">• {cardData.trans}</span>
          </LiquidGlassBadge>
        </div>
      </div>

      <div className="absolute left-6 right-6 bottom-6 z-10 flex items-center justify-between text-white">
        <div className="text-lg font-medium">{cardData.price}</div>
        <div className="text-lg">{cardData.km}</div>
      </div>
    </Link>
  );

  if (animation === "none") {
    return cardContent;
  }

  return (
    <Container animation={animation} delay={delay}>
      {cardContent}
    </Container>
  );
};

export default CatalogueCard;
