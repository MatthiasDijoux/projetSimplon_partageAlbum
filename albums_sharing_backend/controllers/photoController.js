const db = require("../models");
const Photo = db.photo;

exports.findAll = (req, res) => {
    Photo.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Photos."
            });
        });
};