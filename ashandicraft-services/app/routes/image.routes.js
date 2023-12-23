module.exports = app => {
    const images = require("../controllers/image.controller");
    const upload = require("../middlewares/upload");
    var router = require("express").Router();
    router.post("/uploadImage", upload.array("file", 4), images.uploadFiles);
    app.use('/api/images', router);
};