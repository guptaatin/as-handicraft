const db = require("../models");
const fs = require("fs");
const Product = db.products;
const Image = db.images;
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.productCreate = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Product can't be created!"
        });
        return;
    }

    if (req.files.length == 0) {
        return res.send(`You must select a file.`);
    }

    const product = {
        name: req.body.name,
        price: req.body.price,
        categoryId: parseInt(req.body.categoryId)
    };

    Product.create(product)
        .then(data => {
            req.files.forEach(element => {
                return Image.create({
                    type: element.mimetype,
                    name: element.originalname,
                    product_id: data.id,
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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.findProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        // Find the product by ID
        const product = await Product.findByPk(productId, {
            include: [{ model: Image, as: 'image' }, { model: Category, as: 'category' }],
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addViewToProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        // Find the product by ID
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Increment view count by 1
        await product.increment('viewCount', { by: 1 });

        res.status(200).json({ message: 'View incremented successfully' });
    } catch (error) {
        console.error('Error incrementing view:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.findAllProducts = async (req, res) => {
    const { sort, categories, minPrice, maxPrice } = req.query;

    try {
        let products;
        let whereCondition = {}; // Initialize where condition for filtering

        // Apply filters based on query parameters
        if (categories) {
            const categoryIds = categories.split(',').map(Number); // Convert category IDs to an array of integers
            whereCondition.CategoryId = {
                [Op.in]: categoryIds,
            };
        }

        if (minPrice && maxPrice) {
            whereCondition.price = {
                [Op.between]: [minPrice, maxPrice],
            };
        } else if (minPrice) {
            whereCondition.price = {
                [Op.gte]: minPrice,
            };
        } else if (maxPrice) {
            whereCondition.price = {
                [Op.lte]: maxPrice,
            };
        }

        // Apply sorting based on the 'sort' parameter
        switch (sort) {
            case 'popularity':
                products = await Product.findAll({
                    include: [{ model: Image, as: 'image' }],
                    where: whereCondition, // Apply filters
                    order: [['viewCount', 'DESC']], // Sort by createdAt in descending order
                });
                break;
            case 'newest':
                // Sorting by newest
                products = await Product.findAll({
                    include: [{ model: Image, as: 'image' }],
                    where: whereCondition, // Apply filters
                    order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
                });
                break;
            case 'priceHighToLow':
                // Sorting by price high to low
                products = await Product.findAll({
                    include: [{ model: Image, as: 'image' }],
                    where: whereCondition, // Apply filters
                    order: [['price', 'DESC']], // Sort by price in descending order
                });
                break;
            case 'priceLowToHigh':
                // Sorting by price low to high
                products = await Product.findAll({
                    include: [{ model: Image, as: 'image' }],
                    where: whereCondition, // Apply filters
                    order: [['price', 'ASC']], // Sort by price in ascending order
                });
                break;
            default:
                // Default case: No sorting specified or invalid sorting parameter
                products = await Product.findAll({
                    include: [{ model: Image, as: 'image' }],
                    where: whereCondition, // Apply filters
                });
                break;
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};