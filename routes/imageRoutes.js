const express = require("express");
const router = express.Router();
const { uploadImage, getImageById, getImageByFilename, getAllImages } = require("../controller/imageController");

router.post("/uploadCategory", uploadImage);
router.get("/get/categoryById/:id", getImageById);
router.get("/get/:filename", getImageByFilename);
router.get("/AllCategories",getAllImages)

module.exports = router;
