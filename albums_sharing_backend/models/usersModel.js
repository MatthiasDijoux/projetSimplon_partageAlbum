
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pseudo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      token_verif: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
      },
    });
    return User;
  };