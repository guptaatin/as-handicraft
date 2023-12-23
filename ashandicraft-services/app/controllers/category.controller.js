const db = require("../models");
const Category = db.categories;

exports.createCategory = async (req, res) => {
    Category.create({ name: req.body.name })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        });
};

exports.findCategories = async (req, res) => {
    Category.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Categories."
            });
        });
};