
User = require('./usersModel');
module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("albums", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    },
  });
  return Album;
};
