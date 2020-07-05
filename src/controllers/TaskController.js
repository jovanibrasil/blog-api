const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {

    async findAll(req, res) {
        const user_id = req.user.id;
        const user = await User.findByPk(user_id, {
            include: { association: 'tasks' }            
        });

        return res.json(user.tasks);
    },

    async findById(req, res) {
        const task_id = req.params.id;

        const task = await Task.findByPk(task_id);

        if(!task){
            return res.status(404).send();
        }

        return res.json(task);
    },

    async store(req, res) {
        const user_id = req.user.id;
        const { title, done = false } = req.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const task = await Task.create({ title, done, user, user_id });
        return res.json(task);
    },

    async update(req, res) {
        const task_id = req.params.id;
        const { title, done } = req.body;

        if(!Task.findByPk(task_id)){
            return res.status(404).send();
        }

        const task = await User.update({title, done}, 
            { where : { id: task_id } });

        return res.status(204).send();
    },

    async delete(req, res) {
        const task_id = req.params.id;
        const task = await Task.findByPk(task_id);

        if(!task){
            return res.status(404).send();
        }

        Task.destroy({ where : { id: task_id } });

        return res.status(204).send();
        
    }

}