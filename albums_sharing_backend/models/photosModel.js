
module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photos", {
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Photo;
  };