const { Model, DataTypes } = require("sequelize");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        content: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsToMany(models.Tag, {
      foreignKey: "post_id",
      through: "post_tags",
      as: "tags"
    });
  }
}

module.exports = Post;
