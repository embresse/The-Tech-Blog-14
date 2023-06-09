const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init({
  body: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
  },

},
{
  sequelize,
  underscored: true,
  modelName: "comment",

});


module.exports = Comment;
