const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model("category", categorySchema);
