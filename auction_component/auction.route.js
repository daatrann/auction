const expess = require('express');
const router = expess.Router();
const auctionController = require('./auction.controller');
const authenMiddleware = require('../Middlewares/authen.middleware');

router.get("/get-upload-url/:filename", auctionController.getUploadURL)
router.post('/listing',authenMiddleware.isAuth, auctionController.listingAuction)
router.get('/', auctionController.getAllProduct)
router.get('/categories', auctionController.getAllCategory)
router.get('/:status', auctionController.getAuctionByStatus)
router.get('/category/:category', auctionController.getProductByCategory)
router.get('/listing/:id', auctionController.getProductById)
router.get('/listing/search/:search', auctionController.getProductBySearch)
router.post('/listing/:id/bid', authenMiddleware.isAuth, auctionController.auctionBid)
router.get('/:id/cart', authenMiddleware.isAuth, auctionController.viewCart)

router.post('/:id/end', auctionController.eventBidEnd)


module.exports = router