'use strict';

import db from '../../db';

// Record the submission of a survey
export function submit(req, res) {

  db.addSurveyResponse({
    'id': 'some-id',
    'content': '{"a": "c"}'
  });
  
  var statusCode = 201;
  res.status(statusCode).json(req.body);
};
