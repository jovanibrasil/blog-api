const TaskController = require('../controllers/TaskController');

module.exports = app => {
    
    app.get('/users/:user_id/tasks', TaskController.index);

    app.post('/users/:user_id/tasks', TaskController.store);

};