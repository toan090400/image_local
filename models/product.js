var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema({
    name:{
        type: String,
    },
    image:[
        {
            type: Object,
        }
    ],
    
},{
    timestamps: true,
});

var Product = module.exports = mongoose.model('Product',ProductSchema);