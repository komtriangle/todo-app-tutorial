const mongoose = require("mongoose");

const Category = new mongoose.Schema({
    task: {
        type: String,
        unique: true,
        required: true
    }
});

const catModel  = mongoose.model("Cat", Category);

module.exports = catModel;