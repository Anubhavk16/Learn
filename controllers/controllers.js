
const productsService = require("../services/products");
const Products = require("../models/products");
const Price = require("../models/price");
const Rating=require("../models/ratings");
const Images=require("../models/images")

async function getallmobiles(req, res) {
  try {
    const data = await fetch(
      "https://dummyjson.com/products?limit=100&skip=0",
      {
        method: "Get",
      }
    ).then((res) => res.json());

    const alldata = data.products;
    for (const item of alldata) {
      console.log(item);

      // Insert data into the products table
      const product = new Products({
        title: item.title,
        description: item.description,
        brand: item.brand,
        category: item.category,
      });

      await product.save();

      // Insert data into the prices table
      const price = new Price({
        price: item.price,
        productId: product._id, // Use the ObjectId of the newly inserted product
      });

      await price.save();

      
      const rating = new Rating({
        rating: item.rating, 
        productId: product._id, 
        message:"", 
      });

      await rating.save();

      const image = new Images({
        image: item.images, 
        productId: product._id 
        
      });

      await image.save()




     
    

      
    }
  
  

    res.status(200).json({ success: true, data: "inserted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  



}
const getdata=async(req,res)=>{
  try{
    var data=await Products.aggregate([
      {$unionWith:"prices"},
      {$unionWith:"ratings"},
      {$unionWith:"images"}
    ]);
    res.status(200).send({data:data});
  }catch(error){
    res.status(400).send(error.message)
  }
}
module.exports = { getallmobiles,getdata };


