const Auction = require('./models/bid.model')
const Cart = require('./models/cart.model')
const User = require('../user_components/models/user.model')
const jwt = require('jsonwebtoken')
const { runCronTxJob } = require('../cronJob');
require("dotenv").config;

const getAllProduct = async () => {
    const data = await Auction.find({ status: "listing" })
    return data
}

const getAllCategory = async () => {
    const data = await Auction.find()
    const uniqueCategories = new Set(data.map(item => item.category));
    const listCategory = [...uniqueCategories];
    return listCategory
}

const getProductBySearch = async (search) => {
    console.log(search);
    const data = await Auction.find({ name: { $regex: search, $options: 'i' } });
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

const auctionBid = async (id, idUser, amount) => {
    const data = await Auction.findOne({ _id: id });

    if (!data) {
        return;
    }

    const topOwnerships = data.top_ownerships;
    const OwnershipData = {
        user_id: idUser,
        amount: amount,
    };

    let flag = false;

    for (let i = 0; i < topOwnerships.length; i++) {
        if (topOwnerships[i].user_id === idUser) {
            await Auction.updateOne(
                { _id: id, 'top_ownerships.user_id': idUser },
                {
                    $set: {
                        [`top_ownerships.${i}.user_id`]: OwnershipData.user_id,
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

const eventBidEnd = async (id) => {
    const currentTime = new Date();
    try {
        const bid = await getProductById(id)
        const cart = new Cart({
            bid_id: bid._id,
            user_id: bid.top_ownerships[0].user_id,
            status : "unpaid",
            created_at: currentTime+""
        })
        await cart.save(cart)
        runCronTxJob(bid.top_ownerships[0].user_id)
    } catch (error) {
    }
}

const eventCheckout = async (user_id) => {
    try {
        const carts = await Cart.find({ user_id: user_id, status: "unpaid" }).exec()

        for (let index = 0; index < carts.length; index++) {
            const cart = carts[index]
            const currentTime = new Date()
            const cartCreationTime = new Date(cart.created_at)

            const timeDifferenceInHours = Math.abs(currentTime - cartCreationTime) / 36e5
            if (timeDifferenceInHours >= 24) {
                await Cart.findOneAndDelete({ _id: cart._id })
                await User.updateOne({
                    _id : user_id
                },{
                    stauts : "false"
                })
                return "ok"
            }
        }
    } catch (error) {
        console.error('Error in eventCheckout:', error)
    }
};



module.exports = {
    getAllProduct, getProductByCategory, getProductById, auctionBid, listingAuction, eventBidEnd, getProductBySearch, getAllCategory,eventCheckout
}