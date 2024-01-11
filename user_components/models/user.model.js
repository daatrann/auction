const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
    },
    full_name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    identity: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
    },
});

module.exports = mongoose.model("user", userSchema);
