module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
        cart_quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 1, // Default value or change based on your needs
        },
        cart_amount: {
            type: Sequelize.FLOAT
        },
    });

    return Cart;
};