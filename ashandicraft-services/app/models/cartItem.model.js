module.exports = (sequelize, Sequelize) => {
    const CartItem = sequelize.define('CartItem', {
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 1, // Default value or change based on your needs
        },
        amount: {
            type: Sequelize.FLOAT
        },
    });

    return CartItem;
};