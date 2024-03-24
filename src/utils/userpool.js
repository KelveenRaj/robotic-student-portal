import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = {
  UserPoolId: "ap-southeast-2_9rZnAFBoA",
  ClientId: "3lr40vs62n7vjpijtav8ovv9vf",
};
export default new CognitoUserPool(poolData);
