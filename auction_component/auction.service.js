const Auction = require('./models/bid.model')
const Cart = require('./models/cart.model')
const Category = require('./models/category.model')
const User = require('../user_components/models/user.model')
const jwt = require('jsonwebtoken')
const aws = require("aws-sdk")
const { runCronTxJob, eventBidEndJob } = require('../cronJob')
const mailer = require('nodemailer')
require("dotenv").config;

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();

const getLinkImage = async (files) => {
    return files.map((key) => getPresignedUrl(key));
};

function getPresignedUrl(key) {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
    };

    return s3.getSignedUrl('getObject', params);
}


const getAllProduct = async () => {
    const auction = await Auction.find({status : "happenning"})
    return auction
}

const getAllCategory = async () => {
    const data = await Category.find()
    return data
}

const getProductBySearch = async (search) => {
    const data = await Auction.find({ name: { $regex: search, $options: 'i' } });
    return data
}

const getProductByCategory = async (category) => {
    const data = await Auction.find({ category: category })
    return data
}

const getProductByStatus = async (status) => {
    const data = await Auction.find({ status: status })
    return data
}

const getProductById = async (id) => {
    const data = await Auction.findOne({ _id: id })
    return data
}

const viewCart = async (id) => {
    const data = await Cart.find({ user_id: id,status : "unpaid" })
    let cartData = []
    for (let i = 0; i < data.length; i++) {
        const bidData = await Auction.findOne({ _id: data[i].bid_id });
        cartData.push({
            cart: data[i],
            productInfor: bidData
        })

    }
    return cartData
}

const auctionBid = async (id, idUser, amount) => {
    try {
        const data = await Auction.findOne({ _id: id });

        if (!data) {
            return;
        }

        if (data.owner === idUser) {
            return
        }

        const topOwnerships = data.top_ownerships;
        const userE = await User.findOne({_id:idUser})
        const OwnershipData = {
            user_id: idUser,
            user_name: userE.user_name,
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
                            [`top_ownerships.${i}.user_name`]: OwnershipData.user_name,
                            [`top_ownerships.${i}.amount`]: OwnershipData.amount,
                        },
                    }
                );
                return 'Updated existing ownership data.'
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
            return 'Added new ownership data.'
        }
    } catch (error) {
        console.log(error);
    }

}

const listingAuction = async (product, user_id) => {
    try {
        const keyImages = []
        const uploadPromises = product.image.map(async (file) => {
            const key = `${file.originalname}_${Date.now()}_${Math.random()}`
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype
            };
            const result = await s3.upload(params).promise();
            keyImages.push(key)
            return result.Location;
        })
        const imageUrls = await Promise.all(uploadPromises);
        const auction = new Auction({
            name: product.name,
            owner: user_id,
            quantity: product.quantity,
            price: product.price,
            category: product.category,
            time_remain: product.time_remain,
            description: product.description,
            image: keyImages,
            status: "happenning"
        })
        const auctionData = await auction.save(auction)
        //use cron job to catch ending time then call event bid end
        countBidEnd(product.time_remain, auctionData._id)
    } catch (error) {
        console.log(error);
    }
}

const countBidEnd = (time, bid_id) => {
    try {
        setTimeout(() => {
            eventBidEnd(bid_id);
        }, time* 24 * 60 * 1000);
    } catch (error) {
    }
}


const eventBidEnd = async (id) => {
    const currentTime = new Date();
    try {
        const bid = await getProductById(id)
        await Auction.updateOne({
            _id : id
        },{
            status: "end"
        })
        const cart = new Cart({
            bid_id: bid._id,
            user_id: bid.top_ownerships[0].user_id,
            status: "unpaid",
            created_at: currentTime + ""
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
                    _id: user_id
                }, {
                    stauts: "false"
                })
                return "ok"
            }
        }
    } catch (error) {
        console.error('Error in eventCheckout:', error)
    }
};

const sendWinerMail = async (id) => {
    const currentTime = new Date();
    try {
        const bid = await getProductById(id)
        const cart = new Cart({
            bid_id: bid._id,
            user_id: bid.top_ownerships[0].user_id,
            status: "unpaid",
            created_at: currentTime + ""
        })
        await cart.save(cart)
        runCronTxJob(bid.top_ownerships[0].user_id)
    } catch (error) {
    }
}

const sendMail = async (email_to) => {
    try {
        const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_FROM,
                pass: process.env.MAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: email_to,
            subject: 'Hello from Node.js',
            text: 'This is a test email sent from Node.js using nodemailer.'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

    } catch (error) {
    }
}



module.exports = {
    getAllProduct, getProductByCategory, getProductById, auctionBid, listingAuction,
    eventBidEnd, getProductBySearch, getAllCategory, eventCheckout, getLinkImage,
    getProductByStatus, viewCart,sendMail
}