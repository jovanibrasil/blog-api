const TagController = require('../controllers/TagController');
const auth = require('../configs/security/sec')();

module.exports = app => {
    
    app.route('/tasks/:task_id/tags')
        .all(auth.authenticate())
        .get(TagController.index)
        .post(TagController.store)
    
    app.delete('/tasks/:task_id/tags/:tag_id', TagController.delete);

};