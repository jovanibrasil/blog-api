const tastsRoutes = require('./tasks-routes');
const usersRoutes = require('./users-routes');

module.exports = app => {
    tastsRoutes(app);
    usersRoutes(app);
}