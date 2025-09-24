import Image from "next/image";
import { cn } from "@/lib/utils";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Link from "next/link";

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
  data: CatalogueCardData;
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
  const cardContent = (
    <Link
      href={`/catalogue/${data.id}`}
      className={cn(
        "w-full max-w-[346px] h-[450px] relative rounded-[28px] overflow-hidden border-2 border-white/20 cursor-pointer transition-transform block",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <Image
          src={data.img}
          alt={`${data.title} ${data.subtitle} image`}
          layout="fill"
          objectFit="cover"
          priority={priority}
        />
      </div>

      <div className="absolute top-6 left-6 right-6 text-white z-10">
        <h3 className="font-medium leading-tight">
          <span className="text-[28px]">{data.title}</span>
          <br />
          <span className="text-[24px] text-white/70">{data.subtitle}</span>
        </h3>

        <p className="mt-2 text-base font-medium max-w-[80%] text-white">
          {data.description ||
            "Lorem ipsum is a dummy text for Tekiyo presentation"}
        </p>

        <div className="flex gap-3 mt-2 flex-wrap">
          <LiquidGlassButton className="flex items-center justify-center !h-[20px] w-fit !p-0">
            <span className="text-xs px-2">• {data.year}</span>
          </LiquidGlassButton>
          <LiquidGlassButton className="flex items-center justify-center !h-[20px] w-fit !p-0">
            <span className="text-xs px-2">• {data.fuel}</span>
          </LiquidGlassButton>
          <LiquidGlassButton className="flex items-center justify-center !h-[20px] w-fit !p-0">
            <span className="text-xs px-2">• {data.trans}</span>
          </LiquidGlassButton>
        </div>
      </div>

      <div className="absolute left-6 right-6 bottom-6 z-10 flex items-center justify-between text-white">
        <div className="text-lg font-medium">{data.price}</div>
        <div className="text-lg">{data.km}</div>
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
