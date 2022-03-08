import winston from "winston";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.errors(
                winston.format.timestamp(),
                winston.format.json(),
            ),
        }),
        new winston.transports.File({
            filename: 'info.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
        }),
    ],
});