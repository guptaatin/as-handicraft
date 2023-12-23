const db = require("../models");
const Product = db.products;
const User = db.users;
const Cart = db.carts;
const Image = db.images;
const Category = db.categories;

exports.cartCreate = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    try {
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);
        console.log("qwe--->", user, product.price);

        if (!user || !product) {
            return res.status(404).json({ error: 'User or product not found' });
        }

        let carts = {
            userId: userId
        };

        let cart = await Cart.findOne({ where: { UserId: userId } });
        if (!cart) {
            cart = await Cart.create(carts);
        }

        await cart.addProduct(product, { through: { quantity: quantity, amount: quantity * product.price } });
        // Calculate total quantity and total amount
        let updatedCart = await Cart.findOne({
            where: { UserId: userId },
            include: { model: Product, },
        });
        console.log("hg-->", updatedCart);
        const { totalQuantity, totalAmount } = updatedCart.products.reduce(
            (acc, product) => {
                acc.totalQuantity += product.CartItem.quantity || 0; // Add the quantity to totalQuantity
                acc.totalAmount += product.CartItem.amount || 0; // Add the amount to totalAmount
                return acc;
            },
            { totalQuantity: 0, totalAmount: 0 } // Initial values for totalQuantity and totalAmount
        );

        console.log("Total Quantity:", totalQuantity);
        console.log("Total Amount:", totalAmount);
        let newCarts = {
            cart_quantity: totalQuantity,
            cart_amount: totalAmount,
        };
        Cart.update(newCarts, {
            where: { id: updatedCart.id }
        });
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProductsAndCartOfUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({
            where: { UserId: userId },
            include: [{ model: Product, include: [{ model: Image, as: 'image' }, { model: Category, as: 'category' }] }],
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.send(cart);
    } catch (error) {
        console.error('Error fetching products in cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.clearCart = async (req, res) => {
    const { cartId } = req.params;

    try {
        // Find the cart with the specified ID
        const cart = await Cart.findByPk(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Remove all associated cart items (products) from the cart
        await cart.setProducts([]);
        let newCarts = {
            cart_quantity: 0,
            cart_amount: 0,
        };
        Cart.update(newCarts, {
            where: { id: cartId }
        });
        res.status(200).json(cart);

        // res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};