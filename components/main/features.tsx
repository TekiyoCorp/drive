import Image from "next/image";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import { StarIcon } from "lucide-react";

const Features = () => {
  const features = [
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

  return (
    <div className="flex flex-col items-center justify-center w-full py-8 md:py-16 lg:py-24 min-h-screen">
      <Wrapper className="px-2.5 lg:px-4 xl:!px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <Container
              key={feature.id}
              animation="fadeUp"
              delay={0.6 + index * 0.5}
            >
              <div
                className={`relative overflow-hidden rounded-4xl flex flex-col justify-end h-[247px] md:h-[550px]`}
              >
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                  priority={index === 0}
                />

                {/* Gradient overlay for better text readability */}
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
