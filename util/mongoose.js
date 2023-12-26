const mongoose = require("mongoose");

mongoose.connect(
    // "mongodb://admin:admin@mongo:2461/utilities-db",
    "mongodb://admin:admin@utilities-db:27017/utilities-db?directConnection=true&authSource=admin&replicaSet=replicaset&retryWrites=true",

    { useNewUrlParser: true },
    (err) => {
        if (!err) {
            console.log("Connect DB successfully ");
        } else {
            console.log("MongoDB Can't Connection" + err);
        }
    }
);