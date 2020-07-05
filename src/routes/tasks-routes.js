const TaskController = require('../controllers/TaskController');
const auth = require('../configs/security/sec')();

module.exports = app => {
    
    app.route('/tasks')
        .all(auth.authenticate())
        .get(TaskController.findAll)
        .post(TaskController.store);

    app.route('/tasks/:id')
        .all(auth.authenticate())
        .get(TaskController.findById)
        .put(TaskController.update)
        .delete(TaskController.delete);

};