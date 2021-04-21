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
exports.create = async (req, res) => {

    // Validate request
    if (!req.body.name || !req.body.userId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    // Create a User
    const album = {
        name: req.body.name,
        userId: req.body.userId,
    };

    // Save user in the database
    Album.create(album)
        .then(data => {
            res.send(data);
            return res.json({ id: user.id, name: user.name, userId: user.userId })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Album."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Album.destroy({
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

exports.update = (req, res) => {
    const id = req.params.id;

    Album.findOne({
        where: { id: id }
    }).then(album => {
        if (album) {
            album.update({
                name: req.body.name,
                userId: req.body.userId
            })
            res.send({
                message: "Album modifié"

            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier cet album"
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    Album.findOne({
        where: { id: id }
    }).then(album => {
        res.send({
            message: album

        });
    })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de récupérer cet album"+err
            });
        });
};