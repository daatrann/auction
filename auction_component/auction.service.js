const Auction = require('./models/bid.model')
const jwt = require('jsonwebtoken')
require("dotenv").config;

const getAllProduct = async () => {
    const data = await Auction.find({ status: "listing" })
    return data
}

const getProductByCategory = async (category) => {
    const data = await Auction.find({ status: "listing", category: category })
    return data
}

const getProductById = async (id) => {
    const data = await Auction.findOne({ _id: id })
    return data
}

const auctionBid = async (id, name, amount) => {
    const data = await Auction.findOne({ _id: id });

    if (!data) {
        return;
    }

    const topOwnerships = data.top_ownerships;
    const OwnershipData = {
        name: name,
        amount: amount,
    };

    let flag = false;

    for (let i = 0; i < topOwnerships.length; i++) {
        if (topOwnerships[i].name === name) {
            await Auction.updateOne(
                { _id: id, 'top_ownerships.name': name },
                {
                    $set: {
                        [`top_ownerships.${i}.name`]: OwnershipData.name,
                        [`top_ownerships.${i}.amount`]: OwnershipData.amount,
                    },
                }
            );
            console.log('Updated existing ownership data.');
            flag = true;
            break; 
        }
    }

    if (!flag) {
        await Auction.updateOne(
            { _id: id },
            {
                $push: {
                    top_ownerships: OwnershipData,
                },
            }
        );
        console.log('Added new ownership data.');
    }

}

const listingAuction = async (product) => {
    try {
        const auction = new Auction({
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            category: product.category,
            time_remain: product.time_remain,
            description: product.description,
            image: product.image,
            status: "listing"
        })
        await auction.save(auction)
    } catch (error) {

    }
}

module.exports = {
    getAllProduct, getProductByCategory, getProductById, auctionBid, listingAuction
}