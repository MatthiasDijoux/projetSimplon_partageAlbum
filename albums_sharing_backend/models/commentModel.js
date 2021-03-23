
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },      
    });
    return Comment;
  };