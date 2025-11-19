import Container from "../global/container";
import Wrapper from "../global/wrapper";

const OurStory = () => {
  return (
    <div className="w-full flex items-center justify-center max-md:hidden">
      <Wrapper className="flex flex-col justify-center h-screen py-24">
        <div className="w-full h-full flex flex-col justify-between gap-5">
          <Container animation="fadeDown" delay={2} className="max-w-5xl">
            <h1 className="text-white text-[56px] font-semibold">
              UNE HISTOIRE DE DÉTERMINATION ET DE RéUSSITE.
            </h1>
          </Container>
          <Container animation="fadeUp" delay={2} className="max-w-lg ml-auto">
            <h2 className="text-white text-[44px] font-semibold text-right leading-[44px]">
              “Se relever après un échec, c&apos;est la première étape vers la
              victoire.”
            </h2>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default OurStory;
