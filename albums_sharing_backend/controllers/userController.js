const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;
const {sendMail} = require('../utils/MailHandler/SendMail')

require('dotenv').config();

var jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET

// Create and Save a new User
exports.create = async (req, res) => {
  
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  // Create a User
  const user = {
    email: req.body.email,
    nom: req.body.nom,
    prenom: req.body.prenom,
    password: hashedPassword,
  };

  // Save user in the database
  User.create(user)
    .then(data => {
      // res.send(data);
      const token = jwt.sign({
        id: data.id,
        email: data.email
      }, SECRET, { expiresIn: '3 hours' })
    
      const dataToSend = {nom: user.nom, prenom: user.prenom, token}
      const recipient = user.email
      const links = {confirmLink: `/login?token=${token}`}
      const mailType = 'confirmMail'
      sendMail(dataToSend, recipient, links, mailType)

      return res.json({ id: user.id, email: user.email, accessToken: token })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Find a single User by email
exports.findOneByEmail = async (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  const user = await User.findOne({ where: { email: req.body.email } });

  if (user === null) {
    console.log('Not found!');
  } else {
    // console.log(user instanceof user); // true
    console.log(user.email); // 'Email'
    return user
  }
}
// Update a User by the id in the request
exports.update = (req, res) => {
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  
};