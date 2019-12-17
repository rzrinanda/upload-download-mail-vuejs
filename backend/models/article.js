'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    body: DataTypes.STRING, 
    author: DataTypes.STRING, 
    user_id: DataTypes.INTEGER,
  }, {
    underscored: true,
  });
  article.associate = function(models) {
    // associations can be defined here
    article.belongsTo(models.user)
  };
  return article;
};