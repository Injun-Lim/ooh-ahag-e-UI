import { myPageApi } from "./../utils/api";

const SessionCheck = async () => {
  const sessionData = await myPageApi.getSession().then((res) => res.status);
  console.log("called");
  console.log("session@@@@@@@@@@@@@@@@@@@@@@");
  console.log(sessionData);
  console.log("session@@@@@@@@@@@@@@@@@@@@@@");

  return sessionData;
};

export default SessionCheck;
