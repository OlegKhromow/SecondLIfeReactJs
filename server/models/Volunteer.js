const mongoose = require("mongoose");
const cardSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phoneNumber: {type: String,  require: true},
    registrationDate: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('volunteer', cardSchema);