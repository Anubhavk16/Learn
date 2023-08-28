const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    title :{
        type:String, 
        required: true
    },
    description :{
        type:String, 
        required: true
    },
    brand :{
        type:String, 
        required: true
    },
    categoryId :{
        
        type:Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
})

const Products = mongoose.model("product", productsSchema);
module.exports = Products;
