// Test script to debug Strapi GraphQL connection
const { GraphQLClient } = require("graphql-request");

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const buildStrapiHeaders = () =>
  STRAPI_API_TOKEN
    ? {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      }
    : undefined;

const strapiGraphQL = new GraphQLClient(`${STRAPI_URL}/graphql`, {
  headers: buildStrapiHeaders(),
});

async function testStrapiConnection() {
  console.log("🔍 Testing Strapi GraphQL connection...");
  console.log(`URL: ${STRAPI_URL}/graphql`);
  console.log(`Token: ${STRAPI_API_TOKEN ? "Present" : "Missing"}`);
  console.log("");

  try {
    // Test 1: Basic schema introspection
    console.log("Test 1: Schema introspection");
    const schemaQuery = `
      query {
        __schema {
          types {
            name
          }
        }
      }
    `;
    const schemaResponse = await strapiGraphQL.request(schemaQuery);
    console.log("✅ Schema introspection successful");
    console.log(
      "Available types:",
      schemaResponse.__schema.types
        .map((t) => t.name)
        .filter((name) => name.includes("hero") || name.includes("Hero"))
    );
    console.log("");

    // Test 2: Hero query
    console.log("Test 2: Hero query");
    const heroQuery = `
      query HeroQuery {
        hero {
          data {
            documentId
            attributes {
              title
              subtitle
              sellButtonText
              buyButtonText
              ctaText
              backgroundImage {
                data {
                  documentId
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    `;
    const heroResponse = await strapiGraphQL.request(heroQuery);
    console.log("✅ Hero query successful");
    console.log("Hero data:", JSON.stringify(heroResponse, null, 2));
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Full error:", JSON.stringify(error, null, 2));

    if (error.message.includes("400")) {
      console.log("");
      console.log("🔧 Possible solutions:");
      console.log("1. Check if hero content exists in Strapi admin panel");
      console.log("2. Verify permissions are set for Public role");
      console.log("3. Ensure API token has correct permissions");
      console.log("4. Check if content is published (not draft)");
    }
  }
}

testStrapiConnection();
