module.exports = (sequelize, DataTypes) => {

  const Collection = sequelize.define("Collection", {
    CollectionName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Collection.associate = (models) => {
    Collection.hasMany(models.Category, {
      onDelete: "cascade",
    });
  }

  return Collection
}