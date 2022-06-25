const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const app = express();

// Set methodOverride
app.use(methodOverride('_method'));

// Set fileUpload
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to db
var config = require('./config/db.js');
mongoose.connect(config.database);
var db  = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function() {
    console.log('Connection to MongoDB');
})

// 2 handler
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');

// 3 routers

app.use('/api/categorys',categoryRouter);
app.use('/api/products',productRouter);


app.all('*',(req, res,next)=>{
    res.status('404').json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on server`,
    });
    next();
});


// 4 server
var port = 3000;
app.listen(port,function() {
    console.log('Máy chủ hoạt động trên URL:' + port);
})