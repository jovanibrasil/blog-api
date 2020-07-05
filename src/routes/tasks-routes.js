const TaskController = require('../controllers/TaskController');
const auth = require('../configs/security/sec')();

module.exports = app => {
    
    app.route('/tasks')
        .all(auth.authenticate())
        /**
         * @api {get} /tasks
         * @apiGroup Tasks
         * @apiHeader {String} Authorization
         * @apiHeaderExample {json} Request-Example:
         *    { "Authotization": "Bearer xyz.abc.123.hgf" }
         * @apiSuccess {Object[]} tasks Task list
         * @apiSuccess {Number} tasks.id Task identification
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
        .get(TaskController.findAll)
        .post(TaskController.store);

    app.route('/tasks/:id')
        .all(auth.authenticate())
        .get(TaskController.findById)
        .put(TaskController.update)
        .delete(TaskController.delete);

};