const UserController = require('../controllers/UserController');
const auth = require('../configs/security/sec')();

module.exports = app => {

    app.route('/users')
        //.all(auth.authenticate())
        .get(UserController.index)
        .post(UserController.store);

}