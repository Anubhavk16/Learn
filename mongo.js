const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://anubhavkhare:anubhav%40123@cluster0.y1uhuh8.mongodb.net/demo")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})



const collection = mongoose.model("collection",newSchema)

module.exports=collection
