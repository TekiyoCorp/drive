import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

interface WhyDriveProps {
  title?: string;
  items?: string[];
}

const DEFAULT_TITLE = "POURQUOI DRIVE ?";
const DEFAULT_ITEMS = [
  "Marché porteur",
  "Gagnant/Gagnant",
  "ACCOMPAGNEMENT SUR MESURE",
  "RENTABILITé",
  "Réseau collaboratif",
  "Multi-franchise",
  "Aventure humaine",
  "Valeurs",
  "FORMATIONS/ANIMATIONS",
  "Transmission de savoir faire",
];

const capitalizeFirstLetter = (text: string): string => {
  if (!text) return text;
  // Convertir en minuscules puis capitaliser la première lettre de chaque mot
  // Gère les espaces et les slashes
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const WhyDrive = ({ title, items }: WhyDriveProps) => {
  const resolvedTitle = title || DEFAULT_TITLE;
  const resolvedItems = (Array.isArray(items) && items.length > 0)
    ? items
    : DEFAULT_ITEMS;

  return (
    <div className="w-full py-10 lg:py-16 min-h-screen flex items-center justify-center">
      <Wrapper className="h-full flex flex-col items-center justify-center">
        <Container delay={1}>
          <h1 className="text-3xl md:text-4xl font-medium mb-10 md:mb-16 text-center">
            {resolvedTitle}
          </h1>
        </Container>

        <Container
          delay={0.5}
          className="relative grid grid-cols-2 md:grid-cols-4 text-center lg:grid-cols-5"
        >
          {resolvedItems.map((item, index) => (
            <Container
              key={index}
              delay={1 + index * 0.5}
              className="relative flex flex-col items-center bg-[#181818]"
            >
              <Image
                src={`/images/why-drive/${index + 1}.svg`}
                alt={`Why Drive Image ${index + 1}`}
                width={500}
                height={500}
                className="object-contain aspect-square mix-blend-lighten"
              />
              <p className="text-white text-[12px] font-semibold">{capitalizeFirstLetter(item)}</p>
            </Container>
          ))}
        </Container>
      </Wrapper>
    </div>
  );
};

export default WhyDrive;
