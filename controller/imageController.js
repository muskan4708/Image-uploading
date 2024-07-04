const multer = require("multer");
const path = require("path");
const categoryModel = require("../models/category");

const dotenv =require("dotenv")
dotenv.config({path: './config/.env'})
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("file");

const uploadImage = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: "Error uploading file" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { name, description } = req.body;
    const image_Url = req.file.filename;

    // Assuming your base URL is http://localhost:3005/api/get/
    const baseUrl = process.env.IMAGE_BASE_URL;
    const fullImageUrl = baseUrl + image_Url;

    categoryModel
      .create({ name, image_Url: fullImageUrl, description })
      .then((result) => res.json(result))
      .catch((err) => {
        console.error("Database error:", err);
        res.status(500).json({ error: "Error saving to database" });
      });
  });
};

const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("imageID", id);
    const image = await categoryModel.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json(image);
  } catch (err) {
    console.error("Error fetching image by ID:", err);
    res.status(500).json({ error: "Error fetching image by ID" });
  }
};

const getImageByFilename = async (req, res) => {
    try {
      const { filename } = req.params;
      const image = await categoryModel.findOne({ image_Url: filename });
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      const filePath = path.join(__dirname, "../images", filename);
      res.sendFile(filePath);
    } catch (err) {
      console.error("Error fetching image by filename:", err);
      res.status(500).json({ error: "Error fetching image by filename" });
    }
  };

const getAllImages = async (req, res) => {
  debugger;
  try {
    const images = await categoryModel.find({});
    res.json(images);
    console.log("images", images);
  } catch (err) {
    console.error("Error fetching all images:", err);
    res.status(500).json({ error: "Error fetching all images" });
  }
};

module.exports = {
  uploadImage,
  getImageById,
  getImageByFilename,
  getAllImages,
};
