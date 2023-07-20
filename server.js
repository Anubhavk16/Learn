// const express = require("express")
// const collection = require("./mongo")
// const cors = require("cors")
// const app = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cors())



// app.get("/get",cors(),async (req,res)=>{
//     try {
//         const data= await collection.find();
//         res.json(data)
//     } catch (error) {
//         console.log(`could not fetch data ${error}`)
        
//     }
// })

// app.post("/",async(req,res)=>{
//     const{email,password}=req.body

//     try{
//         const check=await collection.findOne({email:email})

//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("notexist")
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })



// app.post("/signup",async(req,res)=>{
//     const{email,password}=req.body

//     const data={
//         email:email,
//         password:password
//     }

//     try{
//         const check=await collection.findOne({email:email})

//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("notexist")
//             await collection.insertMany([data])
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })



// app.listen(8000,()=>{
//     console.log("port connected");
// })

// module.exports={app}



const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
require("./config/dbconnection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
