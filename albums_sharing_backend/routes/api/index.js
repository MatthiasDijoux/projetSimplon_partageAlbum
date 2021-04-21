let express = require('express');
let router = express.Router();
const userController = require("../../controllers/userController.js");
const authController = require("../../controllers/authControler");
const albumController = require("../../controllers/albumController.js");
const photoController = require("../../controllers/photoController.js");
const { checkTokenMiddleware } = require("../../middlewares/authMiddlewares")
const { checkDuplicateEmail } = require('../../middlewares/verifSignup')

/* Formulaire de connexion */
router.post('/login', authController.login)
/*  Inscription */
router.post('/register', checkDuplicateEmail, userController.create)

/*Route get on album*/
router.get('/albums', albumController.findAll)
router.get('/album/:id', albumController.findOne)
router.post('/album/create', albumController.create)
router.post('/album/:id/delete', albumController.delete)
router.post('/album/:id/update', albumController.update)

/*Routes photos*/
router.get('/photos', photoController.findAll);

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
