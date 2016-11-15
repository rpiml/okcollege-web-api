import request from 'supertest';
import {expect} from 'chai';
import app from '../../../';
import User from './../../user/user.model';
import superagent from 'superagent';

let userAccount = {
  "firstName": "Rick",
  "lastName": "Sanchez",
  "role": "user",
  "email": "rick@sanchez.com",
  "password": "wubalubadubdub",
};
let adminAccount = {
  "firstName": "Malik",
  "lastName": "Magdon-Ismail",
  "role": "admin",
  "email": "machine@learning.com",
  "password": "have faith in probability",
};

let userAuth = {}, adminAuth = {};

async function init(){
  await Promise.all([createUser(userAccount), createUser(adminAccount) ]);
  await getAuth(userAccount).then((auth) => {
    userAuth.cookie = auth.cookie;
    userAuth.token = auth.token;
  });
  await getAuth(adminAccount).then((auth) => {
      adminAuth.cookie = auth.cookie;
      adminAuth.token = auth.token;
  });
};

async function createUser(user) {
  let newUser = await User.create(user);
  newUser.provider = 'local';
  await newUser.save();
}

function wrapAuth(auth, req){
  return req.set('Authorization', 'Bearer ' + auth.token);
}

function authRequest(auth){
    return (app) => {
        var req = request(app);
        return {
            get: (...args) => wrapAuth(auth, req.get(...args)),
            post: (...args) => wrapAuth(auth, req.post(...args)),
            patch: (...args) => wrapAuth(auth, req.patch(...args)),
            delete: (...args) => wrapAuth(auth, req.delete(...args)),
            put: (...args) => wrapAuth(auth, req.put(...args))
        };
    };
}

function getAuth(account){
    return new Promise((resolve, reject) => {
      let agent = superagent.agent();
      agent
        .post('http://127.0.0.1:3001/api/auth/local')
        .type('form')
        .send(account)
        .end((err, res) => {
            if (err) reject(err);
            resolve({
                token: res.body.token,
            });
        });
    });
}

export let  user = { request: authRequest(userAuth)},
            admin = { request: authRequest(adminAuth)};
export {init};
