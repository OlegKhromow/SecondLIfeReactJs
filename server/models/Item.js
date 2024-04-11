const mongoose = require("mongoose");
const cardSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    addition_date: { type: Date, required: true },
    count: {type: Number, default: 0, required: true},
    volunteerId: { type: String, required: true },
    categoryId: { type: String, required: true },
});

module.exports = mongoose.model('item', cardSchema);