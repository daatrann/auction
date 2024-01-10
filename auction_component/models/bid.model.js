const mongoose = require("mongoose");

const bidSchema = mongoose.Schema({
    name: {
        type: String,
    },
    time_remain: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    image: [
        {
            type: String,
        },
    ],
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: String,
    },
    top_ownerships: [
        {
            name: {
                type: String,
            },
            amount: {
                type: Number,
            },
        },
    ],
    status: {
        type: String,
    },
});

module.exports = mongoose.model("bid", bidSchema);
