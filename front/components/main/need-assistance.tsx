import { ChatBubble, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const NeedAssistance = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center py-0 h-screen">
      <Wrapper className="md:!px-0 !max-w-4xl flex items-center justify-center flex-col gap-16">
        <Container delay={0.2}>
          <h2 className="text-4xl text-white font-medium">
            Besoin d&apos;assistance ?
          </h2>
        </Container>

        <Container delay={0.3} className="w-full">
          <div className="max-w-sm mx-auto w-full flex flex-col text-left text-sm gap-3">
            <Container delay={0.35}>
              <div className="ml-auto w-fit">
                <p className="text-[9px] ml-2 mb-0.5 text-white/60 text-left">
                  Vous
                </p>
                <ChatBubble variant="sent">
                  <ChatBubbleMessage variant="sent">
                    Bonjour, j&apos;ai besoin d&apos;aide <br /> concernant un
                    véhicule.
                  </ChatBubbleMessage>
                </ChatBubble>
              </div>
            </Container>
            <Container delay={0.4}>
              <div className="mr-auto w-fit">
                <p className="text-[9px] ml-2 mb-0.5 text-white/60 text-left">
                  DRIVE
                </p>
                <ChatBubble variant="received">
                  <ChatBubbleMessage>
                    Bonjour, en quoi pouvons- <br /> nous vous aider ?
                  </ChatBubbleMessage>
                </ChatBubble>
              </div>
            </Container>
          </div>
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
      </Wrapper>
    </div>
  );
};

export default NeedAssistance;
