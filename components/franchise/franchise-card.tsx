import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";

export type FranchiseCardData = {
  id: number;
  name: string;
  address: string;
  phone: string;
  img: string;
  description?: string;
};

interface FranchiseCardProps {
  data: FranchiseCardData;
  className?: string;
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "none";
  delay?: number;
  priority?: boolean;
  onClick?: () => void;
}

const FranchiseCard = ({
  data,
  className,
  animation = "fadeUp",
  delay = 0,
  priority = false,
  onClick,
}: FranchiseCardProps) => {
  const cardContent = (
    <Link
      href={`/franchise/${data.id}`}
      className={cn(
        "w-full max-w-[350px] h-[386px] md:h-[480px] relative rounded-[28px] overflow-hidden cursor-pointer transition-transform block",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <Image
          src={data.img}
          alt={`${data.name} dealership`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </div>

      <div className="absolute text-white z-10 bg-gradient-to-t from-black/70 to-transparent h-full w-full flex flex-col justify-end p-4 md:p-6 gap-2">
        <h3 className="text-2xl font-medium">{data.name}</h3>
        <div>
          <p className="text-lg font-medium text-[#CBCBCB]">{data.address}</p>
          <p className="text-lg font-medium text-[#CBCBCB]">{data.phone}</p>
        </div>
        <div className="w-fit">
          <LiquidGlassButton className="px-6">
            <span>En savoir plus</span>
          </LiquidGlassButton>
        </div>
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

export default FranchiseCard;
