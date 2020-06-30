const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'tasks' }            
        });

        return res.json(user.tasks);
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { title, done,  } = req.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const task = await Task.create({ title, done, user, user_id });
        return res.json(task);
    }

}