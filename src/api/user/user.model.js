import db from '../../db';
import {DataTypes} from 'sequelize';
import crypto from 'crypto';

export default db.define('user', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  },
  salt: {
    type: DataTypes.STRING
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
    field: 'password'
  },
  role: {
    type: DataTypes.STRING,
    field: 'role'
  },
}, {
  instanceMethods: {
    makeSalt: function(){
      return new Promise(resolve => {
        crypto.randomBytes(byteSize, (err, salt) => {
          resolve(salt.toString('base64'));
        });
      });
    },

    encryptPassword: function(password){
      return new Promise((resolve, reject) => {
        if (!password || !this.salt) return reject('no pw/salt');

        const defaultIterations = 10000;
        const defaultKeyLength = 64;
        let salt = new Buffer(this.salt, 'base64');

        crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, (err, key) => {
          if (err) {
            reject(err);
          } else {
            resolve(key.toString('base64'));
          }
        });

      });
    },

    authenticate: function(password){
      return new Promise((resolve, reject) => {

      });
    }
  }
});
