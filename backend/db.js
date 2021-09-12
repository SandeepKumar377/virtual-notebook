const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/virtualnotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Mongoose to connected successfuly");
    })
}
module.exports = connectToMongo;