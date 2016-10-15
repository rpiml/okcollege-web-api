'use strict';

import db from '../../db';

// Record the submission of a survey
export function submit(req, res) {

  let id = req.body['userid'];
  let content = req.body['survey'];
  if (id && content){
    db.addSurveyResponse({ id, content }).then(() => {
      res.status(201).json({status: 'success'});
    });
  }else{
    res.status(400).json({status:'error', description: 'bad request', body: req.body});
  }

};
