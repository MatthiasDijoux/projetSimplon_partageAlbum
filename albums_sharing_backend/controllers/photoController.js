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
                    err.message || "Some error occurred while retrieving User."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.idPhoto;

    Photo.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Photo with id=" + id
            });
        });
};

// Create and Save a new User
exports.create = async (req, res) => {

    // Validate request
    if (!req.file) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const photo = {
        nom: req.file.filename,
        source: req.file.path
    };

    // Save user in the database
    Photo.create(photo)
        .then(data => {
            res.send(data);

            const dataToSend = {nom: photo.nom, source: photo.source}

            return res.json({ id: photo.id, nom: photo.nom, source: photo.source })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while uploading the photo."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.idPhoto;

    Photo.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Photo with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.idPhoto;

    Photo.destroy({
        where: {
            id: id
        }
    }).then(
        res.status(200).send({
            message: "Votre photo à bien été supprimé!"
        })
    );
};