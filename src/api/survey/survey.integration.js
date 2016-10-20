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

    const surveyExample = {
      "firstPage": "start",
      "pages": [{
          "id": "start",
          "questions": [{
            "id": "years-in-college",
            "question": "How many years have you been in college?",
            "type": "slider",
            "answer": 3,
            "range": [0,5]
          }],
          "next": "done"
        }
      ]
    };

    let requestData = {
      "userid": "USERID1230948",
      "survey": surveyExample,
    };

    let surveyResponse;
    before(function(done) {
      request(app)
          .post('/api/survey')
          .send(requestData)
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
      return db.deprecated.getSurveyResponses().then(surveys => {
        expect(surveys).to.not.be.empty;
        expect(surveys[0].id).to.equal('USERID1230948');
        expect(surveys[0].content).to.be.ok;
      });

    });
  });
});
