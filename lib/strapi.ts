import { GraphQLClient } from "graphql-request";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const buildStrapiHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Apollo-Require-Preflight": "true",
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return headers;
};

export const strapiGraphQL = new GraphQLClient(`${STRAPI_URL}/graphql`, {
  headers: buildStrapiHeaders(),
});

export const refreshStrapiGraphQLHeaders = () => {
  const headers = buildStrapiHeaders();
  if (headers) {
    strapiGraphQL.setHeaders(headers);
  }
};

export const getStrapiMediaURL = (media: any): string => {
  if (!media) return "";

  if (typeof media === "string") {
    return getMediaURL(media);
  }

  // New flat format
  if (media.url) {
    return getMediaURL(media.url);
  }

  // Backward compatibility with v4-style nested data
  if (media.data?.attributes?.url) {
    return getMediaURL(media.data.attributes.url);
  }

  return "";
};

export const getMediaURL = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? url : `/${url}`}`;
};
