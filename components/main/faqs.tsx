import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { Accordion as AccordionPrimitive } from "radix-ui";

import Container from "@/components/global/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import Wrapper from "../global/wrapper";
import { getFAQsData } from "@/lib/strapi-actions";

const FAQs = async () => {
  const faqsResponse = await getFAQsData();

  // Utilise les données de Strapi si disponibles, sinon fallback vers les constantes
  const faqs =
    faqsResponse.success && Array.isArray(faqsResponse.data)
      ? faqsResponse.data
      : [];

  return (
    <div className="flex flex-col items-center justify-center w-full md:py-16 lg:py-24">
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
                  defaultValue={
                    faqs.length ? faqs[0]?.id?.toString() : "placeholder"
                  }
                >
                  {(faqs.length > 0
                    ? faqs
                    : [
                        {
                          id: "placeholder",
                          title: "Aucune question disponible",
                          content: "Les FAQ seront bientôt disponibles.",
                        },
                      ]
                  ).map((item, index) => (
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
                  ))}
                </Accordion>
              </Container>

              <Container animation="fadeUp" delay={4} className="grow h-full">
                <Image
                  src="/images/main/faq/1.jpg"
                  alt="Car brake disc"
                  width={1024}
                  height={1024}
                  className="h-full object-cover rounded-3xl min-h-[262px]"
                />
              </Container>
            </div>

            {/* Right side takes 2 columns - Images */}
            <div className="col-span-2 max-lg:hidden">
              <Container animation="fadeLeft" delay={3} className="h-full grow">
                <Image
                  src="/images/main/faq/2.jpg"
                  alt="Car with person"
                  width={1024}
                  height={1024}
                  className="object-cover h-full rounded-3xl"
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
