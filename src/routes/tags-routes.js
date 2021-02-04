const TagController = require("../controllers/TagController");
const auth = require("../configs/security/sec")();

module.exports = app => {
  app
    .route("/posts/:post_id/tags")
    .all(auth.authenticate())
    .get(TagController.index)
    .post(TagController.store);

  app.delete("/posts/:post_id/tags/:tag_id", TagController.delete);
};
