const { Model, DataTypes } = require("sequelize");

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Post, {
      foreignKey: "tag_id",
      through: "post_tags",
      as: "posts"
    });
  }
}

module.exports = Tag;
