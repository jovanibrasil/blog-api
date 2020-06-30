const { Model, DataTypes } = require('sequelize');

class User extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            age: DataTypes.NUMBER
        }, {
            sequelize
        });
    }

    // thes relationship is necessary because sequelize needs
    // the information of what type of object belongs to the association,
    // specially for join creation (query with include association)
    static associate(models){
        this.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });
    }

}

module.exports = User;