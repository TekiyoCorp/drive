"use client";

import LiquidGlassButton from "@/components/common/liquid-glass-button";
import Container from "@/components/global/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { SnapElement } from "@/components/global/scroll-snap";
import { useRouter } from "next/navigation";

const ContactUsPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomComplet: "",
    email: "",
    telephone: "",
    commentaires: "",
  });

  const [errors, setErrors] = useState<{
    nomComplet?: string;
    email?: string;
    telephone?: string;
    commentaires?: string;
  }>({});

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
          interface ContactLinkItem {
            name?: string;
            link?: string;
            disabled?: boolean;
            attributes?: {
              name?: string;
              link?: string;
              disabled?: boolean;
            };
          }
          
          const links = attributes.contactLinks
            .filter((item: ContactLinkItem) => item && !(item.disabled !== undefined ? item.disabled : (item.attributes?.disabled || false)))
            .map((item: ContactLinkItem) => ({
              name: item.name || item.attributes?.name || "",
              link: item.link || item.attributes?.link || "#",
              disabled: item.disabled !== undefined ? item.disabled : (item.attributes?.disabled || false),
            }))
            .filter((item: { name: string; link: string; disabled: boolean }) => item.name && item.link);
          
          if (links.length > 0) {
            setContactLinks(links);
          }
        }
      } catch {
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
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.nomComplet.trim()) {
      newErrors.nomComplet = "Le nom complet est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'adresse email est requise";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'adresse email n'est pas valide";
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le numéro de téléphone est requis";
    }

    if (!formData.commentaires.trim()) {
      newErrors.commentaires = "Le message est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    console.log("Form submitted:", formData);
    
    try {
      // Extract first name from nomComplet
      const firstName = formData.nomComplet.split(" ")[0] || formData.nomComplet || "Thomas";
      const encodedName = encodeURIComponent(firstName);
      
      // Redirect to thank you page with client name
      if (router && typeof router.push === "function") {
        await router.push(`/thankyou?name=${encodedName}`);
      } else {
        // Fallback to window.location if router is not available
        window.location.href = `/thankyou?name=${encodedName}`;
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // Fallback to window.location on error
      const firstName = formData.nomComplet.split(" ")[0] || formData.nomComplet || "Thomas";
      const encodedName = encodeURIComponent(firstName);
      window.location.href = `/thankyou?name=${encodedName}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    // Prevent form submission on Enter key unless it's in the textarea
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
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
              onKeyDown={handleKeyDown}
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
                    className={`bg-transparent border-0 border-b rounded-none px-0 pt-0 pb-5 text-white focus:ring-0 focus-visible:ring-0 placeholder:text-white/60 !text-base ${
                      errors.nomComplet
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/20 focus:border-white"
                    }`}
                  />
                  {errors.nomComplet && (
                    <p className="text-red-500 text-sm mt-1">{errors.nomComplet}</p>
                  )}
                </div>
              </Container>

              <Container animation="fadeUp" delay={0.8}>
                <div className="space-y-2">
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Adresse mail"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`bg-transparent border-0 border-b rounded-none px-0 pt-0 pb-5 text-white focus:ring-0 focus-visible:ring-0 placeholder:text-white/60 !text-base ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/20 focus:border-white"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.0}>
                <div className="space-y-2">
                  <Input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Numéro de téléphone"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange("telephone", e.target.value)}
                    className={`bg-transparent border-0 border-b rounded-none px-0 pt-0 pb-5 text-white focus:ring-0 focus-visible:ring-0 placeholder:text-white/60 !text-base ${
                      errors.telephone
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/20 focus:border-white"
                    }`}
                  />
                  {errors.telephone && (
                    <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
                  )}
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.2}>
                <div className="space-y-2">
                  <Textarea
                    id="commentaires"
                    placeholder="Votre message"
                    value={formData.commentaires}
                    onChange={(e) =>
                      handleInputChange("commentaires", e.target.value)
                    }
                    className={`!bg-transparent border-0 border-b rounded-none px-0 pt-0 pb-5 text-white focus:ring-0 focus-visible:ring-0 placeholder:text-white/60 min-h-[150px] resize-none !text-base ${
                      errors.commentaires
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/20 focus:border-white"
                    }`}
                  />
                  {errors.commentaires && (
                    <p className="text-red-500 text-sm mt-1">{errors.commentaires}</p>
                  )}
                </div>
              </Container>

              <Container delay={0.3} className="w-fit mx-auto">
                <LiquidGlassButton className="px-10">
                  <span className="text-white">Envoyer</span>
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
