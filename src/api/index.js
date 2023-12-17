import request from "@/utils/request";

function login(params) {
  return request({
    url: "/api/users/login",
    method: "post",
    data: params,
  });
}

function register(params) {
  return request({
    url: "/api/users",
    method: "post",
    data: params,
  });
}
export default {
  login,
  register,
};
