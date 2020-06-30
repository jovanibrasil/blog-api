const UserController = require('../controllers/UserController');

module.exports = app => {

    app.get('/users', UserController.index);

    app.post('/users', UserController.store);

}