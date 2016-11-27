//@flow
import { rpc } from './util';

export default async function predict(survey: Object){
  return rpc('predictor_queue', JSON.stringify(survey));
}
