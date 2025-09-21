import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    // Lazy loading for better performance
    component: () => import("../views/Home.vue"),
    meta: { roles: ["User", "Editor", "Admin"] },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    meta: { roles: ["Admin"] },
  },
  {
    path: "/editor",
    name: "Editor",
    component: () => import("../views/EditorView.vue"),
    meta: { roles: ["Editor", "Admin"] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userRoles = store.getters.getUserRoles;

  if (to.meta.roles) {
    const allowed = to.meta.roles.some((role) => userRoles.includes(role));
    if (!allowed) {
      return next("/");
    }
  }

  next();
});

export default router;
