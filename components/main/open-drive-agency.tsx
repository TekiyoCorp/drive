import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

type OpenDriveAgencyProps = {
  backgroundImageUrl?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  statsText?: string;
};

const OpenDriveAgency = ({
  backgroundImageUrl,
  title,
  subtitle,
  ctaText,
  statsText,
}: OpenDriveAgencyProps) => {
  // If no CMS data, render nothing (no fallback)
  if (!title && !subtitle && !backgroundImageUrl && !ctaText && !statsText) {
    return null;
  }
  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 h-screen">
      <Container
        animation="scaleUp"
        delay={0.2}
        className="relative w-full h-full min-h-screen"
      >
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt="Open Drive Agency"
            fill
            sizes="100vw"
            className="object-cover object-center -z-10 rounded-3xl"
            loading="lazy"
            priority={false}
          />
        ) : null}
      </Container>

      <Wrapper className="py-12 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit">
        <div className="flex flex-col items-center justify-center w-full z-10">
          <Container delay={0.2}>
            {title ? (
              <h2 className="text-balance !leading-[1.25] text-center text-[28px] md:text-[48px] font-medium tracking-tight mt-4 md:mt-6 w-full">
                {title}
              </h2>
            ) : null}
          </Container>

          <Container delay={0.2}>
            {subtitle ? (
              <p className="text-lg md:text-xl font-medium text-center text-balance max-w-3xl mx-auto mt-4">
                {subtitle}
              </p>
            ) : null}
          </Container>

          <Container delay={0.3}>
            <div className="mt-4 md:mt-6 flex items-center gap-3">
              {ctaText ? (
                <LiquidGlassButton className="px-6 text-xl">
                  <span>{ctaText}</span>
                </LiquidGlassButton>
              ) : null}
            </div>
          </Container>

          <Container delay={0.4}>
            {statsText ? (
              <p className="mt-4 md:mt-6 flex items-center gap-1 text-sm font-medium group cursor-pointer">
                {statsText}
              </p>
            ) : null}
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default OpenDriveAgency;
