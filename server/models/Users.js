module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  //ASSOCIATE
  Users.associate = (models) => {
    Users.hasMany(models.Collection, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Category, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Bookmark, {
      onDelete: "cascade",
    });
  };



  return Users
}