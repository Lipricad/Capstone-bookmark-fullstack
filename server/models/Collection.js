module.exports = (sequelize, DataTypes) => {

  const Collection = sequelize.define("Collection", {
    UserEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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