
module.exports = (sequelize, Sequelize) => {
    const Access = sequelize.define("access", {
      access_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      has_access: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    });
    return Access;
  };