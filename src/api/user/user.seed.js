import User from './user.model';


export default async function(){
  await User.sync({force: true});
    await User.create({
        firstName: "Rick",
        lastName: "Sanchez",
        email: "ricky@morty.com",
        password: "squanch"
    })
  // TODO create seed surveys
}

export async function clear(){
  await User.drop();
  await User.sync({force: true});
}
