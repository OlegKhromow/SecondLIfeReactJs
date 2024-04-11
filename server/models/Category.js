const mongoose = require("mongoose");
const cardSchema = mongoose.Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model('category', cardSchema);