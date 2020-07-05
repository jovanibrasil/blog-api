const TokenController = require('../controllers/TokenController');

module.exports = app => {

    /**
     * @api {post} /token
     * @apiGroup Credential
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     * @apiParamExample {json} 
     *  {
     *      "email": "user@email.com",
     *      "password": "123456"
     *  }
     * @apiSuccess {String} token Authenticated user token
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {"token": xyz.abc.123.hgf}
     * @apiErrorExample {json} Authentication errror
     *  HTTP/1.1 401 Unauthorized
     * 
     */
    app.route('/token')
        .post(TokenController.getToken);

};