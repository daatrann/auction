const expess = require('express');
const router = expess.Router();
const auctionController = require('./auction.controller');

router.post('/listing', auctionController.listingAuction)
router.get('/', auctionController.getAllProduct)
router.get('/:category', auctionController.getProductByCategory)
router.get('/listing/:id', auctionController.getProductById)
router.post('/listing/:id/bid', auctionController.auctionBid)


module.exports = router