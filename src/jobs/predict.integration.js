import predict from './predict';
import {expect} from 'chai';

describe('Predict Job', () => {
  it.only('should run a simple prediction job', done => {
    return predict({a: 1, b:2}).then(result => {
      console.log(result);
      done();
    });
  })
});
