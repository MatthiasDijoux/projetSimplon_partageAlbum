
require('dotenv').config();

let jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET

/* Récupération du header bearer */
let extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Vérification du token */
let checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé' })
    }

    // Véracité du token
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Token non valide' })
        } else {
            return next()
        }
    })
}

exports.extractBearerToken = extractBearerToken

exports.checkTokenMiddleware = checkTokenMiddleware