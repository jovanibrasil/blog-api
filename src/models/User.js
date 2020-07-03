const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            age: DataTypes.NUMBER,
            password: DataTypes.STRING
        }, {
            sequelize
        });

        super.addHook(
            'beforeCreate', (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        )
    }

    /**
     * 
     * This relationship is necessary because sequelize needs the information of 
     * what type of object belongs to the association, specially for join creation (query 
     * with include association)
     * 
     * @param {*} models 
     */
    static associate(models){
        this.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });
    }

    isPassword(encodedPassword, password){
        return bcrypt.compareSync(password, encodedPassword);
    }

}

module.exports = User;