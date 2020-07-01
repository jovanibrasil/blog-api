const { Model, DataTypes } = require('sequelize');

class Tag extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,        
        }, {
            sequelize
        });
    }  

    static associate(models){
        this.belongsToMany(models.Task, { 
            foreignKey: 'tag_id', 
            through: 'task_tags',
            as: 'tasks' 
        });
    }

}

module.exports = Tag;