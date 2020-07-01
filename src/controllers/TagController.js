const Task = require('../models/Task');
const Tag = require('../models/Tag');

module.exports = {

    async index(req, res) {
        const { task_id } = req.params;

        const task = await Task.findByPk(task_id, {
            include: { 
                association: 'tags',
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }            
        });

        return res.json(task.tags);
    },

    async store(req, res) {
        const { task_id } = req.params;
        const { name  } = req.body;

        const task = await Task.findByPk(task_id);

        if(!task) {
            return res.status(400).json({ error: 'Task not found' });
        }

        const [ tag ] = await Tag.findOrCreate({ where: { name } });
        
        await task.addTag(tag);
        
        return res.json(tag);
    },

    async delete(req, res) {
        const { task_id, tag_id } = req.params;

        const task = await Task.findByPk(task_id);

        if(!task) {
            return res.status(400).json({ error: 'Task not found' });
        }

        const tag = await Tag.findByPk(tag_id);
        
        await task.removeTag(tag);
        
        return res.status(204).json();
    }

}