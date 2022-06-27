const Product = require('../models/product');


exports.GetProduct = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).render('product/product', {
            products
        });

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.GetProductAdd = async (req, res) => {
    try {

        res.status(200).render('product/productAdd');

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.GetProductEdit = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.status(200).render('product/productUpdate', {
            product
        });

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.PostProductAdd = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        
        res.status(200).redirect('/api/products');
        
    } catch (error) {
        res.status(400).json(error);
    }
};
exports.PutProductEdit = async (req, res) => {
    try {
        const newProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
        });
        res.status(200).redirect('/api/products');

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
exports.DeleteProductDelete = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).redirect('/api/products');

    } catch (error) {
        res.status(400).json(error);
    }
};