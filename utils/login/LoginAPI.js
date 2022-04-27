import axiosUtil from "../AxiosUtil";

const GetLoginInfo = (params) => {
  try {
    const res = axiosUtil.post(`/api/v1/login`, {
      userId: params.userId,
      pw: params.pw,
    });
    return res;
  } catch (error) {
    return error;
  }
};

const GetId = (params) => {
  try {
    const res = axiosUtil.post(
      "/RentPriceTrendSvc/v1/getJeonseRentChangeRate/",
      { userId: params.userId, pw: params.pw }
    );
    return res;
  } catch (error) {
    return error;
  }
};
const LoginApiSelector = (api, params) => {
  // console.log('[LOG] API Name : ' + api + ', Params : ' + params);
  let res;

  switch (api) {
    case "GetLoginInfo":
      res = GetLoginInfo(params);
      break;
    case "GetId":
      res = GetId(params);
      break;
  }

  return res;
};

export { LoginApiSelector };
