const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");
const controllers=require("../controllers/controllers")
const authenticateUser=require("../middleware/authentication")


router.post("/", collectionController.checkData);
router.post("/signup", collectionController.signup);
router.get("/getdata",controllers.getallmobiles);
router.post('/postalldata', controllers.getallmobiles);
router.get("/get-data",controllers.getdata);
router.get('/getcategories',controllers.getcategory);
router.get('/getproducts',controllers.getproducts);






module.exports = router;
