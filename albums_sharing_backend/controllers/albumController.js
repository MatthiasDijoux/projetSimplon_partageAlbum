const db = require("../models");
const Album = db.album;

exports.findAll = (req, res) => {
    Album.findAll()
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