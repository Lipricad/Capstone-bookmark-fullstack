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

  // Users.associate = (models) => {
  //   Users.hasMany(models.Collection, {
  //     onDelete: "cascade",
  //   });
  // };


  return Users
}