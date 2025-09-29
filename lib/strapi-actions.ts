"use server";

import { gql, type RequestDocument } from "graphql-request";
import { strapiGraphQL } from "./strapi";

const heroQuery = gql`
  query HeroQuery {
    hero {
      documentId
      title
      subtitle
      sellButtonText
      buyButtonText
      ctaText
      backgroundImage {
        documentId
        url
        alternativeText
      }
    }
  }
`;

const testimonialsQuery = gql`
  query TestimonialsQuery {
    testimonials(sort: "order:asc") {
      documentId
      name
      location
      quote
      order
      avatar {
        documentId
        url
        alternativeText
      }
    }
  }
`;

const faqsQuery = gql`
  query FAQsQuery {
    faqs(sort: "order:asc") {
      documentId
      title
      content
      order
    }
  }
`;

const globalContentQuery = gql`
  query GlobalContentQuery {
    globalContent {
      documentId
      siteName
      siteDescription
      contactEmail
      contactPhone
      logo {
        documentId
        url
        alternativeText
      }
      logoSmall {
        documentId
        url
        alternativeText
      }
      socialMedia {
        id
        title
        url
      }
    }
  }
`;

const handleGraphQLRequest = async <T>(
  query: RequestDocument,
  transform: (data: any) => T
) => {
  try {
    const response = await strapiGraphQL.request(query);
    return {
      success: true as const,
      data: transform(response),
    };
  } catch (error) {
    console.error("Strapi GraphQL request failed:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Erreur inconnue",
      data: null,
    };
  }
};

export const getHeroData = async () =>
  handleGraphQLRequest(heroQuery, (response) => {
    const hero = response.hero;
    if (!hero) return null;

    return {
      id: hero.documentId,
      title: hero.title,
      subtitle: hero.subtitle,
      sellButtonText: hero.sellButtonText,
      buyButtonText: hero.buyButtonText,
      ctaText: hero.ctaText,
      backgroundImage: hero.backgroundImage,
    };
  });

export const getTestimonialsData = async () =>
  handleGraphQLRequest(testimonialsQuery, (response) => {
    const testimonials = response.testimonials ?? [];
    return testimonials
      .map((item: any) => ({
        id: item.documentId,
        name: item.name,
        location: item.location,
        quote: item.quote,
        order: item.order,
        avatar: item.avatar,
      }))
      .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
  });

export const getFAQsData = async () =>
  handleGraphQLRequest(faqsQuery, (response) => {
    const faqs = response.faqs ?? [];
    return faqs
      .map((item: any) => ({
        id: item.documentId,
        title: item.title,
        content: item.content,
        order: item.order,
      }))
      .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
  });

export const getGlobalContentData = async () =>
  handleGraphQLRequest(globalContentQuery, (response) => {
    const globalContent = response.globalContent;
    if (!globalContent) return null;

    return {
      id: globalContent.documentId,
      siteName: globalContent.siteName,
      siteDescription: globalContent.siteDescription,
      contactEmail: globalContent.contactEmail,
      contactPhone: globalContent.contactPhone,
      logo: globalContent.logo,
      logoSmall: globalContent.logoSmall,
      socialMedia: globalContent.socialMedia,
    };
  });
