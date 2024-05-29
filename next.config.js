const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mogodb_username: "admin",
        mogodb_password: "admin",
        mogodb_clustername: "cluster0",
        mogodb_database: "blog-dev",
      },
    };
  }

  return {
    env: {
      mogodb_username: "admin",
      mogodb_password: "admin",
      mogodb_clustername: "cluster0",
      mogodb_database: "blog",
    },
  };
};
