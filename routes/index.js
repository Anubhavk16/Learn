const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");
const controllers=require("../controllers/controllers")
const authenticateUser=require("../middleware/authentication")

router.get("/get", collectionController.getData);
router.get("/databyId", collectionController.getDatabyId);
router.post("/", collectionController.checkData);
router.post("/signup", collectionController.signup);
router.delete('/delete/:userId',collectionController.deleteUser);
router.put('/update/:id', authenticateUser, collectionController.updateUser);
router.get("/paginatedUsers",authenticateUser, collectionController.paginatedUsers);
router.get("/getdata",controllers.getallmobiles);
router.post('/postalldata', controllers.getallmobiles);
router.get("/getdata",controllers.getdata);



module.exports = router;
