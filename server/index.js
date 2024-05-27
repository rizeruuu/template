const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Admin = require("./Admin.model");
const ImageDetails = require("./image.model");
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');

app.use(cors());
app.use(bodyParser.json());

const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// MongoDB connection setup...
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//TESSSSSSSSSSTTTTTTTTTTTTT START SA SIGNUP
// Create a new user
app.post("/addAdmin", async (req, res) => {
  const { AdminID, Password } = req.body;
  try {
    const admin = new Admin({ AdminID, Password });
    await admin.save();
    res.json({ success: true, message: "Admin added successfully!" });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/viewAdmin", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error("Error fetching Admin data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// END SA LOGIN

// add ng menu 
app.post("/upload-image", upload.single('file'), async (req, res) => {
  const { name, price, description} = req.body;
  const { buffer, mimetype } = req.file;

  try {
    const compressedImage = await sharp(buffer)
      .resize({ width: 800 }) // Resize to 800px width
      .toFormat('jpeg') // Convert to JPEG to reduce size
      .jpeg({ quality: 80 }) // Compress the image
      .toBuffer();

    const base64String = compressedImage.toString('base64');
    await ImageDetails.create({ image: base64String, Name: name, Price: price, Description: description });
    res.send({ Status: "ok" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.send({ Status: "error", data: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    const data = await ImageDetails.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Delete endpoint
app.delete("/delete-image/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ImageDetails.findByIdAndDelete(id);
    if (result) {
      res.send({ status: "ok", message: "Image deleted successfully" });
    } else {
      res.status(404).send({ status: "error", message: "Image not found" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).send({ status: "error", message: error.message });
  }
});
app.put("/update-image/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const updatedImageDetails = await ImageDetails.findByIdAndUpdate(
      id,
      { Name: name, Price: price, Description: description },
      { new: true }
    );

    if (updatedImageDetails) {
      res.send({ status: "ok", message: "MenuItems updated successfully" });
    } else {
      res.status(404).send({ status: "error", message: "MenuItems not found" });
    }
  } catch (error) {
    console.error("Error updating MenuItems:", error);
    res.status(500).send({ status: "error", message: error.message });
  }
});

//end nung sa menu

const port = 1333;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});