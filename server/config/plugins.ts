export default ({ env }) => ({
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: env.bool("GRAPHQL_PLAYGROUND", true),
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        introspection: true,
      },
    },
  },
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 250MB
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },
});
