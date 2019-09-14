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
    loggerSettings,
    dbSettings,
    corsSettings
}