const express = require("express");
const mongoose = require("mongoose");
const imageRoutes = require("./routes/imageRoutes");
const dotenv =require("dotenv")
const path = require("path"); 
dotenv.config({path: './config/.env'})

const app = express();
app.use(express.json());

const MONGODB_URL = process.env.MONGO_URL;

app.use("/images", express.static(path.join(__dirname, "images")));

// Connect to MongoDB
mongoose
    .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

// Use routes
app.use("/api", imageRoutes);

// Start server
const PORT =3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
