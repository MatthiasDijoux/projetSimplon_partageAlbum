const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;
const userController = require("./userController");
require('dotenv').config();

var jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET

exports.login = async (req, res) => {
 
  // Pas d'information à traiter
  console.log("Req Body : ",req.body)
  if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Error. Please enter the correct email and password' })
  }

  const user = await userController.findOneByEmail(req,res)

  if(user) {
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
  
    if (!passwordIsValid) {
      // return res.status(401).send({
      //   accessToken: null,
      //   message: "Invalid Password!"
      // });
      return res.status(401).send({ message: "Mots de passe incorrect!"});
    }
  }

  // Pas bon
  if (!user) {
      return res.status(400).json({ message: 'Identifiant incorrect' })
  }

  const token = jwt.sign({
      id: user.id,
      email: user.email
  }, SECRET, { expiresIn: '3 hours' })

  return res.json({ id: user.id, email: user.email, accessToken: token })
};