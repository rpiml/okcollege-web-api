import Survey from './survey.model';


export default function(){
  // TODO only do this during seeding
  return Survey.sync({force: true}).then( () => {

    // TODO create seed surveys

  });
}

export async function clear(){
  await Survey.drop();
  await Survey.sync({force: true});
}
