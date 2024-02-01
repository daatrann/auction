const User = require('./models/user.model')
const Wishlist = require('./models/wishlist.model')
const Support = require('./models/support.model')
const Auction = require('../auction_component/models/bid.model')
const jwt = require('jsonwebtoken')
require("dotenv").config;

const loginUser = async (userName, password) => {
    const user = await User.findOne({ user_name: userName, password: password, status: "true" });
    if (user !== null) {
        const payload = {
            idUser: user._id,
            email: user.email,
        };
        return jwt.sign(
            {
                payload,
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
            }
        );
    }
}

const register = async (userName, password, full_name, email, identity, phone) => {
    try {
        const userE = await User.findOne({ user_name: userName, email: email, identity: identity, phone: phone });
        if (userE === null) {
            const user = new User({
                user_name: userName,
                full_name: full_name,
                password: password,
                email: email,
                identity: identity,
                phone: phone,
                status: "true",
            })
            await user.save(user);
            return true
        }
    } catch (error) {
        console.log(error);
    }
}


const userUpdate = async (id, userName, full_name, email, identity, phone) => {
    try {
        const userE = await User.findOne({ email: email, identity: identity, phone: phone });
        if (userE === null) {
            await User.updateOne({
                _id: id
            }, {
                user_name: userName,
                full_name: full_name,
                password: password,
                email: email,
                identity: identity,
                phone: phone
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const changePassword = async (id, oldPassword, newPassword) => {
    try {
        const userE = await User.findOne({ _id: id, password: oldPassword });
        if (userE === null) {
            await User.updateOne({
                _id: id
            }, {
                password: newPassword
            })
            return "ok"
        }
    } catch (error) {
        console.log(error);
    }
}

const viewProfile = async (id) => {
    try {
        const userE = await User.findOne({ _id: id });
        return userE
    } catch (error) {
        console.log(error);
    }
}

const userList = async () => {
    try {
        const data = await User.find();
        return data
    } catch (error) {
        console.log(error);
    }
}

const support = async (message, id) => {
    try {
        const support = new Support({
            sender: id,
            content: message,
            status: "sent"
        })
        await support.save(support);
        return true
    } catch (error) {
    }
}

const supporter = async () => {
    try {
        const support = await Support.find();
        const data = []
        support.forEach(element => {

        });
        return data
    } catch (error) {
    }
}

const wishlist = async (user_id) => {
    try {
        const data = await Wishlist.find({ user_id: user_id, status : "true" })
        let wishlistData = []
        for (let i = 0; i < data.length; i++) {
            const bidData = await Auction.findOne({ _id: data[i].auction_id });
            wishlistData.push({
                productInfor: bidData
            })

        }
        return wishlistData
    } catch (error) {
    }
}

const addWishlist = async (user_id,auction_id) => {
    try {
        const wishlist = new Wishlist({
            user_id :user_id,
            auction_id : auction_id,
            status : "true"
        })
        await wishlist.save(wishlist);
    } catch (error) {
    }
}

const removeWishlist = async (user_id,wishlist_id) => {
    try {
        await Wishlist.deleteOne({user_id : user_id, _id : wishlist_id})
    } catch (error) {
    }
}

const removeAllWishlist = async (user_id) => {
    try {
        await Wishlist.deleteOne({user_id : user_id})
    } catch (error) {
    }
}

module.exports = {
    loginUser, register, userUpdate, viewProfile, userList, support, supporter, changePassword, 
    wishlist,addWishlist,removeWishlist,removeAllWishlist
}