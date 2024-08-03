const mongoose = require('mongoose');


const connectDB = async () => {

    try {

        await mongoose.connect(`mongodb+srv://dipendrapatel926:A4jBpoqG5xgrRVeE@cluster0.hjihcsv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log("db is not connect")
    }

}

module.exports = connectDB;
