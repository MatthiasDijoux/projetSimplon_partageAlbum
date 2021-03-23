
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("notifications", {
      opened: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
    return User;
  };