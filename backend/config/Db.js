const mongooqse = require('mongoose');
const connectDB = async () => {
    try {
        await mongooqse.connect(process.env.mongo_url) 
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;