const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingschema = new Schema({
    rating: {
        type: String,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    message:{
        type:String
        
    },
});

const Rating = mongoose.model("rating", ratingschema);
module.exports = Rating;
