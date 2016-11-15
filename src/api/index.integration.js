//@flow
import { server, onStart, default as app } from '../';
import {init as authInit} from "./auth/local/test.integration";
import db from '../db';


before(() => onStart);

before( async () => {
  // Run the auth init
  await authInit();
});
