
module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define("albums", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Album;
  };
  