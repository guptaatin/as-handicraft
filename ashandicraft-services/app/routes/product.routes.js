module.exports = app => {
    const products = require("../controllers/product.controller");
    const upload = require("../middlewares/upload");
    var router = require("express").Router();
    router.post("/createProduct", upload.array("file", 4), products.productCreate);
    router.get("/findAllProducts", products.findAllProducts);
    router.get("/findProduct/:productId", products.findProduct);
    router.post("/addViewToProduct/:productId/view", products.addViewToProduct);
    app.use('/api/products', router);
};