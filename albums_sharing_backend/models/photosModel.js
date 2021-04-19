module.exports = (sequelize, Sequelize) => {
    return sequelize.define("photos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        source: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
  };