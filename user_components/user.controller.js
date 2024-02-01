const userService = require('./user.service');
const { response } = require("../util/response");
const {
    transValidation,
    responseStatus,
    errorCode
} = require("../langs/vn");

const loginUser = async (req, res) => {
    const userName = req.body.userName
    const password = req.body.password

    const token = await userService.loginUser(userName, password);
    if (!token) {
        return res
            .status(200)
            .json(
                response(responseStatus.fail, transValidation.login_fail)
            );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, token)
        );
}

const register = async (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    const full_name = req.body.fullName
    const email = req.body.email
    const identity = req.body.identity
    const phone = req.body.phone

    const status = await userService.register(userName, password, full_name, email, identity, phone);
    if(!status){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, status)
        );
}

const viewProfile = async (req, res) => {

    const status = await userService.viewProfile(req.idUser);
    if(!status){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, status)
        );
}

const userUpdate = async (req, res) => {
    const full_name = req.body.fullName
    const email = req.body.email
    const identity = req.body.identity
    const phone = req.body.phone

    const status = await userService.userUpdate(req.idUser, full_name, email, identity, phone);
    if(!status){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, status)
        );
}

const changePassword = async (req, res) => {
    const oldPassword = req.body.old_password
    const newPassword = req.body.new_password

    const status = await userService.changePassword(req.idUser,oldPassword, newPassword);
    if(!status){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.bad_request)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, status)
        );
}

const userList = async (req, res) => {

    const data = await userService.userList();
    if(!data){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, data)
        );
}

const support = async (req, res) => {
    const accessToken = req.headers['authorization'];
    let idUser;
    if(!accessToken){
        idUser = "Guest"
    }else{
        const token = accessToken.split(' ')[1];
        let verified = jwt.verify(token, process.env.JWT_SECRET);
        idUser = verified.payload.idUser;
    }
    const message = req.body.message
    const status = await userService.support(message,idUser);
    if(!status){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, status)
        );
}

const supporter = async (req, res) => {
    const message = req.body.message
    const data = await userService.supporter();
    if(!data){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, data)
        );
}

const wishlist = async (req, res) => {
    const data = await userService.wishlist(req.idUser);
    if(!data){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, data)
        );
}

const addWishlist = async (req, res) => {
    const auction_id = req.body.auction_id
    const data = await userService.addWishlist(req.idUser,auction_id);
    if(!data){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, data)
        );
}

const removeWishlist = async (req, res) => {
    const wishlist_id = req.params.wishlist_id
    const data = await userService.removeWishlist(req.idUser,wishlist_id);
    if(!data){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, data)
        );
}

const removeAllWishlist = async (req, res) => {
    const data = await userService.removeAllWishlist(req.idUser);
    if(!data){
        return res
        .status(200)
        .json(
            response(responseStatus.fail, transValidation.email_exist)
        );
    }
    return res
        .status(200)
        .json(
            response(responseStatus.success, transValidation.input_correct, data)
        );
}

module.exports = {
    loginUser, register,userUpdate,viewProfile,userList,support,supporter,wishlist,changePassword,addWishlist,
    removeWishlist,removeAllWishlist
}
