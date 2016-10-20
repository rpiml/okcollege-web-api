import surveySeed from '../api/survey/survey.seed';
import userSeed from '../api/survey/user.seed';

export default async function(){
  await surveySeed();
  await userSeed();
}
