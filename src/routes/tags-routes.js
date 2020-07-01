const TagController = require('../controllers/TagController');

module.exports = app => {
    
    app.get('/tasks/:task_id/tags', TagController.index);

    app.post('/tasks/:task_id/tags', TagController.store);

    app.delete('/tasks/:task_id/tags/:tag_id', TagController.delete);

};