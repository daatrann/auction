const expess = require('express');
const router = expess.Router();
const userController = require('./user.controller');
const authenMiddleware = require('../Middlewares/authen.middleware');

router.post('/login', userController.loginUser)
router.post('/signup', userController.register)
router.get('/profile',authenMiddleware.isAuth, userController.viewProfile)
router.post('/update',authenMiddleware.isAuth, userController.userUpdate)
router.put('/changePassword',authenMiddleware.isAuth, userController.changePassword)
router.post('/support',authenMiddleware.isAuth, userController.support)
router.get('/wishlist',authenMiddleware.isAuth, userController.wishlist)
router.post('/wishlist/add',authenMiddleware.isAuth, userController.addWishlist)
router.delete('/wishlist/:id/remove',authenMiddleware.isAuth, userController.removeWishlist)
router.delete('/wishlist/removeAll',authenMiddleware.isAuth, userController.removeAllWishlist)

//admin
router.get('/', userController.userList)
router.get('/supporter',authenMiddleware.isAuth, userController.support)
module.exports = router
