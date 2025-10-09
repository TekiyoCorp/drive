import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { PhoneIcon, VideoIcon } from "lucide-react";

const SellingFee = () => {
  return (
    <div>
      <Wrapper className="w-full flex-col min-h-screen flex items-center justify-center gap-5 md:pt-24">
        <Container animation="fadeUp" delay={0.2}>
          <h2 className="text-center text-2xl md:text-4xl font-medium w-full">
            La vente sereine, zéro frais.
          </h2>
        </Container>

        <Container animation="fadeUp" delay={0.4}>
          <p className="md:text-lg font-normal text-center text-white">
            97 % de ventes conclues · 0 € frais cachés · 12 agences actives
          </p>
        </Container>

        <Container
          animation="scaleUp"
          delay={0.6}
          className="flex sm:items-center gap-5 max-sm:flex-col"
        >
          <Container animation="fadeLeft" delay={0.8}>
            <Button className="rounded-full h-[45px] w-full font-medium text-base !px-6">
              Prendre rendez-vous <VideoIcon className="fill-black size-5" />
            </Button>
          </Container>
          <Container animation="fadeRight" delay={1.0}>
            <Button className="rounded-full h-[45px] font-medium text-base !px-6">
              Être rappelé dans 30 min{" "}
              <PhoneIcon className="fill-black size-5" />
            </Button>
          </Container>
        </Container>

        <Container animation="fadeUp" delay={1.5} className="mt-5">
          <Image
            src="/images/vendre/car.webp"
            alt="Car"
            width={500}
            height={500}
            className="w-full md:min-h-[550px] h-full object-cover"
          />
        </Container>
      </Wrapper>
    </div>
  );
};

export default SellingFee;
