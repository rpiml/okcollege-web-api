import app from '../..';
import should from 'should';
import {expect} from 'chai';
import request from 'supertest';

describe('Survey API', () => {
  describe('Should enter a survey into the relevant databases on upload', () => {

    var survey = {
      "years-in-college":2,
      "sports": ["football", "curling"],
      "clubs": ["RCOS"]
    };
    var surveyResponse;
    before(function(done) {
      request(app)
          .post('/api/survey')
          .send(survey)
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
              if (err) {
                  return done(err);
              }
              surveyResponse = res.body;
              console.log(surveyResponse);
              done();
          });
    });

    it('should accept a network request for a survey', () => {
      expect(1).to.equal(1);
    });

    it.skip('should have placed the survey in the relevant database tables', () => {
      expect(surveyResponse.name).to.equal('survey');
    });
  });
});
