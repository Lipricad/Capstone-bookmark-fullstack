module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define("Category", {
    CategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // CategoryDescription: {
    //   type: DataTypes.STRING,
    // }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Bookmark, {
      onDelete: "cascade",
    });
  }

  return Category
}