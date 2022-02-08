// providing a function to connect to remote mongodb database 

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI
const dbConnect = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = dbConnect;