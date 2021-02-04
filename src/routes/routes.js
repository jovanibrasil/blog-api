const postsRoutes = require("./posts-routes");
const usersRoutes = require("./users-routes");
const tagsRoutes = require("./tags-routes");
const tokenRoutes = require("./token-routes");

module.exports = app => {
  postsRoutes(app);
  usersRoutes(app);
  tagsRoutes(app);
  tokenRoutes(app);
};
