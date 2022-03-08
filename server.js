import express from 'express';
const app = express();
import { logger } from './logger/logger.js';
import dotenv from "dotenv";

dotenv.config({ path: './.env' })

app.use(express.json())

import route from './router/router.js'
route(app)
// app.use(route)

app.get('/', (req, res) => {
    res.send('Hi i am utkarsh')
})

import('./database/dbConnection.js')

app.listen(process.env.PORT, () => {
    logger.info("Server is listening to port");
})