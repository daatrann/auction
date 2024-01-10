const expess = require('express');
const router = expess.Router();
const userController = require('./user.controller');

router.post('/login', userController.loginUser)
router.post('/signup', userController.register)
router.get('/:id', userController.viewProfile)
router.post('/:id/update', userController.userUpdate)

//admin
router.get('/', userController.userList)
module.exports = router
