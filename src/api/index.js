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
function getAllPosts(author, page = 1, count = 10) {
  let offset = "";
  if (page > 1) {
    offset = "&offset=" + (page - 1) * count;
  }
  return request({
    url: `/api/articles?author=${author}&count= ${count} ${offset}`,
    method: "get",
  });
}
function deleteArticle(slug) {
  return request({
    url: `/api/articles/${slug}`,
    method: "delete",
  });
}

export default {
  login,
  register,
  getAllPosts,
  deleteArticle,
};
