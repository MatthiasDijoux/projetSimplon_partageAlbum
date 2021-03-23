'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); 

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./usersModel")(sequelize, Sequelize);
db.album = require("./albumsModel")(sequelize, Sequelize);
db.photo = require("./photosModel")(sequelize, Sequelize);
db.access = require("./accessModel")(sequelize, Sequelize);
db.comment = require("./commentModel")(sequelize, Sequelize);
db.notification = require("./notificationModel")(sequelize, Sequelize);
db.access_with_mail = require("./access_with_mailModel")(sequelize, Sequelize);

db.album.belongsTo(db.user);
db.access.belongsTo(db.user);
db.notification.belongsTo(db.user);
db.comment.belongsTo(db.user);
db.comment.belongsTo(db.album);
db.photo.belongsTo(db.photos);
db.access_with_mail.belongsTo(db.album);
db.access.belongsTo(db.album);

module.exports = db;