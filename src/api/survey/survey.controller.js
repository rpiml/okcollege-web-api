'use strict';
//@flow

import Survey from './survey.model';
import predict from '../../jobs/predict';

import type {$Response, $Request} from 'express';

// Record the submission of a survey
export async function submit(req: $Request, res: $Response) {

  let id = req.body['userid'];
  let content = req.body['survey'];

  // TODO real argument validation
  if (!id || !content){
    res.status(400).json({status:'error', description: 'bad request', body: req.body});
  }

  try{
    let dbSurvey = await Survey.create({ content })

    // Predict the result of the survey
    let prediction = await predict(content);

    // TODO return id of survey for association after signup
    res.status(201).json({
      status: 'success',
      prediction,
      survey_id: dbSurvey.uuid
    });
  }catch(err){
    res.status(500).json({status: 'error', description: err});
  }

};
