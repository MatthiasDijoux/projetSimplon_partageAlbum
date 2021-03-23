
module.exports = (sequelize, Sequelize) => {
    const Access_with_mail = sequelize.define("access_with_mail", {
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },access_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      has_access: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    });
    return Access_with_mail;
  };