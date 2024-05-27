const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    AdminID: { type: String, required: true },
    Password: { type: String, required: true }
}, { collection: "Admin-data" });

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;