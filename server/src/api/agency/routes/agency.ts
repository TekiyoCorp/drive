export default {
  routes: [
    {
      method: "GET",
      path: "/agencies",
      handler: "agency.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/agencies/:id",
      handler: "agency.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/agencies",
      handler: "agency.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/agencies/:id",
      handler: "agency.update",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/agencies/:id",
      handler: "agency.delete",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

