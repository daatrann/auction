const User = require('./models/user.model')
const Support = require('./models/support.model')
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
        const userE = await User.findOne({ user_name: userName });
        if (userE === null) {
            const user = new User({
                user_name: userName,
                full_name: full_name,
                password: password,
                email: email,
                identity: identity,
                phone: phone,
                status: "true"
            })
            await user.save(user);
            return true
        }
    } catch (error) {
        console.log(error);
    }
}


const userUpdate = async (id, userName, password, full_name, email, identity, phone) => {
    try {
        await User.updateOne({
            _id : id
        },{
            user_name: userName,
            full_name: full_name,
            password: password,
            email: email,
            identity: identity,
            phone: phone
        })
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
            status : "sent"
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

module.exports = {
    loginUser, register, userUpdate, viewProfile,userList,support,supporter
}