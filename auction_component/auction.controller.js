const userService = require('./auction.service');
const { response } = require("../util/response");
const {
    transValidation,
    responseStatus,
    errorCode
} = require("../langs/vn");

const getAllProduct = async (req, res) => {
    const data = await userService.getAllProduct();
    if (!data) {
        return res
            .status(200)
            .json(
                response(responseStatus.success, transValidation.not_found)
            );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, data)
        );
}

const getProductByCategory = async (req, res) => {
    const category = req.params.category

    const data = await userService.getProductByCategory(category);
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, data)
        );
}

const getProductById = async (req, res) => {
    const id = req.params.id

    const data = await userService.getProductById(id);
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, data)
        );
}

const auctionBid = async(req, res)=>{
    const id = req.params.id
    const name = req.body.name
    const amount = req.body.amount
    await userService.auctionBid(id,name,amount);
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct)
        );
}

const listingAuction = async(req, res)=>{
    const name = req.body.name
    const quantity = req.body.quantity
    const price = req.body.price
    const category = req.body.category
    const time_remain = req.body.time_remain
    const description = req.body.description
    const image = req.body.image
    const product = {
        name : name,
        quantity : quantity,
        price : price,
        category : category,
        time_remain : time_remain,
        description : description,
        image : image
    }
    const status = userService.listingAuction(product);
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, status)
        );
}

module.exports = {
    getAllProduct, getProductByCategory,getProductById,auctionBid,listingAuction
}
