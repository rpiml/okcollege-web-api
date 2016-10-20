
import db from './';
import should from 'should';
import {expect} from 'chai';

describe("Clean up database", () => {
  it('should connect', db.connect);
  it('should wipe the database', db.wipe);
  it('should disconnect', db.disconnect);
});

describe("database api", () => {

  it('should not allow operations before connection', () => {
    return db.deprecated.addSurveyResponse({
      'id': 'abcd',
      'content': '{"a": "c"}'
    }).should.be.rejected;
  });

  it('should connect to the postgres database', db.connect);

  it('should allow surveys to be added', () => {
    return db.deprecated.addSurveyResponse({
      'id': 'abcd',
      'content': '{"a": "c"}'
    });
  });

  it('should not allow badly formatted surveys to be added', () => {
    return Promise.all([
      db.deprecated.addSurveyResponse({
        'id': null,
        'content': '{"a": "c"}'
      }).should.be.rejected,
      db.deprecated.addSurveyResponse({
        'id': 'qqqq',
        'content': null
      }).should.be.rejected
    ]);
  });

  it('should allow viewing of all surveys', () => {
    return db.deprecated.getSurveyResponses().then(surveys => {
      expect(surveys).to.not.be.empty;
      expect(surveys[0]).to.have.property('id');
      expect(surveys[0]).to.have.property('content');
    });
  });
});
