const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
    user_id: {
        type: String,
    },
    auction_id: {
        type: String,
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model("wishlist", wishlistSchema);
