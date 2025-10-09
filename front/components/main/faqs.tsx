import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import Container from "@/components/global/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { FAQ } from "@/constants/faqs";
import Wrapper from "../global/wrapper";
import { useFAQsOrdered } from "@/hooks/use-strapi";

const FAQs = () => {
  const { data: strapiFAQs, loading, error } = useFAQsOrdered();
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24 min-h-screen h-full">
      <Wrapper>
        <Container animation="fadeUp">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3 space-y-5 flex flex-col h-full">
              <Container animation="fadeRight" delay={1}>
                <h2 className="text-3xl md:text-4xl text-white font-medium">
                  FOIRE AUX QUESTIONS
                </h2>
              </Container>

              <Container animation="fadeUp" delay={2} className="grow">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                  defaultValue="1"
                >
                  {loading ? (
                    // Loading skeleton
                    Array.from({ length: 4 }).map((_, index) => (
                      <Container
                        animation="fadeUp"
                        delay={2.5 + index * 0.1}
                        key={`loading-${index}`}
                        className="border-b border-[#F0F0F0]"
                      >
                        <div className="flex flex-1 items-center justify-between gap-4 px-0 py-6">
                          <div className="flex-1 h-6 bg-white/20 rounded animate-pulse" />
                          <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse" />
                        </div>
                      </Container>
                    ))
                  ) : strapiFAQs && strapiFAQs.length > 0 ? (
                    strapiFAQs.map((item, index) => (
                      <Container
                        animation="fadeUp"
                        delay={2.5 + index * 0.1}
                        key={item.id}
                        className="border-b border-[#F0F0F0]"
                      >
                        <AccordionItem
                          value={item.id.toString()}
                          className="border-none group font-medium"
                        >
                          <AccordionPrimitive.Header className="flex">
                            <AccordionPrimitive.Trigger className="group-trigger flex flex-1 items-center justify-between gap-4 px-0 py-6 text-left text-base md:text-lg font-medium transition-all duration-300 cursor-pointer [&[data-state=open]]:text-white rounded-xl">
                              <span className="flex-1 uppercase">
                                {item.attributes.question}
                              </span>
                              <div className="relative w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-300">
                                <PlusIcon
                                  size={24}
                                  className="absolute transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-45"
                                  aria-hidden="true"
                                />
                                <MinusIcon
                                  size={24}
                                  className="absolute transition-all duration-300 opacity-0 group-data-[state=open]:opacity-100"
                                  aria-hidden="true"
                                />
                              </div>
                            </AccordionPrimitive.Trigger>
                          </AccordionPrimitive.Header>
                          <AccordionContent className="text-sm md:text-base leading-relaxed px-0 pb-6 overflow-hidden">
                            <Container animation="fadeUp" delay={0.2}>
                              <p>{item.attributes.answer}</p>
                            </Container>
                          </AccordionContent>
                        </AccordionItem>
                      </Container>
                    ))
                  ) : (
                    // Fallback to static FAQ data
                    FAQ.map((item, index) => (
                      <Container
                        animation="fadeUp"
                        delay={2.5 + index * 0.1}
                        key={item.id}
                        className="border-b border-[#F0F0F0]"
                      >
                        <AccordionItem
                          value={item.id}
                          className="border-none group font-medium"
                        >
                          <AccordionPrimitive.Header className="flex">
                            <AccordionPrimitive.Trigger className="group-trigger flex flex-1 items-center justify-between gap-4 px-0 py-6 text-left text-base md:text-lg font-medium transition-all duration-300 cursor-pointer [&[data-state=open]]:text-white rounded-xl">
                              <span className="flex-1 uppercase">
                                {item.title}
                              </span>
                              <div className="relative w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-300">
                                <PlusIcon
                                  size={24}
                                  className="absolute transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-45"
                                  aria-hidden="true"
                                />
                                <MinusIcon
                                  size={24}
                                  className="absolute transition-all duration-300 opacity-0 group-data-[state=open]:opacity-100"
                                  aria-hidden="true"
                                />
                              </div>
                            </AccordionPrimitive.Trigger>
                          </AccordionPrimitive.Header>
                          <AccordionContent className="text-sm md:text-base leading-relaxed px-0 pb-6 overflow-hidden">
                            <Container animation="fadeUp" delay={0.2}>
                              <p>{item.content}</p>
                            </Container>
                          </AccordionContent>
                        </AccordionItem>
                      </Container>
                    ))
                  )}
                </Accordion>
              </Container>

              <Container
                animation="fadeUp"
                delay={4}
                className="relative grow h-full min-h-[262px]"
              >
                <Image
                  src="/images/main/faq/1.webp"
                  alt="Car brake disc"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-3xl"
                />
              </Container>
            </div>

            {/* Right side takes 2 columns - Images */}
            <div className="col-span-2 max-lg:hidden">
              <Container
                animation="fadeLeft"
                delay={3}
                className="relative h-full grow min-h-[400px]"
              >
                <Image
                  src="/images/main/faq/2.webp"
                  alt="Car with person"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-3xl"
                />
              </Container>
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default FAQs;
