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
    }

}

module.exports = Task;