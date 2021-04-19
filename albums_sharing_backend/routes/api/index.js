let express = require('express');
let router = express.Router();
const userController = require("../../controllers/userController.js");
const authController = require("../../controllers/authControler");
const albumController = require("../../controllers/albumController.js");
const photoController = require("../../controllers/photoController.js");
const {checkTokenMiddleware} = require("../../middlewares/authMiddlewares")
const {checkDuplicateEmail} = require('../../middlewares/verifSignup')
const multer = require('multer');
const path = require('path');
const helpers = require("./index");

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/images');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

/* Formulaire de connexion */
router.post('/login', authController.login)
/*  Inscription */
router.post('/register', checkDuplicateEmail, userController.create)

/*Route get on album*/
router.get('/albums', albumController.findAll)

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

/*** Test Upload de photo ***/
router.post('/upload', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('file');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        console.log(req.file.filename)

        photoController.create(req, res).then(r => console.log(r));

        // Display uploaded image for user validation
        res.send(`your image has been uploaded!`);
    });
});

/*** Route get on all photos ***/
router.get('/photos', photoController.findAll)

/*** Route get on one photo ***/
router.get('/photo/:idPhoto', photoController.findOne)

/*** Route delete on one photo ***/
router.delete('/photo/:idPhoto', photoController.delete)

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

exports.imageFilter = imageFilter;

/***  Test POST ***/
router.post('/test', (req, res) => {
    return res.status(404).json({ message: 'Test POST' })
})

/***  Test GET ***/
router.get('/test', (req, res) => {
    return res.status(404).json({ message: 'Test GET' })
})

router.get('*', (req, res) => {
    return res.status(404).json({ message: 'Ressource introuvable' })
})

module.exports = router;
