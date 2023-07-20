const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");

router.get("/get", collectionController.getData);
router.get("/databyId", collectionController.getDatabyId);
router.post("/", collectionController.checkData);
router.post("/signup", collectionController.signup);
router.delete('/delete/:userId',collectionController.deleteUser);
router.post("/update", collectionController.updateUser);
router.get("/paginatedUsers", collectionController.paginatedUsers);



module.exports = router;
