import mongoose from "mongoose";
import logger from '../middlewares/logger.js';

const connectDB = async () => {
    // MongoDB connection with logging
    mongoose
        .connect(process.env.DATABASE_URI)
        .then(() => {
            logger.info("MongoDB connected successfully");
        })
        .catch((err) => {
            logger.error(`Error while connecting to DB: ${err.message}`);
        });
};

export const disconnectDB = async () => {
    mongoose.connection.close(false, () => {
        logger.info('MongoDB connection closed.');
        process.exit(0);
    });
};

export default connectDB;