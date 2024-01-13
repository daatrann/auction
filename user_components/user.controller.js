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
    const id = req.params.id
    const userName = req.body.userName
    const password = req.body.password
    const full_name = req.body.fullName
    const email = req.body.email
    const identity = req.body.identity
    const phone = req.body.phone

    const status = await userService.userUpdate(id,userName, password, full_name, email, identity, phone);
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
    const message = req.body.message
    const data = await userService.support(message);
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
    loginUser, register,userUpdate,viewProfile,userList,support
}
