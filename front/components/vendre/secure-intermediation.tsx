import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";

const SecureIntermediation = () => {
  return (
    <div className="w-full min-h-screen select-none flex pr-4 md:pr-16 xl:pr-28 py-24 h-full !max-w-screen-2xl mx-auto max-md:flex-col-reverse">
      <div className="flex flex-col gap-4 items-end md:hidden">
        <Container delay={0.4}>
          <p className="text-lg font-regular">Besoin de plus d&apos;infos ?</p>
        </Container>
        <Container delay={0.4}>
          <LiquidGlassButton showTooltips={true}>
            <span>Whatsapp Business</span>
            <Image
              src="/icons/whatsapp.svg"
              alt="Whatsapp Icon"
              width={18}
              height={18}
              className="cursor-pointer"
            />
          </LiquidGlassButton>
        </Container>
      </div>

      <Container
        animation="scaleUp"
        delay={0.2}
        className="relative mb-8 flex-1 w-full"
      >
        <div className="relative w-full h-[319px] md:h-[557px]">
          <Image
            src="/images/main/car.svg"
            alt="Blue car"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-left"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      </Container>

      <div className="flex-1 w-full text-right flex flex-col justify-between items-end grow">
        <div className="flex flex-col gap-3 md:gap-5">
          <Container delay={0.2}>
            <h2 className="text-2xl lg:text-4xl text-white font-medium lg:whitespace-nowrap">
              Intermédiation sécurisée, pas Leboncoin.
            </h2>
          </Container>
          <Container delay={0.4}>
            <h3 className="text-lg md:text-2xl text-white font-medium">
              On ne poste pas une annonce, on orchestre la vente. Tu gardes le
              contrôle, nous on accélère.
            </h3>
          </Container>

          <div className="flex flex-col gap-1">
            <Container delay={0.6}>
              <p className="text-sm md:text-lg">
                Estimation basée sur ventes réelles locales.
              </p>
            </Container>
            <Container delay={0.7}>
              <p className="text-sm md:text-lg">
                Check visuel guidé en 5 photos.
              </p>
            </Container>
            <Container delay={0.8}>
              <p className="text-sm md:text-lg">
                Mise en avant réseau + acheteurs qualifiés.
              </p>
            </Container>
            <Container delay={0.9}>
              <p className="text-sm md:text-lg">
                Acompte Stripe pour bloquer l&apos;acheteur.
              </p>
            </Container>
            <Container delay={1.0}>
              <p className="text-sm md:text-lg">Essai encadré en agence.</p>
            </Container>
            <Container delay={1.1}>
              <p className="text-sm md:text-lg">
                Fonds virés avant remise des clés.
              </p>
            </Container>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-end max-md:hidden">
          <Container delay={0.4}>
            <p className="text-lg font-regular">
              Besoin de plus d&apos;infos ?
            </p>
          </Container>
          <Container delay={0.4}>
            <LiquidGlassButton showTooltips={true}>
              <span>Whatsapp Business</span>
              <Image
                src="/icons/whatsapp.svg"
                alt="Whatsapp Icon"
                width={18}
                height={18}
                className="cursor-pointer"
              />
            </LiquidGlassButton>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SecureIntermediation;
