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

    // TODO only predict when survey is finished
    let prediction = await predict(content);

    res.status(201).json({
      status: 'success',
      prediction,
      survey_id: dbSurvey.uuid
    });
  }catch(err){
    res.status(500).json({status: 'error', description: err});
  }

};
