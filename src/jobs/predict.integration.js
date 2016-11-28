import predict from './predict';
import {expect} from 'chai';
import {readFileSync} from 'fs';

let exampleSurvey = {"survey": {"firstPage": "start", "pages": [{"next": [{"page": "scores", "condition": "true"}], "id": "start", "questions": [{"step": 0.5, "answer": 3.5, "question": "How many years of college have you completed?", "id": "years-in-college", "type": "slider", "range": [0, 5]}, {"answer": ["Business"], "question": "What was your major?", "answers": ["Business", "Psychology", "Nursing", "Computer Science", "Science / Engineering", "Communications"], "hasOther": true, "id": "plan-of-study", "type": "multi-choice"}, {"step": 0.05, "answer": 0.8, "question": "What was your GPA on a 4.0 scale (unweighted)?", "id": "GPA-4", "type": "slider", "range": [0, 4]}, {"answer": "History", "question": "What was your favorite class in high school?", "answers": ["English", "Math", "History", "Science", "Art"], "hasOther": true, "id": "favorite-class", "type": "choice"}]}, {"next": [{"page": "activities", "condition": "true"}], "id": "scores", "questions": [{"answers": ["SAT", "ACT", "Both"], "id": "SAT-or-ACT", "type": "multi-choice", "question": "Did you take the SAT or the ACT?"}, {"id": "SAT-score", "type": "slider", "question": "What was your SAT score?", "range": [600, 2400]}, {"id": "ACT-score", "type": "slider", "question": "What was your ACT score?", "range": [600, 2400]}, {"answers": ["English", "Math 1", "Math 2", "Physics", "History", "Biology", "Chemistry", "Ecology", "Languages"], "id": "SAT2", "type": "multi-choice", "question": "Which SAT 2 subject tests did you take?"}, {"id": "SAT2-scores", "type": "slider", "question": "What were your scores on the subject tests?", "range": [0, 1000000000]}]}, {"next": [{"page": "awards-and-jobs", "condition": "true"}], "id": "activities", "questions": [{"answers": ["Football", "Track & Field", "Basketball", "Baseball", "Soccer", "Wrestling", "Cross Country"], "hasOther": true, "id": "sports", "type": "multi-choice", "question": "What sports do you play?"}, {"answers": ["Yes", "No", "Not sure..."], "id": "clubs", "type": "choice", "question": "Are you in any clubs?"}]}, {"next": [{"page": "done", "condition": "true"}], "id": "awards-and-jobs", "questions": [{"answers": ["Yes", "No"], "hasOther": true, "id": "awards", "type": "multi-choice-dropdown", "question": "Do you have any prestigous awards from high school?"}, {"id": "jobs", "type": "slider", "question": "How many years did you work while in high school?", "range": [0, 4]}, {"id": "internships", "type": "slider", "question": "How many internships did you have while in high school?", "range": [0, 4]}]}]}, "currentPage": "start"};


describe('Predict Job', () => {
  // TODO this test should submit a real form
  it('should run a simple prediction job', () => {
    return predict(exampleSurvey).then(result => {
      expect(result.colleges[0].ranking).to.equal(1);
    });
  })
});
