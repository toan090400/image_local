const Category = require('../models/category');

var mkdirp = require('mkdirp');
var fs = require('fs-extra');
// var resizeImg = require('resize-img');

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
        // const newCategory = await Category.create(req.body);
        // res.status(200).redirect('/api/categorys');

        let imageFile = "";
        let name = req.body.name;
        if (req.files && typeof req.files.image !== "undefined"){
            imageFile = req.files.image.name;
        };
        var category = new Category({
            name: name,
            image: imageFile,
        });

        category.save(function (err) {
            if (err){
                return console.log(err);
            }
                
            mkdirp('public/category/' + category.name, function (err) {
                return console.log(err);
            });

            // mkdirp('public/category/' + category.name + '/gallery', function (err) {
            //     return console.log(err);
            // });

            // mkdirp('public/category/' + category.name + '/gallery/thumbs', function (err) {
            //     return console.log(err);
            // });

            if (imageFile != "") {
                var categoryImage = req.files.image;
                var path = 'public/category/' + category.name + '/' + imageFile;

                categoryImage.mv(path, function (err) {
                    return console.log(err);
                });
            }

            res.redirect('/api/categorys');
        });

    } catch (error) {
        res.status(400).json(error);
    }
};
exports.PutCategoryEdit = async (req, res) => {
    try {
        // const newCategory = await Category.findByIdAndUpdate(req.params.id,req.body,{
        //     new: true,
        //     runValidators: true,
        // });
        // res.status(200).redirect('/api/categorys');
        let name = req.body.name;
        let imageOld = req.body.imageOld;
        let imageFile;
        if (req.files && typeof req.files.image !== "undefined"){
            imageFile = req.files.image.name;    
        };
        Category.findById({_id:req.params.id}, function (err, category) {
            if (err){
                console.log(err);
            }
            
            category.name = name;

            if (imageFile) {
                category.image = imageFile;
            }
            category.save(function (err) {
                if (err)
                    console.log(err);


                if (imageFile) {
                    if (imageOld) {
                        fs.remove('public/category/' + name + '/' + imageOld, function (err) {
                            if (err){
                                console.log(err);
                            }
                        });
                    }

                    var categoryImage = req.files.image;
                    var path = 'public/category/' + name + '/' + imageFile;

                    categoryImage.mv(path, function (err) {
                        return console.log(err);
                    });

                }

                res.redirect('/api/categorys');
            });

        });

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
exports.DeleteCategoryDelete = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        fs.remove('public/category/' + category.name , function (err) {
            if (err){
                console.log(err);
            }
        });
        res.status(200).redirect('/api/categorys');

    } catch (error) {
        res.status(400).json(error);
    }
};