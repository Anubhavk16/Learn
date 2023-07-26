const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceschema = new Schema({
    price: {
        type: String,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
});

const Price = mongoose.model("price", priceschema);
module.exports = Price;
