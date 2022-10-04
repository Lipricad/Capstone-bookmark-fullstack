module.exports = (sequelize, DataTypes) => {

  const Bookmark = sequelize.define("Bookmark", {
    BookmarkName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Bookmark_URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Bookmark_img: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // }
  })

  return Bookmark
}