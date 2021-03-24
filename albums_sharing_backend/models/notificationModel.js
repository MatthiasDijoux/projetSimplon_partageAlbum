
module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notifications", {
      opened: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
    return Notification;
  };