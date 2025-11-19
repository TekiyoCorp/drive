"use client";

import LiquidGlassButton from "@/components/common/liquid-glass-button";
import Container from "@/components/global/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { SnapElement } from "@/components/global/scroll-snap";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    nomComplet: "",
    telephone: "",
    email: "",
    ville: "",
    apport: "",
    experience: "",
    commentaires: "",
  });

  const [contactLinks, setContactLinks] = useState<Array<{ name: string; link: string; disabled?: boolean }>>([
    { name: "Mail", link: "mailto:contact@example.com" },
    { name: "Instagram", link: "https://instagram.com" },
    { name: "WhatsApp Business", link: "https://wa.me" },
  ]);

  useEffect(() => {
    let isMounted = true;

    const fetchContactLinks = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/contact?populate=*`,
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

        if (attributes?.contactLinks && Array.isArray(attributes.contactLinks) && attributes.contactLinks.length > 0) {
          const links = attributes.contactLinks
            .filter((item: any) => item && !(item.disabled !== undefined ? item.disabled : (item.attributes?.disabled || false)))
            .map((item: any) => ({
              name: item.name || item.attributes?.name || "",
              link: item.link || item.attributes?.link || "#",
              disabled: item.disabled !== undefined ? item.disabled : (item.attributes?.disabled || false),
            }))
            .filter((item: any) => item.name && item.link);
          
          if (links.length > 0) {
            setContactLinks(links);
          }
        }
      } catch (_err) {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContactLinks();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <SnapElement>
      <div className="relative z-0 w-full p-2.5 md:p-4 h-screen mb-4">
        <Container animation="scaleUp" delay={0.4} className="w-full h-screen">
          <Image
            src="/images/contact/hero.webp"
            alt="Contact Background"
            width={1024}
            height={1024}
            sizes="100vw"
            className="object-cover object-center bg-no-repeat z-10 rounded-3xl h-full w-full min-h-screen"
          />
        </Container>

        <div className="absolute top-0 left-0 w-full z-20 h-full flex flex-col md:flex-row md:items-end justify-between px-6 md:px-8 lg:px-24 py-0 lg:py-8 gap-5 max-md:pt-[6.5rem] max-md:!pb-0">
          <Container
            delay={0.2}
            className="hidden md:flex flex-col gap-6 items-start"
          >
            {contactLinks.map((item, index) => {
              const isExternal = item.link.startsWith("http") || item.link.startsWith("//");
              return (
                <Link
                  key={index}
                  href={item.link}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-1 text-white hover:text-white/80 transition-all hover:gap-2"
                >
                  <span className="text-lg font-regular">{item.name}</span>
                  <ArrowUpRightIcon className="size-6 stroke-[1.5px]" />
                </Link>
              );
            })}
          </Container>
          <Container
            animation="fadeLeft"
            delay={0.4}
            className="flex-1 w-full md:max-w-lg"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5 md:space-y-6 bg-black/10 md:bg-black/20 backdrop-blur-[28px] brightness-125 rounded-3xl py-6 lg:py-8 px-6 lg:px-10 border border-white/10"
            >
              <Container delay={0.5}>
                <h1 className="text-white text-[36px] md:text-[48px] font-regular mb-6 md:mb-8 tracking-wide">
                  Contactez-nous
                </h1>
              </Container>

              <Container animation="fadeUp" delay={0.6}>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Nom complet"
                    value={formData.nomComplet}
                    onChange={(e) =>
                      handleInputChange("nomComplet", e.target.value)
                    }
                    className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 pt-0 pb-5 text-white focus:border-white focus:ring-0 focus-visible:ring-0 placeholder:text-white/60 !text-base"
                  />
                </div>
              </Container>

              <Container animation="fadeUp" delay={0.8}>
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Adresse mail"
                    value={formData.telephone}
                    onChange={(e) =>
                      handleInputChange("telephone", e.target.value)
                    }
                    className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 pt-0 pb-5 text-white focus:border-white focus:ring-0 focus-visible:ring-0 placeholder:text-white/60 !text-base"
                  />
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.0}>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Téléphone"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 pt-0 pb-5 text-white focus:border-white focus:ring-0 focus-visible:ring-0 placeholder:text-white/60 !text-base"
                  />
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.4}>
                <div className="space-y-2">
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("apport", value)
                    }
                  >
                    <SelectTrigger className="!bg-transparent w-full border-0 border-b border-white/20 rounded-none px-0 pt-0 pb-5 text-white focus:border-white focus:ring-0 focus-visible:ring-0 h-auto !text-base data-[placeholder]:text-white/60">
                      <SelectValue
                        placeholder="Apport"
                        className="text-white placeholder:!text-white/60 data-[placeholder]:!text-white/60"
                      />
                    </SelectTrigger>
                    <SelectContent className="!bg-[#1C1C1C] border-white/20/20 text-white">
                      <SelectItem value="0-5000">0 - 5 000€</SelectItem>
                      <SelectItem value="5000-10000">
                        5 000 - 10 000€
                      </SelectItem>
                      <SelectItem value="10000-20000">
                        10 000 - 20 000€
                      </SelectItem>
                      <SelectItem value="20000+">20 000€+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.8}>
                <Textarea
                  id="commentaires"
                  placeholder="Votre message"
                  value={formData.commentaires}
                  onChange={(e) =>
                    handleInputChange("commentaires", e.target.value)
                  }
                  className="!bg-transparent border-0 border-b border-white/20 rounded-none px-0 pt-0 pb-5 text-white focus:border-white focus:ring-0 focus-visible:ring-0 placeholder:text-white/60 min-h-[150px] resize-none !text-base"
                />
              </Container>

              <Container delay={0.3} className="w-fit mx-auto">
                <LiquidGlassButton className="px-10">
                  <span className="text-white">Envouer</span>
                </LiquidGlassButton>
              </Container>

              <Container
                delay={0.6}
                className="flex md:hidden flex-col gap-6 items-start"
              >
                {contactLinks.map((item, index) => {
                  const isExternal = item.link.startsWith("http") || item.link.startsWith("//");
                  return (
                    <Link
                      key={index}
                      href={item.link}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-1 text-white hover:text-white/80 transition-all hover:gap-2"
                    >
                      <span className="text-lg font-regular">{item.name}</span>
                      <ArrowUpRightIcon className="size-6 stroke-[1.5px]" />
                    </Link>
                  );
                })}
              </Container>
            </form>
          </Container>
        </div>
      </div>
    </SnapElement>
  );
};

export default ContactUsPage;
