"use client";

import LiquidGlassButton from "@/components/common/liquid-glass-button";
import Container from "@/components/global/container";
import { SnapElement } from "@/components/global/scroll-snap";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ThankyouContent = () => {
  const searchParams = useSearchParams();
  const clientName = searchParams.get("name") || "Thomas";

  return (
    <SnapElement>
      <div className="relative z-0 w-full p-2.5 md:p-4 h-screen">
        <div className="absolute w-full h-screen bg-gradient-to-t from-black via-transparent to-black rounded-4xl z-15" />

        <Container animation="scaleUp" delay={0.4} className="w-full h-screen relative">
          <Image
            src="/images/thankyou/hero.webp"
            alt="Hero Image"
            fill
            className="object-cover object-center z-10 rounded-3xl"
            sizes="100vw"
            priority
            fetchPriority="high"
          />
        </Container>

        <Container
          delay={0.4}
          className="absolute max-md:top-32 max-md:left-1/2 max-md:-translate-x-1/2 md:inset-0 w-fit h-fit md:m-auto whitespace-nowrap z-20"
        >
          <h1 className="text-white text-[48px] md:text-[60px] font-regular tracking-[-5px]">
            Merci, {clientName} !
          </h1>
        </Container>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 z-20 flex flex-col items-center justify-center px-4 md:px-8">
          <Container delay={0.1}>
            <h2 className="text-white text-[28px] font-medium tracking-wide text-center mb-4">
              Étape
            </h2>
          </Container>

          <Container delay={0.2}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-4 md:mb-10">
              <div className="flex justify-center md:flex-col items-center text-center text-2xl font-normal text-white whitespace-nowrap gap-2">
                <h3>1</h3>
                <h3>Dossier reçu</h3>
              </div>

              <div className="w-16 md:w-px h-px md:h-16 bg-white/40"></div>

              <div className="flex justify-center md:flex-col items-center text-center text-2xl font-normal text-white whitespace-nowrap gap-2">
                <h3>2</h3>
                <h3>On t&apos;appelle</h3>
              </div>

              <div className="w-16 md:w-px h-px md:h-16 bg-white/40"></div>

              <div className="flex justify-center md:flex-col items-center text-center text-2xl font-normal text-white whitespace-nowrap gap-2">
                <h3>3</h3>
                <h3>Rendez-vous</h3>
              </div>
            </div>
          </Container>

          <Container delay={0.3}>
            <LiquidGlassButton className="px-6">
              <span className="text-white mr-3">WhatsApp Business</span>
              <Image
                src="/icons/whatsapp.svg"
                alt="Whatsapp Icon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </LiquidGlassButton>
          </Container>
        </div>
      </div>
    </SnapElement>
  );
};

const ThankyouPage = () => {
  return (
    <Suspense fallback={
      <SnapElement>
        <div className="relative z-0 w-full p-2.5 md:p-4 h-screen flex items-center justify-center">
          <h1 className="text-white text-[48px] md:text-[60px] font-regular tracking-[-5px]">
            Merci !
          </h1>
        </div>
      </SnapElement>
    }>
      <ThankyouContent />
    </Suspense>
  );
};

export default ThankyouPage;
