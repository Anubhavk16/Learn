
const productsService = require("../services/products");
const Products = require("../models/products");
const Price = require("../models/price");
const Rating=require("../models/ratings");
const Images=require("../models/images");
const Category = require("../models/category");

const EventEmitter = require('events');
const event = new EventEmitter();
event.on("countAPI",()=>{
  count++;
  console.log("event called",count)
})
let count=0

const mongoose = require('mongoose');

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

      


      

      const categories=  await Category.find();
      for (const category of categories)
      await Products.updateMany(
        { category: category.category }, 
        { $set: { categoryId: category._id } } 
      );

    


      // Insert data into the products table
      const product = new Products({
        
        title: item.title,
        description: item.description,
        brand: item.brand,
        category: item.category,
        categoryId: category._id,
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

      const existingCategory = await Category.findOne({ category: item.category });

      if (!existingCategory) {
        // If the category doesn't exist, insert it into the Category table
        const category = new Category({
          category: item.category,
        });
        await category.save();
        
      };
      

      // await category.save();




     
    

      
     }
  
  

    res.status(200).json({ success: true, data: "inserted" });
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
  


  }


const getdata=async(req,res)=>{
  try{
    
    const joinedDataCursor = await Products.aggregate([
      {
        $lookup: {
          from: 'prices',
          localField: '_id',
          foreignField: 'productId',
          as: 'price',
        },
      },
      {
        $unwind: '$price',
      },
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'productId',
          as: 'rating',
        },
      },
      {
        $unwind: '$rating',
      },
      {
        $lookup: {
          from: 'images',
          localField: '_id',
          foreignField: 'productId',
          as: 'image',
        },
      },
      {
        $unwind: '$image',
      },
      {
        $project:{
          title: 1,
          description:1,
          brand: 1,
          category: 1,
          price: '$price.price' ,
          rating: '$rating.rating' ,
          images: '$image.image',
        }
      }
    ]).exec();
    

    res.json(joinedDataCursor);

  }catch(error){
    res.status(400).send(error.message)
  }
}
async function getcategory(req,res){
  try{
    const categories=await Category.find()
    res.json(categories)

  }catch(error){
    res.status(500).json({ error: error.message });

  }

}

const getproducts=async(req, res)=> {
  const category = req.body.category;
  event.emit("countAPI")
  

  try {
    
    const joinedDataCursor = await Products.aggregate([
      {
        $lookup: {
          from: 'prices',
          localField: '_id',
          foreignField: 'productId',
          as: 'price',
        },
      },
      {
        $unwind: '$price',
      },
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'productId',
          as: 'rating',
        },
      },
      {
        $unwind: '$rating',
      },
      {
        $lookup: {
          from: 'images',
          localField: '_id',
          foreignField: 'productId',
          as: 'image',
        },
      },
      {
        $unwind: '$image',
      },
      
      {
        $project: {
          title: 1,
          description: 1,
          brand: 1,
          category: 1,
          
          categoryId:1,
          price: '$price.price',
          rating: '$rating.rating',
          images: '$image.image',
          
        },
      },
    ]);

    res.json(joinedDataCursor);
  
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}




module.exports = { getallmobiles,getdata,getcategory,getproducts};


