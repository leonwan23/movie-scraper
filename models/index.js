import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import CONFIG from '../config';

const basename  = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(CONFIG.dbSettings.db_name, CONFIG.dbSettings.db_user, CONFIG.dbSettings.db_password, {
    host: CONFIG.dbSettings.db_host,
    dialect: CONFIG.dbSettings.db_dialect,
    port: CONFIG.dbSettings.db_port,
    operatorsAliases: false
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;