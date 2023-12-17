import { createRouter, createWebHistory } from "vue-router";

import UserAthentication from "../views/UserAthentication.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import AdminPost from "../views/AdminPost.vue";
import NotFound from "../views/NotFound.vue";

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
  {},
  {
    path: "/AdminPost/create",
    name: "AdminPostCreate",
    component: AdminPost,
  },
  {
    path: "/AdminPost/update/[id]",
    name: "AdminPostUpdate",
    component: AdminPost,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
