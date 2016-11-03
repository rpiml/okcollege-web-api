//@flow
import { server, onStart, default as app } from '../';
import {init as authInit} from "./auth/local/test.integration";
import db from '../db';

before(()=>{
  console.log("no legs billy bob");
});

before(() => onStart);

before( async () => {
  // Run the auth init
  console.log("boy did that server start");
  await authInit();
  console.log("done with auth");
});
