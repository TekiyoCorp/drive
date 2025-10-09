import Image from "next/image";
import Wrapper from "../global/wrapper";
import Container from "../global/container";

const KeyBenefits = () => {
  const benefits = [
    {
      icon: "/icons/trending-up.svg",
      title: "Business model éprouvé",
      description: "Process de vente automatisé, marge moyenne 18 %.",
    },
    {
      icon: "/icons/monitor.svg",
      title: "Plate-forme & CRM intégrés",
      description: "Catalogue, paiement Stripe, suivi leads en temps réel.",
    },
    {
      icon: "/icons/verified-user.svg",
      title: "Formation & support",
      description: "10j d'onboarding + hotline dédiée 6/7.",
    },
  ];

  return (
    <Wrapper className="md:min-h-screen h-full flex items-center justify-center max-md:mb-10">
      <Container animation="scaleUp" delay={0}>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-3">
          {benefits.map((benefit, index) => (
            <Container key={index} animation="fadeUp" delay={index * 0.2 + 0.2}>
              <div className="text-left p-6 lg:p-8 rounded-3xl bg-[#1C1C1C] h-[254px] md:h-[400px] flex flex-col justify-between hover:bg-[#252525] transition-colors duration-300 cursor-pointer group">
                <Container animation="scaleUp" delay={index * 0.2 + 0.4}>
                  <div className="mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={32}
                      height={32}
                      className="size-8"
                    />
                  </div>
                </Container>
                <Container animation="fadeLeft" delay={index * 0.2 + 0.6}>
                  <div>
                    <h3 className="text-white text-[28px] font-medium group-hover:text-white/90 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-white text-lg font-medium group-hover:text-white/80 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </Container>
              </div>
            </Container>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
};

export default KeyBenefits;
