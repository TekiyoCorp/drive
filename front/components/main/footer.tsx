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

const Footer = () => {
  const pathname = usePathname();

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
                      <h3 className="text-2xl font-medium mb-3">Navigation</h3>
                      <div className="space-y-2">
                        {FOOTER_NAVIGATION_LINKS.map((link, index) => (
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
                      <h3 className="text-2xl font-medium mb-3">Contact</h3>
                      <div className="space-y-2">
                        {FOOTER_CONTACT_LINKS.map((contact, index) => (
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
                      <h3 className="text-2xl font-medium mb-3">Réseaux</h3>
                      <div className="space-y-2">
                        {FOOTER_SOCIAL_LINKS.map((social, index) => (
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
                      <h3 className="text-2xl font-medium mb-3">Légal</h3>
                      <p className="text-lg">
                        © 2025 DRIVE - Tous droits réservés Propulsé par Tekiyo
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
                      © 2025 Maison Tekiyo™ - Tous droits réservés.
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
