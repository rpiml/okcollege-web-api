import Survey from './survey.model';


export default async function(){
  await Survey.sync({force: true});
  // TODO populate with example surveys
}

export async function clear(){
  await Survey.drop();
  await Survey.sync({force: true});
}
