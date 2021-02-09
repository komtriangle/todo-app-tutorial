const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QA = new mongoose.Schema({
    Question: {
        type: String,
        unique: true,
        required: true
    },
    Answer:{
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    }
    //[{ type: Schema.Types.ObjectId, ref: 'Cat' }]
});

const QAModel  = mongoose.model("QA", QA);

module.exports = QAModel;