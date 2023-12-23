module.exports = app => {
    const categories = require("../controllers/category.controller");
    var router = require("express").Router();
    router.post("/createCategory", categories.createCategory);
    router.get("/findCategories", categories.findCategories);
    app.use('/api/categories', router);
};