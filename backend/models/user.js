'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    underscored: true,
    defaultScope:{
      attributes:{
        exclude: ['created_at']
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.article, { foreignKey: 'user_id' })
  };
  return user;
};