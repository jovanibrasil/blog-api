const TokenController = require('../controllers/TokenController');

module.exports = app => {

    app.route('/token')
        .post(TokenController.getToken);

};