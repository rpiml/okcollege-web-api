import db from '../../db';
import {DataTypes} from 'sequelize';

export default db.define('user', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name'
  },
  email: {
    type: DataTypes.STRING,
    field: 'email'
  },
  password_hash: {
    type: DataTypes.STRING,
    field: 'password_hash'
  },
  role: {
    type: DataTypes.STRING,
    field: 'role'
  },
});
