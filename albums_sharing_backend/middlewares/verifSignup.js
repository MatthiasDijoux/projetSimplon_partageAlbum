const db = require("../models");
const User = db.user;

exports.checkDuplicateEmail = (req, res, next) => {
  // Aucune information à traiter
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Veuillez saisir votre identifiant (email) et mots de passe' })
  }
  
  // Users
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
      // Email
      if (user) {
        res.status(400).send({message: "Adresse email déjà utilisé!"});
        return;
      }
            
      next();
  });
};