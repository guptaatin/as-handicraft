const fs = require("fs");

const db = require("../models");
const Image = db.images;

const uploadFiles = async (req, res) => {
    try {
        console.log(req.files);

        if (req.files.length == 0) {
            return res.send(`You must select a file.`);
        }

        req.files.forEach(element => {
            Image.create({
                type: element.mimetype,
                name: element.originalname,
                data: fs.readFileSync(
                    __basedir + "/resources/static/assets/uploads/" + element.filename
                ),
            }).then((image) => {
                fs.writeFileSync(
                    __basedir + "/resources/static/assets/tmp/" + image.name,
                    image.data
                );
            });
        });
        return res.send(`Files has been uploaded.`);
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

module.exports = {
    uploadFiles,
};