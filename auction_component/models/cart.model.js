const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    user_id: {
        type: String,
    },
    bid_id: {
        type: String,
    },
    price: {
        type: String,
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model("cart", cartSchema);
