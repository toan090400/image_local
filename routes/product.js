var express = require('express');
var router = express.Router();
var Product = require('../controllers/productController');

router.get('/', Product.GetProduct);


router.get('/product-add',Product.GetProductAdd);


router.post('/add',Product.PostProductAdd);


router.get('/edit/:id', Product.GetProductEdit);


router.put('/update/:id',Product.PutProductEdit);


router.delete('/delete/:id',Product.DeleteProductDelete);



// Exports
module.exports = router;