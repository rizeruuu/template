const mongoose = require('mongoose');

const ImageDetailsSchema = new mongoose.Schema({
    image: {type: String, required: true},
    Price: {type: String, required: true},
    Name: {type: String, required: true},
    Description: {type: String, required: true},  // New field for dish information
}, { collection: "Image-data" });

const ImageDetails = mongoose.model('ImageDetails', ImageDetailsSchema);

module.exports = ImageDetails;
