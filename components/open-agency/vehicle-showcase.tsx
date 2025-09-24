import { StarIcon } from "lucide-react";
import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";

const VehicleShowcase = () => {
  return (
    <section className="relative overflow-hidden h-full min-h-screen flex items-center justify-center">
      <Wrapper className="py-16 lg:py-0 h-fit">
        <div className="relative z-10">
          <Container
            animation="fadeDown"
            delay={0.2}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <Container animation="fadeUp" delay={0.4}>
              <p className="text-white text-lg font-medium mb-6">
                En rejoignant le réseau DRIVE, vous profitez d&apos;un business
                model déjà éprouvé : plateforme catalogue connectée, paiement
                Stripe sécurisé et flux de leads qualifiés générés en continu.
                Nous vous accompagnons dès la signature, 10 jours
                d&apos;onboarding intensif, kit marketing complet, hotline
                dédiée 6 j/7, puis nous suivons vos indicateurs en temps réel
                pour optimiser vos performances. Investissement maîtrisé, marge
                moyenne 18 %, retour sur investissement estimé à moins de douze
                mois.
              </p>
            </Container>

            <Container animation="scaleUp" delay={0.6}>
              <Button
                size="lg"
                className="rounded-full text-lg px-8 h-12 font-medium"
              >
                Commençons ensemble.
              </Button>
            </Container>
          </Container>

          <Container animation="scaleUp" delay={0.8} className="my-16">
            <Image
              src="/images/main/car.svg"
              alt="Car"
              width={500}
              height={500}
              className="w-full max-h-[380px] h-full"
            />
          </Container>

          <div className="flex flex-wrap sm:justify-center sm:items-center gap-8 mb-8">
            <Container animation="fadeLeft" delay={1.0}>
              <div className="text-left">
                <div className="text-white text-2xl font-medium mb-1">12</div>
                <div className="text-white text-lg font-medium">
                  Agences actives
                </div>
              </div>
            </Container>

            <Container animation="fadeUp" delay={1.2}>
              <div className="text-left">
                <div className="text-white text-2xl font-medium mb-1">97%</div>
                <div className="text-white text-lg font-medium">
                  satisfaction franchisés
                </div>
              </div>
            </Container>

            <Container animation="fadeRight" delay={1.4}>
              <div className="text-left">
                <h3 className="text-2xl font-medium mb-1 leading-tight flex items-center gap-3">
                  4.8/5
                  <StarIcon className="size-6 fill-white" />
                </h3>
                <div className="text-white text-lg font-medium">Trustpilot</div>
              </div>
            </Container>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default VehicleShowcase;
