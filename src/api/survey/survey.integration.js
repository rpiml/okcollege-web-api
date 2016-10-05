import app from '../..';
import should from 'should';
import {expect} from 'chai';
import request from 'supertest';
import db from '../../db';


describe('Survey API', () => {

  describe('Should enter a survey into the relevant databases on upload', () => {

    before(db.connect);
    before(db.wipe);
    before(db.disconnect);
    before(db.connect);

    var survey = {
      "sports": ["football", "curling"],
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
              done();
          });
    });


    it('should have placed the survey in the relevant database tables', () => {
      return db.getSurveyResponses().then(surveys => {
        expect(surveys).to.not.be.empty;
        expect(surveys[0].id).to.equal('sports');
        expect(surveys[0].content[0]).to.equal(survey['sports'][0]);
      });

    });
  });
});
