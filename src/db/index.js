import Sequelize from 'sequelize';
import config from '../config/environment';

export default new Sequelize(config.database.name, 'postgres', '', {
  host: config.database.host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  define: {freezeTableName: true}
});
