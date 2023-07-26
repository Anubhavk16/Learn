const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageschema = new Schema({
    image: {
        type: Array,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
});

const Image = mongoose.model("image", imageschema);
module.exports = Image;
