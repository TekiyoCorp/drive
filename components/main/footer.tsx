"use client";

import Image from "next/image";
import Link from "next/link";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import NeedAssistance from "./need-assistance";
import ReadyToTakeAction from "./ready-to-take-action";
import {
  FOOTER_NAVIGATION_LINKS,
  FOOTER_CONTACT_LINKS,
  FOOTER_SOCIAL_LINKS,
} from "../../constants/links";
import { usePathname } from "next/navigation";
import { SnapElement } from "../global/scroll-snap";
import { useEffect, useState } from "react";

interface FooterContent {
  navigationTitle?: string;
  navigationLinks?: Array<{
    name?: string;
    link?: string;
    attributes?: {
      name?: string;
      link?: string;
    };
  }>;
  contactTitle?: string;
  contactLinks?: Array<{
    name?: string;
    link?: string;
    type?: string;
    disabled?: boolean;
    attributes?: {
      name?: string;
      link?: string;
      type?: string;
      disabled?: boolean;
    };
  }>;
  socialTitle?: string;
  socialLinks?: Array<{
    platform?: string;
    url?: string;
    name?: string;
    link?: string;
    attributes?: {
      platform?: string;
      url?: string;
      name?: string;
      link?: string;
    };
  }>;
  legalTitle?: string;
  copyrightText?: string;
  tekiyoCopyright?: string;
}

const Footer = () => {
  const pathname = usePathname();
  const [content, setContent] = useState<FooterContent | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/footer?populate=*`,
          {
            headers: {
              ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
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

  interface NavigationLink {
    name: string;
    link: string;
  }

  interface ContactLink {
    name: string;
    link: string;
    type?: string;
    disabled?: boolean;
  }

  interface SocialLink {
    name: string;
    link: string;
  }

  const navigationTitle = content?.navigationTitle ?? "Navigation";
  const navigationLinks: NavigationLink[] = content?.navigationLinks && Array.isArray(content.navigationLinks) && content.navigationLinks.length > 0
    ? content.navigationLinks.map((link) => ({
        name: link.name || link.attributes?.name || '',
        link: link.link || link.attributes?.link || '',
      })).filter((link): link is NavigationLink => Boolean(link.name && link.link))
    : FOOTER_NAVIGATION_LINKS;

  const contactTitle = content?.contactTitle ?? "Contact";
  const contactLinks: ContactLink[] = content?.contactLinks && Array.isArray(content.contactLinks) && content.contactLinks.length > 0
    ? content.contactLinks.map((link) => ({
        name: link.name || link.attributes?.name || '',
        link: link.link || link.attributes?.link || '',
        type: link.type || link.attributes?.type,
        disabled: link.disabled !== undefined ? link.disabled : (link.attributes?.disabled || false),
      })).filter((link: { name: string; link: string; type?: string; disabled?: boolean }): link is ContactLink => Boolean(link.name))
    : FOOTER_CONTACT_LINKS;

  const socialTitle = content?.socialTitle ?? "Réseaux";
  const socialLinks: SocialLink[] = content?.socialLinks && Array.isArray(content.socialLinks) && content.socialLinks.length > 0
    ? content.socialLinks.map((link) => ({
        name: link.platform || link.attributes?.platform || link.name || link.attributes?.name || '',
        link: link.url || link.attributes?.url || link.link || link.attributes?.link || "#",
      })).filter((link): link is SocialLink => Boolean(link.name))
    : FOOTER_SOCIAL_LINKS;

  const legalTitle = content?.legalTitle ?? "Légal";
  const copyrightText = content?.copyrightText ?? "© 2025 DRIVE - Tous droits réservés Propulsé par Tekiyo";
  const tekiyoCopyright = content?.tekiyoCopyright ?? "© 2025 Maison Tekiyo™ - Tous droits réservés.";

  return (
    <>
      {pathname !== "/contact" && (
        <SnapElement>
          <NeedAssistance />
        </SnapElement>
      )}
      <SnapElement>
        <ReadyToTakeAction />
      </SnapElement>
      {/* <div className="min-h-[740px]"></div> */}
      {/* <footer className="fixed bottom-0 -z-10 flex flex-col items-center justify-center w-full pt-16 lg:pt-24 pb-10"> */}
      <SnapElement>
        <footer className="flex flex-col items-center justify-center w-full pt-8 md:pt-24 pb-10">
          <Container animation="fadeUp" delay={0.2}>
            <Wrapper className="flex flex-col gap-10">
              <div className="md:mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  <Container animation="fadeLeft" delay={0.2}>
                    <div>
                      <h3 className="text-2xl font-medium mb-3">{navigationTitle}</h3>
                      <div className="space-y-2">
                        {navigationLinks.map((link: { name: string; link: string }, index: number) => (
                          <Container
                            key={index}
                            animation="fadeUp"
                            delay={0.2 + index}
                          >
                            <Link
                              href={link.link}
                              className="block text-lg w-fit hover:text-gray-300 transition-colors duration-200"
                            >
                              {link.name}
                            </Link>
                          </Container>
                        ))}
                      </div>
                    </div>
                  </Container>

                  <Container animation="fadeUp" delay={0.5}>
                    <div>
                      <h3 className="text-2xl font-medium mb-3">{contactTitle}</h3>
                      <div className="space-y-2">
                        {contactLinks.map((contact: { name: string; link: string; disabled?: boolean }, index: number) => (
                          <Container
                            key={index}
                            animation="fadeUp"
                            delay={0.2 + index}
                          >
                            <div>
                              {contact.disabled ? (
                                <div className="text-white">{contact.name}</div>
                              ) : (
                                <Link
                                  href={contact.link}
                                  className="block text-lg w-fit hover:text-gray-300 transition-colors duration-200"
                                >
                                  {contact.name}
                                </Link>
                              )}
                            </div>
                          </Container>
                        ))}
                      </div>
                    </div>
                  </Container>

                  <Container animation="fadeRight" delay={1}>
                    <div>
                      <h3 className="text-2xl font-medium mb-3">{socialTitle}</h3>
                      <div className="space-y-2">
                        {socialLinks.map((social: { name: string; link: string }, index: number) => (
                          <Container
                            key={index}
                            animation="scaleUp"
                            delay={0.2 + index}
                          >
                            <Link
                              href={social.link}
                              className="block text-lg w-fit hover:text-gray-300 transition-colors duration-200"
                            >
                              {social.name}
                            </Link>
                          </Container>
                        ))}
                      </div>
                    </div>
                  </Container>

                  <Container animation="fadeUp" delay={2}>
                    <div>
                      <h3 className="text-2xl font-medium mb-3">{legalTitle}</h3>
                      <p className="text-lg">
                        {copyrightText}
                      </p>
                    </div>
                  </Container>
                </div>
              </div>

              <Container animation="fadeUp" delay={2}>
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={1080}
                  height={1080}
                  className="object-cover object-center z-10 rounded-3xl transition-transform duration-300 w-full h-fit"
                />
              </Container>

              <Container animation="fadeUp" delay={3}>
                <div className="flex items-center justify-center flex-col gap-5 max-md:mt-5">
                  <Container animation="scaleUp" delay={3}>
                    <Image
                      src="/tekiyo.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="hover:scale-110 transition-transform duration-200"
                    />
                  </Container>
                  <Container animation="fadeUp" delay={1.8}>
                    <p className="text-sm font-medium">
                      {tekiyoCopyright}
                    </p>
                  </Container>
                </div>
              </Container>
            </Wrapper>
          </Container>
        </footer>
      </SnapElement>
    </>
  );
};

export default Footer;
