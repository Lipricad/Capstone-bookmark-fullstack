module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define("Category", {
    CategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Bookmark, {
      onDelete: "cascade",
    });
  }

  return Category
}