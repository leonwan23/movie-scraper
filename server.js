import fs from 'fs';
import path from 'path';
import express from 'express';        
import bodyParser from 'body-parser';
import expressWinston from 'express-winston';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import CONFIG from './config';
import passport from 'passport';
import models from './models';

export default {
    start: () => {
        return new Promise((resolve, reject) => {
            const app = express();                
                
            app.use(helmet()); 
            
            app.use(cors({
                origin: function (origin, callback) {
                    if (CONFIG.corsSettings.whitelist.indexOf(origin) !== -1 || !origin) {
                        callback(null, true)
                    } else {
                        callback(new Error('Not allowed by CORS'))
                    }
                }
            }));

            app.use(compression());

            app.use(passport.initialize());
         
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
            
            app.use(expressWinston.logger(CONFIG.loggerSettings));
        
            models.sequelize.authenticate().then(() => {
                console.log('Connected to SQL database:', CONFIG.dbSettings.db_name);
            })
            .catch(err => {
                console.error('Unable to connect to SQL database:',CONFIG.dbSettings.db_name, err);
            });

            //deletes all tables then recreates them useful for testing and development purposes
            //models.sequelize.sync({ force: true });

            const server = app.listen(CONFIG.serverSettings.port, () => {
                fs.readdirSync(path.join(__dirname, '../routes/')).map(file => {
                    require('../routes/' + file)(app);
                });
    
                resolve(server);
            });
        });
    }
}