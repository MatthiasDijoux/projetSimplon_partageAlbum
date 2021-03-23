
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("photos", {
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return User;
  };