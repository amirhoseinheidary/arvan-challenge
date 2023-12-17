import { createRouter, createWebHistory } from "vue-router";

import UserAthentication from "../views/UserAthentication.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import AdminPost from "../views/AdminPost.vue";
// import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: AdminDashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: UserAthentication,
  },
  {
    path: "/register",
    name: "Register",
    component: UserAthentication,
  },
  {
    path: "/articles/page/:id",
    name: "Articles",
    component: AdminDashboard,
  },
  {
    path: "/articles/create",
    name: "ArticleCreate",
    component: AdminPost,
  },
  {
    path: "/articles/update/:id",
    name: "ArticleUpdate",
    component: AdminPost,
  },
  // { path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
