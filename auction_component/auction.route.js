const expess = require('express');
const router = expess.Router();
const auctionController = require('./auction.controller');
const authenMiddleware = require('../Middlewares/authen.middleware');

router.post('/listing',authenMiddleware.isAuth, auctionController.listingAuction)
router.get('/', auctionController.getAllProduct)
router.get('/category', auctionController.getAllCategory)
router.get('/:category', auctionController.getProductByCategory)
router.get('/listing/:id', auctionController.getProductById)
router.get('/listing/:search', auctionController.getProductBySearch)
router.post('/listing/:id/bid', authenMiddleware.isAuth, auctionController.auctionBid)

router.post('/end', auctionController.eventBidEnd)


module.exports = router