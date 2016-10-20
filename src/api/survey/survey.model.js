import db from '../../db';
import { DataTypes } from 'sequelize';
import Sequelize from 'sequelize';

let Survey = db.define('survey_response', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  content: {
    type: DataTypes.JSON,
    field: 'content'
  }
});

// TODO
// Survey.belongsTo(User);

export default Survey;
