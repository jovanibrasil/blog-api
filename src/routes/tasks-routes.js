const TaskController = require('../controllers/TaskController');
const auth = require('../configs/security/sec')();

module.exports = app => {
    
    app.route('/users/:user_id/tasks')
        .all(auth.authenticate())
        .get(TaskController.index)
        .post(TaskController.store);

};