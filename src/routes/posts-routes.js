const PostController = require("../controllers/PostController");
const auth = require("../configs/security/sec")();

module.exports = app => {
  app
    .route("/posts")
    .all(auth.authenticate())
    /**
     * @api {get} /posts
     * @apiGroup posts
     * @apiHeader {String} Authorization
     * @apiHeaderExample {json} Request-Example:
     *    { "Authotization": "Bearer xyz.abc.123.hgf" }
     * @apiSuccess {Object[]} posts Task list
     * @apiSuccess {Number} posts.id Task identification
     * @apiHeaderExample {json} Success
     *  HTTP/1.1 200 OK
     *  [{
     *      "id": 1,
     *      "title": "Estudar",
     *      "done": "false",
     *      "updatedAt": "2010-09-12T12:45:43.324Z",
     *      "createdAt": "2010-09-12T12:45:43.324Z",
     *      "user_id": 1
     *  }]
     * @@apiErrorExample {json} Error-Response:
     *  HTTP/1.1 412 Precondition Failed
     */
    .get(PostController.findAll)
    .post(PostController.store);

  app
    .route("/posts/:id")
    .all(auth.authenticate())
    .get(PostController.findById)
    .put(PostController.update)
    .delete(PostController.delete);
};
