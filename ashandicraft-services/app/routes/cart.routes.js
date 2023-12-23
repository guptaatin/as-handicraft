module.exports = app => {
    const carts = require("../controllers/cart.controller");
    var router = require("express").Router();
    router.post("/cartCreate/users/:userId/cart/products/:productId", carts.cartCreate);
    router.get("/getProductsAndCartOfUser/users/:userId/cart", carts.getProductsAndCartOfUser);
    router.delete("/clearCart/:cartId", carts.clearCart);
    app.use('/api/carts', router);
};