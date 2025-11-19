"use client";

import { ChatBubble, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { useEffect, useState } from "react";

interface NeedAssistanceContent {
  title?: string;
  userMessageLabel?: string;
  userMessage?: string;
  driveMessageLabel?: string;
  driveMessage?: string;
  whatsappButtonText?: string;
  whatsappButtonLink?: string;
}

const NeedAssistance = () => {
  const [content, setContent] = useState<NeedAssistanceContent | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/need-assistance`,
          {
            headers: {
              ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // Silently keep fallbacks on failure
          return;
        }

        const result = await response.json();
        const node = result?.data;
        const attributes = node ? node.attributes ?? node : null;

        if (!isMounted) return;

        setContent(attributes);
      } catch {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const title = content?.title ?? "Besoin d'assistance ?";
  const userMessageLabel = content?.userMessageLabel ?? "Vous";
  const userMessage = content?.userMessage ?? "Bonjour, j'ai besoin d'aide\nconcernant un véhicule.";
  const driveMessageLabel = content?.driveMessageLabel ?? "DRIVE";
  const driveMessage = content?.driveMessage ?? "Bonjour, en quoi pouvons-\nnous vous aider ?";
  const whatsappButtonText = content?.whatsappButtonText ?? "Whatsapp Business";
  const whatsappButtonLink = content?.whatsappButtonLink;

  return (
    <div className="flex flex-col items-center justify-center w-full text-center py-0 h-screen">
      <Wrapper className="md:!px-0 !max-w-4xl flex items-center justify-center flex-col gap-16">
        <Container delay={0.2}>
          <h2 className="text-4xl text-white font-medium">
            {title}
          </h2>
        </Container>

        <Container delay={0.3} className="w-full">
          <div className="max-w-sm mx-auto w-full flex flex-col text-left text-sm gap-3">
            <Container delay={0.35}>
              <div className="ml-auto w-fit">
                <p className="text-[9px] ml-2 mb-0.5 text-white/60 text-left">
                  {userMessageLabel}
                </p>
                <ChatBubble variant="sent">
                  <ChatBubbleMessage variant="sent">
                    {userMessage.split('\n').map((line: string, idx: number) => (
                      <span key={idx}>
                        {line}
                        {idx < userMessage.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </ChatBubbleMessage>
                </ChatBubble>
              </div>
            </Container>
            <Container delay={0.4}>
              <div className="mr-auto w-fit">
                <p className="text-[9px] ml-2 mb-0.5 text-white/60 text-left">
                  {driveMessageLabel}
                </p>
                <ChatBubble variant="received">
                  <ChatBubbleMessage>
                    {driveMessage.split('\n').map((line: string, idx: number) => (
                      <span key={idx}>
                        {line}
                        {idx < driveMessage.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </ChatBubbleMessage>
                </ChatBubble>
              </div>
            </Container>
          </div>
        </Container>

        <Container delay={0.4}>
          <LiquidGlassButton 
            showTooltips={true}
            onClick={() => {
              if (whatsappButtonLink) {
                window.open(whatsappButtonLink, '_blank');
              }
            }}
          >
            <span>{whatsappButtonText}</span>
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
