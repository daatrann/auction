const mongoose = require("mongoose");

const supportSchema = mongoose.Schema({
    sender: {
        type: String,
    },
    recipient: {
        type: String,
    },
    content: {
        type: String,
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model("support", supportSchema);
