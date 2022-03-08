import mongoose from "mongoose";
import { logger } from "../logger/logger.js";

const db = process.env.URL;
mongoose.connect(db)
    .then(() => {
        logger.info('Successfully connected to the database');
    })
    .catch((error) => {
        logger.error("Error in Connection");
    })


