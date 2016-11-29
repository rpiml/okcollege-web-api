import app from '../..';
import should from 'should';
import {expect} from 'chai';
import request from 'supertest';
import Survey from './survey.model';
import { default as seedSurvey, clear as clearSurveys } from './survey.seed';

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

describe('Survey Model', () => {

    before( seedSurvey );

    it('should allow creation of surveys',  async function() {
      let createdSurvey = await Survey.create({
        content: {a: 'asd', b: 'dsa'}
      });
      expect(createdSurvey.content).to.have.property('a', 'asd');
      expect(createdSurvey.content).to.have.property('b', 'dsa');

      let allSurveys = await Survey.all()
      expect(allSurveys.filter(survey => survey.content.a && survey.content.b).length).to.equal(1);
    });
});

describe('Survey API', () => {

  describe.skip('Should enter a survey into the relevant databases on upload', () => {

    let requestData = {
      "userid": "USERID1230948",
      "survey": surveyExample,
    };

    before( clearSurveys );

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


    it('should have placed the survey in the relevant database tables', async function() {
      let survey = (await Survey.findAll({limit: 1, order: [ ['createdAt', 'DESC'] ]}))[0];
      expect(survey).to.not.be.empty;
      expect(survey.content).to.be.ok;
      // TODO check the user_uuid
    });

  });
});
