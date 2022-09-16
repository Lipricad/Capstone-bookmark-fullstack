module.exports = (sequelize, DataTypes) => {

  const Collection = sequelize.define("Collection", {
    UserEmail: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CollectionName: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  })

  return Collection
}