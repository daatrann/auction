const expess = require('express');
const router = expess.Router();
const userController = require('./user.controller');
const authenMiddleware = require('../Middlewares/authen.middleware');

router.post('/login', userController.loginUser)
router.post('/signup', userController.register)
router.get('/profile',authenMiddleware.isAuth, userController.viewProfile)
router.post('/:id/update',authenMiddleware.isAuth, userController.userUpdate)
router.post('/support', userController.support)

//admin
router.get('/', userController.userList)
module.exports = router
