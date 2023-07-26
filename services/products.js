

const Products = require("../models/products");


async function insertData(item) {
  try {
    const newProduct = new Products({
      title: item.title,
      description: item.description,
      brand: item.brand,
      category: item.category,
    });

    const result = await newProduct.save();
    return result;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  insertData,
};
