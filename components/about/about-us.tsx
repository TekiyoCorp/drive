import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const AboutUs = () => {
  const text = [
    "Je suis Qassim ROUAHI, un entrepreneur passionné par l'automobile, animé par une ambition claire : devenir le numéro un dans ce domaine. J'ai débuté mon parcours en intégrant un réseau de licence où j'ai acquis une solide expérience. Mais très vite, j'ai compris que pour atteindre l'excellence, il fallait construire quelque chose de plus grand, un modèle pensé pour ceux qui veulent vraiment réussir.",
    "Mon chemin n'a pas toujours été linéaire. Comme beaucoup d'entrepreneurs, j'ai connu des moments difficiles, des décisions risquées, des échecs qui auraient pu tout arrêter. Mais chaque épreuve m'a permis de m'améliorer, d'affiner ma vision et de bâtir un projet encore plus solide.",
    "C'est ainsi qu'est née mon ambition d'aller plus loin, non seulement en créant l'Université Automobile, destinée à former les futurs experts du secteur, mais aussi en lançant Drive, un réseau de franchise puissant et innovant qui va révolutionner l'intermédiation automobile.",
    "Un objectif clair : devenir le numéro un.",
    "Aujourd'hui, mon but est simple prendre la tête du marché, surpasser les modèles traditionnels et offrir aux entrepreneurs une véritable opportunité de succès. Drive n'est pas qu'une franchise, c'est un réseau où chaque franchisé est accompagné, soutenu et guidé vers la réussite.",
    "Si vous êtes animé par la même volonté de réussir, si vous cherchez un modèle rentable, un accompagnement de qualité et une vision d'avenir, alors vous êtes au bon endroit. Rejoignez l'aventure Drive et construisons ensemble le réseau numéro un de demain.",
  ];

  return (
    <div className="w-full md:py-4 min-h-screen">
      <Wrapper className="grid lg:grid-cols-2 gap-10 h-full">
        <Container animation="fadeUp" delay={0.4} className="w-full pt-12">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            {text.map((text, index) => (
              <Container
                key={index}
                animation="fadeUp"
                delay={index * 0.6 + 0.3}
              >
                <p className="text-white text-base font-medium">{text}</p>
              </Container>
            ))}
          </div>
        </Container>

        <Container
          delay={0.4}
          className="relative max-sm:aspect-square min-h-72 lg:min-h-screen"
        >
          <div className="absolute top-0 left-0 w-full bg-black/20 rounded-3xl lg:min-h-screen h-full z-10 min-h-72" />
          <Image
            src="/images/about/about-us-banner.webp"
            alt="About Us Banner"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-bottom md:object-center rounded-3xl"
          />
        </Container>
      </Wrapper>
    </div>
  );
};

export default AboutUs;
