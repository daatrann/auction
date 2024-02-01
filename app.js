const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const cors = require('cors');
app.use(cors());
require("dotenv").config()
require("./util/mongoose.js")
const userRoute = require('./user_components/user.route.js')
const bidRoute = require('./auction_component/auction.route.js')
app.use(express.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use('/user', userRoute)
app.use('/auction', bidRoute)

app.listen(8000, () => {
    try {
        console.log(`Server is running at port ${8000}.`);
    } catch (err) {
        console.log("Error in server setup. ", err);
    }
});
