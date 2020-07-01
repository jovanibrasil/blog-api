const tastsRoutes = require('./tasks-routes');
const usersRoutes = require('./users-routes');
const tagsRoutes = require('./tags-routes');

module.exports = app => {
    tastsRoutes(app);
    usersRoutes(app);
    tagsRoutes(app);
}