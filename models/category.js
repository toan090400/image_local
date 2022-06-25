var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema({
    name:{
        type: String,
    },
    image:{
        type: String,
    },
    
},{
    timestamps: true,
});

var Category = module.exports = mongoose.model('Category',CategorySchema);