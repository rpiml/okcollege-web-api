
import db from './';

describe("database api", () => {
  it('should connect to the postgres database', () => {
    return db.connect();
  });

  it('should allow surveys to be added', () => {
    return db.addSurveyResponse({
      'id': 'abcd',
      'content': '{"a": "c"}'
    });
  });

  it('should not allow badly formatted surveys to be added', () => {
    return Promise.all([
      db.addSurveyResponse({
        'id': null,
        'content': '{"a": "c"}'
      }).should.be.rejected,
      db.addSurveyResponse({
        'id': 'qqqq',
        'content': null
      }).should.be.rejected
    ]);
  });

  it('should allow viewing of all surveys', () => {
    return db.getSurveyResponses().then(surveys => {
      console.log(surveys);
      expect(surveys).to.not.be.empty;
    });
  });
});
