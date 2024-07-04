const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
   image_Url: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        trim:true,
    },
    createdAt: {
        type: Date,
      default: Date.now
     },
});

const categoryModel = mongoose.model("Images_test", categorySchema);
module.exports = categoryModel;
