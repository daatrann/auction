// Assuming you have required mongoose
const mongoose = require('mongoose');

// Your MongoDB connection string
const connectionString = 'mongodb+srv://admin:admin@cluster0.dr5fib0.mongodb.net/auction';

// Connect to MongoDB
mongoose.connect(connectionString);

// Event handlers for successful connection and error
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB: ' + err);
});

require("../user_components/models/user.model");
require("../auction_component/models/bid.model");

