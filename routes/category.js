var express = require('express');
var router = express.Router();
var Category = require('../controllers/categoryController');

router.get('/', Category.GetCategory);


router.get('/category-add',Category.GetCategoryAdd);


router.post('/add',Category.PostCategoryAdd);


router.get('/edit/:id', Category.GetCategoryEdit);


router.put('/update/:id',Category.PutCategoryEdit);


router.delete('/delete/:id',Category.DeleteCategoryDelete);



// Exports
module.exports = router;