import User from './user.model';


export default async function(){
  await User.sync({force: true});
  // TODO create seed surveys
}

export async function clear(){
  await User.drop();
  await User.sync({force: true});
}
