'use strict';

import db from '../../db';

// Record the submission of a survey
export function submit(req, res) {

  // TODO: verify the data in req.body to be formatted correctly
  Object.keys(req.body).forEach(function (key) {
    let obj = req.body[key];
    db.addSurveyResponse({
      'id': key,
      'content': req.body[key]
    });
  });

  var statusCode = 201;
  res.status(statusCode).json(req.body);

};
