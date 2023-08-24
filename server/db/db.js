const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log(`DB Connected: ${connect.connection.host}`.bgCyan);
    } catch (error) {
        console.error(`Couldn't connect to MongoDB database: `, error);
    }
}

module.exports = connectDB;