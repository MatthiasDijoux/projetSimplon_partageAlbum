const db = require("../models");
const User = db.user;

exports.checkDuplicateEmail = (req, res, next) => {
  // Aucune information à traiter
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Error. Please enter email and password' })
  }
  
  // Users
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
      // Email
      if (user) {
        res.status(400).send("Failed! Email is already in use!");
        return;
      }
            
      next();
  });
};