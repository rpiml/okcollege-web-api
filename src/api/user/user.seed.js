import User from './user.model';


export default function(){
  // TODO only do this during seeding
  return User.sync({force: true}).then( () => {

    // TODO create seed surveys

  });
}

export async function clear(){
  await User.drop();
  await User.sync({force: true});
}
