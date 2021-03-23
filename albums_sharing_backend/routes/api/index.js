let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const userController = require("../../controllers/userController.js");
const authController = require("../../controllers/authControler");
const {checkTokenMiddleware, extractBearerToken} = require("../../middlewares/authMiddlewares")
const {checkDuplicateEmail} = require('../../middlewares/verifSignup')

/* Formulaire de connexion */
router.post('/login', authController.login)
/*  Inscription */
router.post('/register', checkDuplicateEmail, userController.create)

/*** Début Route protégé ***/
// router.get('/secret-route', checkTokenMiddleware, (req, res) => {
// //   // Récupération du token
// //   const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
// //   // Décodage du token
// //   const decoded = jwt.decode(token, { complete: false })

// //   return res.json({ content: decoded })
// })
router.get('/secret-route', checkTokenMiddleware, (req, res) => {
    return res.json({ "Accès à la route protégé": "OK" })
})

router.post('/secret-route', checkTokenMiddleware, (req, res) => {
    return res.json({ "Accès à la route protégé": "OK" })
})

/*** Fin Route protégé ***/
/*  Test POST */
router.post('/test', (req, res) => {
    return res.status(404).json({ message: 'Test POST' })
})

/*  Test GET */
router.get('/test', (req, res) => {
    return res.status(404).json({ message: 'Test GET' })
})

router.get('*', (req, res) => {
    return res.status(404).json({ message: 'Ressource introuvable' })
})

module.exports = router;
