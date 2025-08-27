import { config as conf } from "dotenv";
conf();

const _config = {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_CONNNECTION_STRING,
    environment: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
