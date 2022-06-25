const Category = require('../models/category');

exports.GetCategory = async (req, res) => {
    try {
        const caterorys = await Category.find();

        res.status(200).render('category/category', {
            caterorys
        });

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.GetCategoryAdd = async (req, res) => {
    try {
        res.status(200).render('category/categoryAdd');

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.GetCategoryEdit = async (req, res) => {
    try {
        const caterory = await Category.findById(req.params.id);
        
        res.status(200).render('category/categoryUpdate', {
            caterory
        });

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.PostCategoryAdd = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(200).redirect('/api/categorys');

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.PutCategoryEdit = async (req, res) => {
    try {
        const newCategory = await Category.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
        });
        res.status(200).redirect('/api/categorys');

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
exports.DeleteCategoryDelete = async (req, res) => {
    try {
        const product = await Category.findByIdAndDelete(req.params.id);

        res.status(200).redirect('/api/categorys');

    } catch (error) {
        res.status(400).json(error);
    }
};