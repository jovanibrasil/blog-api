const { Model, DataTypes } = require('sequelize');

class Task extends Model {

    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            done: DataTypes.BOOLEAN,        
        }, {
            sequelize
        });
    }  

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsToMany(models.Tag, { 
            foreignKey: 'task_id', 
            through: 'task_tags',
            as: 'tags' 
        });
    }

}

module.exports = Task;