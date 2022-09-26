module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define("Category", {
    CategoryName: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  })

  return Category
}