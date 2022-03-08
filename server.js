import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { logger } from './logger/logger.js'

const app = express();

app.get('/', (req, res) => {
    res.json({message: 'Welcome to Social Directory Application'})
})

import('./database/dbConnection.js')

dotenv.config({ path: './.env' });

app.use(cors())

app.use(express.json());

app.listen(process.env.PORT, () => {
    logger.info(`Server is listening on port`);
})

export default app;