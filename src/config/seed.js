import surveySeed from '../api/survey/survey.seed';
import userSeed from '../api/user/user.seed';

export default async function(){
  await surveySeed();
  await userSeed();
}
