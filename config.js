/**
 * Default configuration for the application.
 * Can be over-ridden by environment specific configurations by changing the NODE_ENV value in .env file.
 * Corresponding configuration file for the envionment must be present in the codebase with teh following name: config.<env>.js
 */
import winston from 'winston';
require("dotenv").config();

const env = process.env.NODE_ENV || "development";
// const envConfig = require(`./config.${env}`);

/**
 * Configuration for express server
 * By default binds to port 8000
 */
const serverSettings = {
    port: process.env.PORT || 8000
};

const loggerSettings = {
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
};

const jwtSettings = {
    encryption: process.env.JWT_ENCRYPTION || 'd66490ea24ff096fcbbc1e9ddb4eadd8d162d051354343d44ea1a6d042793a85359537c83a281d0cae5dc65ca5b4486c2840274a7b229a0b926304fd76113fe9fe27fbce6fe909bb8c527e9ddac5bd68f6ac1dffca8ac9c58e218d9d6094b09f5bdb976ff47b43f54d26ad436a23409c64cda25caf0e58d5bba9b8751f67fa9f833650d66cf5f7f7b2ab924e9e09bfd9a9d3f553f6e3c423282e43cdb4939f4fa02c9ef756e123397101de205e36c69ed6ee7226977e3c5de50427fbdf8b9e33a989abf6e1c75c1aa1de26ebcd37ee54b37443e0886bde0fd764f8e262872c17d952ec6ec81a957752a05729b60c4a3e5a1a0a7cfb3b3a186aa54065c27678b7',
    expiration: process.env.JWT_EXPIRATION || '3600'
};

const dbSettings = {
    db_dialect: process.env.DB_DIALECT || 'postgres',
    db_host: process.env.DB_HOST       || 'movie-db',
    db_port: process.env.DB_PORT       || '5432',
    db_name: process.env.DB_NAME       || 'movie-scraper',
    db_user: process.env.DB_USER       || 'dev',
    db_password: process.env.DB_PASSWORD  || 'dev'
};

const corsSettings = {
    whitelist: process.env.CORS_WHITELIST.split(',') || ['http://web.movie.localhost']
};

export default {
    serverSettings,
    // envConfig,
    loggerSettings,
    jwtSettings,
    dbSettings,
    corsSettings
}